import { App, Button } from "antd";
import type { EntityTableAction } from "~/components/entity/EntityTable";
import { useDelete } from "~/hooks/http";
import type {
  EntityConfig,
  EntityDeleteRequest,
  EntityIdType,
} from "~/types/entity";

export interface EntityBatchDeleteFormProps<
  DeleteRequest extends
    EntityDeleteRequest<EntityIdType> = EntityDeleteRequest<EntityIdType>,
> {
  entityConfig: EntityConfig;
  selectedRowKeys: React.Key[];
  action?: EntityTableAction<DeleteRequest, void>;
  onFinish?: () => Promise<void>;
}

export default function EntityBatchDeleteForm<
  DeleteRequest extends
    EntityDeleteRequest<EntityIdType> = EntityDeleteRequest<EntityIdType>,
>({
  entityConfig,
  selectedRowKeys,
  action,
  onFinish,
}: EntityBatchDeleteFormProps<DeleteRequest>) {
  const { modal } = App.useApp();
  const { mutateAsync: deleteEntities } = useDelete<DeleteRequest, void>({
    url: entityConfig.baseUrl,
    action: `批量删除${entityConfig.name}`,
  });

  if (!action) {
    return null;
  }
  return (
    <Button
      key="batchDelete"
      type="link"
      danger
      onClick={() => {
        modal.confirm({
          title: `确定删除选中的 ${selectedRowKeys.length} 条${entityConfig.name ?? "数据"}吗？`,
          onOk: async () => {
            const payload = { ids: selectedRowKeys } as DeleteRequest;
            if (action.mutation) {
              await action.mutation.mutateAsync(payload);
            } else {
              await deleteEntities(payload);
            }
            if (onFinish) {
              await onFinish();
            }
          },
        });
      }}
    >
      批量删除
    </Button>
  );
}
