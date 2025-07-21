import type {
  EntityConfig,
  EntityCreateRequest,
  EntityDeleteRequest,
  EntityQuery,
  EntityResponse,
  EntityUpdateRequest,
} from "~/types/entity";

export interface AuthRequest {
  type: keyof typeof AuthenticationType;
  tenant?: string; // 租户代码
  identity: string; // 凭据标识
  credential: string; // 认证凭据
  message?: string; // 密码学认证消息
}

export interface AuthResponse {
  type: keyof typeof AuthenticationType;
  accessToken: string;
  refreshToken: string;
}

export interface AuthenticationConfigResponse {
  /** 用户名密码认证 */
  usernameAuthentication: boolean;
  /** 手机号验证码认证 */
  phoneCaptchaAuthentication: boolean;
  /** 邮箱验证码认证 */
  emailCaptchaAuthentication: boolean;
  /** 密码学认证 */
  cryptoAuthentication: boolean;
}

export const AuthIdentityEntity: EntityConfig = {
  name: "认证凭据",
  baseUrl: "/auth/identity",
  permissions: {
    query: "system.auth-identity:query",
    create: "system.auth-identity:create",
    update: "system.auth-identity:update",
    delete: "system.auth-identity:delete",
  },
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

export const AuthenticationType = {
  USERNAME: {
    text: "账号密码登录",
  },
  PHONE_CAPTCHA: {
    text: "手机号登录",
  },
  EMAIL_CAPTCHA: {
    text: "邮箱登录",
  },
  CRYPTO: {
    text: "钱包登录",
  },
};

export const AuthIdentityType = {
  USERNAME: {
    text: "用户名密码凭据",
  },
  PHONE: {
    text: "手机号",
  },
  EMAIL: {
    text: "邮箱",
  },
  CRYPTO_ADDRESS: {
    text: "钱包地址",
  },
};
