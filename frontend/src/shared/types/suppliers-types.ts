import { ProductResponse } from "./products-types";

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

export type SupplierWithProductResponse = {
  id: number;
  validity_period: number;
  value: number;
  product_id: number;
  supplier_id: number;
  created_at: string;
  created_by: string;
  modified_by: string;
  modified_at: string;
  product?: ProductResponse; // Adiciona o produto como opcional
};

export type SupplierIntregratedResponse = {
  id: number;
  name: string;
  status: SupplierStatus;
  cnpj: string;
  automatic_invoicing: boolean;
  supplier_products?: SupplierWithProductResponse[]; // Adiciona supplier_products como opcional
  created_at: string;
  created_by: string;
  modified_by: string;
  modified_at: string;
}