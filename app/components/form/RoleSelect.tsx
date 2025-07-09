import {
  ProFormSelect,
  type ProFormSelectProps,
} from "@ant-design/pro-components";
import { useTableRequest } from "~/hooks/http";
import type { SecurityScope } from "~/types/common";
import type { RoleQuery, RoleResponse } from "~/types/role";

export interface RoleSelectProps extends ProFormSelectProps {
  scope?: keyof typeof SecurityScope;
  tenant?: string;
}

export default function RoleSelect({
  scope,
  tenant,
  fieldProps,
}: RoleSelectProps) {
  const { mutateAsync } = useTableRequest<RoleResponse, RoleQuery>("/role");
  return (
    <ProFormSelect
      showSearch
      params={{ tenant, scope }}
      request={async () => {
        return mutateAsync({
          params: {
            tenant,
            scope,
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
