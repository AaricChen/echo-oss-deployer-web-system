import { Badge } from "antd";
import type { PresetStatusColorType } from "antd/es/_util/colors";

export interface StatusBadgeProps {
  value: boolean;
  trueStatus?: PresetStatusColorType;
  falseStatus?: PresetStatusColorType;
  trueText?: React.ReactNode;
  falseText?: React.ReactNode;
}

export default function StatusBadge({
  value,
  trueStatus = "success",
  falseStatus = "default",
  trueText = "是",
  falseText = "否",
}: StatusBadgeProps) {
  return (
    <Badge
      status={value ? trueStatus : falseStatus}
      text={value ? trueText : falseText}
    />
  );
}
