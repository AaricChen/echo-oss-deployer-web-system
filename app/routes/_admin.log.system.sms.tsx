import { PageContainer, ProTable } from "@ant-design/pro-components";
import { useState } from "react";
import Authorization from "~/components/security/Authorization";
import { useTableRequest } from "~/hooks/http";
import type { SmsRecordResponse } from "~/types/log";

export default function SmsLogPage() {
  const { mutateAsync: getLogs } =
    useTableRequest<SmsRecordResponse>("/sms/record");
  const [open, setOpen] = useState(false);
  const [log, setLog] = useState<SmsRecordResponse | null>(null);
  return (
    <PageContainer
      content={
        <Authorization permission="system.system-log:query">
          <ProTable<SmsRecordResponse>
            rowKey="id"
            bordered
            headerTitle="系统活动日志"
            scroll={{ x: "max-content" }}
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
              },
              {
                title: "模板",
                dataIndex: "template",
                align: "center",
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
              },
              {
                title: "发送时间",
                dataIndex: "createAt",
                align: "center",
                valueType: "dateTime",
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
