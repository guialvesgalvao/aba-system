export enum ProductStatusEnum {
  enabled = "enabled",
  draft = "draft",
  archived = "archived",
}

export type ProductStatus = keyof typeof ProductStatusEnum;

export type ProductResponse = {
  id: number;
  name: string;
  image?: string;
  description?: string;
  status: ProductStatus;
  created_at: string;
  created_by: string;
  modified_by: string;
  modified_at: string;
};

export type ProductRequest = {
  id?: number;
  name: string;
  image?: string;
  description?: string;
  status: ProductStatus;
};
