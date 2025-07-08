import { PageContainer } from "@ant-design/pro-components";
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

export default function PermissionGroupPage() {
  return (
    <PageContainer
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
          }}
          entityConfig={PermissionGroupEntity}
          updateButtonProps={(entity) => ({
            disabled: entity.type === "SYSTEM",
          })}
          deleteButtonProps={(entity) => ({
            disabled: entity.type === "SYSTEM",
          })}
          createInitialValues={{
            tenant: "",
            name: "",
            scope: "SYSTEM",
            status: "Y",
            permissions: [],
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
                lg: 8,
              },
            },
            {
              title: "类型",
              dataIndex: "type",
              align: "center",
              valueType: "select",
              valueEnum: PermissionGroupType,
              hideInSearch: true,
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
              hideInSearch: true,
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
              title: "子权限组",
              dataIndex: "children",
              align: "center",
              hideInForm: true,
              hideInSearch: true,
              renderText(text: PermissionGroupResponse[]) {
                return text.map((item) => item.name).join(",");
              },
            },
            {
              title: "权限数量",
              dataIndex: "permissions",
              valueType: "permission" as any,
              align: "center",
              formItemProps: {
                label: "权限列表",
              },
              fieldProps: {
                scope: "SYSTEM",
              },
            },
          ]}
        />
      }
    />
  );
}
