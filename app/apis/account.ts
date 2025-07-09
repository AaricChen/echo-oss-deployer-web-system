import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { useGet, useHttpMutation, usePut } from "~/hooks/http";
import type {
  AccountInfo,
  AccountResponse,
  AccountRoleUpdateRequest,
  CurrentAccountResponse,
} from "~/types/account";

export function useCurrentAccount() {
  const navigate = useNavigate();
  const location = useLocation();

  const result = useGet<CurrentAccountResponse>({
    queryKey: ["current-account"],
    url: "/account/current",
    options: {
      ignoreError: true,
    },
  });

  useEffect(() => {
    if (result.isError) {
      navigate(`/login?redirect=${location.pathname}`);
    }
  }, [result]);

  return result;
}

export function useUpdateAccountRole() {
  return usePut<AccountRoleUpdateRequest, AccountResponse>({
    url: (request) => `/account/${request.id}/role`,
    action: "分配角色",
  });
}

export function useCurrentAccountInfo() {
  return useHttpMutation<void, AccountInfo>({
    url: "/account/current/info",
    method: "GET",
  });
}

export function useUpdateCurrentAccountInfo() {
  return usePut<AccountInfo, AccountResponse>({
    url: "/account/current/info",
    action: "更新基本资料",
  });
}
