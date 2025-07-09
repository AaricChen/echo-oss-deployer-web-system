import { useGet } from "~/hooks/http";
import type { TenantBasicQuery, TenantBasicResponse } from "~/types/tenant";

export function useTenantBasicInfo({ code, domain }: TenantBasicQuery) {
  return useGet<TenantBasicResponse, TenantBasicQuery>({
    url: "/tenant/basic",
    queryKey: ["tenant", "basic", code, domain],
    params: { code, domain },
    options: {
      enabled: !!code || !!domain,
    },
  });
}
