import { PageContainer } from "@ant-design/pro-components";
import { useSystemDict } from "~/apis/systemDict";
import EntityTable from "~/components/table/EntityTable";
import {
  type SystemDictItemCreateRequest,
  type SystemDictItemQuery,
  type SystemDictItemResponse,
} from "~/types/systemDict";
import type { Route } from "./+types/_admin.system.dict._index";

export default function SystemDictItemsPage({ params }: Route.ComponentProps) {
  const { dict } = params;
  const { data } = useSystemDict(dict);

  return (
    <PageContainer
      title="字典项管理"
      content={
        <EntityTable<
          SystemDictItemResponse,
          SystemDictItemQuery,
          {
            request: SystemDictItemCreateRequest;
          }
        >
          entity="system-dict-item"
          name={`${data?.name ?? "字典项"}`}
          baseUrl="/system/dict/item"
          permission="system.system-dict:query"
          query={{
            dict,
          }}
          toolbarActions={() => [
            {
              action: "create",
              permission: "system.system-dict-item:create",
              initialValues: {
                dict: dict ?? "",
                name: "",
                code: "",
              },
              columns: [
                {
                  dataIndex: "dict",
                  formItemProps: {
                    hidden: true,
                  },
                },
                {
                  title: "名称",
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
                  title: "编码",
                  dataIndex: "code",
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
              ],
            },
          ]}
          rowActions={() => [
            {
              action: "update",
              permission: "system.system-dict-item:update",
              columns: [
                {
                  dataIndex: "id",
                  formItemProps: {
                    hidden: true,
                  },
                },
                {
                  dataIndex: "dict",
                  formItemProps: {
                    hidden: true,
                  },
                },
                {
                  title: "名称",
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
                  title: "编码",
                  dataIndex: "code",
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
              ],
            },
            {
              action: "delete",
              permission: "system.system-dict-item:delete",
            },
          ]}
          batchOptionActions={() => [
            {
              action: "batch-delete",
              permission: "system.system-dict-item:delete",
            },
          ]}
          columns={[
            {
              width: 1,
              search: false,
            },
            {
              title: "名称",
              dataIndex: "name",
              align: "center",
            },
            {
              title: "编码",
              dataIndex: "code",
              align: "center",
            },
          ]}
        />
      }
    />
  );
}
