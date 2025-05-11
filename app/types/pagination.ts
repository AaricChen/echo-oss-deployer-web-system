import type { EntityQuery } from "~/types/entity";

export interface PaginationData<Resp> {
  content: Resp[];
  size: number;
  totalPages: number;
  totalElements: number;
  empty: boolean;
  first: true;
  last: true;
}

export interface PaginationQuery<Query extends EntityQuery> {
  page: number;
  size: number;
  sort: PaginationSort[];
  query?: Query;
}

export interface PaginationSort {
  field: string;
  direction: "asc" | "desc";
}
