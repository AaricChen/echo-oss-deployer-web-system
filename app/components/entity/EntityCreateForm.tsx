import type { ProFormColumnsType } from "@ant-design/pro-components";
import type { EntityTableAction } from "~/components/entity/EntityTable";
import type {
  EntityConfig,
  EntityCreateRequest,
  EntityIdType,
  EntityResponse,
} from "~/types/entity";

export interface EntityCreateFormProps<
  Entity extends EntityResponse<EntityIdType> = EntityResponse<EntityIdType>,
  CreateRequest extends EntityCreateRequest = EntityCreateRequest,
> {
  entityConfig: EntityConfig;
  columns: ProFormColumnsType<CreateRequest>[];
  action?: EntityTableAction<CreateRequest, Entity>;
}

export default function EntityCreateForm<
  Entity extends EntityResponse<EntityIdType> = EntityResponse<EntityIdType>,
  CreateRequest extends EntityCreateRequest = EntityCreateRequest,
>({
  entityConfig,
  columns,
  action,
}: EntityCreateFormProps<Entity, CreateRequest>) {
  return <div>EntityCreateForm</div>;
}
