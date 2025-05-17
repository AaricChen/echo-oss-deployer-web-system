import type { EntityQuery } from "~/types/entity";

export interface PaginationData<Resp> {
  content: Resp[];
  page: PageInfo;
}

export interface PageInfo {
  number: number;
  size: number;
  totalElements: number;
  totalPages: number;
}

export interface PaginationQuery<Query extends EntityQuery> {
  page: number;
  size: number;
  sort?: PaginationSort[];
  query?: Query;
}

export interface PaginationSort {
  field: string;
  direction: "asc" | "desc";
}
