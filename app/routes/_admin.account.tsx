import { PageContainer, useToken } from "@ant-design/pro-components";
import { Button, Tag } from "antd";
import { useNavigate } from "react-router";
import AccountRoleUpdateForm from "~/components/account/AccountRoleUpdateForm";
import EntityTable from "~/components/entity/EntityTable";
import Authorization from "~/components/security/Authorization";
import type {
  AccountCreateRequest,
  AccountDeleteRequest,
  AccountQuery,
  AccountResponse,
  AccountUpdateRequest,
} from "~/types/account";
import { AccountEntity, AccountStatus } from "~/types/account";
import type { RoleResponse } from "~/types/role";

export default function AccountPage() {
  const { token } = useToken();
  const navigate = useNavigate();

  return (
    <PageContainer
      content={
        <EntityTable<
          AccountResponse,
          AccountQuery,
          AccountCreateRequest,
          AccountUpdateRequest,
          AccountDeleteRequest
        >
          query={{ scope: "SYSTEM" }}
          entityConfig={AccountEntity}
          deleteAction={false}
          createInitialValues={{
            scope: "SYSTEM",
          }}
          createAction={{
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
          }}
          updateAction={{
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
          }}
          rowActionRender={({ entity, action }) => {
            return [
              <Authorization
                key="roleUpdateForm"
                permission="system.account-role:update"
              >
                <AccountRoleUpdateForm
                  key="roleUpdateForm"
                  account={entity}
                  scope="SYSTEM"
                  onFinish={async () => {
                    action?.reload();
                  }}
                />
              </Authorization>,
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
              align: "center",
              search: false,
              hideInForm: true,
              renderText: (roles: RoleResponse[]) => {
                const content = roles.map((role) => (
                  <Tag key={role.id}>{role.name}</Tag>
                ));
                return <div>{content}</div>;
              },
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
