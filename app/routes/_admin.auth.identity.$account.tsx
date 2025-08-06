import type { Route } from ".react-router/types/app/routes/+types/_admin.auth.identity.$account";
import { PageContainer } from "@ant-design/pro-components";
import { Button } from "antd";
import { useNavigate } from "react-router";
import { useSearchParam } from "react-use";
import AccountAvatar from "~/components/common/AccountAvatar";
import StatusBadge from "~/components/common/StatusBadge";
import EntityTable from "~/components/table/EntityTable";
import { useGet } from "~/hooks/http";
import type { AccountResponse } from "~/types/account";
import {
  AuthIdentityType,
  type AuthIdentityCreateRequest,
  type AuthIdentityQuery,
  type AuthIdentityResponse,
  type AuthIdentityUpdateRequest,
} from "~/types/auth";

export default function AuthIdentityAccountPage({
  params,
}: Route.ComponentProps) {
  const { account } = params;
  const navigate = useNavigate();
  const redirect = useSearchParam("redirect");

  const { data, isSuccess } = useGet<AccountResponse>({
    queryKey: ["account", account],
    url: `/account/${account}`,
  });

  return (
    <PageContainer
      title={
        isSuccess ? <AccountAvatar {...data.accountInfo} /> : "账户认证凭据管理"
      }
      extra={
        redirect && <Button onClick={() => navigate(redirect)}>返回</Button>
      }
      content={
        <EntityTable<
          AuthIdentityResponse,
          AuthIdentityQuery,
          {
            create: AuthIdentityCreateRequest;
            update: AuthIdentityUpdateRequest;
          }
        >
          entity="auth-identity"
          name="认证凭据"
          tooltip="认证凭据用于使账户登录到系统，一个账户可以有多个认证凭据"
          baseUrl="/auth/identity"
          permission="system.auth-identity:query"
          query={{ account }}
          toolbarActions={() => [
            {
              action: "create",
              permission: "system.auth-identity:create",
              initialValues: {
                account,
                type: "USERNAME",
              },
              columns: [
                {
                  dataIndex: "account",
                  formItemProps: {
                    hidden: true,
                  },
                },
                {
                  title: "凭据类型",
                  dataIndex: "type",
                  valueType: "select",
                  valueEnum: AuthIdentityType,
                  formItemProps: {
                    rules: [{ required: true, message: "请选择凭据类型" }],
                  },
                },
                {
                  valueType: "dependency",
                  name: ["type"],
                  columns: (values: AuthIdentityCreateRequest) => {
                    if (
                      values.type === "USERNAME" ||
                      values.type === "PHONE" ||
                      values.type === "EMAIL"
                    ) {
                      const title =
                        values.type === "USERNAME"
                          ? "用户名"
                          : values.type === "PHONE"
                            ? "手机号"
                            : "邮箱";
                      return [
                        {
                          title,
                          dataIndex: "identity",
                          formItemProps: {
                            rules: [
                              { required: true, message: "请输入用户名" },
                            ],
                          },
                        },
                        {
                          title: "密码",
                          dataIndex: "credential",
                          formItemProps: {
                            rules: [{ required: true, message: "请输入密码" }],
                          },
                          fieldProps: {
                            type: "password",
                          },
                          convertValue: (value: string) => {
                            if (
                              value?.split("").every((char) => char === "*")
                            ) {
                              return "";
                            }
                            return value;
                          },
                        },
                      ];
                    } else if (values.type === "CRYPTO_ADDRESS") {
                      return [
                        {
                          title: "钱包地址",
                          dataIndex: "identity",
                          formItemProps: {
                            rules: [
                              { required: true, message: "请输入钱包地址" },
                            ],
                          },
                        },
                      ];
                    }
                    return [];
                  },
                },
                {
                  title: "凭据",
                  dataIndex: "credential",
                  search: false,
                  hideInForm: true,
                  align: "center",
                  renderText(text) {
                    return (
                      <StatusBadge
                        value={!!text}
                        trueText="已设置"
                        falseText="未设置"
                      />
                    );
                  },
                },
              ],
            },
          ]}
          rowActions={() => [
            {
              action: "update",
              permission: "system.auth-identity:update",
              columns: [
                {
                  dataIndex: "id",
                  formItemProps: {
                    hidden: true,
                  },
                },
                {
                  dataIndex: "account",
                  formItemProps: {
                    hidden: true,
                  },
                },
                {
                  title: "凭据类型",
                  dataIndex: "type",
                  valueType: "select",
                  valueEnum: AuthIdentityType,
                  formItemProps: {
                    rules: [{ required: true, message: "请选择凭据类型" }],
                  },
                  fieldProps: {
                    disabled: true,
                  },
                },
                {
                  valueType: "dependency",
                  name: ["type"],
                  columns: (values: AuthIdentityCreateRequest) => {
                    if (
                      values.type === "USERNAME" ||
                      values.type === "PHONE" ||
                      values.type === "EMAIL"
                    ) {
                      const title =
                        values.type === "USERNAME"
                          ? "用户名"
                          : values.type === "PHONE"
                            ? "手机号"
                            : "邮箱";
                      return [
                        {
                          title,
                          dataIndex: "identity",
                          formItemProps: {
                            rules: [
                              { required: true, message: "请输入用户名" },
                            ],
                          },
                        },
                        {
                          title: "密码",
                          dataIndex: "credential",
                          formItemProps: {
                            rules: [{ required: true, message: "请输入密码" }],
                          },
                          fieldProps: {
                            type: "password",
                          },
                          convertValue: (value: string) => {
                            if (
                              value?.split("").every((char) => char === "*")
                            ) {
                              return "";
                            }
                            return value;
                          },
                        },
                      ];
                    } else if (values.type === "CRYPTO_ADDRESS") {
                      return [
                        {
                          title: "钱包地址",
                          dataIndex: "identity",
                          formItemProps: {
                            rules: [
                              { required: true, message: "请输入钱包地址" },
                            ],
                          },
                        },
                      ];
                    }
                    return [];
                  },
                },
              ],
            },
            {
              action: "delete",
              permission: "system.auth-identity:delete",
            },
          ]}
          batchOptionActions={() => [
            {
              action: "batch-delete",
              permission: "system.auth-identity:delete",
            },
          ]}
          columns={[
            {
              title: "凭据类型",
              dataIndex: "type",
              valueType: "select",
              align: "center",
              valueEnum: AuthIdentityType,
            },
            {
              title: "凭据标识",
              dataIndex: "identity",
              align: "center",
            },
            {
              title: "凭据",
              dataIndex: "credential",
              search: false,
              align: "center",
              renderText(text) {
                return (
                  <StatusBadge
                    value={!!text}
                    trueText="已设置"
                    falseText="未设置"
                  />
                );
              },
            },
          ]}
        />
      }
    />
  );
}
