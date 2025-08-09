import { PageContainer } from "@ant-design/pro-components";
import { Typography } from "antd";
import EntityTable from "~/components/table/EntityTable";
import {
  type SiteCreateRequest,
  type SiteQuery,
  type SiteResponse,
  type SiteUpdateRequest,
} from "~/types/site";

export default function SitePage() {
  return (
    <PageContainer
      content={
        <EntityTable<
          SiteResponse,
          SiteQuery,
          {
            create: SiteCreateRequest;
            update: SiteUpdateRequest;
          }
        >
          entity="site"
          name="网站"
          baseUrl="/site"
          permission="system.site:query"
          toolbarActions={() => [
            {
              action: "create",
              permission: "system.site:create",
              initialValues: {
                name: "",
                endpoint: "",
                bucket: "",
              },
              columns: [
                {
                  title: "网站名称",
                  dataIndex: "name",
                  formItemProps: {
                    rules: [
                      { required: true, message: "请输入名称" },
                      { max: 32, message: "名称长度不能超过32个字符" },
                    ],
                  },
                  colProps: {
                    xs: 24,
                  },
                },
                {
                  title: "OSS端点",
                  dataIndex: "endpoint",
                  align: "center",
                  colProps: {
                    xs: 24,
                  },
                },
                {
                  title: "OSS Bucket",
                  dataIndex: "bucket",
                  align: "center",
                  colProps: {
                    xs: 24,
                  },
                },
              ],
            },
          ]}
          rowActions={({ entity }) => [
            {
              action: "update",
              permission: "system.site:update",
              columns: [
                {
                  title: "网站名称",
                  dataIndex: "name",
                  formItemProps: {
                    rules: [
                      { required: true, message: "请输入名称" },
                      { max: 32, message: "名称长度不能超过32个字符" },
                    ],
                  },
                  colProps: {
                    xs: 24,
                  },
                },
                {
                  title: "OSS端点",
                  dataIndex: "endpoint",
                  align: "center",
                  colProps: {
                    xs: 24,
                  },
                },
                {
                  title: "OSS Bucket",
                  dataIndex: "bucket",
                  align: "center",
                  colProps: {
                    xs: 24,
                  },
                },
              ],
            },
            {
              action: "delete",
              permission: "system.site:delete",
            },
          ]}
          batchOptionActions={({}) => [
            {
              action: "batch-delete",
              permission: "system.site:delete",
            },
          ]}
          columns={[
            {
              title: "网站名称",
              dataIndex: "name",
              align: "center",
            },
            {
              title: "部署时间",
              dataIndex: "deployAt",
              align: "center",
              sorter: true,
            },
            {
              title: "ID",
              dataIndex: "id",
              align: "center",
              width: 360,
              renderText: (text: string, record: SiteResponse) => (
                <div className="flex flex-col items-start gap-2">
                  <Typography.Text
                    copyable={{
                      text: text,
                    }}
                    ellipsis
                  >
                    网站ID: {text}
                  </Typography.Text>
                  <Typography.Text
                    copyable={{
                      text: record.token,
                    }}
                    ellipsis
                    type="secondary"
                  >
                    网站令牌: {record.token}
                  </Typography.Text>
                </div>
              ),
            },
            {
              title: "OSS配置",
              dataIndex: "endpoint",
              align: "center",
              width: 300,
              renderText: (text: string, record: SiteResponse) => (
                <div className="flex flex-col items-start gap-2">
                  <Typography.Text>Endpoint: {text}</Typography.Text>
                  <Typography.Text>Bucket: {record.bucket}</Typography.Text>
                </div>
              ),
            },
            {
              title: "文件数量",
              dataIndex: "fileCount",
              align: "center",
            },
          ]}
        />
      }
    />
  );
}
