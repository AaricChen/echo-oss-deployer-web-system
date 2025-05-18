import type { EntityResponse } from "~/types/entity";

export interface PermissionResponse extends EntityResponse<string> {
  key: string;
  id: string;
  name: string;
  children: PermissionResponse[];
}
