import { useFieldArray, UseFormReturn } from "react-hook-form";
import {
  OrdersFormValidationType,
  OrderProductsValidationType,
} from "./interface";
import { Button } from "@/components/ui/button";
import { ProductFieldArray } from "./products-field-array";
import { useToast } from "@/components/ui/use-toast";
import { Eraser, Package } from "lucide-react";

import { Separator } from "@/components/ui/separator";
import { Fragment } from "react/jsx-runtime";
import { OrdersFormTotal } from "./orders-form-total";
import { useCallback } from "react";

interface IOrdersFormProductsProps {
  form: UseFormReturn<OrdersFormValidationType>;
}

export function OrdersFormProducts(props: Readonly<IOrdersFormProductsProps>) {
  const { form } = props;
  const { control, resetField } = form;

  const { toast } = useToast();

  const products = form.watch("products");

  const { fields, remove, append } = useFieldArray({
    control,
    name: "products",
  });

  const totalValue = getTotalValue(products);

  function getTotalValue(products: OrderProductsValidationType[]) {
    if (products.length === 0) return 0;

    return products.reduce((acc, product) => {
      const price = product.price || 0;
      const quantity = product.quantity || 0;

      return acc + quantity * price;
    }, 0);
  }

  const handleRemoveUnit = useCallback(
    (index: number) => {
      try {
        remove(index);

        toast({
          title: "Unidade removida",
          description: "Unidade removida com sucesso.",
          variant: "default",
        });
      } catch (error) {
        toast({
          title: "Não foi possível remover a unidade",
          description: "Ocorreu um erro ao remover a unidade.",
          variant: "destructive",
        });
      }
    },
    [toast, remove]
  );

  const handleAddUnit = useCallback(() => {
    try {
      append({} as OrderProductsValidationType);
      toast({
        title: "Unidade adicionada",
        description: "Nova unidade adicionada com sucesso.",
        variant: "default",
      });
    } catch (error) {
      toast({
        title: "Não foi possível adicionar uma nova unidade",
        description: "Ocorreu um erro ao uma nova unidade.",
        variant: "destructive",
      });
    }
  }, [append, toast]);

  const handleResetUnits = useCallback(() => {
    try {
      resetField("products");

      toast({
        title: "Unidades removidos",
        description: "Todas unidades foram removidas com sucesso.",
        variant: "default",
      });
    } catch (error) {
      toast({
        title: "Não foi possível remover as unidades",
        description: "Ocorreu um erro ao remover as unidades.",
        variant: "destructive",
      });
    }
  }, [resetField, toast]);

  return (
    <div className="w-full flex flex-col gap-2">
      <div className="w-full flex flex-col gap-4">
        {fields.map((field, index) => (
          <Fragment key={field.id}>
            <ProductFieldArray
              id={field.id}
              index={index}
              control={control}
              watch={form.watch}
              remove={handleRemoveUnit}
              hasRemoveButton={fields.length > 1}
            />

            {index !== fields.length - 1 && <Separator key={field.id} />}
          </Fragment>
        ))}
      </div>

      <div className="flex flex-col md:flex-row items-end justify-between gap-4">
        <div className="flex gap-2 flex-wrap">
          <Button
            variant="outline"
            size="sm"
            type="button"
            onClick={handleAddUnit}
            className="gap-2"
          >
            <Package className="w-5 h-5" />
            Adicionar nova unidade
          </Button>

          <Button
            size="sm"
            variant="secondary"
            type="button"
            className="gap-2"
            onClick={handleResetUnits}
            disabled={fields.length <= 1}
          >
            <Eraser className="w-5 h-5" />
            Remover todas unidades
          </Button>
        </div>

        <OrdersFormTotal totalValue={totalValue} control={control} />
      </div>

      <Separator className="mt-4" />
    </div>
  );
}
