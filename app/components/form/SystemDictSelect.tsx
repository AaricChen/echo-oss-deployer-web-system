import {
  ProFormSelect,
  type ProFormSelectProps,
} from "@ant-design/pro-components";
import { useState } from "react";
import { useTableRequest } from "~/hooks/http";
import {
  type SystemDictItemQuery,
  type SystemDictItemResponse,
} from "~/types/systemDict";

export interface SystemDictSelectProps extends ProFormSelectProps {
  dict: string;
  value?: string;
}

export default function SystemDictSelect({
  dict,
  value,
  fieldProps,
}: SystemDictSelectProps) {
  const { mutateAsync } = useTableRequest<
    SystemDictItemResponse,
    SystemDictItemQuery
  >("/system/dict/item");

  const [search, setSearch] = useState("");

  return (
    <ProFormSelect
      showSearch
      debounceTime={300}
      params={{ name: search }}
      request={async () => {
        return mutateAsync({
          params: {
            dict,
            name: search,
            pageSize: 999,
          },
          sort: {},
          filter: {},
        }).then((res) => {
          return res.data.map((item) => ({
            label: item.name,
            value: item.code,
          }));
        });
      }}
      fieldProps={{
        value: value || undefined,
        onSearch: (v) => {
          setSearch(v);
        },
        ...fieldProps,
      }}
    />
  );
}
