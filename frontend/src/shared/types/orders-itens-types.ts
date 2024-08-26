export enum OrderItensStatusEnum {
  draft = "draft",
  awaitingSupplierConfirmation = "awaiting_supplier_confirmation",
  confirmedAwaitingProduction = "confirmed_awaiting_production",
  productionCompleteAwaitingCarrier = "production_complete_awaiting_carrier",
  pendingDeliveryToCarrier = "pending_delivery_to_carrier",
  pendingDeliveryToCustomer = "pending_delivery_to_customer",
  deliveredAwaitingBilling = "delivered_awaiting_billing",
  completed = "completed",
  canceled = "canceled"
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
  invoicing_id: number;
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
  invoicing_id: number;
  delivery_date: number;
  order_id: number;
  product_id: number;
  delivery_person_id: number;
  invoiced: boolean;
};
