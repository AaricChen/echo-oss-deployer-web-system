import {
  ProFormTreeSelect,
  type ProFormTreeSelectProps,
} from "@ant-design/pro-components";
import { useGetPermissions } from "~/apis/permission";
import { useTableRequest } from "~/hooks/http";
import type { PermissionResponse } from "~/types/permission";

export interface PermissionSelectProps extends ProFormTreeSelectProps {}

export default function PermissionSelect(props: PermissionSelectProps) {
  const { data, isPending } = useGetPermissions();
  return (
    <ProFormTreeSelect
      placeholder="请选择权限列表"
      {...props}
      fieldProps={{
        loading: isPending,
        treeData: data?.children,
        fieldNames: {
          label: "name",
          value: "id",
        },
        ...props.fieldProps,
      }}
    />
  );
}
