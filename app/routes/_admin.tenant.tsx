import { PageContainer } from "@ant-design/pro-components";
import { Tag } from "antd";
import EntityTable from "~/components/entity/EntityTable";
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
  return (
    <PageContainer title="租户管理">
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
              hideInSearch: true,
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
              hideInSearch: true,
              fieldProps: {
                dict: "language",
                placeholder: "租户的语言",
              },
              colProps: {
                xs: 24,
                lg: 8,
              },
            },
          ],
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
            hideInSearch: true,
            renderText(text: { domain: string }[], record, index, action) {
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
            hideInSearch: true,
          },
        ]}
      />
    </PageContainer>
  );
}
