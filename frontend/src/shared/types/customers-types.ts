export enum CustomerStatusEnum {
  enabled = "enabled",
  draft = "draft",
  archived = "archived",
}

export type CustomerStatus = keyof typeof CustomerStatusEnum;

export type CustomerResponse = {
  id: number;
  fantasy_name: string;
  cnpj: string;
  state_registration: string;
  complete_address: string;
  delivery_address: string;
  status: CustomerStatus;
  created_at: string;
  created_by: string;
  modified_by: string;
  modified_at: string;
};

export type CustomerRequest = {
  id?: number;
  fantasy_name: string;
  cnpj?: string;
  state_registration?: string;
  complete_address?: string;
  delivery_address?: string;
  status: CustomerStatus;
};
