import {
  ProTable,
  type ActionType,
  type ProColumns,
  type ProFormColumnsType,
  type ProTableProps,
} from "@ant-design/pro-components";
import type { DefaultError, UseMutationResult } from "@tanstack/react-query";
import { Button } from "antd";
import { useMemo, useRef } from "react";
import EntityBatchDeleteForm from "~/components/entity/EntityBatchDeleteForm";
import EntityCreateForm from "~/components/entity/EntityCreateForm";
import EntityDeleteForm, {
  type DeleteButtonProps,
} from "~/components/entity/EntityDeleteForm";
import EntityUpdateForm, {
  type UpdateButtonProps,
} from "~/components/entity/EntityUpdateForm";
import Authorization from "~/components/security/Authorization";
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
  updateButtonProps?: (entity: Entity) => UpdateButtonProps;
  deleteAction?: EntityTableAction<DeleteRequest, void>;
  deleteButtonProps?: (entity: Entity) => DeleteButtonProps;
  createInitialValues?: CreateRequest;
  resetAfterCreate?: boolean;
  disableRowDelete?: boolean;
  postData?: ProTableProps<Entity, Query>["postData"];
  loading?: boolean;
  toolbarRender?: ({}: {
    action?: ActionType;
    selectedRowKeys?: React.Key[];
    selectedRows?: Entity[];
  }) => React.ReactNode[];
  rowActionRender?: ({}: {
    action: ActionType | null;
    entity: Entity;
  }) => React.ReactNode[];
  tableAlertRender?: ({}: {
    action: ActionType | null;
    selectedRowKeys: React.Key[];
    selectedRows: Entity[];
  }) => React.ReactNode[];
  tableAlertOptionRender?: ({}: {
    action: ActionType | null;
    selectedRowKeys: React.Key[];
    selectedRows: Entity[];
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
  updateButtonProps,
  deleteAction = {},
  deleteButtonProps,
  createInitialValues,
  resetAfterCreate = true,
  disableRowDelete = false,
  postData,
  loading,
  toolbarRender,
  rowActionRender,
  tableAlertRender,
  tableAlertOptionRender,
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

  const hasRowAction = useMemo(() => {
    return updateAction !== false || deleteAction !== false || rowActionRender;
  }, [updateAction, deleteAction, rowActionRender]);

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
            let rowActions: React.ReactNode[] = [];
            if (rowActionRender) {
              rowActions = rowActionRender({
                action: tableAction.current,
                entity: record,
              });
            }
            return (
              <div className="flex items-center gap-1">
                <Authorization permission={entityConfig.permissions.update}>
                  <EntityUpdateForm
                    columns={updateFormColumns}
                    entityConfig={entityConfig}
                    entity={record}
                    action={updateAction}
                    buttonProps={updateButtonProps}
                    onFinish={async () => tableAction.current?.reload()}
                  />
                </Authorization>

                {!disableRowDelete && (
                  <Authorization permission={entityConfig.permissions.delete}>
                    <EntityDeleteForm
                      entity={record}
                      entityConfig={entityConfig}
                      action={deleteAction}
                      buttonProps={deleteButtonProps}
                      onFinish={async () => {
                        tableAction.current?.reload();
                      }}
                    />
                  </Authorization>
                )}
                {rowActions.map((action) => action)}
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
    <Authorization permission={entityConfig.permissions.query}>
      <ProTable<Entity>
        cardBordered
        actionRef={tableAction}
        scroll={{ x: "max-content" }}
        rowKey={entityConfig.entityIdField ?? "id"}
        headerTitle={headerTitle ?? `${entityConfig.name}管理`}
        postData={postData}
        loading={loading}
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
            <Authorization permission={entityConfig.permissions.create}>
              <EntityCreateForm<Entity, CreateRequest>
                initialValues={createInitialValues}
                entityConfig={entityConfig}
                columns={createFormColumns}
                action={createAction}
                onFinish={async () => {
                  tableAction.current?.reload();
                }}
                resetOnFinish={resetAfterCreate}
              />
            </Authorization>,
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
        tableAlertRender={({ selectedRowKeys, selectedRows }) => {
          let tableAlertContents: React.ReactNode[] = [];
          if (tableAlertRender) {
            tableAlertContents = tableAlertRender({
              action: tableAction.current,
              selectedRowKeys,
              selectedRows,
            });
          }
          return (
            <div className="flex items-center gap-2">
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
              {tableAlertContents.map((content) => content)}
            </div>
          );
        }}
        tableAlertOptionRender={({ selectedRowKeys, selectedRows }) => {
          let options: React.ReactNode[] = [];
          if (tableAlertOptionRender) {
            options = tableAlertOptionRender({
              action: tableAction.current,
              selectedRowKeys,
              selectedRows,
            });
          }
          return [
            <Authorization permission={entityConfig.permissions.delete}>
              <EntityBatchDeleteForm
                key="batchDeleteForm"
                selectedRowKeys={selectedRowKeys}
                entityConfig={entityConfig}
                action={deleteAction}
                onFinish={async () => {
                  tableAction.current?.clearSelected?.();
                  await tableAction.current?.reload();
                }}
              />
            </Authorization>,
            ...options,
          ];
        }}
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
    </Authorization>
  );
}
