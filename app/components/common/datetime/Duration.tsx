import dayjs, { type UnitType } from "dayjs";
import duration from "dayjs/plugin/duration";

dayjs.extend(duration);

export interface DurationProps {
  value: number;
  unit?: Exclude<UnitType, "date" | "dates">;
}

export default function Duration({ value, unit = "seconds" }: DurationProps) {
  return <span>{dayjs.duration(value, unit).format("HH:mm:ss")}</span>;
}
