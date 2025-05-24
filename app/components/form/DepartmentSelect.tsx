import { TreeSelect, type TreeSelectProps } from "antd";
import { useGetDepartments } from "~/apis/department";

export interface DepartmentSelectProps {
  fieldProps: TreeSelectProps;
}

export default function DepartmentSelect({
  fieldProps,
}: DepartmentSelectProps) {
  const { data, isPending } = useGetDepartments();
  return (
    <TreeSelect
      fieldNames={{ label: "name", value: "id" }}
      treeNodeFilterProp="name"
      treeData={data?.content}
      loading={isPending}
      placeholder="请选择部门"
      showSearch
      treeDefaultExpandAll
      autoClearSearchValue={false}
      {...fieldProps}
      style={{
        ...fieldProps.style,
      }}
    />
  );
}
