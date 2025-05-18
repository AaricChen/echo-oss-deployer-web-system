import { useGet } from "~/hooks/http";
import type { PermissionResponse } from "~/types/permission";

export function useGetPermissions() {
  return useGet<PermissionResponse>({
    queryKey: ["permissions"],
    url: "/permission",
  });
}
