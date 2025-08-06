import { PageContainer } from "@ant-design/pro-components";
import EntityTable from "~/components/table/EntityTable";
import {
  PermissionGroupStatus,
  PermissionGroupType,
  type PermissionGroupCreateRequest,
  type PermissionGroupQuery,
  type PermissionGroupResponse,
  type PermissionGroupUpdateRequest,
} from "~/types/permission";

export default function PermissionGroupPage() {
  return (
    <PageContainer
      content={
        <EntityTable<
          PermissionGroupResponse,
          PermissionGroupQuery,
          {
            create: PermissionGroupCreateRequest;
            update: PermissionGroupUpdateRequest;
          }
        >
          entity="permission-group"
          name="权限组"
          baseUrl="/permission/group"
          permission="system.permission-group:query"
          query={{
            root: true,
            scope: "SYSTEM",
          }}
          toolbarActions={() => [
            {
              action: "create",
              permission: "system.permission-group:create",
              initialValues: {
                tenant: "",
                name: "",
                scope: "SYSTEM",
                status: "Y",
                permissions: [],
              },
              columns: [
                {
                  dataIndex: "scope",
                  formItemProps: {
                    hidden: true,
                  },
                },
                {
                  dataIndex: "status",
                  formItemProps: {
                    hidden: true,
                  },
                },
                {
                  title: "权限组名称",
                  dataIndex: "name",
                  formItemProps: {
                    rules: [
                      { required: true, message: "请输入名称" },
                      { max: 32, message: "名称长度不能超过32个字符" },
                    ],
                  },
                  colProps: {
                    xs: 24,
                    lg: 12,
                  },
                },
                {
                  title: "父权限组",
                  dataIndex: "parent",
                  align: "center",
                  valueType: "permissionGroup" as any,
                  search: false,
                  hideInTable: true,
                  fieldProps: {
                    scope: "SYSTEM",
                  },
                  colProps: {
                    xs: 24,
                    lg: 12,
                  },
                },
                {
                  title: "权限列表",
                  dataIndex: "permissions",
                  valueType: "permission" as any,
                  fieldProps: {
                    scope: "SYSTEM",
                  },
                  colProps: {
                    xs: 24,
                  },
                },
              ],
            },
          ]}
          rowActions={({ entity }) => [
            {
              action: "update",
              permission: "system.permission-group:update",
              buttonProps: {
                disabled: entity.type === "SYSTEM",
              },
              columns: [
                {
                  dataIndex: "id",
                  formItemProps: {
                    hidden: true,
                  },
                },
                {
                  dataIndex: "scope",
                  formItemProps: {
                    hidden: true,
                  },
                },
                {
                  title: "权限组名称",
                  dataIndex: "name",
                  formItemProps: {
                    rules: [
                      { required: true, message: "请输入名称" },
                      { max: 32, message: "名称长度不能超过32个字符" },
                    ],
                  },
                  colProps: {
                    xs: 24,
                    lg: 8,
                  },
                },
                {
                  title: "父权限组",
                  dataIndex: "parent",
                  align: "center",
                  valueType: "permissionGroup" as any,
                  search: false,
                  hideInTable: true,
                  fieldProps: {
                    scope: "SYSTEM",
                  },
                  colProps: {
                    xs: 24,
                    lg: 8,
                  },
                },
                {
                  title: "状态",
                  dataIndex: "status",
                  valueType: "select",
                  valueEnum: PermissionGroupStatus,
                  colProps: {
                    xs: 24,
                    lg: 8,
                  },
                },
                {
                  title: "权限列表",
                  dataIndex: "permissions",
                  valueType: "permission" as any,
                  fieldProps: {
                    scope: "SYSTEM",
                  },
                  colProps: {
                    xs: 24,
                  },
                },
              ],
            },
            {
              action: "delete",
              permission: "system.permission-group:delete",
              buttonProps: {
                disabled: entity.type === "SYSTEM",
              },
            },
          ]}
          batchOptionActions={({ selectedRows }) => [
            {
              action: "batch-delete",
              permission: "system.permission-group:delete",
              buttonProps: {
                disabled:
                  !selectedRows ||
                  selectedRows.some((item) => item.type === "SYSTEM"),
              },
            },
          ]}
          columns={[
            {
              width: 1,
              search: false,
            },
            {
              title: "名称",
              dataIndex: "name",
              align: "center",
            },
            {
              title: "类型",
              dataIndex: "type",
              align: "center",
              valueType: "select",
              valueEnum: PermissionGroupType,
            },
            {
              title: "状态",
              dataIndex: "status",
              align: "center",
              valueType: "select",
              valueEnum: PermissionGroupStatus,
            },
            {
              title: "子权限组",
              dataIndex: "children",
              align: "center",
              search: false,
              renderText(text: PermissionGroupResponse[]) {
                return text.map((item) => item.name).join(",");
              },
            },
            {
              title: "权限数量",
              dataIndex: "permissions",
              valueType: "permission" as any,
              align: "right",
            },
          ]}
        />
      }
    />
  );
}
