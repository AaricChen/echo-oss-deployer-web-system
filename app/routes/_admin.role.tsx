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
              required: true,
              rules: [{ required: true, message: "请输入名称" }],
            },
            colProps: {
              xs: 12,
            },
          },
          {
            title: "备注",
            dataIndex: "remark",
            formItemProps: {
              required: true,
              rules: [{ required: true, message: "请输入名称" }],
            },
            colProps: {
              xs: 12,
            },
          },
          {
            title: "数据范围",
            dataIndex: "dataScope",
            valueType: "select",
            align: "center",
            formItemProps: {
              required: true,
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
              xs: 12,
            },
            sorter: true,
          },
        ]}
      />
    </PageContainer>
  );
}
