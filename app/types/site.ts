import type {
  EntityCreateRequest,
  EntityDeleteRequest,
  EntityQuery,
  EntityResponse,
  EntityUpdateRequest,
} from "~/types/entity";

export interface SiteQuery extends EntityQuery {
  name?: string;
}

export interface SiteResponse extends EntityResponse<string> {
  id: string;
  token: string;
  name: string;
  endpoint: string;
  bucket: string;
  deployAt: string;
  siteUrl: string;
  githubUrl: string;
  maxVersionCount: number;
  versions: number;
  version?: SiteVersionResponse;
}

export interface SiteCreateRequest extends EntityCreateRequest {
  name: string;
  endpoint: string;
  bucket: string;
  siteUrl: string;
  githubUrl: string;
  maxVersionCount: number;
}

export type SiteUpdateRequest = SiteCreateRequest & EntityUpdateRequest<string>;

export interface SiteDeleteRequest extends EntityDeleteRequest<string> {}

export interface SiteVersionQuery extends EntityQuery {
  site: string;
}

export interface SiteVersionResponse extends EntityResponse<string> {
  id: string;
  endpoint: string;
  bucket: string;
  commitUrl: string;
  deployAt: string;
}

export interface SiteRollbackRequest {
  version: string;
}
