export enum OrderStatusEnum {
  enabled = "enabled",
  draft = "draft",
  archived = "archived",
}

export type OrderStatus = keyof typeof OrderStatusEnum;
