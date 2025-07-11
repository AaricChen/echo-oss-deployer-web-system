import {
  ProFormTreeSelect,
  type ProFormTreeSelectProps,
} from "@ant-design/pro-components";
import type { TreeSelectProps } from "antd";
import { useTableRequest } from "~/hooks/http";
import type { DepartmentQuery, DepartmentResponse } from "~/types/department";

export interface DepartmentSelectProps extends ProFormTreeSelectProps {
  tenant: string;
}

export default function DepartmentSelect({
  tenant,
  fieldProps,
}: DepartmentSelectProps) {
  const { mutateAsync } = useTableRequest<DepartmentResponse, DepartmentQuery>(
    "/department",
  );

  const convert: (data: DepartmentResponse[]) => {
    title: string;
    value: string;
    children: TreeSelectProps["treeData"];
  }[] = (data: DepartmentResponse[]) => {
    return data.map((item: DepartmentResponse) => {
      return {
        title: item.departmentInfo.name,
        value: item.id,
        children: convert(item.children),
      };
    });
  };

  return (
    <ProFormTreeSelect
      params={{ tenant }}
      request={async () => {
        return mutateAsync({
          params: {
            root: true,
            tenant,
            pageSize: 1000,
          },
        }).then((res) => {
          return convert(res.data);
        });
      }}
      formItemProps={{
        style: {
          marginBottom: 0,
        },
      }}
      fieldProps={{
        showSearch: true,
        placeholder: "请选择部门",
        treeDefaultExpandAll: true,
        ...fieldProps,
      }}
    />
  );
}
