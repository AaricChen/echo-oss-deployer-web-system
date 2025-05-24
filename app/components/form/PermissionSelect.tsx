import { TreeSelect, type TreeSelectProps } from "antd";
import { useGetPermissions } from "~/apis/permission";

export interface PermissionSelectProps {
  fieldProps: TreeSelectProps;
}

export default function PermissionSelect({
  fieldProps,
}: PermissionSelectProps) {
  const { data, isPending } = useGetPermissions();
  return (
    <TreeSelect
      loading={isPending}
      fieldNames={{ label: "name", value: "id" }}
      treeNodeFilterProp="name"
      treeData={data?.children}
      showSearch
      autoClearSearchValue={false}
      placeholder="请选择权限"
      {...fieldProps}
      style={{
        ...fieldProps.style,
      }}
    />
  );
}
