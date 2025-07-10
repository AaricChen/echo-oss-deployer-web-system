import {
  ProFormSelect,
  type ProFormSelectProps,
} from "@ant-design/pro-components";
import { useTableRequest } from "~/hooks/http";
import { SecurityScope } from "~/types/common";
import type {
  PermissionGroupQuery,
  PermissionGroupResponse,
} from "~/types/permission";

export interface PermissionGroupSelectProps extends ProFormSelectProps {
  tenant?: string;
  scope?: keyof typeof SecurityScope;
}

export default function PermissionGroupSelect({
  tenant,
  scope,
  fieldProps,
}: PermissionGroupSelectProps) {
  const { mutateAsync } = useTableRequest<
    PermissionGroupResponse,
    PermissionGroupQuery
  >("/permission/group");

  return (
    <ProFormSelect
      showSearch
      params={{ scope, tenant }}
      request={async () => {
        return mutateAsync({
          params: {
            scope,
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
      fieldProps={{ placeholder: "请选择权限组", ...fieldProps }}
    />
  );
}
