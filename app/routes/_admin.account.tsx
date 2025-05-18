import {
  ModalForm,
  PageContainer,
  ProFormSelect,
  ProFormSwitch,
  ProFormText,
  ProTable,
} from "@ant-design/pro-components";
import { Button, Tag } from "antd";
import { useState } from "react";
import { useTableRequest } from "~/hooks/http";
import type { AccountCreateRequest, AccountEntity } from "~/types/account";

export default function Accounts() {
  const [open, setOpen] = useState(false);
  const { mutateAsync: getAccounts } =
    useTableRequest<AccountEntity>("/account");
  return (
    <PageContainer title="账户管理">
      <ProTable<AccountEntity>
        rowKey="id"
        bordered
        headerTitle="账户管理"
        scroll={{ x: "max-content" }}
        columns={[
          {
            title: "账户资料",
            dataIndex: ["accountInfo", "info"],
            hideInTable: true,
            search: {
              transform: (value) => {
                return {
                  info: value,
                };
              },
            },
          },
          {
            title: "头像",
            dataIndex: ["accountInfo", "avatar"],
            valueType: "avatar",
            search: false,
            width: 48,
            fixed: "left",
            align: "center",
          },
          {
            title: "昵称",
            dataIndex: ["accountInfo", "nickname"],
            search: false,
            fixed: "left",
            align: "center",
          },
          {
            title: "用户名",
            dataIndex: "username",
            render: (text: React.ReactNode, record: AccountEntity) => (
              <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <span>{text}</span>
                {record.admin && (
                  <Tag color="blue" style={{ marginLeft: 4 }}>
                    管理员
                  </Tag>
                )}
              </div>
            ),
          },
          {
            title: "邮箱",
            dataIndex: "email",
          },
          {
            title: "手机号",
            dataIndex: "phone",
          },
          {
            title: "状态",
            dataIndex: "disabled",
            valueEnum: {
              true: {
                text: "禁用",
                status: "Error",
              },
              false: {
                text: "正常",
                status: "Success",
              },
            },
            editable: () => true,
          },
          {
            title: "管理员",
            dataIndex: "admin",
            hideInTable: true,
            valueType: "select",
            valueEnum: {
              true: {
                text: "是",
                status: "Success",
              },
              false: {
                text: "否",
                status: "Error",
              },
            },
          },
          {
            title: "登录时间",
            dataIndex: "loginAt",
            valueType: "dateTime",
            hideInSearch: true,
            sorter: true,
          },
          {
            title: "备注",
            dataIndex: ["accountInfo", "remark"],
          },
          {
            title: "真实姓名",
            dataIndex: ["accountInfo", "realname"],
            hideInSearch: true,
          },
          {
            title: "身份证号",
            dataIndex: ["accountInfo", "idCard"],
            hideInSearch: true,
          },
          {
            title: "生日",
            dataIndex: ["accountInfo", "birthday"],
            valueType: "date",
            hideInSearch: true,
            sorter: true,
          },
          {
            title: "性别",
            dataIndex: ["accountInfo", "genderCode"],
            hideInSearch: true,
          },
          {
            title: "国家",
            dataIndex: ["accountInfo", "nationCode"],
            hideInSearch: true,
          },
          {
            title: "省份",
            dataIndex: ["accountInfo", "provinceCode"],
            hideInSearch: true,
          },
          {
            title: "城市",
            dataIndex: ["accountInfo", "cityCode"],
            hideInSearch: true,
          },
          {
            title: "民族",
            dataIndex: ["accountInfo", "nationCode"],
            hideInSearch: true,
          },
          {
            title: "语言",
            dataIndex: ["accountInfo", "languageCode"],
            hideInSearch: true,
          },
          {
            title: "操作",
            dataIndex: "action",
            fixed: "right",
            valueType: "option",
            width: 150,
            render: (text, record) => [<Button type="link">编辑</Button>],
          },
        ]}
        request={async (params, sort, filter) => {
          return getAccounts({ params, sort, filter });
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
          <ModalForm<AccountCreateRequest>
            title="新增账户"
            trigger={
              <Button type="primary" onClick={() => setOpen(true)}>
                新增
              </Button>
            }
            open={open}
            onOpenChange={setOpen}
            onFinish={async (values) => {
              console.log(values);
            }}
          >
            <ProFormText name="username" label="用户名" />
            <ProFormText name="password" label="密码" />
            <ProFormText name="passwordConfirm" label="确认密码" />
            <ProFormSelect name="department" label="部门" />
            <ProFormText name="email" label="邮箱" />
            <ProFormText name="phone" label="手机号" />
            <ProFormSwitch name="admin" label="管理员" />
          </ModalForm>,
        ]}
      />
    </PageContainer>
  );
}
