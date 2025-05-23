import { TreeSelect, type FormItemProps, type TreeSelectProps } from "antd";
import { useGetPermissions } from "~/apis/permission";

export interface PermissionSelectProps {
  formItemProps?: FormItemProps;
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
      {...fieldProps}
      style={{
        width: "100%",
      }}
      showSearch
      autoClearSearchValue={false}
      placeholder="请选择权限"
    />
  );
}
