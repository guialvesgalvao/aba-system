export enum ProductStatusEnum {
  enabled = "enabled",
  draft = "draft",
  archived = "archived",
}

export type ProductStatus = keyof typeof ProductStatusEnum;

export type ProductModel = {
  image?: string;
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
