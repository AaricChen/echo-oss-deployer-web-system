import { TreeSelect, type TreeSelectProps } from "antd";
import { useGetDepartments } from "~/apis/department";

export interface DepartmentSelectProps extends TreeSelectProps {}

export default function DepartmentSelect(props: DepartmentSelectProps) {
  const { data } = useGetDepartments();
  return (
    <TreeSelect
      fieldNames={{ label: "name", value: "id" }}
      treeNodeFilterProp="name"
      treeData={data?.content}
      {...props}
      style={{
        width: "100%",
        ...props.style,
      }}
      showSearch
      autoClearSearchValue={false}
      placeholder="请选择权限"
    />
  );
}
