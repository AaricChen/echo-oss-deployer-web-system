import type {
  EntityCreateRequest,
  EntityDeleteRequest,
  EntityQuery,
  EntityResponse,
  EntityUpdateRequest,
} from "~/types/entity";

export interface DepartmentQuery extends EntityQuery {
  root?: boolean;
  tenant?: string;
  code?: string;
  name?: string;
}

export interface DepartmentResponse extends EntityResponse<string> {
  id: string;
  tenant: string;
  code: string;
  sequence: number;
  departmentInfo: DepartmentInfoResponse;
  parent: string;
  children: DepartmentResponse[];
  path: string;
  depth: number;
}

export interface DepartmentCreateRequest extends EntityCreateRequest {
  tenant: string;
  code?: string;
  sequence?: number;
  parent?: string;
  departmentInfo: DepartmentInfoRequest;
}

export interface DepartmentUpdateRequest extends EntityUpdateRequest<string> {
  sequence?: number;
  parent?: string;
  departmentInfo: DepartmentInfoRequest;
}

export interface DepartmentDeleteRequest extends EntityDeleteRequest<string> {}

export interface DepartmentInfoRequest {
  name: string;
  remark?: string;
  district?: string;
  address?: string;
  contactName?: string;
  contactPhone?: string;
  contactEmail?: string;
  establishedAt?: string;
}

export interface DepartmentInfoResponse {
  name: string;
  remark: string;
  district: string;
  address: string;
  contactName: string;
  contactPhone: string;
  contactEmail: string;
  establishedAt: string;
}
