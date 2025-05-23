import {
  ProTable,
  type ActionType,
  type ProColumns,
  type ProFormColumnsType,
} from "@ant-design/pro-components";
import type { DefaultError, UseMutationResult } from "@tanstack/react-query";
import { Button, Modal, Popconfirm } from "antd";
import { useMemo, useRef, useState } from "react";
import EntityCreateForm from "~/components/entity/EntityCreateForm";
import { useDelete, useTableRequest } from "~/hooks/http";
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
  const { mutateAsync: deleteEntities } = useDelete({
    url: entityConfig.baseUrl,
    action: `删除${entityConfig.name}`,
  });

  const [openUpdateModal, setOpenUpdateModal] = useState(false);

  const hasRowAction = useMemo(() => {
    return updateAction !== false;
  }, [updateAction]);

  const hasRowSelection = useMemo(() => {
    return true;
  }, []);

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
          width: 128,
          align: "center",
          fixed: "right",
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

  const createFormColumns: ProFormColumnsType<CreateRequest>[] = useMemo(() => {
    if (createAction && createAction.columns) {
      return createAction.columns;
    } else {
      return tableColumns as ProFormColumnsType<CreateRequest>[];
    }
  }, [createAction, tableColumns]);

  const updateFormColumns: ProFormColumnsType<UpdateRequest>[] = useMemo(() => {
    if (updateAction && updateAction.columns) {
      return updateAction.columns;
    } else {
      return createFormColumns as ProFormColumnsType<UpdateRequest>[];
    }
  }, [updateAction, createFormColumns]);

  return (
    <ProTable<Entity>
      cardBordered
      actionRef={tableAction}
      scroll={{ x: "max-content" }}
      rowKey={entityConfig.entityIdField ?? "id"}
      headerTitle={headerTitle ?? `${entityConfig.name}管理`}
      toolBarRender={() => [
        <EntityCreateForm<Entity, CreateRequest>
          entityConfig={entityConfig}
          columns={createFormColumns}
          action={createAction}
          onFinish={async () => {
            tableAction.current?.reload();
          }}
          resetOnFinish={resetAfterCreate}
        />,
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
