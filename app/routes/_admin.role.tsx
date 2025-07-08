import { PageContainer } from "@ant-design/pro-components";
import EntityTable from "~/components/entity/EntityTable";
import RolePermissionPreviewer from "~/components/role/RolePermissionPreviewer";
import type { PermissionGroupResponse } from "~/types/permission";
import {
  RoleEntity,
  type RoleCreateRequest,
  type RoleDeleteRequest,
  type RoleQuery,
  type RoleResponse,
  type RoleUpdateRequest,
} from "~/types/role";

export default function RolePage() {
  return (
    <PageContainer title="角色管理">
      <EntityTable<
        RoleResponse,
        RoleQuery,
        RoleCreateRequest,
        RoleUpdateRequest,
        RoleDeleteRequest
      >
        query={{
          scope: "SYSTEM",
        }}
        entityConfig={RoleEntity}
        createInitialValues={{
          scope: "SYSTEM",
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
              scope: "SYSTEM",
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
              scope: "SYSTEM",
            },
          },
          {
            title: "权限列表",
            dataIndex: "aggregatedPermissions",
            align: "center",
            hideInForm: true,
            hideInSearch: true,
            render: (_, record) => {
              return <RolePermissionPreviewer scope="SYSTEM" role={record} />;
            },
          },
        ]}
      />
    </PageContainer>
  );
}
