import { usePost } from "~/hooks/http";
import { type RoleCreateRequest, type RoleResponse } from "~/types/role";

export function useCreateRole() {
  return usePost<RoleCreateRequest, RoleResponse>({
    url: "/role",
  });
}
