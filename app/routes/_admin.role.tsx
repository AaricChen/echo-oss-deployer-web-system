import {
  ModalForm,
  PageContainer,
  ProFormSelect,
  ProFormText,
  ProTable,
  type ActionType,
} from "@ant-design/pro-components";
import { Button, Modal } from "antd";
import { useRef, useState } from "react";
import { useCreateRole, useDeleteRole } from "~/apis/role";
import { useTableRequest } from "~/hooks/http";
import type { RoleCreateRequest, RoleResponse } from "~/types/role";

export default function Accounts() {
  const tableRef = useRef<ActionType>(null);
  const { mutateAsync: getRoles } = useTableRequest<RoleResponse>("/role");
  const { mutateAsync: createRole } = useCreateRole();
  const { mutateAsync: deleteRole } = useDeleteRole();
  const [open, setOpen] = useState(false);
  return (
    <PageContainer title="角色管理">
      <ProTable<RoleResponse>
        actionRef={tableRef}
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
          {
            title: "操作",
            dataIndex: "action",
            valueType: "option",
            render: (_, record) => [
              <Button type="link" onClick={() => setOpen(true)}>
                编辑
              </Button>,
              <Button type="link" onClick={() => setOpen(true)}>
                删除
              </Button>,
            ],
          },
        ]}
        request={async (params, sort, filter) => {
          return getRoles({ params, sort, filter });
        }}
        rowSelection={{
          type: "checkbox",
        }}
        tableAlertOptionRender={({ selectedRows }) => (
          <>
            <Button
              type="link"
              danger
              onClick={() => {
                Modal.confirm({
                  title: `确定删除${selectedRows.length}条数据吗？`,
                  onOk: async () => {
                    await deleteRole({
                      ids: selectedRows.map((row) => row.id),
                    });
                    tableRef.current?.reload();
                  },
                });
              }}
            >
              批量删除
            </Button>
          </>
        )}
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
              setOpen(false);
              tableRef.current?.reload();
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
