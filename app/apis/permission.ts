import { useGet } from "~/hooks/http";
import type { SecurityScope } from "~/types/common";

import type { PermissionResponse } from "~/types/permission";

export function useGetPermissions(scope?: keyof typeof SecurityScope) {
  return useGet<PermissionResponse[]>({
    queryKey: ["permissions"],
    url: "/permission",
    params: {
      scope,
    },
    options: {
      enabled: !!scope,
    },
  });
}
