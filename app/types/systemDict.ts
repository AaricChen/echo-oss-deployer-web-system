import type { EntityConfig, EntityQuery, EntityResponse } from "~/types/entity";

export const SystemDictEntity: EntityConfig = {
  name: "系统字典",
  baseUrl: "/system/dict",
  permissions: {
    query: "system.system-dict:query",
  },
};

export interface SystemDictQuery extends EntityQuery {
  name?: string;
}

export interface SystemDictResponse extends EntityResponse<string> {
  id: string;
  name: string;
  items: number;
}

export interface SystemDictItemQuery extends EntityQuery {
  dict: string;
  name?: string;
  code?: string;
}

export interface SystemDictItemResponse extends EntityResponse<string> {
  id: string;
  name: string;
  code: string;
}
