import {
  BetaSchemaForm,
  type ProFormColumnsType,
} from "@ant-design/pro-components";
import { Button, Modal, type FormInstance } from "antd";
import { useRef, useState } from "react";
import type { EntityTableAction } from "~/components/entity/EntityTable";
import { usePost } from "~/hooks/http";
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
  initialValues?: CreateRequest;
  entityConfig: EntityConfig;
  columns: ProFormColumnsType<CreateRequest>[];
  action?: EntityTableAction<CreateRequest, Entity>;
  resetOnFinish?: boolean;
  onFinish?: () => Promise<void>;
}

export default function EntityCreateForm<
  Entity extends EntityResponse<EntityIdType> = EntityResponse<EntityIdType>,
  CreateRequest extends EntityCreateRequest = EntityCreateRequest,
>({
  initialValues,
  entityConfig,
  columns,
  action,
  resetOnFinish = true,
  onFinish,
}: EntityCreateFormProps<Entity, CreateRequest>) {
  const formRef = useRef<FormInstance>(null);
  const { mutateAsync: createEntity } = usePost<CreateRequest, Entity>({
    url: entityConfig.baseUrl,
    action: `新增${entityConfig.name}`,
  });
  const [openModal, setOpenModal] = useState(false);

  if (!action) {
    return null;
  }
  return (
    <>
      <Button type="primary" onClick={() => setOpenModal(true)}>
        新增
      </Button>
      <Modal
        open={openModal}
        onCancel={() => setOpenModal(false)}
        title={`新增${action.name ?? entityConfig.name}`}
        footer={false}
      >
        <BetaSchemaForm
          formRef={formRef}
          grid
          initialValues={initialValues}
          columns={columns}
          onFinish={async (values) => {
            if (action.mutation) {
              await action.mutation.mutateAsync(values);
            } else {
              await createEntity(values);
            }
            if (onFinish) {
              await onFinish();
            }
            setOpenModal(false);
            if (resetOnFinish) {
              formRef.current?.resetFields();
            }
          }}
        />
      </Modal>
    </>
  );
}
