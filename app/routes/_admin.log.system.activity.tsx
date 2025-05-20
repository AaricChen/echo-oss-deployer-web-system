import { PageContainer, ProTable } from "@ant-design/pro-components";
import { Button, Card, Tree } from "antd";
import { genActionStyle } from "antd/es/alert/style";
import { useGetPermissions } from "~/apis/permission";
import { useTableRequest } from "~/hooks/http";
import type { SystemLogResponse } from "~/types/log";
import type { PermissionResponse } from "~/types/permission";

export default function Accounts() {
  const { mutateAsync: getLogs } =
    useTableRequest<SystemLogResponse>("/log/system");
  return (
    <PageContainer title="系统活动日志">
      <ProTable<SystemLogResponse>
        rowKey="id"
        bordered
        headerTitle="系统活动日志"
        scroll={{ x: "max-content" }}
        columns={[
          {
            title: "请求ID",
            dataIndex: "requestId",
            fixed: "left",
            align: "center",
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
            search: false,
            align: "center",
          },
          {
            title: "描述",
            dataIndex: "description",
          },
          {
            title: "请求地址",
            dataIndex: "url",
          },
          {
            title: "耗时",
            dataIndex: "duration",
            hideInSearch: true,
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
            title: "方法",
            dataIndex: "method",
          },
          {
            title: "请求IP",
            dataIndex: "ip",
          },
          {
            title: "移动端",
            dataIndex: "mobile",
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
          },
          {
            title: "浏览器",
            dataIndex: "browser",
          },
          {
            title: "浏览器版本",
            dataIndex: "browserVersion",
          },
          {
            title: "浏览器引擎",
            dataIndex: "browserEngine",
          },
          {
            title: "浏览器引擎版本",
            dataIndex: "browserEngineVersion",
          },
          {
            title: "操作系统",
            dataIndex: "os",
          },
          {
            title: "操作系统版本",
            dataIndex: "osVersion",
          },
          {
            title: "开始时间",
            dataIndex: "startAt",
            valueType: "dateTime",
          },
          {
            title: "结束时间",
            dataIndex: "endAt",
            valueType: "dateTime",
          },
          {
            title: "操作",
            key: "action",
            valueType: "option",
            width: 50,
            render: (text, record) => {
              return <Button>查看</Button>;
            },
            fixed: "right",
            align: "center",
          },
        ]}
        params={{ type: "ACTIVITY" }}
        request={async (params, sort, filter) => {
          return getLogs({ params, sort, filter });
        }}
      ></ProTable>
    </PageContainer>
  );
}
