import { PageContainer } from "@ant-design/pro-components";
import { Button, Popconfirm } from "antd";
import { useResetSystemProperty } from "~/apis/systemProperty";
import EntityTable from "~/components/entity/EntityTable";
import Authorization from "~/components/security/Authorization";
import {
  SystemPropertyEntity,
  type SystemPropertyQuery,
  type SystemPropertyResponse,
} from "~/types/systemProperty";

export default function SystemPropertyPage() {
  const { mutateAsync: resetSystemProperty } = useResetSystemProperty();
  return (
    <PageContainer
      content={
        <EntityTable<SystemPropertyResponse, SystemPropertyQuery>
          entityConfig={SystemPropertyEntity}
          createAction={false}
          updateButtonProps={(entity) => ({ disabled: !entity.editable })}
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
              hideInForm: true,
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
              hideInSearch: true,
              colProps: {
                xs: 24,
                lg: 12,
              },
              fieldProps: {
                disabled: true,
              },
            },
            {
              title: "属性描述",
              dataIndex: "description",
              align: "center",
              hideInSearch: true,
              colProps: {
                xs: 24,
                lg: 12,
              },
              fieldProps: {
                disabled: true,
              },
            },
            {
              title: "属性类型",
              dataIndex: "catalog",
              align: "center",
              hideInSearch: true,
              hideInForm: true,
            },
            {
              title: "可编辑",
              dataIndex: "editable",
              hideInSearch: true,
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
              hideInSearch: true,
              colProps: {
                xs: 24,
              },
            },
          ]}
          rowActionRender={({ action, entity }) => {
            return [
              <Authorization permission="system.system-property:update">
                <Popconfirm
                  title="确定要重置系统属性吗？"
                  key="items"
                  onConfirm={async () => {
                    await resetSystemProperty({ id: entity.id });
                    action?.reload();
                  }}
                >
                  <Button disabled={!entity.editable} type="link">
                    重置
                  </Button>
                </Popconfirm>
              </Authorization>,
            ];
          }}
        />
      }
    />
  );
}
