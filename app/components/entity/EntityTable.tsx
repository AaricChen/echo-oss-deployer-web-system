import {
  ProTable,
  type ActionType,
  type ProColumns,
} from "@ant-design/pro-components";
import { Button } from "antd";
import { useMemo, useRef } from "react";
import { useDelete, useTableRequest } from "~/hooks/http";
import type {
  EntityConfig,
  EntityIdType,
  EntityResponse,
} from "~/types/entity";

export interface EntityTableProps<Entity extends EntityResponse<EntityIdType>> {
  entityConfig: EntityConfig;
  columns: ProColumns<Entity, "text">[];
  headerTitle?: React.ReactNode;
  rowAction?: EntityTableAction;
}

export type EntityTableAction =
  | false
  | {
      name: string;
      url?: string;
    };

export default function EntityTable<
  Entity extends EntityResponse<EntityIdType>,
>({ entityConfig, columns, headerTitle, rowAction }: EntityTableProps<Entity>) {
  const tableAction = useRef<ActionType>(null);
  const { mutateAsync: getEntities } = useTableRequest<Entity>(
    entityConfig.baseUrl,
  );
  const { mutateAsync: deleteEntities } = useDelete({
    url: entityConfig.baseUrl,
  });

  const hasRowSelection = useMemo(() => {
    return true;
  }, []);

  const hasRowAction = useMemo(() => {
    return rowAction !== false;
  }, [rowAction]);

  const tableColumns: ProColumns<Entity, "text">[] = useMemo(() => {
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
      bordered
      actionRef={tableAction}
      scroll={{ x: "max-content" }}
      rowKey={entityConfig.entityIdField ?? "id"}
      headerTitle={headerTitle ?? `${entityConfig.name}管理`}
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
        return getEntities({ params, sort, filter });
      }}
      columns={tableColumns}
    />
  );
}
