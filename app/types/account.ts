import type {
  EntityCreateRequest,
  EntityQuery,
  EntityResponse,
} from "~/types/entity";

export interface AccountQuery extends EntityQuery {
  search?: string;
  department?: number;
}

export interface AccountEntity extends EntityResponse<string> {
  admin: boolean;
  enabled: boolean;
  authorities: string[];
  displayName: string;
  avatar: string;
  email: string;
  identity: string;
  language: string;
  location: string;
  name: string;
  nation: string;
  nickname: string;
  username: string;
  address: string;
  bio: string;
  mobile: string;
  province: string;
  city: string;
  country: string;
  birthday: string;
  sex: string;
  remark: string;
  createAt: string;
  loginAt: string;
  roles: [];
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

export interface AccountUpdateRequest extends AccountEntity {}
