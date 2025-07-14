import type { Route } from ".react-router/types/app/routes/+types/_admin.tenant.$tenant.permission.group";
import { PageContainer } from "@ant-design/pro-components";
import { Button } from "antd";
import { useNavigate } from "react-router";
import { useTenantBasicInfo } from "~/apis/tenant";
import EntityTable from "~/components/entity/EntityTable";
import {
  PermissionGroupEntity,
  PermissionGroupStatus,
  PermissionGroupType,
  type PermissionGroupCreateRequest,
  type PermissionGroupDeleteRequest,
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
          PermissionGroupCreateRequest,
          PermissionGroupUpdateRequest,
          PermissionGroupDeleteRequest
        >
          query={{
            root: true,
            scope: "TENANT",
            tenant,
          }}
          entityConfig={PermissionGroupEntity}
          updateButtonProps={(entity) => ({
            disabled: entity.type === "SYSTEM",
          })}
          deleteButtonProps={(entity) => ({
            disabled: entity.type === "SYSTEM",
          })}
          createInitialValues={{
            tenant,
            name: "",
            scope: "TENANT",
            status: "Y",
            permissions: [],
          }}
          columns={[
            {
              dataIndex: "id",
              search: false,
              hideInTable: true,
              formItemProps: {
                hidden: true,
              },
            },
            {
              dataIndex: "scope",
              search: false,
              hideInTable: true,
              formItemProps: {
                hidden: true,
              },
            },
            {
              dataIndex: "tenant",
              search: false,
              hideInTable: true,
              formItemProps: {
                hidden: true,
              },
            },
            {
              title: "名称",
              dataIndex: "name",
              align: "center",
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
              title: "类型",
              dataIndex: "type",
              align: "center",
              valueType: "select",
              valueEnum: PermissionGroupType,
              hideInForm: true,
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
              title: "子权限组",
              dataIndex: "children",
              align: "center",
              hideInForm: true,
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
              formItemProps: {
                label: "权限列表",
              },
              fieldProps: {
                scope: "TENANT",
                tenant,
              },
            },
          ]}
        />
      }
    />
  );
}
