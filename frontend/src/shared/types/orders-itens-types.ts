export enum OrderItensStatusEnum {
  enabled = "enabled",
  draft = "draft",
  archived = "archived",
}

export type OrderItensStatus = keyof typeof OrderItensStatusEnum;

export type OrderItensResponse = {
  id: number;
  cost_value: number;
  quantity: number;
  status: OrderItensStatus;
  sale_value: number;
  delivery_date: number;
  order_id: number;
  product_id: number;
  delivery_person_id: number;
  invoiced: boolean;
  created_at: string;
  created_by: string;
  modified_by: string;
  modified_at: string;
};

export type OrderItensRequest = {
  id?: number;
  cost_value: number;
  quantity: number;
  status: OrderItensStatus;
  sale_value: number;
  delivery_date: number;
  order_id: number;
  product_id: number;
  delivery_person_id: number;
  invoiced: boolean;
};
