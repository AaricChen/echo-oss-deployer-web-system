import type { DataScope } from "~/types/account";
import type {
  EntityCreateRequest,
  EntityQuery,
  EntityResponse,
} from "~/types/entity";

export interface RoleQuery extends EntityQuery {}

export interface RoleResponse extends EntityResponse<string> {
  id: string;
  name: string;
  remark: string;
  dataScope: DataScope;
  permissions: string[];
  departments: string[];
}

export interface RoleCreateRequest extends EntityCreateRequest {
  name: string;
  remark: string;
  dataScope: DataScope;
  permissions: string[];
  departments: string[];
}

export interface RoleUpdateRequest extends RoleResponse {}
