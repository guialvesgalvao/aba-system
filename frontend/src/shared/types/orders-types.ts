export enum OrderStatusEnum {
  draft = "draft",
  in_progress = "in_progress",
  closed = "closed",
  canceled = "canceled"
}

export type OrderStatus = keyof typeof OrderStatusEnum;

export type OrderResponse = {
  id: number;
  client_id: number;
  origin_id: number;
  status: OrderStatusEnum;
  total_cost_value: number;
  total_sale_value: number;
  extra_details: string;
  order_date: string;
  invoicing_date: string;
  created_at: string;
  created_by: string;
  modified_by: string;
  modified_at: string;
};

export type OrderRequest = {
  id?: number;
  client_id: number;
  origin_id: number;
  status: OrderStatusEnum;
  total_cost_value: number;
  total_sale_value: number;
  extra_details?: string;
  order_date?: string;
  invoicing_date: string;
};
