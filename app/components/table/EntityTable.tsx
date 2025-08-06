import {
  ProTable,
  type ActionType,
  type ProColumns,
  type ProFormInstance,
  type ProTableProps,
} from "@ant-design/pro-components";
import { Button, type ButtonProps } from "antd";
import React, { forwardRef, useImperativeHandle, useMemo, useRef } from "react";
import type { ActionFormProps } from "~/components/form/ActionForm";
import ActionForm from "~/components/form/ActionForm";
import Authorization from "~/components/security/Authorization";
import EntityBatchDeleteActionForm from "~/components/table/EntityBatchDeleteActionForm";
import EntityDeleteActionForm from "~/components/table/EntityDeleteActionForm";
import EntityRowActionForm from "~/components/table/EntityRowActionForm";
import EntityToolbarActionForm from "~/components/table/EntityToolbarActionForm";
import { useTableRequest } from "~/hooks/http";
import type {
  EntityIdType,
  EntityQuery,
  EntityRequest,
  EntityResponse,
} from "~/types/entity";
import type { Permission } from "~/types/permission";

/**
 * 实体操作
 * 定义一个实体相关的操作
 * 一般为点击触发按钮以后，弹出表单，表单提交后，刷新表格
 * 对于二元操作，也可以不弹出表单
 */
export type EntityAction = {
  action:
    | "form"
    | "toolbar"
    | "row"
    | "batch"
    | "create"
    | "update"
    | "delete"
    | "batch-delete";
};

export type EntityFormAction<
  Request extends EntityRequest = EntityRequest,
  Response extends EntityResponse = EntityResponse,
> = EntityAction & {
  action: "form";
} & ActionFormProps<Request, Response>;

export type EntityToolbarAction<
  Request extends EntityRequest = EntityRequest,
  Response extends EntityResponse = EntityResponse,
> = EntityAction & {
  action: "toolbar";
  render: () => Omit<
    ActionFormProps<Request, Response>,
    "title" | "mutation"
  > & {
    baseUrl?: string; // 操作接口路径 如果为空 则使用实体的baseUrl
    suffix?: string; // 操作后缀
  };
};

export type EntityRowAction<
  Request extends EntityRequest = EntityRequest,
  Response extends EntityResponse = EntityResponse,
> = EntityAction & {
  action: "row";
  render: () => Omit<
    ActionFormProps<Request, Response>,
    "title" | "mutation"
  > & {
    baseUrl?: string; // 操作接口路径 如果为空 则使用实体的baseUrl
    suffix?: string; // 操作后缀
  };
};

export type EntityBatchAction<
  Request extends EntityRequest = EntityRequest,
  Response extends EntityResponse = EntityResponse,
> = EntityAction & {
  action: "batch";
  render: () => Omit<
    ActionFormProps<Request, Response>,
    "title" | "mutation"
  > & {
    baseUrl?: string; // 操作接口路径 如果为空 则使用实体的baseUrl
    suffix?: string; // 操作后缀
  };
};

export type EntityCreateAction<
  Request extends EntityRequest = EntityRequest,
  Response extends EntityResponse = EntityResponse,
> = EntityAction & {
  action: "create";
} & Omit<
    Pick<
      ActionFormProps<Request, Response>,
      "columns" | "permission" | "initialValues" | "buttonProps"
    >,
    "name" | "title"
  >;

export type EntityUpdateAction<
  Request extends EntityRequest = EntityRequest,
  Response extends EntityResponse = EntityResponse,
> = EntityAction & {
  action: "update";
} & Omit<
    Pick<
      ActionFormProps<Request, Response>,
      "columns" | "permission" | "initialValues" | "buttonProps"
    >,
    "name" | "title"
  >;

export type EntityDeleteAction = EntityAction & {
  action: "delete";
} & {
  name?: string;
  baseUrl?: string;
  suffix?: string;
  permission?: Permission;
  buttonProps?: Pick<ButtonProps, "type" | "loading" | "disabled">;
};

export type EntityBatchDeleteAction = EntityAction & {
  action: "batch-delete";
} & {
  name?: string;
  baseUrl?: string;
  suffix?: string;
  permission?: Permission;
  buttonProps?: Pick<ButtonProps, "type" | "loading" | "disabled">;
};

export type EntityToolbarTableActionType<
  Request extends EntityRequest = EntityRequest,
  Response extends EntityResponse = EntityResponse,
> =
  | EntityFormAction<Request, Response>
  | EntityToolbarAction<Request, Response>
  | EntityCreateAction<Request, Response>
  | React.ReactNode;

export type EntityRowTableActionType<
  Request extends EntityRequest = EntityRequest,
  Response extends EntityResponse = EntityResponse,
> =
  | EntityFormAction<Request, Response>
  | EntityRowAction<Request, Response>
  | EntityUpdateAction<Request, Response>
  | EntityDeleteAction
  | React.ReactNode;

export type EntityBatchTableActionType<
  Request extends EntityRequest = EntityRequest,
  Response extends EntityResponse = EntityResponse,
> =
  | EntityFormAction<Request, Response>
  | EntityBatchAction<Request, Response>
  | EntityBatchDeleteAction
  | React.ReactNode;

export interface EntityTableRef<Query extends EntityQuery = EntityQuery> {
  tableAction: ActionType;
  searchForm: ProFormInstance<Query>;
}

export interface EntityTableProps<
  Entity extends EntityResponse<EntityIdType> = EntityResponse,
  Query extends EntityQuery = EntityQuery,
  Request = Record<string, EntityRequest>,
> {
  entity: string; // 实体类型
  name: string; // 实体名称
  baseUrl: string; // 实体接口路径
  columns: ProColumns<Entity>[]; // 表格列配置
  idField?: string; // 实体ID字段
  query?: Query; // 查询条件
  permission?: Permission; // 可以查看该实体表格的权限
  header?: React.ReactNode; // 表格标题
  subheader?: React.ReactNode; // 表格副标题
  tooltip?: string; // 表格提示
  loading?: boolean; // 表格加载状态
  search?: ProTableProps<Entity, Query>["search"]; // 表格搜索表单配置
  columnsState?: ProTableProps<Entity, Query>["columnsState"]; // 表格列状态配置
  options?: ProTableProps<Entity, Query>["options"]; // 表格选项配置
  rowActionWidth?: number; // 行级操作宽度
  tableExtraRender?: ProTableProps<Entity, Query>["tableExtraRender"]; // 表格额外渲染
  onLoad?: (dataSource: Entity[]) => void; // 表格加载完成回调
  beforeSearchSubmit?: (params: Partial<Query>) => Partial<Query>; // 表格搜索表单提交前回调
  onSearchSubmit?: (params: Partial<Query>) => void; // 表格搜索表单提交后回调
  onSearchReset?: () => void; // 表格搜索表单重置后回调

  tableRef?: React.Ref<EntityTableRef<Query>>;

  // 实体表格操作定义
  toolbarActions?: (
    {}: {
      tableAction: ActionType;
      searchForm: ProFormInstance<Query>;
      selectedRowKeys?: React.Key[];
      selectedRows?: Entity[];
    },
    // @ts-ignore
  ) => EntityToolbarTableActionType<Request[keyof Request], Entity>[]; // 表级操作配置
  rowActions?: (
    {}: {
      tableAction: ActionType;
      searchForm: ProFormInstance<Query>;
      entity: Entity;
    },
    // @ts-ignore
  ) => EntityRowTableActionType<Request[keyof Request], Entity>[]; // 行级操作配置
  batchActions?: (
    {}: {
      tableAction: ActionType;
      searchForm: ProFormInstance<Query>;
      selectedRowKeys?: React.Key[];
      selectedRows?: Entity[];
    },
    // @ts-ignore
  ) => EntityBatchTableActionType<Request[keyof Request], Entity>[]; // 批量操作配置
  batchOptionActions?: (
    {}: {
      tableAction: ActionType;
      searchForm: ProFormInstance<Query>;
      selectedRowKeys?: React.Key[];
      selectedRows?: Entity[];
    },
    // @ts-ignore
  ) => EntityBatchTableActionType<Request[keyof Request], Entity>[]; // 批量操作配置
}

const EntityTable = <
  Entity extends EntityResponse<EntityIdType> = EntityResponse,
  Query extends EntityQuery = EntityQuery,
  Request = Record<string, EntityRequest>,
>(
  props: EntityTableProps<Entity, Query, Request>,
) => {
  const {
    entity,
    name,
    baseUrl,
    idField = "id",
    columns,
    permission,
    query,
    header,
    subheader,
    tooltip,
    loading,
    search,
    columnsState = {
      persistenceType: "localStorage",
      persistenceKey: `${entity}-columns-state`,
    },
    options,
    tableExtraRender,
    onLoad,
    beforeSearchSubmit,
    onSearchSubmit,
    onSearchReset,
    tableRef,
    toolbarActions,
    rowActions,
    batchActions,
    batchOptionActions,
    rowActionWidth = 96,
  } = props;
  const tableAction = useRef<ActionType>(null);
  const searchForm = useRef<ProFormInstance<Query> | undefined>(undefined);
  const { mutateAsync: getEntities } = useTableRequest<Entity>(baseUrl);

  useImperativeHandle(
    tableRef,
    () => ({
      tableAction: tableAction.current ?? ({} as ActionType),
      searchForm: searchForm.current ?? ({} as ProFormInstance<Query>),
    }),
    [],
  );

  const hasRowAction = useMemo(() => {
    return !!rowActions;
  }, [rowActions]);

  const hasBatchAction = useMemo(() => {
    return !!batchActions || !!batchOptionActions;
  }, [batchActions, batchOptionActions]);

  const tableColumns: ProColumns<Entity>[] = useMemo(() => {
    if (hasRowAction) {
      return [
        ...columns,
        {
          title: "操作",
          dataIndex: "action",
          valueType: "option",
          align: "center",
          width: rowActionWidth,
          fixed: "right",
          render: (_, record: Entity) => {
            if (rowActions && tableAction.current && searchForm.current) {
              const actions = rowActions({
                entity: record,
                tableAction: tableAction.current,
                searchForm: searchForm.current,
              });
              if (actions) {
                const content = actions.map((action, index) => {
                  if (
                    action &&
                    typeof action === "object" &&
                    "action" in action
                  ) {
                    switch (action.action) {
                      case "form":
                        return (
                          // @ts-ignore
                          <ActionForm<Request[keyof Request], Entity>
                            key={index}
                            {...action}
                          />
                        );
                      case "row":
                        return (
                          // @ts-ignore
                          <EntityRowActionForm<Request[keyof Request], Entity>
                            key={index}
                            name={name}
                            baseUrl={baseUrl}
                            idField={idField}
                            entity={record}
                            render={action.render}
                          />
                        );
                      case "update":
                        return (
                          // @ts-ignore
                          <EntityRowActionForm<Request[keyof Request], Entity>
                            key={index}
                            name={name}
                            baseUrl={baseUrl}
                            idField={idField}
                            entity={record}
                            render={() => ({
                              name: "编辑",
                              columns: action.columns,
                              permission: action.permission,
                              initialValues: action.initialValues ?? record,
                              buttonProps: {
                                type: "link",
                                ...action.buttonProps,
                              },
                              resetOnFinish: false,
                              onFinish: async () => {
                                await tableAction.current?.reload();
                              },
                            })}
                          />
                        );
                      case "delete":
                        return (
                          <EntityDeleteActionForm<
                            // @ts-ignore
                            Request[keyof Request],
                            Entity
                          >
                            key={index}
                            name={name}
                            baseUrl={baseUrl}
                            entity={record}
                            action={{
                              name: "删除",
                              permission: action.permission,
                              baseUrl: action.baseUrl,
                              suffix: action.suffix,
                              buttonProps: {
                                type: "link",
                                ...action.buttonProps,
                              },
                            }}
                            onFinish={async () => {
                              await tableAction.current?.reload();
                            }}
                          />
                        );
                      default:
                        return (
                          <Button key={index} type="default" danger>
                            未知操作
                          </Button>
                        );
                    }
                  } else {
                    return action;
                  }
                });
                return (
                  <div className="flex items-center justify-center gap-1">
                    {content}
                  </div>
                );
              }
            }
            return null;
          },
        },
      ];
    } else {
      return columns;
    }
  }, [columns, hasRowAction]);

  return (
    <Authorization permission={permission}>
      <ProTable
        cardBordered
        actionRef={tableAction}
        formRef={searchForm}
        scroll={{ x: "max-content" }}
        rowKey={idField}
        params={query}
        request={async (params, sort, filter) => {
          return getEntities({
            params,
            sort,
            filter,
          });
        }}
        columns={tableColumns}
        loading={loading}
        search={search}
        toolbar={{
          title: header ?? `${name}管理`,
          subTitle: subheader,
          tooltip,
        }}
        columnsState={columnsState}
        tableExtraRender={tableExtraRender}
        onLoad={onLoad}
        options={options}
        beforeSearchSubmit={beforeSearchSubmit}
        rowSelection={hasBatchAction ? {} : false}
        onSubmit={onSearchSubmit}
        onReset={onSearchReset}
        toolBarRender={(_, { selectedRowKeys, selectedRows }) => {
          if (toolbarActions && tableAction.current && searchForm.current) {
            const actions = toolbarActions({
              tableAction: tableAction.current,
              searchForm: searchForm.current,
              selectedRowKeys,
              selectedRows,
            });
            return actions.map((action, index) => {
              if (action && typeof action === "object" && "action" in action) {
                switch (action.action) {
                  case "form":
                    return (
                      // @ts-ignore
                      <ActionForm<Request[keyof Request], Entity>
                        key={index}
                        {...action}
                      />
                    );
                  case "toolbar":
                    return (
                      // @ts-ignore
                      <EntityToolbarActionForm<Request[keyof Request], Entity>
                        key={index}
                        name={name}
                        baseUrl={baseUrl}
                        selectedRowKeys={selectedRowKeys}
                        selectedRows={selectedRows}
                        render={action.render}
                      />
                    );
                  case "create":
                    return (
                      // @ts-ignore
                      <EntityToolbarActionForm<Request[keyof Request], Entity>
                        key={index}
                        name={name}
                        baseUrl={baseUrl}
                        selectedRowKeys={selectedRowKeys}
                        selectedRows={selectedRows}
                        render={() => ({
                          name: "新增",
                          columns: action.columns,
                          permission: action.permission,
                          initialValues: action.initialValues,
                          buttonProps: {
                            type: "primary",
                            ...action.buttonProps,
                          },
                          resetOnFinish: true,
                          onFinish: async () => {
                            await tableAction.current?.reload();
                          },
                        })}
                      />
                    );
                  default:
                    return (
                      <Button key={index} type="default" danger>
                        未知操作
                      </Button>
                    );
                }
              } else {
                return action;
              }
            });
          } else {
            return [];
          }
        }}
        tableAlertRender={({ selectedRowKeys, selectedRows }) => {
          let content: React.ReactNode[] = [];
          if (batchActions && tableAction.current && searchForm.current) {
            const actions = batchActions({
              tableAction: tableAction.current,
              searchForm: searchForm.current,
              selectedRowKeys,
              selectedRows,
            });
            content = actions.map((action, index) => {
              if (action && typeof action === "object" && "action" in action) {
                switch (action.action) {
                  case "form":
                    return (
                      // @ts-ignore
                      <ActionForm<Request[keyof Request], Entity>
                        key={index}
                        {...action}
                      />
                    );
                  case "batch":
                    return (
                      // @ts-ignore
                      <ActionForm<Request[keyof Request], Entity>
                        key={index}
                        {...action}
                      />
                    );
                  case "batch-delete":
                    return (
                      <EntityBatchDeleteActionForm
                        key={index}
                        name={name}
                        baseUrl={baseUrl}
                        selectedRowKeys={selectedRowKeys}
                        action={{
                          name: "批量删除",
                          permission: action.permission,
                          baseUrl: action.baseUrl,
                          suffix: action.suffix,
                          buttonProps: {
                            type: "link",
                            ...action.buttonProps,
                          },
                        }}
                        onFinish={async () => {
                          tableAction.current?.clearSelected?.();
                          await tableAction.current?.reload();
                        }}
                      />
                    );
                  default:
                    return (
                      <Button key={index} type="default" danger>
                        未知操作
                      </Button>
                    );
                }
              } else {
                return action;
              }
            });
          }

          return (
            <div className="flex items-center gap-2">
              <div className="flex items-center">
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
              {content}
            </div>
          );
        }}
        tableAlertOptionRender={({ selectedRowKeys, selectedRows }) => {
          if (batchOptionActions && tableAction.current && searchForm.current) {
            const actions = batchOptionActions({
              tableAction: tableAction.current,
              searchForm: searchForm.current,
              selectedRowKeys,
              selectedRows,
            });
            return actions.map((action, index) => {
              if (action && typeof action === "object" && "action" in action) {
                switch (action.action) {
                  case "form":
                    return (
                      // @ts-ignore
                      <ActionForm<Request[keyof Request], Entity>
                        key={index}
                        {...action}
                      />
                    );
                  case "batch":
                    return (
                      // @ts-ignore
                      <ActionForm<Request[keyof Request], Entity>
                        key={index}
                        {...action}
                      />
                    );
                  case "batch-delete":
                    return (
                      <EntityBatchDeleteActionForm
                        key={index}
                        name={name}
                        baseUrl={baseUrl}
                        selectedRowKeys={selectedRowKeys}
                        action={{
                          name: "批量删除",
                          permission: action.permission,
                          baseUrl: action.baseUrl,
                          suffix: action.suffix,
                          buttonProps: {
                            type: "link",
                            ...action.buttonProps,
                          },
                        }}
                        onFinish={async () => {
                          tableAction.current?.clearSelected?.();
                          await tableAction.current?.reload();
                        }}
                      />
                    );
                  default:
                    return (
                      <Button key={index} type="default" danger>
                        未知操作
                      </Button>
                    );
                }
              } else {
                return action;
              }
            });
          } else {
            return null;
          }
        }}
      />
    </Authorization>
  );
};

export default forwardRef(EntityTable) as <
  Entity extends EntityResponse<EntityIdType> = EntityResponse,
  Query extends EntityQuery = EntityQuery,
  Request = Record<string, EntityRequest>,
>(
  props: EntityTableProps<Entity, Query, Request> & {
    tableRef?: React.Ref<EntityTableRef<Query>>;
  },
) => React.ReactElement;
