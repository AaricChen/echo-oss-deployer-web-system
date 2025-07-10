import {
  ProFormSelect,
  type ProFormSelectProps,
} from "@ant-design/pro-components";
import { useTableRequest } from "~/hooks/http";
import type { DepartmentQuery, DepartmentResponse } from "~/types/department";

export interface DepartmentSelectProps extends ProFormSelectProps {
  tenant: string;
}

export default function DepartmentSelect({
  tenant,
  fieldProps,
}: DepartmentSelectProps) {
  const { mutateAsync } = useTableRequest<DepartmentResponse, DepartmentQuery>(
    "/department",
  );
  return (
    <ProFormSelect
      showSearch
      params={{ tenant }}
      request={async () => {
        return mutateAsync({
          params: {
            tenant,
            pageSize: 1000,
          },
        }).then((res) => {
          return res.data.map((item) => ({
            label: item.departmentInfo.name,
            value: item.id,
          }));
        });
      }}
      formItemProps={{
        style: {
          marginBottom: 0,
        },
      }}
      fieldProps={{
        placeholder: "请选择部门",
        ...fieldProps,
      }}
    />
  );
}
