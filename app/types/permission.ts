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
  permissions: PermissionResponse[];
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
  },
  ACCOUNT: {
    text: "账户权限组",
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
