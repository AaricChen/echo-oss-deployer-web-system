import type { BoolStatus, SecurityScope } from "~/types/common";
import type {
  EntityConfig,
  EntityCreateRequest,
  EntityDeleteRequest,
  EntityQuery,
  EntityResponse,
  EntityUpdateRequest,
} from "~/types/entity";

export interface PermissionResponse extends EntityResponse<string> {
  key: string;
  id: string;
  name: string;
  children: PermissionResponse[];
}

export const PermissionGroupEntity: EntityConfig = {
  name: "权限组",
  baseUrl: "/permission/group",
  permissions: {
    query: "system.permission-group:query",
    create: "system.permission-group:create",
    update: "system.permission-group:update",
    delete: "system.permission-group:delete",
  },
};

export interface PermissionGroupQuery extends EntityQuery {
  name?: string;
  scope?: keyof typeof SecurityScope;
  status?: keyof typeof BoolStatus;
  root?: boolean;
}

export interface PermissionGroupResponse extends EntityResponse<string> {
  id: string;
  name: string;
  scope: keyof typeof SecurityScope;
  type: keyof typeof PermissionGroupType;
  status: keyof typeof BoolStatus;
  children: PermissionGroupResponse[];
  permissions: string[];
}

export interface PermissionGroupCreateRequest extends EntityCreateRequest {
  tenant: string;
  name: string;
  scope: keyof typeof SecurityScope;
  status: keyof typeof BoolStatus;
  parent?: string;
  permissions: string[];
}

export interface PermissionGroupUpdateRequest
  extends EntityUpdateRequest<string> {
  name: string;
  status: keyof typeof BoolStatus;
  parent?: string;
  permissions: string[];
}

export interface PermissionGroupDeleteRequest
  extends EntityDeleteRequest<string> {}

export const PermissionGroupType = {
  SYSTEM: {
    text: "系统权限组",
    status: "default",
  },
  ACCOUNT: {
    text: "账户权限组",
    status: "success",
  },
};

export const PermissionGroupStatus = {
  Y: {
    text: "启用",
    status: "success",
  },
  N: {
    text: "禁用",
    status: "error",
  },
};

export type Permission = keyof typeof SystemPermissions;

export const SystemPermissions = {
  "system.account-department:update": {
    name: "修改账户部门",
    scope: "SYSTEM",
    status: "Y",
  },
  "system.account-role:update": {
    name: "修改账户角色",
    scope: "SYSTEM",
    status: "Y",
  },
  "system.account:create": {
    name: "创建账户",
    scope: "SYSTEM",
    status: "Y",
  },
  "system.account:delete": {
    name: "删除账户",
    scope: "SYSTEM",
    status: "Y",
  },
  "system.account:query": {
    name: "查询账户",
    scope: "SYSTEM",
    status: "Y",
  },
  "system.account:update": {
    name: "修改账户资料",
    scope: "SYSTEM",
    status: "Y",
  },
  "system.auth-identity:create": {
    name: "创建账户认证凭据",
    scope: "SYSTEM",
    status: "Y",
  },
  "system.auth-identity:delete": {
    name: "删除账户认证凭据",
    scope: "SYSTEM",
    status: "Y",
  },
  "system.auth-identity:query": {
    name: "查询账户认证凭据",
    scope: "SYSTEM",
    status: "Y",
  },
  "system.auth-identity:update": {
    name: "修改账户认证凭据",
    scope: "SYSTEM",
    status: "Y",
  },
  "system.department:create": {
    name: "创建部门",
    scope: "SYSTEM",
    status: "Y",
  },
  "system.department:delete": {
    name: "删除部门",
    scope: "SYSTEM",
    status: "Y",
  },
  "system.department:query": {
    name: "查询部门",
    scope: "SYSTEM",
    status: "Y",
  },
  "system.department:update": {
    name: "修改部门",
    scope: "SYSTEM",
    status: "Y",
  },
  "system.district:create": {
    name: "创建行政区",
    scope: "SYSTEM",
    status: "Y",
  },
  "system.district:delete": {
    name: "删除行政区",
    scope: "SYSTEM",
    status: "Y",
  },
  "system.district:query": {
    name: "查询行政区",
    scope: "SYSTEM",
    status: "Y",
  },
  "system.district:reset": {
    name: "重置行政区",
    scope: "SYSTEM",
    status: "Y",
  },
  "system.permission-group:create": {
    name: "创建权限组",
    scope: "SYSTEM",
    status: "Y",
  },
  "system.permission-group:delete": {
    name: "删除权限组",
    scope: "SYSTEM",
    status: "Y",
  },
  "system.permission-group:query": {
    name: "查询权限组",
    scope: "SYSTEM",
    status: "Y",
  },
  "system.permission-group:update": {
    name: "修改权限组",
    scope: "SYSTEM",
    status: "Y",
  },
  "system.permission:query": {
    name: "查询权限",
    scope: "SYSTEM",
    status: "Y",
  },
  "system.role:create": {
    name: "创建角色",
    scope: "SYSTEM",
    status: "Y",
  },
  "system.role:delete": {
    name: "删除角色",
    scope: "SYSTEM",
    status: "Y",
  },
  "system.role:query": {
    name: "查询角色",
    scope: "SYSTEM",
    status: "Y",
  },
  "system.role:update": {
    name: "修改角色",
    scope: "SYSTEM",
    status: "Y",
  },
  "system.system-dict-item:create": {
    name: "创建系统字典项",
    scope: "SYSTEM",
    status: "Y",
  },
  "system.system-dict-item:delete": {
    name: "删除系统字典项",
    scope: "SYSTEM",
    status: "Y",
  },
  "system.system-dict-item:query": {
    name: "查询系统字典项",
    scope: "SYSTEM",
    status: "Y",
  },
  "system.system-dict-item:update": {
    name: "修改系统字典项",
    scope: "SYSTEM",
    status: "Y",
  },
  "system.system-dict:query": {
    name: "查询系统字典",
    scope: "SYSTEM",
    status: "Y",
  },
  "system.system-dict:reset": {
    name: "重置系统字典",
    scope: "SYSTEM",
    status: "Y",
  },
  "system.system-log:query": {
    name: "查询系统日志",
    scope: "SYSTEM",
    status: "Y",
  },
  "system.system-property:query": {
    name: "查询系统属性",
    scope: "SYSTEM",
    status: "Y",
  },
  "system.system-property:update": {
    name: "修改系统属性",
    scope: "SYSTEM",
    status: "Y",
  },
  "system.tenant:create": {
    name: "创建租户",
    scope: "SYSTEM",
    status: "Y",
  },
  "system.tenant:delete": {
    name: "删除租户",
    scope: "SYSTEM",
    status: "Y",
  },
  "system.tenant:query": {
    name: "查询租户",
    scope: "SYSTEM",
    status: "Y",
  },
  "system.tenant:update": {
    name: "修改租户",
    scope: "SYSTEM",
    status: "Y",
  },
};
