import { PageContainer } from "@ant-design/pro-components";
import RolePermissionPreviewer from "~/components/role/RolePermissionPreviewer";
import EntityTable from "~/components/table/EntityTable";
import {
  type RoleCreateRequest,
  type RoleQuery,
  type RoleResponse,
  type RoleUpdateRequest,
} from "~/types/role";

export default function RolePage() {
  return (
    <PageContainer>
      <EntityTable<
        RoleResponse,
        RoleQuery,
        {
          create: RoleCreateRequest;
          update: RoleUpdateRequest;
        }
      >
        entity="role"
        name="角色"
        baseUrl="/role"
        permission="system.role:query"
        query={{
          scope: "SYSTEM",
        }}
        toolbarActions={() => [
          {
            action: "create",
            initialValues: {
              scope: "SYSTEM",
              name: "",
              permissions: [],
              permissionGroups: [],
            },
            columns: [
              {
                dataIndex: "scope",
                formItemProps: {
                  hidden: true,
                },
              },
              {
                title: "名称",
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
                title: "备注",
                dataIndex: "remark",
                formItemProps: {
                  rules: [{ max: 64, message: "备注长度不能超过64个字符" }],
                },
                colProps: {
                  xs: 24,
                  lg: 12,
                },
              },
              {
                title: "权限组",
                dataIndex: "permissionGroups",
                valueType: "permissionGroup" as any,
                fieldProps: {
                  mode: "multiple",
                  scope: "SYSTEM",
                },
              },
              {
                title: "权限",
                dataIndex: "permissions",
                valueType: "permission" as any,
                fieldProps: {
                  scope: "SYSTEM",
                },
              },
            ],
          },
        ]}
        rowActions={() => [
          {
            action: "update",
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
                title: "名称",
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
                title: "备注",
                dataIndex: "remark",
                formItemProps: {
                  rules: [{ max: 64, message: "备注长度不能超过64个字符" }],
                },
                colProps: {
                  xs: 24,
                  lg: 12,
                },
              },
              {
                title: "权限组",
                dataIndex: "permissionGroups",
                valueType: "permissionGroup" as any,
                fieldProps: {
                  mode: "multiple",
                  scope: "SYSTEM",
                },
              },
              {
                title: "权限",
                dataIndex: "permissions",
                valueType: "permission" as any,
                fieldProps: {
                  scope: "SYSTEM",
                },
              },
            ],
          },
          {
            action: "delete",
          },
        ]}
        batchOptionActions={() => [
          {
            action: "batch-delete",
          },
        ]}
        columns={[
          {
            title: "名称",
            dataIndex: "name",
            align: "center",
          },
          {
            title: "备注",
            dataIndex: "remark",
            align: "center",
          },
          {
            title: "权限组数量",
            dataIndex: "permissionGroups",
            valueType: "permissionGroup" as any,
            search: false,
            align: "right",
          },
          {
            title: "权限数量",
            dataIndex: "permissions",
            valueType: "permission" as any,
            align: "right",
          },
          {
            title: "权限列表",
            dataIndex: "aggregatedPermissions",
            align: "center",
            search: false,
            render: (_, record) => {
              return <RolePermissionPreviewer scope="SYSTEM" role={record} />;
            },
          },
        ]}
      />
    </PageContainer>
  );
}
