import { FormSectionTitle } from "@/components/utilities/form-section-title";
import { OrdersFormColumns } from "./orders-form-columns";
import { OrdersFormButtons } from "./orders-form-buttons";
import { UseFormReturn } from "react-hook-form";
import { OrdersFormValidationType } from "./orders-form";

interface IOrdersFormColumnsProps {
  form: UseFormReturn<OrdersFormValidationType, any, undefined>;
}

export function OrdersFormBody(props: Readonly<IOrdersFormColumnsProps>) {
  const { form } = props;
  const { control } = form;

  return (
    <div className="h-full flex flex-col gap-6">
      <OrdersFormColumns control={control} />
      <FormSectionTitle title="Produtos" />
      <OrdersFormButtons form={form} />
    </div>
  );
}
