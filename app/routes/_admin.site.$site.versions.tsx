import { PageContainer } from "@ant-design/pro-components";
import { Button, Popconfirm } from "antd";
import { useNavigate } from "react-router";
import EntityTable from "~/components/table/EntityTable";
import { useGet, usePut } from "~/hooks/http";
import {
  type SiteResponse,
  type SiteRollbackRequest,
  type SiteVersionQuery,
  type SiteVersionResponse,
} from "~/types/site";
import type { Route } from "./+types/_admin.site._index";

export default function SiteVersionsPage({ params }: Route.ComponentProps) {
  const navigate = useNavigate();
  const { site } = params;

  const { mutateAsync: rollback } = usePut<SiteRollbackRequest, SiteResponse>({
    url: `/site/${site}/rollback`,
    action: "回滚网站",
  });

  const { data } = useGet<SiteResponse>({
    queryKey: ["site", site],
    url: `/site/${site}`,
    options: {
      enabled: !!site,
    },
  });

  return (
    <PageContainer
      title={`${data?.name} 版本管理`}
      extra={
        <Button type="default" onClick={() => navigate(`/site`)}>
          返回
        </Button>
      }
      content={
        <EntityTable<SiteVersionResponse, SiteVersionQuery>
          entity="site-version"
          name="网站版本"
          baseUrl="/site/version"
          permission="system.site:query"
          query={{
            site: site ?? "",
          }}
          rowActions={({ entity, tableAction }) => [
            <Button
              key="commit-url"
              type="link"
              disabled={!entity.commitUrl}
              href={entity.commitUrl}
              target="_blank"
            >
              查看提交
            </Button>,
            <Popconfirm
              key="rollback"
              title="确定回滚到该版本吗？"
              onConfirm={async () => {
                await rollback({
                  version: entity.id,
                });
                tableAction.reload();
              }}
            >
              <Button type="link" danger>
                回滚
              </Button>
            </Popconfirm>,
          ]}
          columns={[
            {
              title: "ID",
              dataIndex: "id",
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
              title: "OSS端点",
              dataIndex: "endpoint",
              align: "center",
              search: false,
            },
            {
              title: "OSS Bucket",
              dataIndex: "bucket",
              align: "center",
              search: false,
            },
          ]}
        />
      }
    />
  );
}
