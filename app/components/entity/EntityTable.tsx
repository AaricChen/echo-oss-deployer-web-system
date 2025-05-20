import {
  BetaSchemaForm,
  ProTable,
  type ActionType,
  type ProColumns,
  type ProFormColumnsType,
} from "@ant-design/pro-components";
import { Button, Modal, type FormInstance } from "antd";
import { useMemo, useRef, useState } from "react";
import { useDelete, usePost, useTableRequest } from "~/hooks/http";
import type {
  EntityConfig,
  EntityCreateRequest,
  EntityDeleteRequest,
  EntityIdType,
  EntityQuery,
  EntityResponse,
  EntityUpdateRequest,
} from "~/types/entity";

export interface EntityTableProps<
  Entity extends EntityResponse<EntityIdType> = EntityResponse<EntityIdType>,
  Query extends EntityQuery = EntityQuery,
  CreateRequest extends EntityCreateRequest = EntityCreateRequest,
  UpdateRequest extends
    EntityUpdateRequest<EntityIdType> = EntityUpdateRequest<EntityIdType>,
  DeleteRequest extends
    EntityDeleteRequest<EntityIdType> = EntityDeleteRequest<EntityIdType>,
> {
  entityConfig: EntityConfig;
  columns: ProFormColumnsType<Entity, "text">[] & ProColumns<Entity, "text">[];
  headerTitle?: React.ReactNode;
  createAction?: EntityTableAction<CreateRequest>;
  updateAction?: EntityTableAction<UpdateRequest>;
  resetAfterCreate?: boolean;
}

export type EntityTableAction<EntityRequest> =
  | false
  | {
      columns?: ProFormColumnsType<EntityRequest>[];
      name?: string;
      url?: string;
    };

export default function EntityTable<
  Entity extends EntityResponse<EntityIdType> = EntityResponse<EntityIdType>,
  Query extends EntityQuery = EntityQuery,
  CreateRequest extends EntityCreateRequest = EntityCreateRequest,
  UpdateRequest extends
    EntityUpdateRequest<EntityIdType> = EntityUpdateRequest<EntityIdType>,
  DeleteRequest extends
    EntityDeleteRequest<EntityIdType> = EntityDeleteRequest<EntityIdType>,
>({
  entityConfig,
  columns,
  headerTitle,
  createAction = {},
  updateAction = {},
  resetAfterCreate = true,
}: EntityTableProps<
  Entity,
  Query,
  CreateRequest,
  UpdateRequest,
  DeleteRequest
>) {
  const tableAction = useRef<ActionType>(null);
  const { mutateAsync: getEntities } = useTableRequest<Entity>(
    entityConfig.baseUrl,
  );
  const { mutateAsync: createEntity } = usePost({
    url: entityConfig.baseUrl,
  });
  const { mutateAsync: deleteEntities } = useDelete({
    url: entityConfig.baseUrl,
  });

  const createFormRef = useRef<FormInstance>(null);
  const [openCreateModal, setOpenCreateModal] = useState(false);

  const hasRowSelection = useMemo(() => {
    return true;
  }, []);

  const hasRowAction = useMemo(() => {
    return updateAction !== false;
  }, [updateAction]);

  const tableColumns: ProFormColumnsType<Entity, "text">[] = useMemo(() => {
    if (!hasRowAction) {
      return columns;
    } else {
      return [
        ...columns,
        {
          title: "操作",
          dataIndex: "action",
          valueType: "option",
          width: 180,
          align: "center",
          render: (text, record, _, action) => {
            return (
              <div className="flex items-center gap-1">
                <Button
                  type="link"
                  onClick={() => action?.startEditable(record.id)}
                >
                  编辑
                </Button>
              </div>
            );
          },
        },
      ];
    }
  }, [columns, hasRowAction]);

  return (
    <ProTable<Entity>
      cardBordered
      actionRef={tableAction}
      scroll={{ x: "max-content" }}
      rowKey={entityConfig.entityIdField ?? "id"}
      headerTitle={headerTitle ?? `${entityConfig.name}管理`}
      toolBarRender={() => [
        createAction && (
          <>
            <Button type="primary" onClick={() => setOpenCreateModal(true)}>
              新增
            </Button>
            <Modal
              open={openCreateModal}
              onCancel={() => setOpenCreateModal(false)}
              title={`新增${createAction.name ?? entityConfig.name}`}
              footer={false}
            >
              <BetaSchemaForm
                formRef={createFormRef}
                grid
                columns={
                  createAction.columns ??
                  (tableColumns as ProFormColumnsType<CreateRequest>[])
                }
                onFinish={async (values) => {
                  await createEntity(values);
                  tableAction.current?.reload();
                  if (resetAfterCreate) {
                    createFormRef.current?.resetFields();
                  }
                  setOpenCreateModal(false);
                }}
              />
            </Modal>
          </>
        ),
      ]}
      rowSelection={
        hasRowSelection
          ? {
              type: "checkbox",
            }
          : undefined
      }
      editable={{
        type: "multiple",
        onDelete: async (key) => {
          await deleteEntities({
            id: key,
          });
          tableAction.current?.reload();
        },
      }}
      request={async (params, sort, filter) => {
        return getEntities({
          params,
          sort,
          filter,
        });
      }}
      columns={tableColumns as ProColumns<Entity, "text">[]}
    />
  );
}
