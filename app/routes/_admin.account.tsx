import { PageContainer, ProTable } from "@ant-design/pro-components";
import { Avatar, Tag } from "antd";
import { useTableRequest } from "~/hooks/http";
import type { AccountEntity } from "~/types/account";

export default function Accounts() {
  const { mutateAsync: getAccounts } =
    useTableRequest<AccountEntity>("/account");
  return (
    <PageContainer title="账户管理">
      <ProTable<AccountEntity>
        rowKey="id"
        search={{}}
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
          },
          {
            title: "昵称",
            dataIndex: ["accountInfo", "nickname"],
            search: false,
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
          },
        ]}
        request={async (params, sort, filter) => {
          return getAccounts({ params, sort, filter });
        }}
      />
    </PageContainer>
  );
}
