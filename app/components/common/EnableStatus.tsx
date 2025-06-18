import StatusBadge from "~/components/common/StatusBadge";

export interface EnableStatusProps {
  value: boolean;
}

export default function EnableStatus({ value }: EnableStatusProps) {
  return (
    <StatusBadge
      value={value}
      trueStatus="success"
      falseStatus="error"
      trueText="启用"
      falseText="禁用"
    />
  );
}
