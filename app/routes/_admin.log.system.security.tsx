import { PageContainer } from "@ant-design/pro-components";
import { Button } from "antd";
import { useState } from "react";
import AccountAvatar from "~/components/common/AccountAvatar";
import LogDetails from "~/components/log/LogDetails";
import Authorization from "~/components/security/Authorization";
import EntityTable from "~/components/table/EntityTable";
import type { SystemLogQuery, SystemLogResponse } from "~/types/log";

export default function SecurityLogPage() {
  const [open, setOpen] = useState(false);
  const [log, setLog] = useState<SystemLogResponse | null>(null);
  return (
    <PageContainer
      content={
        <Authorization permission="system.system-log:query">
          <EntityTable<SystemLogResponse, SystemLogQuery>
            entity="system-log"
            name="安全日志"
            baseUrl="/log/system"
            query={{ type: "SECURITY" }}
            rowActions={({}, { entity }) => [
              <Button
                key="view"
                type="link"
                onClick={() => {
                  setLog(entity);
                  setOpen(true);
                }}
              >
                查看
              </Button>,
            ]}
            columns={[
              {
                title: "描述",
                dataIndex: "description",
                fixed: "left",
                align: "center",
              },
              {
                title: "操作账户",
                dataIndex: "createBy",
                fixed: "left",
                align: "center",
                search: false,
                render(_, entity) {
                  return (
                    <AccountAvatar
                      avatar={entity.createBy?.avatar}
                      nickname={entity.createBy?.nickname}
                    />
                  );
                },
              },
              {
                title: "请求ID",
                dataIndex: "requestId",
                align: "center",
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
            ]}
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
        </Authorization>
      }
    />
  );
}
