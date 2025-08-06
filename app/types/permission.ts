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
  tenant?: string;
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
  "system.role:delete": "删除角色",
  "system.sms-record:create": "创建短信发送记录",
  "system.role:update": "修改角色",
  "system.permission-group:update": "修改权限组",
  "system.account:create": "创建账户",
  "system.auth-identity:create": "创建账户认证凭据",
  "system.permission-group:delete": "删除权限组",
  "system.department:delete": "删除部门",
  "system.resource-package:delete": "删除资源包",
  "system.email-record:update": "修改邮件发送记录",
  "system.resource-package:update": "修改资源包",
  "system.email-record:delete": "删除邮件发送记录",
  "system.system-dict-item:update": "修改系统字典项",
  "system.tenant-aliyun-config:delete": "删除租户",
  "system.tenant:update": "修改租户",
  "system.department:update": "修改部门",
  "system.role:create": "创建角色",
  "system.auth-identity:query": "查询账户认证凭据",
  "system.district:query": "查询行政区",
  "system.district:delete": "删除行政区",
  "system.sms-record:query": "查询短信发送记录",
  "system.resource-package:query": "查询资源包",
  "system.resource-package:create": "创建资源包",
  "system.role:query": "查询角色",
  "system.district:create": "创建行政区",
  "system.auth-identity:delete": "删除账户认证凭据",
  "system.auth-identity:update": "修改账户认证凭据",
  "system.account:query": "查询账户",
  "system.permission:query": "查询权限",
  "system.sms-record:delete": "删除短信发送记录",
  "system.tenant:create": "创建租户",
  "system.district:reset": "重置行政区",
  "system.permission-group:query": "查询权限组",
  "system.system-dict-item:delete": "删除系统字典项",
  "system.system-log:query": "查询系统日志",
  "system.permission-group:create": "创建权限组",
  "system.system-property:update": "修改系统属性",
  "system.account-update:role": "修改账户角色",
  "system.resource-package-record:query": "查询资源包使用记录",
  "system.account-update:department": "修改账户部门",
  "system.tenant:delete": "删除租户",
  "system.department:query": "查询部门",
  "system.department:create": "创建部门",
  "system.tenant-aliyun-config:update": "修改租户",
  "system.system-dict-item:create": "创建系统字典项",
  "system.system-dict:query": "查询系统字典",
  "system.system-property:query": "查询系统属性",
  "system.account:update": "修改账户资料",
  "system.sms-record:update": "修改短信发送记录",
  "system.tenant-aliyun-config:create": "创建租户",
  "system.tenant:query": "查询租户",
  "system.email-record:create": "创建邮件发送记录",
  "system.tenant-aliyun-config:query": "查询租户",
  "system.system-dict:reset": "重置系统字典",
  "system.email-record:query": "查询邮件发送记录",
};
