import { PageContainer } from "@ant-design/pro-components";
import { Button, Tag } from "antd";
import { useNavigate } from "react-router";
import EntityTable from "~/components/entity/EntityTable";
import Authorization from "~/components/security/Authorization";
import {
  TenantEntity,
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
          TenantCreateRequest,
          TenantUpdateRequest,
          TenantDeleteRequest
        >
          entityConfig={TenantEntity}
          createInitialValues={{
            code: "",
            domains: [],
            tenantInfo: {
              name: "",
            },
            tenantConfig: {},
          }}
          deleteAction={false}
          createAction={{
            columns: [
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
                valueType: "divider",
              },
              {
                title: "开始时间",
                dataIndex: ["tenantConfig", "startAt"],
                valueType: "dateTime",
                formItemProps: {
                  tooltip: "如果设置了开始日期，则在开始日期之后才能认证账户",
                },
                fieldProps: {
                  style: {
                    width: "100%",
                  },
                },
                colProps: {
                  xs: 24,
                  lg: 12,
                },
              },
              {
                title: "结束时间",
                dataIndex: ["tenantConfig", "endAt"],
                valueType: "dateTime",
                formItemProps: {
                  tooltip: "如果设置了结束日期，则在结束日期之前才能认证账户",
                },
                fieldProps: {
                  style: {
                    width: "100%",
                  },
                },
                colProps: {
                  xs: 24,
                  lg: 12,
                },
              },
              {
                title: "最大账户数量",
                dataIndex: ["tenantConfig", "maxAccountCount"],
                valueType: "digit",
                formItemProps: {
                  tooltip: "该租户下最大账户的创建数量，为空表示不限制",
                },
                fieldProps: {
                  min: 1,
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
                title: "最大部门数量",
                dataIndex: ["tenantConfig", "maxDepartmentCount"],
                valueType: "digit",
                formItemProps: {
                  tooltip: "该租户下最多创建的部门数量，为空表示不限制",
                },
                fieldProps: {
                  min: 1,
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
                title: "最大部门层级",
                dataIndex: ["tenantConfig", "maxDepartmentLevel"],
                valueType: "digit",
                formItemProps: {
                  tooltip: "该租户下部门的最大层级，为空表示不限制",
                },
                fieldProps: {
                  min: 1,
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
                title: "最大权限组数量",
                dataIndex: ["tenantConfig", "maxPermissionGroupCount"],
                valueType: "digit",
                formItemProps: {
                  tooltip:
                    "该租户下用户最多可以创建的权限组数量，为空表示不限制",
                },
                fieldProps: {
                  min: 1,
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
                title: "最大角色数量",
                dataIndex: ["tenantConfig", "maxRoleCount"],
                valueType: "digit",
                formItemProps: {
                  tooltip: "该租户下包括所有部门创建的角色，为空表示不限制",
                },
                fieldProps: {
                  min: 1,
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
                valueType: "divider",
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
                valueType: "divider",
              },
              {
                title: "开始时间",
                dataIndex: ["tenantConfig", "startAt"],
                valueType: "dateTime",
                formItemProps: {
                  tooltip: "如果设置了开始日期，则在开始日期之后才能认证账户",
                },
                fieldProps: {
                  style: {
                    width: "100%",
                  },
                },
                colProps: {
                  xs: 24,
                  lg: 12,
                },
              },
              {
                title: "结束时间",
                dataIndex: ["tenantConfig", "endAt"],
                valueType: "dateTime",
                formItemProps: {
                  tooltip: "如果设置了结束日期，则在结束日期之前才能认证账户",
                },
                fieldProps: {
                  style: {
                    width: "100%",
                  },
                },
                colProps: {
                  xs: 24,
                  lg: 12,
                },
              },
              {
                title: "最大账户数量",
                dataIndex: ["tenantConfig", "maxAccountCount"],
                valueType: "digit",
                formItemProps: {
                  tooltip: "该租户下最大账户的创建数量，为空表示不限制",
                },
                fieldProps: {
                  min: 1,
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
                title: "最大部门数量",
                dataIndex: ["tenantConfig", "maxDepartmentCount"],
                valueType: "digit",
                formItemProps: {
                  tooltip: "该租户下最多创建的部门数量，为空表示不限制",
                },
                fieldProps: {
                  min: 1,
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
                title: "最大部门层级",
                dataIndex: ["tenantConfig", "maxDepartmentLevel"],
                valueType: "digit",
                formItemProps: {
                  tooltip: "该租户下部门的最大层级，为空表示不限制",
                },
                fieldProps: {
                  min: 1,
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
                title: "最大权限组数量",
                dataIndex: ["tenantConfig", "maxPermissionGroupCount"],
                valueType: "digit",
                formItemProps: {
                  tooltip:
                    "该租户下用户最多可以创建的权限组数量，为空表示不限制",
                },
                fieldProps: {
                  min: 1,
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
                title: "最大角色数量",
                dataIndex: ["tenantConfig", "maxRoleCount"],
                valueType: "digit",
                formItemProps: {
                  tooltip: "该租户下包括所有部门创建的角色，为空表示不限制",
                },
                fieldProps: {
                  min: 1,
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
                valueType: "divider",
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
          }}
          rowActionRender={({ entity }) => {
            return [
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
            ];
          }}
          columns={[
            {
              title: "租户编码",
              dataIndex: "code",
              align: "center",
              fieldProps: {
                placeholder: "搜索租户编码",
              },
            },
            {
              title: "租户名称",
              dataIndex: ["tenantInfo", "name"],
              align: "center",
              fieldProps: {
                placeholder: "模糊搜索租户名称",
              },
              transform: (value) => {
                return {
                  name: value,
                };
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
              fieldProps: {
                placeholder: "模糊搜索租户备注",
              },
            },
            {
              title: "状态",
              dataIndex: "status",
              valueType: "select",
              valueEnum: TenantStatus,
              align: "center",
              fieldProps: {
                placeholder: "搜索租户状态",
              },
            },
            {
              title: "语言",
              dataIndex: ["tenantInfo", "language"],
              valueType: "systemDict" as any,
              align: "center",
              search: false,
              fieldProps: {
                dict: "language",
              },
            },
            {
              title: "地区",
              dataIndex: ["tenantInfo", "district"],
              valueType: "district" as any,
              align: "center",
              search: false,
              transform: (value) => {
                return {
                  district: value,
                };
              },
            },
            {
              title: "开始时间",
              dataIndex: ["tenantConfig", "startAt"],
              valueType: "dateTime",
              align: "center",
              search: false,
            },
            {
              title: "结束时间",
              dataIndex: ["tenantConfig", "endAt"],
              valueType: "dateTime",
              align: "center",
              search: false,
            },
            {
              title: "最大账户数量",
              dataIndex: ["tenantConfig", "maxAccountCount"],
              align: "center",
              search: false,
            },
            {
              title: "最大部门数量",
              dataIndex: ["tenantConfig", "maxDepartmentCount"],
              align: "center",
              search: false,
            },
            {
              title: "最大部门层级",
              dataIndex: ["tenantConfig", "maxDepartmentLevel"],
              align: "center",
              search: false,
            },
            {
              title: "最大权限组数量",
              dataIndex: ["tenantConfig", "maxPermissionGroupCount"],
              align: "center",
              search: false,
            },
            {
              title: "最大角色数量",
              dataIndex: ["tenantConfig", "maxRoleCount"],
              align: "center",
              search: false,
            },
          ]}
        />
      }
    />
  );
}
