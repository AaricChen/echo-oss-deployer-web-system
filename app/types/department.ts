import type { DataScope } from "~/types/account";
import type {
  EntityConfig,
  EntityCreateRequest,
  EntityDeleteRequest,
  EntityQuery,
  EntityResponse,
  EntityUpdateRequest,
} from "~/types/entity";

export const DepartmentEntity: EntityConfig = {
  name: "部门",
  baseUrl: "/department",
};

export interface DepartmentQuery extends EntityQuery {
  root?: boolean;
  parent?: string;
  name?: string;
  remark?: string;
}

export interface DepartmentResponse extends EntityResponse<string> {
  key: string;
  id: string;
  name: string;
  remark: string;
  sequence: number;
  children: DepartmentResponse[];
}

export interface DepartmentCreateRequest extends EntityCreateRequest {
  name: string;
  remark: string;
  sequence: number;
  parent: string;
}

export type DepartmentUpdateRequest = DepartmentCreateRequest &
  EntityUpdateRequest<string>;

export type DepartmentUpdateParentRequest = {
  id: string;
  parent: string;
};

export interface DepartmentDeleteRequest extends EntityDeleteRequest<string> {}
