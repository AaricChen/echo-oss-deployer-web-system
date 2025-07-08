import {
  ProFormSelect,
  type ProFormSelectProps,
} from "@ant-design/pro-components";
import { useTableRequest } from "~/hooks/http";
import type { RoleQuery, RoleResponse } from "~/types/role";

export interface RoleSelectProps extends ProFormSelectProps {
  tenant?: string;
}

export default function RoleSelect({ tenant, fieldProps }: RoleSelectProps) {
  const { mutateAsync } = useTableRequest<RoleResponse, RoleQuery>("/role");
  return (
    <ProFormSelect
      showSearch
      params={{ tenant }}
      request={async () => {
        return mutateAsync({
          params: {
            tenant,
          },
        }).then((res) => {
          return res.data.map((item) => ({
            label: item.name,
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
        mode: "multiple",
        placeholder: "请选择角色",
        ...fieldProps,
      }}
    />
  );
}
