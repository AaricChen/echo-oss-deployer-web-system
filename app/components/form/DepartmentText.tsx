import type { ProFormFieldProps } from "@ant-design/pro-components";
import { Spin, Tag } from "antd";
import { useGet } from "~/hooks/http";
import type { DepartmentResponse } from "~/types/department";

export interface DepartmentTextProps extends ProFormFieldProps {
  value?: DepartmentResponse | DepartmentResponse[] | string | string[];
}

export default function DepartmentText({ value }: DepartmentTextProps) {
  const { data, isPending } = useGet<DepartmentResponse>({
    queryKey: ["department", value],
    url: `/department/${value}`,
    options: {
      enabled: !Array.isArray(value) && typeof value === "string",
    },
  });

  if (!value) {
    return "-";
  }

  if (Array.isArray(value)) {
    return value.map((item, index) => {
      return <DepartmentText key={index} value={item} />;
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

function Text({ value }: { value: DepartmentResponse }) {
  return <Tag>{value.departmentInfo.name}</Tag>;
}
