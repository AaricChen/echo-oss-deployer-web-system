import { PageContainer } from "@ant-design/pro-components";
import EntityTable from "~/components/entity/EntityTable";
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
        entityConfig={RoleEntity}
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
            title: "数据范围",
            dataIndex: "dataScope",
            valueType: "select",
            align: "center",
            width: 128,
            formItemProps: {
              rules: [{ required: true, message: "请选择数据范围" }],
            },
            fieldProps: {
              options: [
                { label: "全部", value: "ALL" },
                { label: "本部门及以下", value: "DEPARTMENT_AND_LOWER" },
                { label: "本部门", value: "DEPARTMENT_ONLY" },
                { label: "自定义", value: "CUSTOM" },
                { label: "本人", value: "SELF" },
              ],
              style: {
                width: "100%",
              },
            },
            colProps: {
              xs: 24,
              lg: 8,
            },
            sorter: true,
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
              lg: 8,
            },
          },
          {
            valueType: "dependency",
            name: ["dataScope"],
            hideInTable: true,
            columns: ({ dataScope }) => {
              if (dataScope === "CUSTOM") {
                return [
                  {
                    title: "自定义部门",
                    dataIndex: "departments",
                    valueType: "department" as any,
                    formItemProps: {
                      rules: [{ required: true, message: "请选择部门" }],
                    },
                    fieldProps: {
                      multiple: true,
                    },
                  },
                ];
              } else {
                return [];
              }
            },
          },
          {
            title: "权限数量",
            dataIndex: "permissions",
            valueType: "permission" as any,
            align: "right",
            width: 96,
            formItemProps: {
              label: "权限",
              rules: [{ required: true, message: "请选择角色权限" }],
            },
            fieldProps: {
              multiple: true,
              style: {
                width: "100%",
              },
            },
          },
        ]}
      />
    </PageContainer>
  );
}
