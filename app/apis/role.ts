import { usePaginationQuery } from "~/hooks/http";
import type { DepartmentQuery } from "~/types/department";
import type { RoleQuery, RoleResponse } from "~/types/role";

export function useGetRoles() {
  return usePaginationQuery<RoleQuery, RoleResponse>("/role", "roles", {
    page: 0,
    size: 1000,
  });
}
