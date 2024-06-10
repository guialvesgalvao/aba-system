export type ProductStatus = "enabled" | "draft" | "archived";

export type ProductModel = {
  id: number;
  title: string;
  description?: string;
  active: ProductStatus;
  created_at: string;
  updated_at: string;
};

export type ProductFormRequestModel = {
  title: string;
  description?: string;
  active: ProductStatus;
};
