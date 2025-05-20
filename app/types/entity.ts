export type EntityIdType = string | number;
export type EntityQueryFieldType = string | number | boolean | undefined | null;

export interface EntityQuery {
  content?: string;
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
