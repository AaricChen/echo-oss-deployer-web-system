import type { SecurityScope } from "~/types/common";
import type { DistrictResponse } from "~/types/district";
import type {
  EntityConfig,
  EntityCreateRequest,
  EntityDeleteRequest,
  EntityQuery,
  EntityResponse,
  EntityUpdateRequest,
} from "~/types/entity";
import type { RoleResponse } from "~/types/role";
import type { SystemDictItemResponse } from "~/types/systemDict";

export type DataScope =
  | "ALL"
  | "DEPARTMENT_AND_LOWER"
  | "DEPARTMENT_ONLY"
  | "CUSTOM"
  | "SELF";

export const AccountEntity: EntityConfig = {
  name: "系统账户",
  baseUrl: "/account",
};

export interface AccountQuery extends EntityQuery {
  /** 所属租户 */
  tenant?: string;
  /** 账户安全域 */
  scope?: keyof typeof SecurityScope;
  /** 账户状态 */
  status?: keyof typeof AccountStatus;
  /** 用户名模糊搜索 */
  username?: string;
  /** 邮箱模糊搜索 */
  email?: string;
  /** 手机号模糊搜索 */
  phone?: string;
  /** 账号禁用状态 */
  disabled?: boolean;
  /** 是否为管理员 */
  admin?: boolean;
  /** 账户资料模糊搜索 */
  info?: string;
}

export interface AccountResponse extends EntityResponse<string> {
  /** 账户ID */
  id: string;
  /** 所属租户 */
  tenant?: string;
  /** 账户安全域 */
  scope: keyof typeof SecurityScope;
  /** 账户状态 */
  status: keyof typeof AccountStatus;
  /** 账户基础信息 */
  accountInfo: AccountInfoResponse;
  /** 账户角色 */
  roles: RoleResponse[];
  /** 账户部门 */
  departments: string[];
  /** 是否为超级管理员 */
  admin: boolean;
  /** 上次登录时间 */
  authenticateAt: string;
  /** 创建时间 */
  createAt: string;
}

export interface AccountInfo {
  avatar: string;
  nickname: string;
  realname: string;
  address: string;
  bio: string;
  birthday: string;
  district: DistrictResponse;
  nation: SystemDictItemResponse;
  gender: SystemDictItemResponse;
  idCard: string;
  language: SystemDictItemResponse;
  remark: string;
}

export interface CurrentAccountResponse {
  /** 账户ID */
  id: string;
  /** 所属租户 */
  tenant?: string;
  /** 账户头像 */
  avatar: string;
  /** 账户昵称 */
  nickname: string;
  /** 是否为超级管理员 */
  admin: boolean;
  /** 账户权限列表 */
  permissions: string[];
}

export interface AccountCreateRequest extends EntityCreateRequest {
  /** 所属租户 */
  tenant?: string;
  /** 账户安全域 */
  scope: keyof typeof SecurityScope;
  /** 账户基础信息 */
  accountInfo?: AccountInfoRequest;
}

export interface AccountUpdateRequest extends EntityUpdateRequest<string> {}

export interface AccountDeleteRequest extends EntityDeleteRequest<string> {}

export interface AccountRoleUpdateRequest {
  id: string;
  roles: string[];
}

export interface AccountInfoRequest {
  /** 头像 */
  avatar: string;
  /** 昵称 */
  nickname: string;
  /** 姓名 */
  realname: string;
  /** 身份证 */
  idCard: string;
  /** 性别代码 */
  gender: number;
  /** 民族代码 */
  nation: number;
  /** 语言代码 */
  language: number;
  /** 行政区 */
  district: number;
  /** 地址 */
  address: string;
  /** 个性签名 */
  bio: string;
  /** 备注 */
  remark: string;
  /** 生日 */
  birthday: string;
}

export interface AccountInfoResponse extends AccountInfoRequest {}

export const AccountStatus = {
  Y: {
    text: "启用",
    status: "success",
  },
  N: {
    text: "禁用",
    status: "error",
  },
};
