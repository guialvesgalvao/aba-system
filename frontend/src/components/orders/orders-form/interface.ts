import { z } from "zod";

// OrderProductsValidation is a zod schema for the order products validation
export const OrderProductsValidation = z.object({
  supplier_id: z.number({
    required_error: "Selecione o fornecedor do produto",
  }),
  product_id: z.number({
    required_error: "Selecione o produto",
  }),
  quantity: z.coerce
    .number({
      required_error: "Adicione a quantidade do produto",
    })
    .positive("A quantidade do produto deve ser um número positivo"),
  price: z.coerce
    .number({
      required_error: "Adicione o preço do produto",
    })
    .positive("O preço do produto deve ser um número positivo"),
});

export type OrderProductsValidationType = z.infer<
  typeof OrderProductsValidation
>;

// OrdersFormValidation is a zod schema for the orders form validation
export const OrdersFormValidation = z.object({
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

  products: z
    .array(OrderProductsValidation, {
      required_error: "Adicione pelo menos um produto ao pedido",
    })
    .min(1, "Adicione pelo menos um produto ao pedido"),
});

export type OrdersFormValidationType = z.infer<typeof OrdersFormValidation>;
