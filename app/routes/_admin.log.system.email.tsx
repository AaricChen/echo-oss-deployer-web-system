import { PageContainer, ProTable } from "@ant-design/pro-components";
import { useState } from "react";
import Authorization from "~/components/security/Authorization";
import { useTableRequest } from "~/hooks/http";
import type { EmailRecordResponse } from "~/types/log";

export default function EmailLogPage() {
  const { mutateAsync: getLogs } =
    useTableRequest<EmailRecordResponse>("/email/record");
  const [open, setOpen] = useState(false);
  const [log, setLog] = useState<EmailRecordResponse | null>(null);
  return (
    <PageContainer
      content={
        <Authorization permission="system.system-log:query">
          <ProTable<EmailRecordResponse>
            rowKey="id"
            bordered
            headerTitle="系统活动日志"
            scroll={{ x: "max-content" }}
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
            request={async (params, sort, filter) => {
              return getLogs({ params, sort, filter });
            }}
          />
        </Authorization>
      }
    />
  );
}
