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
  type PermissionResponse,
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
          createInitialValues={{
            tenant: "",
            name: "",
            scope: "SYSTEM",
            status: "Y",
            parent: "",
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
                lg: 12,
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
              colProps: {
                xs: 24,
                lg: 12,
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
                lg: 12,
              },
            },
            {
              title: "子权限组",
              dataIndex: "children",
              align: "center",
              hideInForm: true,
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
