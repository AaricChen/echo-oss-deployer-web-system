import { Select, type SelectProps } from "antd";
import { useGetRoles } from "~/apis/role";
import type { RoleResponse } from "~/types/role";

export interface RoleSelectProps {
  fieldProps: SelectProps;
}

export default function RoleSelect({ fieldProps }: RoleSelectProps) {
  const { data, isPending } = useGetRoles();
  return (
    <Select<RoleResponse>
      loading={isPending}
      fieldNames={{ label: "name", value: "id" }}
      showSearch
      options={data?.content}
      autoClearSearchValue={false}
      placeholder="请选择角色"
      {...fieldProps}
      style={{
        ...fieldProps.style,
      }}
    />
  );
}
