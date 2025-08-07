import type React from "react";

export type EntityIdType = React.Key;
export type EntityQueryFieldType =
  | string
  | number
  | boolean
  | string[]
  | number[]
  | undefined
  | null;

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
