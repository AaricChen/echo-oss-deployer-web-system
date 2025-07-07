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
