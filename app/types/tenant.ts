import type {
  EntityConfig,
  EntityCreateRequest,
  EntityDeleteRequest,
  EntityQuery,
  EntityResponse,
  EntityUpdateRequest,
} from "~/types/entity";

export const TenantEntity: EntityConfig = {
  name: "租户",
  baseUrl: "/tenant",
};

export interface TenantQuery extends EntityQuery {}

export interface TenantResponse extends EntityResponse<string> {
  id: string;
  code: string;
  domains: { domain: string }[];
  tenantInfo: TenantInfoRequest;
  tenantConfig: TenantConfigRequest;
}

export interface TenantCreateRequest extends EntityCreateRequest {
  code: string;
  domains: { domain: string }[];
  tenantInfo: TenantInfoRequest;
  tenantConfig: TenantConfigRequest;
}

export type TenantUpdateRequest = TenantCreateRequest &
  EntityUpdateRequest<string>;

export interface TenantDeleteRequest extends EntityDeleteRequest<string> {}

export interface TenantInfoRequest {
  name: string;
  logo?: string;
  remark?: string;
  language?: string;
  district?: number;
}

export interface TenantConfigRequest {
  /**
   * 如果设置了开始时间，则在开始时间之后才能认证账户
   */
  startAt?: string;

  /**
   * 如果设置了结束时间，则在结束时间之前才能认证账户
   */
  endAt?: string;

  /**
   * 该租户下最大账户的创建数量，为空表示不限制
   */
  maxAccountCount?: number;

  /**
   * 该租户下最多创建的部门数量，为空表示不限制
   */
  maxDepartmentCount?: number;

  /**
   * 该租户下部门的最大层级，为空表示不限制
   */
  maxDepartmentLevel?: number;

  /**
   * 该租户下用户最多可以创建的权限组数量，为空表示不限制
   */
  maxPermissionGroupCount?: number;

  /**
   * 包括所有部门创建的角色，为空表示不限制
   */
  maxRoleCount?: number;
}

export const TenantStatus = {
  Y: {
    text: "启用",
    status: "success",
  },
  N: {
    text: "禁用",
    status: "error",
  },
  Archive: {
    text: "归档",
    status: "default",
  },
};
