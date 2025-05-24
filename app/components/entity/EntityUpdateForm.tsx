import {
  BetaSchemaForm,
  type ProFormColumnsType,
} from "@ant-design/pro-components";
import { Modal, type FormInstance } from "antd";
import { useRef } from "react";
import type { EntityTableAction } from "~/components/entity/EntityTable";
import { usePut } from "~/hooks/http";
import type {
  EntityConfig,
  EntityIdType,
  EntityResponse,
  EntityUpdateRequest,
} from "~/types/entity";

export interface EntityUpdateFormProps<
  Entity extends EntityResponse<EntityIdType> = EntityResponse<EntityIdType>,
  UpdateRequest extends
    EntityUpdateRequest<EntityIdType> = EntityUpdateRequest<EntityIdType>,
> {
  entity?: Entity;
  entityConfig: EntityConfig;
  columns: ProFormColumnsType<UpdateRequest>[];
  action?: EntityTableAction<UpdateRequest, Entity>;
  open: boolean;
  onFinish?: () => Promise<void>;
  onClose: () => void;
}

export default function EntityUpdateForm<
  Entity extends EntityResponse<EntityIdType> = EntityResponse<EntityIdType>,
  UpdateRequest extends
    EntityUpdateRequest<EntityIdType> = EntityUpdateRequest<EntityIdType>,
>({
  entity,
  entityConfig,
  columns,
  action,
  open,
  onFinish,
  onClose,
}: EntityUpdateFormProps<Entity, UpdateRequest>) {
  const formRef = useRef<FormInstance>(null);
  const { mutateAsync: updateEntity } = usePut<UpdateRequest, Entity>({
    url: (request) => {
      console.log("🚀 ~ request:", request);
      return `${entityConfig.baseUrl}/${request.id}`;
    },
    action: `编辑${entityConfig.name}`,
  });

  if (!action) {
    return null;
  }
  return (
    <Modal
      open={open}
      onCancel={() => onClose()}
      title={`编辑${action.name ?? entityConfig.name}`}
      footer={false}
    >
      <BetaSchemaForm
        formRef={formRef}
        grid
        columns={columns}
        initialValues={entity}
        onFinish={async (values) => {
          if (action.mutation) {
            await action.mutation.mutateAsync(values);
          } else {
            await updateEntity(values);
          }
          if (onFinish) {
            await onFinish();
          }
          onClose();
        }}
      />
    </Modal>
  );
}
