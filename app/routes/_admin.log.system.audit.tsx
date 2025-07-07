import { PageContainer, ProTable } from "@ant-design/pro-components";
import { Button } from "antd";
import { useState } from "react";
import LogDetails from "~/components/log/LogDetails";
import { useTableRequest } from "~/hooks/http";
import type { SystemLogResponse } from "~/types/log";

export default function SystemOperationLogPage() {
  const { mutateAsync: getLogs } =
    useTableRequest<SystemLogResponse>("/log/system");
  const [open, setOpen] = useState(false);
  const [log, setLog] = useState<SystemLogResponse | null>(null);
  return (
    <PageContainer
      content={
        <div>
          <ProTable<SystemLogResponse>
            rowKey="id"
            bordered
            scroll={{ x: "max-content" }}
            columns={[
              {
                title: "描述",
                dataIndex: "description",
                fixed: "left",
                align: "center",
              },
              {
                title: "请求ID",
                dataIndex: "requestId",
              },
              {
                title: "头像",
                dataIndex: ["createBy", "avatar"],
                valueType: "avatar",
                search: false,
                width: 48,
                align: "center",
              },
              {
                title: "昵称",
                dataIndex: ["createBy", "nickname"],
                align: "center",
                search: false,
              },
              {
                title: "请求地址",
                dataIndex: "url",
              },
              {
                title: "操作时间",
                dataIndex: "startAt",
                valueType: "dateTimeRange",
                render(_, entity) {
                  return entity.startAt;
                },
              },
              {
                title: "成功",
                dataIndex: "success",
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
                title: "耗时",
                dataIndex: "duration",
                search: false,
              },
              {
                title: "请求IP",
                dataIndex: "ip",
              },
              {
                title: "移动端",
                dataIndex: "mobile",
                align: "center",
                valueEnum: {
                  true: {
                    text: "是",
                    status: "Default",
                  },
                  false: {
                    text: "否",
                    status: "Default",
                  },
                },
                search: false,
              },
              {
                title: "方法",
                dataIndex: "method",
              },
              {
                title: "浏览器",
                dataIndex: "browser",
                search: false,
              },
              {
                title: "浏览器版本",
                dataIndex: "browserVersion",
                search: false,
              },
              {
                title: "浏览器引擎",
                dataIndex: "browserEngine",
                search: false,
              },
              {
                title: "浏览器引擎版本",
                dataIndex: "browserEngineVersion",
                search: false,
              },
              {
                title: "操作系统",
                dataIndex: "os",
                search: false,
              },
              {
                title: "操作系统版本",
                dataIndex: "osVersion",
                search: false,
              },
              {
                title: "操作",
                key: "action",
                valueType: "option",
                width: 50,
                render: (text, record) => {
                  return (
                    <Button
                      onClick={() => {
                        setLog(record);
                        setOpen(true);
                      }}
                    >
                      查看
                    </Button>
                  );
                },
                fixed: "right",
                align: "center",
              },
            ]}
            params={{ type: "AUDIT" }}
            request={async (params, sort, filter) => {
              return getLogs({ params, sort, filter });
            }}
          />
          {log && (
            <LogDetails
              open={open}
              log={log}
              onClose={() => {
                setOpen(false);
              }}
            />
          )}
        </div>
      }
    ></PageContainer>
  );
}
