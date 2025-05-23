import {
  BetaSchemaForm,
  ProTable,
  type ActionType,
  type ProColumns,
  type ProFormColumnsType,
} from "@ant-design/pro-components";
import type { DefaultError, UseMutationResult } from "@tanstack/react-query";
import { Button, Modal, Popconfirm, type FormInstance } from "antd";
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
  createAction?: EntityTableAction<CreateRequest, Entity>;
  updateAction?: EntityTableAction<UpdateRequest, Entity>;
  deleteAction?: EntityTableAction<DeleteRequest, void>;
  resetAfterCreate?: boolean;
}

export type EntityTableAction<EntityRequest, Response> =
  | false
  | {
      columns?: ProFormColumnsType<EntityRequest>[]; // 表单项的配置
      mutation?: UseMutationResult<Response, DefaultError, EntityRequest>;
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
  deleteAction = {},
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
    action: `新增${entityConfig.name}`,
  });
  const { mutateAsync: deleteEntities } = useDelete({
    url: entityConfig.baseUrl,
    action: `删除${entityConfig.name}`,
  });

  const createFormRef = useRef<FormInstance>(null);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);

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
          render: (text, record) => {
            return (
              <div className="flex items-center gap-1">
                {updateAction && (
                  <>
                    <Button
                      type="link"
                      onClick={() => {
                        setOpenUpdateModal(true);
                      }}
                    >
                      编辑
                    </Button>
                  </>
                )}
                {deleteAction && (
                  <Popconfirm
                    title={`确定删除该 ${entityConfig.name} 吗？`}
                    onConfirm={async () => {
                      if (deleteAction.mutation) {
                        const payload = { id: record.id };
                        await deleteAction.mutation.mutateAsync(
                          payload as DeleteRequest,
                        );
                      } else {
                        await deleteEntities({
                          id: record.id,
                        });
                      }
                      tableAction.current?.reload();
                    }}
                  >
                    <Button type="link" danger>
                      删除
                    </Button>
                  </Popconfirm>
                )}
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
                  if (createAction.mutation) {
                    await createAction.mutation.mutateAsync(values);
                  } else {
                    await createEntity(values);
                  }
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
      tableAlertRender={({ selectedRowKeys }) => {
        return (
          <div>
            <span>已选择 {selectedRowKeys.length} 项</span>
            <Button
              type="link"
              onClick={() => {
                tableAction.current?.clearSelected?.();
              }}
            >
              取消选择
            </Button>
          </div>
        );
      }}
      tableAlertOptionRender={({ selectedRowKeys }) => [
        deleteAction && (
          <Button
            key="batchDelete"
            type="link"
            danger
            onClick={() => {
              Modal.confirm({
                title: `确定删除选中的 ${selectedRowKeys.length} 条${entityConfig.name ?? "数据"}吗？`,
                onOk: async () => {
                  if (deleteAction.mutation) {
                    const payload = { ids: selectedRowKeys };
                    await deleteAction.mutation.mutateAsync(
                      payload as DeleteRequest,
                    );
                  } else {
                    await deleteEntities({
                      ids: selectedRowKeys,
                    });
                  }
                  tableAction.current?.reload();
                },
              });
            }}
          >
            批量删除
          </Button>
        ),
      ]}
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
