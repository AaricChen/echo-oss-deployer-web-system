import {
  BetaSchemaForm,
  type ProFormColumnsType,
} from "@ant-design/pro-components";
import { App, Button, Modal, type FormInstance } from "antd";
import { useMemo, useRef, useState } from "react";
import type { EntityTableAction } from "~/components/entity/EntityTable";
import { usePut } from "~/hooks/http";
import type {
  EntityConfig,
  EntityIdType,
  EntityResponse,
  EntityUpdateRequest,
} from "~/types/entity";

export interface UpdateButtonProps {
  disabled?: boolean;
  loading?: boolean;
}

export interface EntityUpdateFormProps<
  Entity extends EntityResponse<EntityIdType> = EntityResponse<EntityIdType>,
  UpdateRequest extends
    EntityUpdateRequest<EntityIdType> = EntityUpdateRequest<EntityIdType>,
> {
  entity: Entity;
  entityConfig: EntityConfig;
  columns: ProFormColumnsType<UpdateRequest>[];
  action?: EntityTableAction<UpdateRequest, Entity>;
  buttonProps?: (entity: Entity) => UpdateButtonProps;
  onFinish?: () => Promise<void>;
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
  buttonProps,
  onFinish,
}: EntityUpdateFormProps<Entity, UpdateRequest>) {
  const { message } = App.useApp();
  const formRef = useRef<FormInstance>(null);

  const [open, setOpen] = useState(false);
  const { mutateAsync: updateEntity } = usePut<UpdateRequest, Entity>({
    url: (request) => `${entityConfig.baseUrl}/${request.id}`,
    action: `编辑${entityConfig.name}`,
  });

  const { disabled, loading }: UpdateButtonProps = useMemo(() => {
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
    <>
      <Button
        disabled={disabled}
        loading={loading}
        type="link"
        onClick={() => setOpen(true)}
      >
        编辑
      </Button>
      <Modal
        open={open}
        onCancel={() => setOpen(false)}
        title={`编辑${action.name ?? entityConfig.name}`}
        footer={false}
        destroyOnHidden
      >
        <BetaSchemaForm
          formRef={formRef}
          grid
          columns={columns}
          initialValues={entity}
          onFinish={async (values) => {
            if (!values.id) {
              message.error("未找到ID信息");
              return false;
            }
            if (action.mutation) {
              await action.mutation.mutateAsync(values);
            } else {
              await updateEntity(values);
            }
            if (onFinish) {
              await onFinish();
            }
            setOpen(false);
          }}
        />
      </Modal>
    </>
  );
}
