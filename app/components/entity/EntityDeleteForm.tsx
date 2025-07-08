import { Button, Popconfirm } from "antd";
import { useMemo } from "react";
import type { EntityTableAction } from "~/components/entity/EntityTable";
import { useDelete } from "~/hooks/http";
import type {
  EntityConfig,
  EntityDeleteRequest,
  EntityIdType,
  EntityResponse,
} from "~/types/entity";

export interface DeleteButtonProps {
  disabled?: boolean;
  loading?: boolean;
}

export interface EntityDeleteFormProps<
  Entity extends EntityResponse<EntityIdType> = EntityResponse<EntityIdType>,
  DeleteRequest extends
    EntityDeleteRequest<EntityIdType> = EntityDeleteRequest<EntityIdType>,
> {
  entityConfig: EntityConfig;
  entity: Entity;
  action?: EntityTableAction<DeleteRequest, void>;
  buttonProps?: (entity: Entity) => DeleteButtonProps;
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
  buttonProps,
  onFinish,
}: EntityDeleteFormProps<Entity, DeleteRequest>) {
  const { mutateAsync: deleteEntities } = useDelete<DeleteRequest, void>({
    url: entityConfig.baseUrl,
    action: `删除${entityConfig.name}`,
  });

  const { disabled, loading }: DeleteButtonProps = useMemo(() => {
    if (buttonProps) {
      return buttonProps(entity);
    } else {
      return {};
    }
  }, [entity, buttonProps]);

  if (!action) {
    return null;
  }
  return (
    <Popconfirm
      title={`确定删除该 ${entityConfig.name} 吗？`}
      onConfirm={async () => {
        const payload = { id: entity.id } as DeleteRequest;
        if (action.mutation) {
          await action.mutation.mutateAsync(payload);
        } else {
          await deleteEntities(payload);
        }
        if (onFinish) {
          await onFinish();
        }
      }}
    >
      <Button type="link" disabled={disabled} loading={loading} danger>
        删除
      </Button>
    </Popconfirm>
  );
}
