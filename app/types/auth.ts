import type {
  EntityConfig,
  EntityCreateRequest,
  EntityDeleteRequest,
  EntityQuery,
  EntityResponse,
  EntityUpdateRequest,
} from "~/types/entity";

export interface LoginRequest {
  type: AuthenticationType;
  tenant?: string; // 租户代码
  identity: string; // 凭据标识
  credential: string; // 认证凭据
}

export interface LoginResponse {
  type: AuthenticationType;
  accessToken: string;
  refreshToken: string;
}

export enum AuthenticationType {
  USERNAME = "USERNAME",
}

export const AuthIdentityEntity: EntityConfig = {
  name: "认证凭据",
  baseUrl: "/auth/identity",
};

export interface AuthIdentityQuery extends EntityQuery {
  account?: string; // 所属账户
  tenant?: string; // 所属租户
  type?: keyof typeof AuthIdentityType; // 凭据类型
  identity?: string; // 凭据标识
}

export interface AuthIdentityResponse extends EntityResponse<string> {
  id: string; // ID
  type: keyof typeof AuthIdentityType; // 凭据类型
  identity: string; // 凭据标识
  credential: string; // 凭证
}

export interface AuthIdentityCreateRequest extends EntityCreateRequest {
  account: string; // 所属账户
  type: keyof typeof AuthIdentityType; // 凭据类型
  identity?: string; // 凭据标识
  credential?: string; // 凭证
}

export interface AuthIdentityUpdateRequest extends EntityUpdateRequest<string> {
  identity?: string; // 凭据标识
  credential?: string; // 凭证
}

export interface AuthIdentityDeleteRequest
  extends EntityDeleteRequest<string> {}

export const AuthIdentityType = {
  USERNAME: {
    text: "用户名密码凭据",
  },
};
