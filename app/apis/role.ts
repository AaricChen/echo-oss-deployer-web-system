import { useDelete, usePost } from "~/hooks/http";
import {
  type RoleCreateRequest,
  type RoleDeleteRequest,
  type RoleResponse,
} from "~/types/role";

export function useCreateRole() {
  return usePost<RoleCreateRequest, RoleResponse>({
    url: "/role",
  });
}

export function useDeleteRole() {
  return useDelete<RoleDeleteRequest, void>({
    url: "/role",
  });
}
