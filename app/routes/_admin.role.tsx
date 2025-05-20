import {
  ModalForm,
  PageContainer,
  ProFormSelect,
  ProFormText,
  ProTable,
} from "@ant-design/pro-components";
import { Button } from "antd";
import { useState } from "react";
import { useCreateRole } from "~/apis/role";
import { useTableRequest } from "~/hooks/http";
import type { RoleCreateRequest, RoleResponse } from "~/types/role";

export default function Accounts() {
  const [open, setOpen] = useState(false);
  const { mutateAsync: getRoles } = useTableRequest<RoleResponse>("/role");
  const { mutateAsync: createRole } = useCreateRole();
  return (
    <PageContainer title="角色管理">
      <ProTable<RoleResponse>
        rowKey="id"
        bordered
        headerTitle="角色管理"
        scroll={{ x: "max-content" }}
        columns={[
          {
            title: "名称",
            dataIndex: "name",
          },
          {
            title: "备注",
            dataIndex: "remark",
          },
        ]}
        request={async (params, sort, filter) => {
          return getRoles({ params, sort, filter });
        }}
        rowSelection={{
          type: "checkbox",
          onChange: (selectedRowKeys, selectedRows) => {},
        }}
        editable={{
          type: "multiple",
          onSave: async (row) => {
            console.log(row);
          },
        }}
        toolBarRender={() => [
          <ModalForm<RoleCreateRequest>
            title="新增角色"
            trigger={
              <Button type="primary" onClick={() => setOpen(true)}>
                新增
              </Button>
            }
            open={open}
            onOpenChange={setOpen}
            onFinish={async (values) => {
              await createRole(values);
            }}
          >
            <ProFormText name="name" label="名称" required />
            <ProFormText name="remark" label="备注" required />
            <ProFormSelect
              name="dataScope"
              label="数据范围"
              required
              options={[
                {
                  label: "全部",
                  value: "ALL",
                },
                {
                  label: "本部门及以下",
                  value: "DEPARTMENT_AND_LOWER",
                },
                {
                  label: "本部门",
                  value: "DEPARTMENT_ONLY",
                },
                {
                  label: "自定义",
                  value: "CUSTOM",
                },
                {
                  label: "本人",
                  value: "SELF",
                },
              ]}
            />
          </ModalForm>,
        ]}
      />
    </PageContainer>
  );
}
