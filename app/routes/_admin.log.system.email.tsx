import { PageContainer } from "@ant-design/pro-components";
import Authorization from "~/components/security/Authorization";
import EntityTable from "~/components/table/EntityTable";
import type { EmailRecordQuery, EmailRecordResponse } from "~/types/log";

export default function EmailLogPage() {
  return (
    <PageContainer
      content={
        <Authorization permission="system.email-record:query">
          <EntityTable<EmailRecordResponse, EmailRecordQuery>
            entity="email-record"
            name="邮件日志"
            baseUrl="/email/record"
            columns={[
              {
                title: "邮箱",
                dataIndex: "email",
                align: "center",
              },
              {
                title: "主题",
                dataIndex: "subject",
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
                title: "发送时间",
                dataIndex: "createAt",
                align: "center",
                valueType: "dateTimeRange",
                render(_, entity) {
                  return entity.createAt;
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
            ]}
          />
        </Authorization>
      }
    />
  );
}
