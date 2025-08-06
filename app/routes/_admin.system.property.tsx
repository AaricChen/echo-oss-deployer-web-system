import { PageContainer } from "@ant-design/pro-components";
import { Button, Popconfirm } from "antd";
import { useResetSystemProperty } from "~/apis/systemProperty";
import Authorization from "~/components/security/Authorization";
import EntityTable from "~/components/table/EntityTable";
import {
  type SystemPropertyQuery,
  type SystemPropertyResponse,
  type SystemPropertyUpdateRequest,
} from "~/types/systemProperty";

export default function SystemPropertyPage() {
  const { mutateAsync: resetSystemProperty } = useResetSystemProperty();
  return (
    <PageContainer
      content={
        <EntityTable<
          SystemPropertyResponse,
          SystemPropertyQuery,
          {
            update: SystemPropertyUpdateRequest;
          }
        >
          entity="system-property"
          name="系统属性"
          baseUrl="/system/property"
          permission="system.system-property:query"
          rowActions={({ tableAction, entity }) => [
            <Authorization permission="system.system-property:update">
              <Popconfirm
                title="确定要重置系统属性吗？"
                key="items"
                onConfirm={async () => {
                  await resetSystemProperty({ id: entity.id });
                  tableAction.reload();
                }}
              >
                <Button disabled={!entity.editable} type="link">
                  重置
                </Button>
              </Popconfirm>
            </Authorization>,
            {
              action: "update",
              permission: "system.system-property:update",
              buttonProps: {
                disabled: !entity.editable,
              },
              columns: [
                {
                  dataIndex: "id",
                  formItemProps: {
                    hidden: true,
                  },
                },
                {
                  title: "属性值",
                  dataIndex: "value",
                  colProps: {
                    xs: 24,
                  },
                },
              ],
            },
          ]}
          columns={[
            {
              title: "属性内容",
              dataIndex: "content",
              hideInTable: true,
              hideInForm: true,
              search: {
                transform: (v) => {
                  return {
                    content: v,
                  };
                },
              },
              fieldProps: {
                placeholder: "请输入属性名称或描述",
              },
            },
            {
              title: "属性类型",
              dataIndex: "catalog",
              hideInTable: true,
              valueType: "select",
              valueEnum: {
                INFO: "信息",
                SYSTEM: "系统",
              },
            },
            {
              title: "属性名称",
              dataIndex: "name",
              align: "center",
              search: false,
              fieldProps: {
                disabled: true,
              },
            },
            {
              title: "属性描述",
              dataIndex: "description",
              align: "center",
              search: false,
              fieldProps: {
                disabled: true,
              },
            },
            {
              title: "属性类型",
              dataIndex: "catalog",
              align: "center",
              search: false,
              valueType: "select",
              valueEnum: {
                INFO: "信息",
                SYSTEM: "系统",
              },
            },
            {
              title: "可编辑",
              dataIndex: "editable",
              search: false,
              hideInForm: true,
              align: "center",
              valueEnum: {
                true: {
                  text: "是",
                  status: "Success",
                },
                false: {
                  text: "否",
                  status: "Default",
                },
              },
            },
            {
              title: "属性值",
              dataIndex: "value",
              align: "center",
              search: false,
            },
          ]}
        />
      }
    />
  );
}
