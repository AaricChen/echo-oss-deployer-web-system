import type {
  EntityConfig,
  EntityCreateRequest,
  EntityDeleteRequest,
  EntityQuery,
  EntityResponse,
} from "~/types/entity";
import type { SystemDictItemResponse } from "~/types/systemDict";

export type DataScope =
  | "ALL"
  | "DEPARTMENT_AND_LOWER"
  | "DEPARTMENT_ONLY"
  | "CUSTOM"
  | "SELF";

export const AccountEntity: EntityConfig = {
  name: "账户",
  baseUrl: "/account",
};

export interface AccountQuery extends EntityQuery {
  search?: string;
  department?: number;
}

export interface AccountResponse extends EntityResponse<string> {
  id: string;
  admin: boolean;
  disabled: boolean;
  email: string;
  phone: string;
  loginAt: string;
  permissions: string[];
  roles: string[];
  departments: string[];
  accountInfo: AccountInfo;
}

export interface AccountInfo {
  avatar: string;
  nickname: string;
  realname: string;
  address: string;
  bio: string;
  birthday: string;
  country: string;
  province: string;
  city: string;
  nation: SystemDictItemResponse;
  gender: SystemDictItemResponse;
  idCard: string;
  language: SystemDictItemResponse;
  remark: string;
}

export interface CurrentAccountResponse {
  nickname: string;
  avatar: string;
}

export interface AccountCreateRequest extends EntityCreateRequest {
  department: number | null;
  username: string;
  password: string;
  passwordConfirm: string;
}

export interface AccountUpdateRequest extends AccountResponse {}

export interface AccountDeleteRequest extends EntityDeleteRequest<string> {}

export interface AccountInfoUpdateRequest {
  id: string;
  avatar: string;
  nickname: string;
  realname: string;
  address: string;
  bio: string;
  birthday: string;
  country: string;
  province: string;
  city: string;
  nation: string;
  gender: string;
  idCard: string;
  language: string;
  remark: string;
}

export interface AccountPasswordUpdateRequest {
  id: string;
  password: string;
}
