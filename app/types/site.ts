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
  fileCount: number;
  deployAt: string;
  siteUrl: string;
  githubUrl: string;
  maxVersionCount: number;
  versions: number;
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
