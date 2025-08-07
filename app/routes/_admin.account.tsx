import { PageContainer, useToken } from "@ant-design/pro-components";
import { Button, Tag } from "antd";
import { useNavigate } from "react-router";
import Authorization from "~/components/security/Authorization";
import EntityTable from "~/components/table/EntityTable";
import type {
  AccountCreateRequest,
  AccountQuery,
  AccountResponse,
  AccountRoleUpdateRequest,
  AccountUpdateRequest,
} from "~/types/account";
import { AccountStatus } from "~/types/account";

export default function AccountPage() {
  const { token } = useToken();
  const navigate = useNavigate();

  return (
    <PageContainer
      content={
        <EntityTable<
          AccountResponse,
          AccountQuery,
          {
            create: AccountCreateRequest;
            update: AccountUpdateRequest;
            roleUpdate: AccountRoleUpdateRequest;
          }
        >
          entity="account"
          name="系统账户"
          baseUrl="/account"
          permission="system.account:query"
          query={{ scope: "SYSTEM" }}
          toolbarActions={() => [
            {
              action: "create",
              permission: "system.account:create",
              initialValues: {
                scope: "SYSTEM",
              },
              columns: [
                {
                  dataIndex: "scope",
                  formItemProps: {
                    hidden: true,
                  },
                },
                {
                  title: "账户昵称",
                  dataIndex: ["accountInfo", "nickname"],
                  formItemProps: {
                    rules: [{ required: true, message: "请输入账户昵称" }],
                  },
                  fieldProps: {
                    placeholder: "请输入账户昵称",
                  },
                  colProps: {
                    xs: 24,
                    lg: 12,
                  },
                },
                {
                  title: "备注信息",
                  dataIndex: ["accountInfo", "remark"],
                  colProps: {
                    xs: 24,
                    lg: 12,
                  },
                },
                {
                  title: "真实姓名",
                  dataIndex: ["accountInfo", "realname"],
                  colProps: {
                    xs: 24,
                    lg: 6,
                  },
                },
                {
                  title: "性别",
                  dataIndex: ["accountInfo", "gender"],
                  valueType: "systemDict" as any,
                  fieldProps: {
                    dict: "gender",
                  },
                  colProps: {
                    xs: 24,
                    lg: 6,
                  },
                },
                {
                  title: "身份证号",
                  dataIndex: ["accountInfo", "idCard"],
                  colProps: {
                    xs: 24,
                    lg: 12,
                  },
                },
                {
                  title: "民族",
                  dataIndex: ["accountInfo", "nation"],
                  valueType: "systemDict" as any,
                  fieldProps: {
                    dict: "nation",
                  },
                  colProps: {
                    xs: 24,
                    lg: 8,
                  },
                },
                {
                  title: "生日",
                  dataIndex: ["accountInfo", "birthday"],
                  valueType: "date",
                  fieldProps: {
                    style: {
                      width: "100%",
                    },
                  },
                  colProps: {
                    xs: 24,
                    lg: 8,
                  },
                },
                {
                  title: "语言",
                  dataIndex: ["accountInfo", "language"],
                  valueType: "systemDict" as any,
                  fieldProps: {
                    dict: "language",
                  },
                  colProps: {
                    xs: 24,
                    lg: 8,
                  },
                },
                {
                  title: "行政区",
                  dataIndex: ["accountInfo", "district"],
                  valueType: "district" as any,
                  colProps: {
                    xs: 24,
                  },
                },
                {
                  title: "简介",
                  dataIndex: ["accountInfo", "bio"],
                  colProps: {
                    xs: 24,
                  },
                },
                {
                  title: "地址",
                  dataIndex: ["accountInfo", "address"],
                  colProps: {
                    xs: 24,
                  },
                },
              ],
            },
          ]}
          rowActions={({ tableAction, entity }) => {
            return [
              {
                action: "row",
                render: () => ({
                  name: "分配角色",
                  suffix: "/role",
                  permission: "system.account-update:role",
                  buttonProps: {
                    type: "link",
                  },
                  columns: [
                    {
                      dataIndex: "id",
                      formItemProps: {
                        hidden: true,
                      },
                    },
                    {
                      title: "角色",
                      dataIndex: "roles",
                      valueType: "role" as any,
                      fieldProps: {
                        scope: "SYSTEM",
                      },
                    },
                  ],
                  onFinish: async () => {
                    await tableAction.reload();
                  },
                }),
              },
              <Authorization
                key="credential"
                permission="system.auth-identity:query"
              >
                <Button
                  type="link"
                  onClick={() =>
                    navigate(`/auth/identity/${entity.id}?redirect=/account`)
                  }
                >
                  凭据管理
                </Button>
              </Authorization>,
              {
                action: "update",
                permission: "system.account:update",
                columns: [
                  {
                    dataIndex: "id",
                    formItemProps: {
                      hidden: true,
                    },
                  },
                  {
                    title: "账户昵称",
                    dataIndex: ["accountInfo", "nickname"],
                    formItemProps: {
                      rules: [{ required: true, message: "请输入账户昵称" }],
                    },
                    fieldProps: {
                      placeholder: "请输入账户昵称",
                    },
                    colProps: {
                      xs: 24,
                      lg: 8,
                    },
                  },
                  {
                    title: "备注信息",
                    dataIndex: ["accountInfo", "remark"],
                    colProps: {
                      xs: 24,
                      lg: 8,
                    },
                  },
                  {
                    title: "状态",
                    dataIndex: "status",
                    align: "center",
                    valueEnum: AccountStatus,
                    colProps: {
                      xs: 24,
                      lg: 8,
                    },
                  },
                  {
                    title: "真实姓名",
                    dataIndex: ["accountInfo", "realname"],
                    colProps: {
                      xs: 24,
                      lg: 6,
                    },
                  },
                  {
                    title: "性别",
                    dataIndex: ["accountInfo", "gender"],
                    valueType: "systemDict" as any,
                    fieldProps: {
                      dict: "gender",
                    },
                    colProps: {
                      xs: 24,
                      lg: 6,
                    },
                  },
                  {
                    title: "身份证号",
                    dataIndex: ["accountInfo", "idCard"],
                    colProps: {
                      xs: 24,
                      lg: 12,
                    },
                  },
                  {
                    title: "民族",
                    dataIndex: ["accountInfo", "nation"],
                    valueType: "systemDict" as any,
                    fieldProps: {
                      dict: "nation",
                    },
                    colProps: {
                      xs: 24,
                      lg: 8,
                    },
                  },
                  {
                    title: "生日",
                    dataIndex: ["accountInfo", "birthday"],
                    valueType: "date",
                    fieldProps: {
                      style: {
                        width: "100%",
                      },
                    },
                    colProps: {
                      xs: 24,
                      lg: 8,
                    },
                  },
                  {
                    title: "语言",
                    dataIndex: ["accountInfo", "language"],
                    valueType: "systemDict" as any,
                    fieldProps: {
                      dict: "language",
                    },
                    colProps: {
                      xs: 24,
                      lg: 8,
                    },
                  },
                  {
                    title: "行政区",
                    dataIndex: ["accountInfo", "district"],
                    valueType: "district" as any,
                    colProps: {
                      xs: 24,
                    },
                  },
                  {
                    title: "简介",
                    dataIndex: ["accountInfo", "bio"],
                    colProps: {
                      xs: 24,
                    },
                  },
                  {
                    title: "地址",
                    dataIndex: ["accountInfo", "address"],
                    colProps: {
                      xs: 24,
                    },
                  },
                ],
              },
            ];
          }}
          columns={[
            {
              title: "账户资料",
              dataIndex: ["accountInfo", "info"],
              hideInTable: true,
              fieldProps: {
                placeholder: "昵称/真实姓名/备注 模糊搜索",
              },
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
              render: (text: React.ReactNode, record: AccountResponse) => (
                <div className="flex items-center gap-2">
                  <span
                    className="grow"
                    style={{
                      color: record.authenticateAt
                        ? token.colorText
                        : token.colorTextDisabled,
                    }}
                  >
                    {text}
                  </span>
                  {record.admin && (
                    <Tag color="blue" style={{ marginLeft: 4 }}>
                      管理员
                    </Tag>
                  )}
                </div>
              ),
            },
            {
              title: "账户角色",
              dataIndex: "roles",
              valueType: "role" as any,
              align: "center",
              search: false,
            },
            {
              title: "状态",
              dataIndex: "status",
              align: "center",
              valueEnum: AccountStatus,
            },
            {
              title: "登录时间",
              dataIndex: "authenticateAt",
              align: "center",
              valueType: "dateTimeRange",
              sorter: true,
              render(_, entity) {
                return entity.authenticateAt;
              },
            },
            {
              title: "创建时间",
              dataIndex: "createAt",
              align: "center",
              valueType: "dateTimeRange",
              sorter: true,
              render(_, entity) {
                return entity.createAt;
              },
            },
            {
              title: "备注",
              align: "center",
              dataIndex: ["accountInfo", "remark"],
              search: false,
            },
            {
              title: "真实姓名",
              align: "center",
              dataIndex: ["accountInfo", "realname"],
              search: false,
            },
            {
              title: "性别",
              align: "center",
              dataIndex: ["accountInfo", "gender"],
              valueType: "systemDict" as any,
              fieldProps: {
                dict: "gender",
              },
              search: false,
            },
            {
              title: "身份证号",
              align: "center",
              dataIndex: ["accountInfo", "idCard"],
              search: false,
            },
            {
              title: "民族",
              align: "center",
              dataIndex: ["accountInfo", "nation"],
              valueType: "systemDict" as any,
              fieldProps: {
                dict: "nation",
              },
              search: false,
            },
            {
              title: "生日",
              align: "center",
              dataIndex: ["accountInfo", "birthday"],
              valueType: "date",
              search: false,
            },
            {
              title: "语言",
              align: "center",
              dataIndex: ["accountInfo", "language"],
              valueType: "systemDict" as any,
              fieldProps: {
                dict: "language",
              },
              search: false,
            },
            {
              title: "行政区",
              align: "center",
              dataIndex: ["accountInfo", "district"],
              valueType: "district" as any,
              search: false,
            },
            {
              title: "地址",
              align: "center",
              dataIndex: ["accountInfo", "address"],
              search: false,
            },
          ]}
        />
      }
    />
  );
}
