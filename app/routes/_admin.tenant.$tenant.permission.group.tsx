import type { Route } from ".react-router/types/app/routes/+types/_admin.tenant.$tenant.permission.group";
import { PageContainer } from "@ant-design/pro-components";
import { Button } from "antd";
import { useNavigate } from "react-router";
import { useTenantBasicInfo } from "~/apis/tenant";
import EntityTable from "~/components/table/EntityTable";
import {
  PermissionGroupStatus,
  type PermissionGroupCreateRequest,
  type PermissionGroupQuery,
  type PermissionGroupResponse,
  type PermissionGroupUpdateRequest,
} from "~/types/permission";

export default function TenantPermissionGroupPage({
  params,
}: Route.ComponentProps) {
  const { tenant } = params;
  const navigate = useNavigate();

  const { data: tenantBasicInfo, isPending } = useTenantBasicInfo({
    code: tenant,
  });
  return (
    <PageContainer
      title={tenantBasicInfo?.tenantInfo.name + " 权限组管理"}
      loading={isPending}
      extra={<Button onClick={() => navigate("/tenant")}>返回租户管理</Button>}
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
            scope: "TENANT",
            tenant,
          }}
          toolbarActions={() => [
            {
              action: "create",
              permission: "system.permission-group:create",
              initialValues: {
                tenant,
                name: "",
                scope: "TENANT",
                status: "Y",
                permissions: [],
              },
              columns: [
                {
                  dataIndex: "tenant",
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
                    scope: "TENANT",
                    tenant,
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
                    scope: "TENANT",
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
              columns: [
                {
                  dataIndex: "id",
                  formItemProps: {
                    hidden: true,
                  },
                },
                {
                  dataIndex: "tenant",
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
                  title: "状态",
                  dataIndex: "status",
                  align: "center",
                  valueType: "select",
                  valueEnum: PermissionGroupStatus,
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
                    scope: "TENANT",
                    tenant,
                  },
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
                    scope: "TENANT",
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
            },
          ]}
          batchOptionActions={() => [
            {
              action: "batch-delete",
              permission: "system.permission-group:delete",
            },
          ]}
          columns={[
            {
              title: "名称",
              dataIndex: "name",
              align: "center",
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
