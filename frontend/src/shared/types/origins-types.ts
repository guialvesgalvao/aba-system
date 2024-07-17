export enum OriginStatusEnum {
  enabled = "enabled",
  draft = "draft",
  archived = "archived",
}

export type OriginStatus = keyof typeof OriginStatusEnum;

export type OriginResponse = {
  id: number;
  name: string;
  status: OriginStatus;
  created_at: string;
  created_by: string;
  modified_by: string;
  modified_at: string;
};

export type OriginRequest = {
  id?: number;
  name: string;
  status: OriginStatus;
};
