import type {
  EntityCreateRequest,
  EntityDeleteRequest,
  EntityQuery,
  EntityResponse,
  EntityUpdateRequest,
} from "~/types/entity";

export interface DistrictQuery extends EntityQuery {
  name?: string;
  parent?: number;
  disabled?: boolean;
  root?: boolean;
}

export interface DistrictResponse extends EntityResponse<string> {
  parent?: string;
  name: string;
  path: string;
  level: number;
  disabled: boolean;
}

export interface DistrictCreateRequest extends EntityCreateRequest {
  id: string;
  name: string;
  parent?: string;
  disabled: boolean;
}

export type DistrictUpdateRequest = DistrictCreateRequest &
  EntityUpdateRequest<string>;

export interface DistrictDeleteRequest extends EntityDeleteRequest<string> {}
