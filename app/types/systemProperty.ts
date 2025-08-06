import type {
  EntityQuery,
  EntityResponse,
  EntityUpdateRequest,
} from "~/types/entity";

export interface SystemPropertyQuery extends EntityQuery {
  content?: string;
  catalog?: string;
}

export interface SystemPropertyResponse extends EntityResponse<string> {
  id: string;
  name: string;
  description: string;
  catalog: string;
  editable: boolean;
  value: string;
}

export interface SystemPropertyUpdateRequest
  extends EntityUpdateRequest<string> {
  id: string;
  value: string;
}
