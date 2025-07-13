import type { SecurityScope } from "~/types/common";
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
  permissions: {
    query: "system.role:query",
    create: "system.role:create",
    update: "system.role:update",
    delete: "system.role:delete",
  },
};

export interface RoleQuery extends EntityQuery {
  tenant?: string;
  department?: string;
  scope?: keyof typeof SecurityScope;
  name?: string;
  remark?: string;
}

export interface RoleResponse extends EntityResponse<string> {
  id: string;
  tenant?: string;
  department?: string;
  scope?: keyof typeof SecurityScope;
  name?: string;
  remark?: string;
  dataScopes?: DataScopeResponse[];
  permissions: string[];
  permissionGroups: string[];
}

export interface RoleCreateRequest extends EntityCreateRequest {
  tenant?: string;
  department?: string;
  scope: keyof typeof SecurityScope;
  name: string;
  remark?: string;
  dataScopes?: DataScopeRequest[];
  permissions?: string[];
  permissionGroups?: string[];
}

export interface RoleUpdateRequest extends EntityUpdateRequest<string> {
  department?: string;
  name: string;
  remark?: string;
  dataScopes?: DataScopeRequest[];
  permissions?: string[];
  permissionGroups?: string[];
}

export interface RoleDeleteRequest extends EntityDeleteRequest<string> {}

export interface DataScopeRequest {
  entities: DataScopeEntity[];
  level: keyof typeof DataScopeLevel;
  departments: string[];
}

export interface DataScopeResponse {
  entities: DataScopeEntity[];
  level: keyof typeof DataScopeLevel;
  departments: string[];
}

export interface DataScopeEntity {
  value: string;
  label: string;
}

export const DataScopeLevel = {
  ALL: {
    text: "所有部门",
  },
  DEPARTMENT_AND_LOWER: {
    text: "本部门及下级部门",
  },
  DEPARTMENT_ONLY: {
    text: "仅本部门",
  },
  CUSTOM: {
    text: "自定义部门",
  },
  ACCOUNT_SELF: {
    text: "本账户",
  },
};
