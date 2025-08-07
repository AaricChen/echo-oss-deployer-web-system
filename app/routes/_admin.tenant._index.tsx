import { PageContainer } from "@ant-design/pro-components";
import { Button, Tag } from "antd";
import { useNavigate } from "react-router";
import Authorization from "~/components/security/Authorization";
import EntityTable from "~/components/table/EntityTable";
import {
  TenantStatus,
  type TenantCreateRequest,
  type TenantDeleteRequest,
  type TenantQuery,
  type TenantResponse,
  type TenantUpdateRequest,
} from "~/types/tenant";

export default function TenantPage() {
  const navigate = useNavigate();
  return (
    <PageContainer
      content={
        <EntityTable<
          TenantResponse,
          TenantQuery,
          {
            create: TenantCreateRequest;
            update: TenantUpdateRequest;
            delete: TenantDeleteRequest;
          }
        >
          entity="tenant"
          name="租户"
          baseUrl="/tenant"
          permission="system.tenant:query"
          toolbarActions={() => [
            {
              action: "create",
              permission: "system.tenant:create",
              initialValues: {
                code: "",
                domains: [],
                tenantInfo: {
                  name: "",
                },
                tenantConfig: {},
              },
              columns: [
                {
                  title: "租户Logo",
                  dataIndex: ["tenantInfo", "logo"],
                  valueType: "image",
                  colProps: {
                    xs: 24,
                    lg: 24,
                  },
                },
                {
                  title: "编码",
                  dataIndex: "code",
                  formItemProps: {
                    tooltip: "租户编码，用于标识该租户，不能重复",
                    rules: [
                      { required: true, message: "请输入编码" },
                      { max: 32, message: "编码长度不能超过32个字符" },
                    ],
                  },
                  fieldProps: {
                    placeholder: "请输入该租户的编码",
                  },
                  colProps: {
                    xs: 24,
                    lg: 12,
                  },
                },
                {
                  title: "租户名称",
                  dataIndex: ["tenantInfo", "name"],
                  formItemProps: {
                    rules: [
                      { required: true, message: "请输入租户名称" },
                      { max: 32, message: "租户名称长度不能超过32个字符" },
                    ],
                  },
                  fieldProps: {
                    placeholder: "请输入该租户的名称",
                  },
                  colProps: {
                    xs: 24,
                    lg: 12,
                  },
                },
                {
                  title: "域名",
                  dataIndex: "domains",
                  valueType: "formList",
                  renderText(text: { domain: string }[]) {
                    return text.map((item) => (
                      <Tag key={item.domain}>{item.domain}</Tag>
                    ));
                  },
                  formItemProps: {
                    tooltip:
                      "租户绑定的域名，用于访问该租户的系统，支持配置多个域名",
                  },
                  fieldProps: {
                    creatorButtonProps: { creatorButtonText: "添加域名" },
                  },
                  columns: [
                    {
                      dataIndex: "domain",
                      formItemProps: {
                        rules: [{ required: true, message: "请输入域名" }],
                      },
                      fieldProps: {
                        placeholder: "请输入该租户绑定的域名",
                      },
                    },
                  ],
                  colProps: {
                    xs: 24,
                    lg: 24,
                  },
                },
                {
                  title: "备注",
                  dataIndex: ["tenantInfo", "remark"],
                  fieldProps: {
                    placeholder: "请输入该租户的备注",
                  },
                  colProps: {
                    xs: 24,
                    lg: 24,
                  },
                },
                {
                  title: "语言",
                  dataIndex: ["tenantInfo", "language"],
                  valueType: "systemDict" as any,
                  fieldProps: {
                    dict: "language",
                  },
                  colProps: {
                    xs: 24,
                    lg: 12,
                  },
                },
                {
                  title: "地区",
                  dataIndex: ["tenantInfo", "district"],
                  valueType: "district" as any,
                  colProps: {
                    xs: 24,
                    lg: 12,
                  },
                },
              ],
            },
          ]}
          rowActions={({ entity }) => [
            <Authorization key="account" permission="system.account:query">
              <Button
                type="link"
                size="small"
                onClick={() => {
                  navigate(`/tenant/${entity.code}/account`);
                }}
              >
                账户管理
              </Button>
            </Authorization>,
            <Authorization
              key="department"
              permission="system.department:query"
            >
              <Button
                type="link"
                size="small"
                onClick={() => {
                  navigate(`/tenant/${entity.code}/department`);
                }}
              >
                部门管理
              </Button>
            </Authorization>,
            <Authorization
              key="permission-group"
              permission="system.permission-group:query"
            >
              <Button
                type="link"
                size="small"
                onClick={() => {
                  navigate(`/tenant/${entity.code}/permission/group`);
                }}
              >
                权限组管理
              </Button>
            </Authorization>,
            {
              action: "update",
              permission: "system.tenant:update",
              columns: [
                {
                  dataIndex: "id",
                  formItemProps: {
                    hidden: true,
                  },
                },
                {
                  title: "租户Logo",
                  dataIndex: ["tenantInfo", "logo"],
                  valueType: "image",
                  colProps: {
                    xs: 24,
                    lg: 24,
                  },
                },
                {
                  title: "编码",
                  dataIndex: "code",
                  formItemProps: {
                    tooltip: "租户编码，用于标识该租户，不能重复",
                    rules: [
                      { required: true, message: "请输入编码" },
                      { max: 32, message: "编码长度不能超过32个字符" },
                    ],
                  },
                  fieldProps: {
                    placeholder: "请输入该租户的编码",
                  },
                  colProps: {
                    xs: 24,
                    lg: 8,
                  },
                },
                {
                  title: "租户名称",
                  dataIndex: ["tenantInfo", "name"],
                  formItemProps: {
                    rules: [
                      { required: true, message: "请输入租户名称" },
                      { max: 32, message: "租户名称长度不能超过32个字符" },
                    ],
                  },
                  fieldProps: {
                    placeholder: "请输入该租户的名称",
                  },
                  colProps: {
                    xs: 24,
                    lg: 8,
                  },
                },
                {
                  title: "状态",
                  dataIndex: "status",
                  valueType: "select",
                  valueEnum: TenantStatus,
                  colProps: {
                    xs: 24,
                    lg: 8,
                  },
                },
                {
                  title: "域名",
                  dataIndex: "domains",
                  valueType: "formList",
                  renderText(text: { domain: string }[]) {
                    return text.map((item) => (
                      <Tag key={item.domain}>{item.domain}</Tag>
                    ));
                  },
                  formItemProps: {
                    tooltip:
                      "租户绑定的域名，用于访问该租户的系统，支持配置多个域名",
                  },
                  fieldProps: {
                    creatorButtonProps: { creatorButtonText: "添加域名" },
                  },
                  columns: [
                    {
                      dataIndex: "domain",
                      formItemProps: {
                        rules: [{ required: true, message: "请输入域名" }],
                      },
                      fieldProps: {
                        placeholder: "请输入该租户绑定的域名",
                      },
                    },
                  ],
                  colProps: {
                    xs: 24,
                    lg: 24,
                  },
                },
                {
                  title: "备注",
                  dataIndex: ["tenantInfo", "remark"],
                  fieldProps: {
                    placeholder: "请输入该租户的备注",
                  },
                  colProps: {
                    xs: 24,
                    lg: 24,
                  },
                },
                {
                  title: "语言",
                  dataIndex: ["tenantInfo", "language"],
                  valueType: "systemDict" as any,
                  fieldProps: {
                    dict: "language",
                  },
                  colProps: {
                    xs: 24,
                    lg: 12,
                  },
                },
                {
                  title: "地区",
                  dataIndex: ["tenantInfo", "district"],
                  valueType: "district" as any,
                  colProps: {
                    xs: 24,
                    lg: 12,
                  },
                },
              ],
            },
          ]}
          columns={[
            {
              dataIndex: ["tenantInfo", "logo"],
              title: "Logo",
              align: "center",
              search: false,
              valueType: "image",
              fieldProps: {
                width: 96,
              },
            },
            {
              title: "租户编码",
              dataIndex: "code",
              align: "center",
            },
            {
              title: "租户名称",
              dataIndex: ["tenantInfo", "name"],
              align: "center",
              search: {
                transform: (value) => {
                  return {
                    name: value,
                  };
                },
              },
            },
            {
              title: "域名",
              dataIndex: "domains",
              valueType: "formList",
              align: "center",
              search: false,
              renderText(text: { domain: string }[]) {
                return text.map((item) => (
                  <Tag key={item.domain}>{item.domain}</Tag>
                ));
              },
            },
            {
              title: "备注",
              dataIndex: ["tenantInfo", "remark"],
              align: "center",
            },
            {
              title: "状态",
              dataIndex: "status",
              valueType: "select",
              valueEnum: TenantStatus,
              align: "center",
            },
            {
              title: "语言",
              dataIndex: ["tenantInfo", "language"],
              valueType: "systemDict" as any,
              align: "center",
              search: false,
            },
            {
              title: "地区",
              dataIndex: ["tenantInfo", "district"],
              valueType: "district" as any,
              align: "center",
              search: false,
            },
          ]}
        />
      }
    />
  );
}
