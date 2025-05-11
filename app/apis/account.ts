import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { useGet } from "~/hooks/http";
import type { CurrentAccountResponse } from "~/types/account";

export function useCurrentAccount() {
  const navigate = useNavigate();
  const location = useLocation();

  const result = useGet<CurrentAccountResponse>({
    queryKey: ["current-account"],
    url: "/accounts/current",
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
