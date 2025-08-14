import { PageContainer } from "@ant-design/pro-components";
import { Button, Typography } from "antd";
import { useNavigate } from "react-router";
import EntityTable from "~/components/table/EntityTable";
import {
  type SiteCreateRequest,
  type SiteQuery,
  type SiteResponse,
  type SiteUpdateRequest,
} from "~/types/site";

export default function SitePage() {
  const navigate = useNavigate();
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
                siteUrl: "",
                githubUrl: "",
                maxVersionCount: 100,
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
                    lg: 12,
                  },
                },
                {
                  title: "最大版本数量",
                  dataIndex: "maxVersionCount",
                  valueType: "digit",
                  fieldProps: {
                    min: 1,
                    max: 100,
                    style: {
                      width: "100%",
                    },
                  },
                  formItemProps: {
                    rules: [{ required: true, message: "请输入最大版本数量" }],
                  },
                  colProps: {
                    xs: 24,
                    lg: 12,
                  },
                },
                {
                  title: "OSS端点",
                  dataIndex: "endpoint",
                  align: "center",
                  formItemProps: {
                    rules: [{ required: true, message: "请输入OSS端点" }],
                  },
                  colProps: {
                    xs: 24,
                    lg: 12,
                  },
                },
                {
                  title: "OSS Bucket",
                  dataIndex: "bucket",
                  align: "center",
                  formItemProps: {
                    rules: [{ required: true, message: "请输入OSS Bucket" }],
                  },
                  colProps: {
                    xs: 24,
                    lg: 12,
                  },
                },
                {
                  title: "网站地址",
                  dataIndex: "siteUrl",
                  formItemProps: {
                    rules: [{ required: true, message: "请输入网站URL" }],
                  },
                  colProps: {
                    xs: 24,
                  },
                },
                {
                  title: "代码库地址",
                  dataIndex: "githubUrl",
                  formItemProps: {
                    rules: [{ required: true, message: "请输入代码库URL" }],
                  },
                  colProps: {
                    xs: 24,
                  },
                },
              ],
            },
          ]}
          rowActions={({ entity, tableAction }) => [
            {
              action: "update",
              permission: "system.site:update",
              columns: [
                {
                  dataIndex: "id",
                  formItemProps: {
                    hidden: true,
                  },
                },
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
                    lg: 12,
                  },
                },
                {
                  title: "最大版本数量",
                  dataIndex: "maxVersionCount",
                  valueType: "digit",
                  fieldProps: {
                    min: 1,
                    max: 100,
                    style: {
                      width: "100%",
                    },
                  },
                  formItemProps: {
                    rules: [{ required: true, message: "请输入最大版本数量" }],
                  },
                  colProps: {
                    xs: 24,
                    lg: 12,
                  },
                },
                {
                  title: "OSS端点",
                  dataIndex: "endpoint",
                  align: "center",
                  formItemProps: {
                    rules: [{ required: true, message: "请输入OSS端点" }],
                  },
                  colProps: {
                    xs: 24,
                    lg: 12,
                  },
                },
                {
                  title: "OSS Bucket",
                  dataIndex: "bucket",
                  align: "center",
                  formItemProps: {
                    rules: [{ required: true, message: "请输入OSS Bucket" }],
                  },
                  colProps: {
                    xs: 24,
                    lg: 12,
                  },
                },
                {
                  title: "网站地址",
                  dataIndex: "siteUrl",
                  formItemProps: {
                    rules: [{ required: true, message: "请输入网站URL" }],
                  },
                  colProps: {
                    xs: 24,
                  },
                },
                {
                  title: "代码库地址",
                  dataIndex: "githubUrl",
                  formItemProps: {
                    rules: [{ required: true, message: "请输入代码库URL" }],
                  },
                  colProps: {
                    xs: 24,
                  },
                },
              ],
            },
            <Button
              key="site-url"
              disabled={!entity.siteUrl}
              type="link"
              href={entity.siteUrl}
              target="_blank"
            >
              打开网站
            </Button>,
            <Button
              key="github-url"
              disabled={!entity.githubUrl}
              type="link"
              href={entity.githubUrl}
              target="_blank"
            >
              打开代码库
            </Button>,
            <Button
              key="versions"
              type="link"
              onClick={() => navigate(`/site/${entity.id}/versions`)}
            >
              历史版本
            </Button>,
            {
              action: "row",
              permission: "system.site:update",
              render: () => ({
                name: "手动部署",
                suffix: "/deploy",
                buttonProps: {
                  type: "link",
                },
                onFinish: async () => {
                  tableAction.reload();
                },
                columns: [
                  {
                    title: "网站版本",
                    dataIndex: "version",
                    formItemProps: {
                      rules: [{ required: true, message: "请选择网站版本" }],
                    },
                    colProps: {
                      xs: 24,
                    },
                  },
                  {
                    title: "部署文件",
                    dataIndex: "file",
                    valueType: "file" as any,
                    fieldProps: {
                      accept: ".zip",
                      desc: "请选择部署的.zip文件",
                    },
                    colProps: {
                      xs: 24,
                    },
                  },
                ],
              }),
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
              search: false,
              sorter: true,
            },
            {
              title: "ID",
              dataIndex: "id",
              align: "center",
              search: false,
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
              title: "文件数量",
              dataIndex: ["version", "fileCount"],
              align: "center",
              search: false,
            },
            {
              title: "版本数量",
              dataIndex: "versions",
              align: "right",
              search: false,
              renderText: (text: number, record: SiteResponse) => (
                <div className="flex flex-col items-end gap-2">
                  <Typography.Text>
                    {text} / {record.maxVersionCount}{" "}
                  </Typography.Text>
                </div>
              ),
            },
          ]}
        />
      }
    />
  );
}
