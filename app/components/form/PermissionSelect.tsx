import { Select, type SelectProps } from "antd";
import { useGetPermissions } from "~/apis/permission";
import { SecurityScope } from "~/types/common";

export interface PermissionSelectProps {
  fieldProps: SelectProps;
  scope?: keyof typeof SecurityScope;
}

export default function PermissionSelect({
  scope,
  fieldProps,
}: PermissionSelectProps) {
  const { data, isFetching } = useGetPermissions(scope);
  return (
    <Select
      showSearch
      allowClear
      autoClearSearchValue={false}
      mode="multiple"
      placeholder="请选择权限"
      optionFilterProp="name"
      loading={isFetching}
      fieldNames={{ label: "name", value: "id" }}
      options={data}
      maxTagCount={5}
      {...fieldProps}
    />
  );
}
