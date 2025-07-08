import type { Route } from ".react-router/types/app/routes/+types/_admin.auth.identity.$account";
import { PageContainer, type FormInstance } from "@ant-design/pro-components";
import StatusBadge from "~/components/common/StatusBadge";
import EntityTable from "~/components/entity/EntityTable";
import {
  AuthIdentityEntity,
  AuthIdentityType,
  type AuthIdentityCreateRequest,
  type AuthIdentityDeleteRequest,
  type AuthIdentityQuery,
  type AuthIdentityResponse,
  type AuthIdentityUpdateRequest,
} from "~/types/auth";

export default function AuthIdentityAccountPage({
  params,
}: Route.ComponentProps) {
  const { account } = params;
  return (
    <PageContainer
      content={
        <EntityTable<
          AuthIdentityResponse,
          AuthIdentityQuery,
          AuthIdentityCreateRequest,
          AuthIdentityUpdateRequest,
          AuthIdentityDeleteRequest
        >
          query={{ account }}
          entityConfig={AuthIdentityEntity}
          deleteAction={false}
          createInitialValues={{
            account,
            type: "USERNAME",
          }}
          columns={[
            {
              dataIndex: "id",
              hideInTable: true,
              hideInSearch: true,
              formItemProps: {
                hidden: true,
              },
            },
            {
              dataIndex: "account",
              hideInTable: true,
              hideInSearch: true,
              formItemProps: {
                hidden: true,
              },
            },
            {
              title: "凭据类型",
              dataIndex: "type",
              valueType: "select",
              align: "center",
              valueEnum: AuthIdentityType,
              formItemProps: {
                rules: [{ required: true, message: "请选择凭据类型" }],
              },
              fieldProps: (form?: FormInstance) => {
                if (form) {
                  const id = form.getFieldValue("id");
                  return {
                    disabled: !!id,
                  };
                }
                return {};
              },
            },
            {
              title: "凭据标识",
              dataIndex: "identity",
              align: "center",
              hideInForm: true,
            },
            {
              valueType: "dependency",
              name: ["type"],
              hideInTable: true,
              hideInSearch: true,
              columns: (values: AuthIdentityCreateRequest) => {
                if (values.type === "USERNAME") {
                  return [
                    {
                      title: "用户名",
                      dataIndex: "identity",
                      align: "center",
                      formItemProps: {
                        rules: [{ required: true, message: "请输入用户名" }],
                      },
                    },
                    {
                      title: "密码",
                      dataIndex: "credential",
                      align: "center",
                      formItemProps: {
                        rules: [{ required: true, message: "请输入密码" }],
                      },
                      fieldProps: {
                        type: "password",
                      },
                      convertValue: (value: string) => {
                        if (value?.split("").every((char) => char === "*")) {
                          return "";
                        }
                        return value;
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
              hideInSearch: true,
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
          ]}
        />
      }
    />
  );
}
