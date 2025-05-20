import type { DataScope } from "~/types/account";
import type {
  EntityConfig,
  EntityCreateRequest,
  EntityDeleteRequest,
  EntityQuery,
  EntityResponse,
  EntityUpdateRequest,
} from "~/types/entity";

export const RoleEntity: EntityConfig = {
  name: "角色",
  baseUrl: "/role",
};

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

export type RoleUpdateRequest = RoleCreateRequest & EntityUpdateRequest<string>;

export interface RoleDeleteRequest extends EntityDeleteRequest<string> {}
