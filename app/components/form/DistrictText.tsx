import { Typography } from "antd";
import { useDistrict } from "~/apis/district";

export interface DistrictTextProps {
  value?: string;
}

export default function DistrictText({ value }: DistrictTextProps) {
  const { data } = useDistrict(value);

  return <Typography.Text>{data?.path || "-"}</Typography.Text>;
}
