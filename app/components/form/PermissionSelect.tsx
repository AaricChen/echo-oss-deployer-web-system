import { Select, type SelectProps } from "antd";
import { useGetPermissions } from "~/apis/permission";
import { SecurityScope } from "~/types/common";

export interface PermissionSelectProps {
  fieldProps: SelectProps;
  tenant?: string;
  scope?: keyof typeof SecurityScope;
  value?: string[];
}

export default function PermissionSelect({
  tenant,
  scope,
  value,
  fieldProps,
}: PermissionSelectProps) {
  const { data, isFetching } = useGetPermissions(scope);
  return (
    <Select
      showSearch
      allowClear
      autoClearSearchValue={false}
      mode="multiple"
      optionFilterProp="name"
      loading={isFetching}
      fieldNames={{ label: "name", value: "id" }}
      options={data}
      {...fieldProps}
    />
  );
}
