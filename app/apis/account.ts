import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { useGet, usePut } from "~/hooks/http";
import type {
  AccountInfoUpdateRequest,
  AccountResponse,
  CurrentAccountResponse,
} from "~/types/account";

export function useCurrentAccount() {
  const navigate = useNavigate();
  const location = useLocation();

  const result = useGet<CurrentAccountResponse>({
    queryKey: ["current-account"],
    url: "/account/current",
    options: {
      retry: false,
    },
  });

  useEffect(() => {
    if (result.isError) {
      navigate(`/login?redirect=${location.pathname}`);
    }
  }, [result]);

  return result;
}

export function useUpdateAccountInfo() {
  return usePut<AccountInfoUpdateRequest, AccountResponse>({
    url: (request) => `/account/${request.id}/info`,
    action: "更新基本资料",
  });
}
