import { Control, UseFormWatch } from "react-hook-form";
import { OrdersFormValidationType } from "./interface";
import {
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { RequestCombobox } from "@/components/combobox/request-combobox";
import { Factory, Package, TrashIcon } from "lucide-react";
import { getPromiseAsOptions } from "@/shared/helpers/form-helper/form-helper";
import SuppliersService from "@/shared/services/suppliers-service";

import { Input } from "@/components/ui/input";

import { getCoinFormat } from "@/shared/helpers/format-helper";
import { Button } from "@/components/ui/button";
import { useMemo } from "react";
import { RenderField } from "@/components/render-form/render-field";
import { SuppliersProductsService } from "@/shared/services/suppliers-products-service";

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

  const { getSuppliersProductsExtended } = new SuppliersProductsService();

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
          <RenderField
            className="flex-1"
            control={control}
            name={`products.${index}.supplier_id`}
            label="Fornecedor"
            render={({ field: { value, onChange }, fieldState: { error } }) => (
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
            )}
            required
          />

          <RenderField
            className="flex-1"
            control={control}
            name={`products.${index}.product_id`}
            label="Produto"
            render={({ field: { value, onChange }, fieldState: { error } }) => (
              <RequestCombobox
                enabled={!!watch(`products.${index}.supplier_id`)}
                icon={Package}
                storages={["products", id]}
                request={() =>
                  getPromiseAsOptions(
                    getSuppliersProductsExtended(
                      watch(`products.${index}.supplier_id`)
                    ),
                    (product) => ({
                      data: product,
                      value: product.product_id.toString(),
                      label: product.product_info.name,
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
            )}
            required
          />
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <RenderField
            control={control}
            name={`products.${index}.quantity`}
            label="Quantidade"
            render={({ field: { onChange, value } }) => (
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
            )}
            required
          />

          <RenderField
            control={control}
            name={`products.${index}.price`}
            label="Preço"
            render={({ field: { onChange, value } }) => (
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
            )}
            required
          />
        </div>

        <div className="flex flex-col md:items-center sm:flex-row justify-between gap-4">
          <FormItem className="flex-1">
            <FormLabel htmlFor={`products.${index}.price`}>
              Valor Total da Unidade
            </FormLabel>
            <Input
              className="text-muted-foreground cursor-default"
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
