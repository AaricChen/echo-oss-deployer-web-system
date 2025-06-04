import { PageContainer } from "@ant-design/pro-components";
import { Spin } from "antd";
import { useSystemDict } from "~/apis/systemDict";
import EntityTable from "~/components/entity/EntityTable";
import {
  type SystemDictItemQuery,
  type SystemDictItemResponse,
} from "~/types/systemDict";
import type { Route } from "./+types/_admin._index";

export default function SystemDictItemsPage({ params }: Route.ComponentProps) {
  const { dict } = params;
  const { data, isPending } = useSystemDict(dict);

  return (
    <PageContainer title="字典项管理">
      <Spin spinning={isPending}>
        <EntityTable<SystemDictItemResponse, SystemDictItemQuery>
          entityConfig={{
            name: data?.name ?? "",
            baseUrl: `/system/dict/item`,
          }}
          createInitialValues={{
            dict: dict ?? "",
          }}
          query={{
            dict: dict ?? "",
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
              dataIndex: "dict",
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
                lg: 12,
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
          ]}
        />
      </Spin>
    </PageContainer>
  );
}
