import StatusBadge from "~/components/common/StatusBadge";

export interface DisableStatusProps {
  value: boolean;
}

export default function DisableStatus({ value }: DisableStatusProps) {
  return (
    <StatusBadge
      value={value}
      trueStatus="error"
      falseStatus="success"
      trueText="禁用"
      falseText="启用"
    />
  );
}
