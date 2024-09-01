import { RenderForm } from "@/components/render-form/render-form";
import { useToast } from "@/components/ui/use-toast";
import { ErrorToastList } from "@/components/utilities/error-toast-list";
import { errorsAsStringMessages } from "@/shared/helpers/form-helper/form-helper";

import { FieldErrors } from "react-hook-form";
import { z } from "zod";
import { OrdersFormBody } from "./orders-form-body";
import { OnRenderProps } from "@/components/render-form/interface";

const OrdersFormValidation = z.object({
  id: z.number().optional(),

  title: z.string({
    required_error: "Adicione um título ao pedido",
  }),

  client_id: z.number({
    required_error: "Selecione o cliente do pedido",
  }),
  origin_id: z.number({
    required_error: "Selecione a origem do pedido",
  }),

  order_date: z.string({
    required_error: "Adicione a data do pedido",
  }),
  order_payment_date: z.string({
    required_error: "Adicione a data de faturamento",
  }),

  description: z.string().optional(),
});

export type OrdersFormValidationType = z.infer<typeof OrdersFormValidation>;

export function OrdersForm() {
  const { toast } = useToast();

  async function handleSubmit(data: OrdersFormValidationType) {
    console.log(data);
  }

  function getDefaultValues() {
    return {
      order_date: new Date().toISOString(),
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
