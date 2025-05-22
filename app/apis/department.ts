import { useDelete, usePost, usePut } from "~/hooks/http";
import type {
  DepartmentCreateRequest,
  DepartmentDeleteRequest,
  DepartmentResponse,
  DepartmentUpdateParentRequest,
  DepartmentUpdateRequest,
} from "~/types/department";

export function useCreateDepartment() {
  return usePost<DepartmentCreateRequest, DepartmentResponse>({
    url: "/department",
    action: "新增部门",
  });
}

export function useUpdateDepartment() {
  return usePut<DepartmentUpdateRequest, DepartmentResponse>({
    url: (request) => `/department/${request.id}`,
    action: "更新部门",
  });
}

export function useUpdateDepartmentParent() {
  return usePut<DepartmentUpdateParentRequest, DepartmentResponse>({
    url: (request) => `/department/${request.id}/parent`,
    action: "更新部门父级",
  });
}

export function useDeleteDepartment() {
  return useDelete<DepartmentDeleteRequest, void>({
    url: "/department",
    action: "删除部门",
  });
}
