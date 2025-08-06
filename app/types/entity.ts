import type React from "react";
import type { Permission } from "~/types/permission";

export type EntityIdType = React.Key;
export type EntityQueryFieldType = string | number | boolean | undefined | null;

export interface EntityConfig {
  name: string; // 实体名称
  baseUrl: string; // 实体基础路径
  entityIdField?: string; // 实体ID字段
  permissions: {
    query?: Permission;
    create?: Permission;
    update?: Permission;
    delete?: Permission;
  };
}

export interface EntityQuery {
  [key: string]: EntityQueryFieldType;
}

export interface EntityResponse<Id extends EntityIdType = string> {
  id: Id;
}

export interface EntityRequest {}

export interface EntityCreateRequest extends EntityRequest {}

export interface EntityUpdateRequest<Id extends EntityIdType>
  extends EntityRequest {
  id: Id;
}

export interface EntityDeleteRequest<Id extends EntityIdType>
  extends EntityRequest {
  id?: Id;
  ids?: Id[];
}
