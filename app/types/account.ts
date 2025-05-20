import type {
  EntityCreateRequest,
  EntityQuery,
  EntityResponse,
} from "~/types/entity";

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
  countryCode: string;
  provinceCode: string;
  cityCode: string;
  nationCode: string;
  genderCode: string;
  idCard: string;
  languageCode: string;
  postalCode: string;
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
