import { Typography } from "antd";
import { filesize } from "filesize";

export interface FilesizeProps {
  value: number;
}

export default function Filesize({ value }: FilesizeProps) {
  return <Typography.Text>{filesize(value)}</Typography.Text>;
}
