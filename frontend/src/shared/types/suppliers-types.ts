export enum SupplierStatusEnum {
  enabled = "enabled",
  draft = "draft",
  archived = "archived",
}

export type SupplierStatus = keyof typeof SupplierStatusEnum;

export type SupplierResponse = {
  id: number;
  name: string;
  status: SupplierStatus;
  cnpj: string;
  automatic_invoicing: boolean;
  supplier_products: string;
  created_at: string;
  created_by: string;
  modified_by: string;
  modified_at: string;
};

export type SupplierRequest = {
  id?: number;
  name: string;
  cnpj: string;
  automatic_invoicing: boolean;
  status: SupplierStatus;
};
