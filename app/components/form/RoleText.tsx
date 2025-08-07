import type { ProFormFieldProps } from "@ant-design/pro-components";
import { Spin, Tag } from "antd";
import { useGet } from "~/hooks/http";
import type { RoleResponse } from "~/types/role";

export interface RoleTextProps extends ProFormFieldProps {
  value?: RoleResponse | RoleResponse[] | string | string[];
}

export default function RoleText({ value }: RoleTextProps) {
  const { data, isPending } = useGet<RoleResponse>({
    queryKey: ["role", value],
    url: `/role/${value}`,
    options: {
      enabled: !Array.isArray(value) && typeof value === "string",
    },
  });

  if (!value) {
    return "-";
  }

  if (Array.isArray(value)) {
    return value.map((item, index) => {
      return <RoleText key={index} value={item} />;
    });
  } else {
    if (typeof value === "string") {
      return (
        <Spin spinning={isPending}>{data ? <Text value={data} /> : "-"}</Spin>
      );
    } else {
      return <Text value={value} />;
    }
  }
}

function Text({ value }: { value: RoleResponse }) {
  return <Tag>{value.name}</Tag>;
}
