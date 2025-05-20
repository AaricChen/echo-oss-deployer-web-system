export type EntityIdType = string | number;
export type EntityQueryFieldType = string | number | boolean | undefined | null;

export interface EntityConfig {
  name: string; // 实体名称
  baseUrl: string; // 实体基础路径
  entityIdField?: string; // 实体ID字段
}

export interface EntityQuery {
  [key: string]: EntityQueryFieldType;
}

export interface EntityResponse<Id extends EntityIdType> {
  id: Id;
}

export interface EntityCreateRequest {}

export interface EntityUpdateRequest<Id extends EntityIdType> {
  id: Id;
}

export interface EntityDeleteRequest<Id extends EntityIdType> {
  id?: Id;
  ids?: Id[];
}
