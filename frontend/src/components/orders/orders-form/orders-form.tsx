import { RenderForm } from "@/components/render-form/render-form";
import { useToast } from "@/components/ui/use-toast";
import { ErrorToastList } from "@/components/utilities/error-toast-list";
import { errorsAsStringMessages } from "@/shared/helpers/form-helper/form-helper";

import { FieldErrors } from "react-hook-form";

import { OrdersFormBody } from "./orders-form-body";
import { OnRenderProps } from "@/components/render-form/interface";
import {
  OrderProductsValidationType,
  OrdersFormValidation,
  OrdersFormValidationType,
} from "./interface";

export function OrdersForm() {
  const { toast } = useToast();

  async function handleSubmit(data: OrdersFormValidationType) {
    console.log(data);
  }

  function getDefaultValues(): Partial<OrdersFormValidationType> {
    const initialProducts = [{} as OrderProductsValidationType];

    return {
      order_date: new Date().toISOString(),
      products: initialProducts,
    };
  }

  function notifyErrorsByToast(errors: FieldErrors<OrdersFormValidationType>) {
    const messages = errorsAsStringMessages(errors);

    toast({
      title: "Não foi possível criar o pedido de compra",
      description: <ErrorToastList errors={messages} />,
      variant: "destructive",
      duration: 2000,
    });
  }

  function validateFormData(data: OrdersFormValidationType) {
    OrdersFormValidation.parse(data);
  }

  return (
    <RenderForm<OrdersFormValidationType>
      resolver={OrdersFormValidation}
      getDefaultValues={getDefaultValues}
      onValidate={validateFormData}
      onInvalid={notifyErrorsByToast}
      onSubmit={handleSubmit}
      onRender={OrdersFormRender}
    />
  );
}

function OrdersFormRender({
  form,
}: Readonly<OnRenderProps<OrdersFormValidationType>>) {
  return <OrdersFormBody form={form} />;
}
