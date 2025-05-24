import {
  ProTable,
  type ActionType,
  type ProColumns,
  type ProFormColumnsType,
} from "@ant-design/pro-components";
import type { DefaultError, UseMutationResult } from "@tanstack/react-query";
import { Button } from "antd";
import { useMemo, useRef, useState } from "react";
import EntityBatchDeleteForm from "~/components/entity/EntityBatchDeleteForm";
import EntityCreateForm from "~/components/entity/EntityCreateForm";
import EntityDeleteForm from "~/components/entity/EntityDeleteForm";
import EntityUpdateForm from "~/components/entity/EntityUpdateForm";
import { useTableRequest } from "~/hooks/http";
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
  query?: Query;
  createAction?: EntityTableAction<CreateRequest, Entity>;
  updateAction?: EntityTableAction<UpdateRequest, Entity>;
  deleteAction?: EntityTableAction<DeleteRequest, void>;
  createInitialValues?: CreateRequest;
  resetAfterCreate?: boolean;
  toolbarRender?: ({
    action,
    selectedRowKeys,
    selectedRows,
  }: {
    action?: ActionType;
    selectedRowKeys?: React.Key[];
    selectedRows?: Entity[];
  }) => React.ReactNode[];
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
  query,
  createAction = {},
  updateAction = {},
  deleteAction = {},
  createInitialValues,
  resetAfterCreate = true,
  toolbarRender,
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

  const [selectEntity, setSelectEntity] = useState<Entity>();
  const [openUpdateModal, setOpenUpdateModal] = useState(false);

  const hasRowAction = useMemo(() => {
    return updateAction !== false || deleteAction !== false;
  }, [updateAction, deleteAction]);

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
          render: (_, record: Entity) => {
            return (
              <div className="flex items-center gap-1">
                {updateAction && (
                  <Button
                    type="link"
                    onClick={() => {
                      setSelectEntity(record);
                      setOpenUpdateModal(true);
                    }}
                  >
                    编辑
                  </Button>
                )}
                <EntityDeleteForm
                  entity={record}
                  entityConfig={entityConfig}
                  action={deleteAction}
                  onFinish={async () => {
                    tableAction.current?.reload();
                  }}
                />
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
    <>
      <ProTable<Entity>
        cardBordered
        actionRef={tableAction}
        scroll={{ x: "max-content" }}
        rowKey={entityConfig.entityIdField ?? "id"}
        headerTitle={headerTitle ?? `${entityConfig.name}管理`}
        toolBarRender={(action, { selectedRowKeys, selectedRows }) => {
          let otherActions: React.ReactNode[] = [];
          if (toolbarRender) {
            otherActions = toolbarRender({
              action,
              selectedRowKeys,
              selectedRows,
            });
          }
          return [
            <EntityCreateForm<Entity, CreateRequest>
              initialValues={createInitialValues}
              entityConfig={entityConfig}
              columns={createFormColumns}
              action={createAction}
              onFinish={async () => {
                tableAction.current?.reload();
              }}
              resetOnFinish={resetAfterCreate}
            />,
            ...otherActions,
          ];
        }}
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
          <EntityBatchDeleteForm
            selectedRowKeys={selectedRowKeys}
            entityConfig={entityConfig}
            action={deleteAction}
            onFinish={async () => {
              tableAction.current?.clearSelected?.();
              await tableAction.current?.reload();
            }}
          />,
        ]}
        params={query}
        request={async (params, sort, filter) => {
          return getEntities({
            params,
            sort,
            filter,
          });
        }}
        columns={tableColumns as ProColumns<Entity, "text">[]}
      />
      <EntityUpdateForm
        columns={updateFormColumns}
        entityConfig={entityConfig}
        open={openUpdateModal}
        onClose={() => setOpenUpdateModal(false)}
        entity={selectEntity}
        action={updateAction}
        onFinish={async () => tableAction.current?.reload()}
      />
    </>
  );
}
