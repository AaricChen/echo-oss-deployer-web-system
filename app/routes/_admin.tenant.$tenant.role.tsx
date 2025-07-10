import type { Route } from ".react-router/types/app/routes/+types/_admin.tenant.$tenant.role";
import { PageContainer } from "@ant-design/pro-components";
import { Button } from "antd";
import { useNavigate } from "react-router";
import { useTenantBasicInfo } from "~/apis/tenant";
import EntityTable from "~/components/entity/EntityTable";
import RolePermissionPreviewer from "~/components/role/RolePermissionPreviewer";
import {
  RoleEntity,
  type RoleCreateRequest,
  type RoleDeleteRequest,
  type RoleQuery,
  type RoleResponse,
  type RoleUpdateRequest,
} from "~/types/role";

export default function TenantRolePage({ params }: Route.ComponentProps) {
  const { tenant } = params;
  const navigate = useNavigate();

  const { data: tenantBasicInfo, isPending } = useTenantBasicInfo({
    code: tenant,
  });
  return (
    <PageContainer
      title={tenantBasicInfo?.tenantInfo.name + " 角色管理"}
      loading={isPending}
      extra={<Button onClick={() => navigate("/tenant")}>返回租户管理</Button>}
    >
      <EntityTable<
        RoleResponse,
        RoleQuery,
        RoleCreateRequest,
        RoleUpdateRequest,
        RoleDeleteRequest
      >
        query={{
          scope: "TENANT",
          tenant,
        }}
        entityConfig={RoleEntity}
        createInitialValues={{
          scope: "TENANT",
          tenant,
          name: "",
          permissions: [],
          permissionGroups: [],
        }}
        columns={[
          {
            dataIndex: "id",
            hideInSearch: true,
            hideInTable: true,
            formItemProps: {
              hidden: true,
            },
          },
          {
            dataIndex: "scope",
            hideInSearch: true,
            hideInTable: true,
            formItemProps: {
              hidden: true,
            },
          },
          {
            dataIndex: "tenant",
            hideInSearch: true,
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
              lg: 12,
            },
          },
          {
            title: "备注",
            dataIndex: "remark",
            align: "center",
            formItemProps: {
              rules: [{ max: 64, message: "备注长度不能超过64个字符" }],
            },
            colProps: {
              xs: 24,
              lg: 12,
            },
          },
          {
            title: "权限组数量",
            dataIndex: "permissionGroups",
            valueType: "permissionGroup" as any,
            hideInSearch: true,
            align: "right",
            formItemProps: {
              label: "权限组列表",
            },
            fieldProps: {
              mode: "multiple",
              scope: "TENANT",
              tenant,
            },
          },
          {
            title: "权限数量",
            dataIndex: "permissions",
            valueType: "permission" as any,
            hideInSearch: true,
            align: "right",
            formItemProps: {
              label: "权限列表",
            },
            fieldProps: {
              scope: "TENANT",
            },
          },
          {
            title: "权限列表",
            dataIndex: "aggregatedPermissions",
            align: "center",
            hideInForm: true,
            hideInSearch: true,
            render: (_, record) => {
              return <RolePermissionPreviewer scope="TENANT" role={record} />;
            },
          },
        ]}
      />
    </PageContainer>
  );
}
