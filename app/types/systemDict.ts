import type {
  EntityConfig,
  EntityCreateRequest,
  EntityQuery,
  EntityResponse,
} from "~/types/entity";

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
  dict?: string;
  name?: string;
  code?: string;
}

export interface SystemDictItemCreateRequest extends EntityCreateRequest {
  dict: string; // 所属字典
  name: string; // 字典项名称
  code: string; // 字典项代码
  sequence?: number; // 排序
  parent?: string; // 父项
}

export interface SystemDictItemResponse extends EntityResponse<string> {
  id: string;
  dict: string;
  name: string;
  code: string;
}
