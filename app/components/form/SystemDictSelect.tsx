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
}

export default function SystemDictSelect(props: SystemDictSelectProps) {
  const { dict, ...formProps } = props;
  const { mutateAsync } = useTableRequest<
    SystemDictItemResponse,
    SystemDictItemQuery
  >("/system/dict/item");

  const [search, setSearch] = useState("");
  console.log("🚀 ~ SystemDictSelect ~ search:", search);

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
      {...formProps}
      fieldProps={{
        onSearch: (v) => {
          setSearch(v);
        },
        ...formProps.fieldProps,
      }}
    />
    // <Select<SystemDictItemResponse>
    //   fieldNames={{ label: "name", value: "code" }}
    //   options={data?.data ?? []}
    //   loading={isPending}
    //   placeholder="请选择项"
    //   value={value}
    //   onChange={(v) => {
    //     if (onChange) {
    //       onChange(v.code);
    //     }
    //   }}
    //   {...fieldProps}
    //   style={{
    //     ...fieldProps?.style,
    //   }}
    // />
  );
}
