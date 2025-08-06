import { PageContainer } from "@ant-design/pro-components";
import { Button } from "antd";
import { useNavigate } from "react-router";
import EntityTable from "~/components/table/EntityTable";
import {
  type SystemDictQuery,
  type SystemDictResponse,
} from "~/types/systemDict";

export default function SystemDictPage() {
  const navigate = useNavigate();
  return (
    <PageContainer
      content={
        <EntityTable<SystemDictResponse, SystemDictQuery>
          entity="system-dict"
          name="系统字典"
          baseUrl="/system/dict"
          permission="system.system-dict:query"
          rowActions={({ entity }) => [
            <Button
              type="link"
              key="items"
              onClick={() => {
                navigate(`/system/dict/${entity.id}`);
              }}
            >
              字典项管理
            </Button>,
          ]}
          columns={[
            {
              title: "名称",
              dataIndex: "name",
              align: "center",
            },
            {
              title: "字典数量",
              dataIndex: "items",
              align: "right",
              search: false,
            },
          ]}
        />
      }
    />
  );
}
