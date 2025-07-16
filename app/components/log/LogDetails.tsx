import { ProDescriptions } from "@ant-design/pro-components";
import { Avatar, Badge, Card, Modal, Typography } from "antd";
import { useMemo } from "react";
import type { SystemLogResponse } from "~/types/log";

export interface LogDetailsProps {
  open: boolean;
  log: SystemLogResponse;
  onClose: () => void;
}

export default function LogDetails({ open, log, onClose }: LogDetailsProps) {
  const parameter = useMemo(() => {
    try {
      return JSON.stringify(JSON.parse(log.parameters), null, 2);
    } catch (error) {
      return log.parameters;
    }
  }, [log.parameters]);

  return (
    <Modal open={open} onCancel={onClose} width={800}>
      <div className="flex flex-col gap-4">
        <ProDescriptions
          title="系统日志详情"
          bordered
          column={2}
          dataSource={log}
        >
          {log.createBy && (
            <ProDescriptions.Item label="创建者">
              <div className="flex items-center gap-2">
                <Avatar src={log.createBy.avatar} />
                <Typography.Text>{log.createBy.nickname}</Typography.Text>
              </div>
            </ProDescriptions.Item>
          )}
          <ProDescriptions.Item label="请求ID">
            {log.requestId}
          </ProDescriptions.Item>
          <ProDescriptions.Item label="描述">
            {log.description}
          </ProDescriptions.Item>
          <ProDescriptions.Item label="返回结果">
            <Badge
              status={log.success ? "success" : "error"}
              text={log.success ? "成功" : "失败"}
            />
          </ProDescriptions.Item>
          <ProDescriptions.Item label="请求地址">
            {log.url}
          </ProDescriptions.Item>
          <ProDescriptions.Item label="请求时间">
            {log.startAt}
          </ProDescriptions.Item>
          <ProDescriptions.Item label="请求参数" span={2} valueType="jsonCode">
            {parameter}
          </ProDescriptions.Item>
          <ProDescriptions.Item label="方法" valueType="code" span={2}>
            {log.method}
          </ProDescriptions.Item>
          {log.exceptionCode && (
            <ProDescriptions.Item label="异常代码" span={2}>
              {log.exceptionCode}
            </ProDescriptions.Item>
          )}
          {log.exceptionMessage && (
            <ProDescriptions.Item label="异常信息" span={2}>
              {log.exceptionMessage}
            </ProDescriptions.Item>
          )}
          {log.exceptionDetails && (
            <ProDescriptions.Item label="异常详情" span={2}>
              {log.exceptionDetails}
            </ProDescriptions.Item>
          )}
          {log.exceptionCause && (
            <ProDescriptions.Item label="异常原因" span={2}>
              {log.exceptionCause}
            </ProDescriptions.Item>
          )}
        </ProDescriptions>
        {log.exceptions && (
          <Card
            title="异常堆栈"
            size="small"
            className="max-h-80 overflow-y-auto"
          >
            <div className="overflow-x-auto">
              <pre>{log.exceptions}</pre>
            </div>
          </Card>
        )}
      </div>
    </Modal>
  );
}
