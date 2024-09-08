import { FormSectionTitle } from "@/components/utilities/form-section-title";
import { OrdersFormColumns } from "./orders-form-columns";
import { OrdersFormButtons } from "./orders-form-buttons";
import { UseFormReturn } from "react-hook-form";
import { OrdersFormValidationType } from "./interface";
import { OrdersFormProducts } from "./orders-form-products";

interface IOrdersFormColumnsProps {
  form: UseFormReturn<OrdersFormValidationType, any, undefined>;
}

export function OrdersFormBody(props: Readonly<IOrdersFormColumnsProps>) {
  const { form } = props;
  const { control } = form;

  return (
    <div className="h-full flex flex-col gap-6">
      <OrdersFormColumns control={control} />

      <FormSectionTitle title="Unidades" />

      <div className="flex flex-col gap-12">
        <OrdersFormProducts form={form} />
        <OrdersFormButtons form={form} />
      </div>
    </div>
  );
}
