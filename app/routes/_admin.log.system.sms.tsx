import { PageContainer } from "@ant-design/pro-components";
import EntityTable from "~/components/table/EntityTable";
import type { SmsRecordQuery, SmsRecordResponse } from "~/types/log";

export default function SmsLogPage() {
  return (
    <PageContainer
      content={
        <EntityTable<SmsRecordResponse, SmsRecordQuery>
          entity="sms-record"
          name="短信日志"
          baseUrl="/sms/record"
          permission="system.sms-record:query"
          columns={[
            {
              title: "手机号",
              dataIndex: "phone",
              align: "center",
            },
            {
              title: "签名",
              dataIndex: "signature",
              align: "center",
              search: false,
            },
            {
              title: "模板",
              dataIndex: "template",
              align: "center",
              search: false,
            },
            {
              title: "成功",
              dataIndex: "success",
              align: "center",
              valueEnum: {
                true: {
                  text: "是",
                  status: "Success",
                },
                false: {
                  text: "否",
                  status: "Error",
                },
              },
            },
            {
              title: "内容",
              dataIndex: "content",
              align: "center",
              search: false,
            },
            {
              title: "备注消息",
              dataIndex: "message",
              align: "center",
              search: false,
            },
            {
              title: "发送时间",
              dataIndex: "createAt",
              align: "center",
              valueType: "dateTimeRange",
              render(_, entity) {
                return entity.createAt;
              },
            },
          ]}
        />
      }
    />
  );
}
