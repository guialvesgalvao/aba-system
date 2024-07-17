export enum DeliveryPersonStatusEnum {
  enabled = "enabled",
  draft = "draft",
  archived = "archived",
}

export type DeliveryPersonStatus = keyof typeof DeliveryPersonStatusEnum;

export type DeliveryPersonResponse = {
  id: number;
  name: string;
  status: DeliveryPersonStatus;
  created_at: string;
  created_by: string;
  modified_by: string;
  modified_at: string;
};

export type DeliveryPersonRequest = {
  id?: number;
  name: string;
  status: DeliveryPersonStatus;
};
