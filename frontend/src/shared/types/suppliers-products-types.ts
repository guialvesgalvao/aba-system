import { ProductResponse } from "./products-types";

export type SupplierProductResponse = {
  id: number;
  validity_period: number;
  value: number;
  product_id: number;
  supplier_id: number;
  created_at: string;
  created_by: string;
  modified_by: string;
  modified_at: string;
};

export type SupplierProductRequest = {
  id?: number;
  validity_period: number;
  value: number;
  product_id: number;
  supplier_id: number;
};

export type SupplierProductExtendedResponse = SupplierProductResponse & {
  product_info: ProductResponse;
  actions?: Element;
};