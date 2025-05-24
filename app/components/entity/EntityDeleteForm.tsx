import { Button, Popconfirm } from "antd";
import type { EntityTableAction } from "~/components/entity/EntityTable";
import { useDelete } from "~/hooks/http";
import type {
  EntityConfig,
  EntityDeleteRequest,
  EntityIdType,
  EntityResponse,
} from "~/types/entity";

export interface EntityDeleteFormProps<
  Entity extends EntityResponse<EntityIdType> = EntityResponse<EntityIdType>,
  DeleteRequest extends
    EntityDeleteRequest<EntityIdType> = EntityDeleteRequest<EntityIdType>,
> {
  entityConfig: EntityConfig;
  entity: Entity;
  action?: EntityTableAction<DeleteRequest, void>;
  onFinish?: () => Promise<void>;
}

export default function EntityDeleteForm<
  Entity extends EntityResponse<EntityIdType> = EntityResponse<EntityIdType>,
  DeleteRequest extends
    EntityDeleteRequest<EntityIdType> = EntityDeleteRequest<EntityIdType>,
>({
  entityConfig,
  entity,
  action,
  onFinish,
}: EntityDeleteFormProps<Entity, DeleteRequest>) {
  const { mutateAsync: deleteEntities } = useDelete({
    url: entityConfig.baseUrl,
    action: `删除${entityConfig.name}`,
  });

  if (!action) {
    return null;
  }
  return (
    <Popconfirm
      title={`确定删除该 ${entityConfig.name} 吗？`}
      onConfirm={async () => {
        if (action.mutation) {
          const payload = { id: entity.id };
          await action.mutation.mutateAsync(payload as DeleteRequest);
        } else {
          await deleteEntities({
            id: entity.id,
          });
        }
        if (onFinish) {
          await onFinish();
        }
      }}
    >
      <Button type="link" danger>
        删除
      </Button>
    </Popconfirm>
  );
}
