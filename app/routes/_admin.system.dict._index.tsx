import { PageContainer } from "@ant-design/pro-components";
import { Button } from "antd";
import { useNavigate } from "react-router";
import EntityTable from "~/components/entity/EntityTable";
import {
  SystemDictEntity,
  type SystemDictQuery,
  type SystemDictResponse,
} from "~/types/systemDict";
import type { Route } from "./+types/_admin._index";

export default function SystemDictPage({ loaderData }: Route.ComponentProps) {
  const navigate = useNavigate();
  return (
    <PageContainer title="系统字典管理">
      <EntityTable<SystemDictResponse, SystemDictQuery>
        entityConfig={SystemDictEntity}
        createAction={false}
        updateAction={false}
        deleteAction={false}
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
            title: "名称",
            dataIndex: "name",
            align: "center",
            formItemProps: {
              rules: [
                { required: true, message: "请输入名称" },
                { max: 32, message: "名称长度不能超过32个字符" },
              ],
            },
            colProps: {
              xs: 24,
              lg: 8,
            },
          },
          {
            title: "字典数量",
            dataIndex: "items",
            align: "right",
            hideInSearch: true,
          },
        ]}
        rowActionRender={({ entity }) => {
          return [
            <Button
              type="link"
              key="items"
              onClick={() => {
                navigate(`/system/dict/${entity.id}`);
              }}
            >
              字典项管理
            </Button>,
          ];
        }}
      />
    </PageContainer>
  );
}
