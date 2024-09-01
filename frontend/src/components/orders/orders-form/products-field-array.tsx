import { Control, UseFormWatch } from "react-hook-form";
import { OrdersFormValidationType } from "./interface";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { RequestCombobox } from "@/components/combobox/request-combobox";
import { Factory, Package, TrashIcon } from "lucide-react";
import { getPromiseAsOptions } from "@/shared/helpers/form-helper/form-helper";
import SuppliersService from "@/shared/services/suppliers-service";
import ProductsService from "@/shared/services/products-service";
import { Input } from "@/components/ui/input";

import { getCoinFormat } from "@/shared/helpers/format-helper";
import { Button } from "@/components/ui/button";
import { useMemo } from "react";

interface IProductFieldArrayProps {
  index: number;
  id: string;

  control: Control<OrdersFormValidationType>;
  watch: UseFormWatch<OrdersFormValidationType>;

  remove: (index: number) => void;
  hasRemoveButton: boolean;
}

export function ProductFieldArray(props: Readonly<IProductFieldArrayProps>) {
  const { index, id, control, watch, remove, hasRemoveButton } = props;

  const { getSuppliersByStatus } = new SuppliersService();
  const { getProductsByStatus } = new ProductsService();

  const product = watch(`products.${index}`);

  const counter = index + 1;

  const total = useMemo(
    () => calculateTotal(),
    [product.quantity, product.price]
  );

  function calculateTotal() {
    if (!product.quantity || !product.price) return getCoinFormat(0);

    const value = product.quantity * product.price;
    const format = getCoinFormat(value);

    return format;
  }

  return (
    <div id={id} className="w-full flex flex-col flex-wrap gap-6">
      <h5 className="text-base font-semibold">Unidade {counter}</h5>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col md:flex-row gap-4">
          <FormField
            control={control}
            name={`products.${index}.supplier_id`}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <FormItem className="flex-1">
                <FormLabel htmlFor={`products.${index}.supplier_id`} required>
                  Fornecedor
                </FormLabel>
                <FormControl>
                  <RequestCombobox
                    icon={Factory}
                    storages={["suppliers", id]}
                    request={() =>
                      getPromiseAsOptions(
                        getSuppliersByStatus("enabled"),
                        (supplier) => ({
                          data: supplier,
                          value: supplier.id.toString(),
                          label: supplier.name,
                        })
                      )
                    }
                    onChange={(option) => {
                      if (!option) onChange(undefined);

                      const asInt = parseInt(option?.value);
                      onChange(asInt);
                    }}
                    selectedValue={value?.toString()}
                    strings={{
                      placeholder: "Selecione o fornecedor",
                      search: "Procurar fornecedor...",
                      empty: "Nenhum fornecedor encontrado.",
                    }}
                    isError={!!error}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name={`products.${index}.product_id`}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <FormItem className="flex-1">
                <FormLabel htmlFor={`products.${index}.product_id`} required>
                  Produto
                </FormLabel>
                <FormControl>
                  <RequestCombobox
                    icon={Package}
                    storages={["products", id]}
                    request={() =>
                      getPromiseAsOptions(
                        getProductsByStatus("enabled"),
                        (product) => ({
                          data: product,
                          value: product.id.toString(),
                          label: product.name,
                        })
                      )
                    }
                    onChange={(option) => {
                      if (!option) onChange(undefined);

                      const asInt = parseInt(option?.value);
                      onChange(asInt);
                    }}
                    selectedValue={value?.toString()}
                    strings={{
                      placeholder: "Selecione o produto",
                      search: "Procurar produto...",
                      empty: "Nenhum produto encontrado.",
                    }}
                    isError={!!error}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <FormField
            control={control}
            name={`products.${index}.quantity`}
            render={({ field: { onChange, value } }) => (
              <FormItem className="flex-1">
                <FormLabel htmlFor={`products.${index}.quantity`} required>
                  Quantidade
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    value={value ?? ""}
                    onChange={(e) => {
                      const value = e.target.value;

                      if (!value) {
                        onChange(undefined);
                        return;
                      }

                      const asInt = parseInt(e.target.value);
                      onChange(asInt);
                    }}
                    placeholder="Insira a quantidade de produtos"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name={`products.${index}.price`}
            render={({ field: { onChange, value } }) => (
              <FormItem className="flex-1">
                <FormLabel htmlFor={`products.${index}.price`} required>
                  Preço
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    value={value ?? ""}
                    onChange={(e) => {
                      const value = e.target.value;

                      if (!value) {
                        onChange(undefined);
                        return;
                      }

                      const asInt = parseFloat(e.target.value);
                      onChange(asInt);
                    }}
                    placeholder="R$ 0,00"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-col md:items-center sm:flex-row justify-between gap-4">
          <FormItem className="flex-1">
            <FormLabel htmlFor={`products.${index}.price`} required>
              Valor Total da Unidade
            </FormLabel>
            <Input
              className="text-muted-foreground"
              value={total}
              placeholder="R$ 0,00"
              readOnly
            />
            <FormDescription>
              Campo automaticamente preenchido com o valor total da unidade.
            </FormDescription>
            <FormMessage />
          </FormItem>

          <div className="w-full flex flex-1 justify-end items-center">
            {hasRemoveButton && (
              <Button
                type="button"
                size="sm"
                variant="destructive"
                className="gap-2"
                onClick={() => remove(index)}
              >
                <TrashIcon className="w-5 h-5" />
                Excluir unidade
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
