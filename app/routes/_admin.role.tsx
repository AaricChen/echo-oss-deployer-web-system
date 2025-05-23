import { PageContainer } from "@ant-design/pro-components";
import EntityTable from "~/components/entity/EntityTable";
import DepartmentSelect from "~/components/form/DepartmentSelect";
import PermissionSelect from "~/components/form/PermissionSelect";
import {
  RoleEntity,
  type RoleCreateRequest,
  type RoleDeleteRequest,
  type RoleQuery,
  type RoleResponse,
  type RoleUpdateRequest,
} from "~/types/role";

export default function Accounts() {
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
            title: "名称",
            dataIndex: "name",
            formItemProps: {
              rules: [
                { required: true, message: "请输入名称" },
                { max: 32, message: "名称长度不能超过32个字符" },
              ],
            },
            colProps: {
              xs: 8,
            },
          },
          {
            title: "数据范围",
            dataIndex: "dataScope",
            valueType: "select",
            align: "center",
            formItemProps: {
              rules: [{ required: true, message: "请输入名称" }],
            },
            fieldProps: {
              options: [
                { label: "全部", value: "ALL" },
                { label: "本部门及以下", value: "DEPARTMENT_AND_LOWER" },
                { label: "本部门", value: "DEPARTMENT_ONLY" },
                { label: "自定义", value: "CUSTOM" },
                { label: "本人", value: "SELF" },
              ],
            },
            colProps: {
              xs: 8,
            },
            sorter: true,
          },
          {
            title: "备注",
            dataIndex: "remark",
            formItemProps: {
              rules: [{ max: 64, message: "备注长度不能超过255个字符" }],
            },
            colProps: {
              xs: 8,
            },
          },
          {
            title: "权限数量",
            dataIndex: "permissions",
            hideInSearch: true,
            renderText(text, record, index, action) {
              return record.permissions.length;
            },
            renderFormItem: (_) => {
              return <PermissionSelect multiple />;
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
                    hideInTable: true,
                    renderFormItem: (_) => {
                      return <DepartmentSelect multiple />;
                    },
                  },
                ];
              } else {
                return [];
              }
            },
          },
        ]}
      />
    </PageContainer>
  );
}
