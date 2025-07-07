import { PageContainer } from "@ant-design/pro-components";
import { Tag } from "antd";
import EntityTable from "~/components/entity/EntityTable";
import {
  TenantEntity,
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
            remark: "",
            language: "",
            district: 0,
          },
          tenantConfig: {},
        }}
        columns={[
          {
            dataIndex: "id",
            hideInSearch: true,
            hideInTable: true,
            formItemProps: {
              hidden: true,
            },
          },
          {
            title: "编码",
            dataIndex: "code",
            align: "center",
            formItemProps: {
              rules: [
                { required: true, message: "请输入编码" },
                { max: 32, message: "编码长度不能超过32个字符" },
              ],
            },
            colProps: {
              xs: 24,
              lg: 12,
            },
          },
          {
            title: "租户名称",
            dataIndex: ["tenantInfo", "name"],
            align: "center",
            formItemProps: {
              rules: [
                { required: true, message: "请输入租户名称" },
                { max: 32, message: "租户名称长度不能超过32个字符" },
              ],
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
            align: "center",
            hideInSearch: true,
            renderText(text: { domain: string }[], record, index, action) {
              return text.map((item) => (
                <Tag key={item.domain}>{item.domain}</Tag>
              ));
            },
            fieldProps: {
              creatorButtonProps: { creatorButtonText: "添加域名" },
            },
            columns: [
              {
                title: "域名",
                dataIndex: "domain",
                align: "center",
                formItemProps: {
                  rules: [{ required: true, message: "请输入域名" }],
                },
              },
            ],
            colProps: {
              xs: 24,
              lg: 24,
            },
          },
        ]}
      />
    </PageContainer>
  );
}
