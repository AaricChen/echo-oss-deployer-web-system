import {
  ProFormCascader,
  type ProFormItemProps,
} from "@ant-design/pro-components";
import { useEffect, useState } from "react";
import { useDistrict } from "~/apis/district";
import { useTableRequest } from "~/hooks/http";
import type { DistrictQuery, DistrictResponse } from "~/types/district";

export interface DistrictSelectProps extends ProFormItemProps {
  maxLevel?: number; // 行政区最大层级 默认3级 支持1-5级
  value?: number;
}

export default function DistrictSelect({
  maxLevel = 3,
  value,
  fieldProps,
}: DistrictSelectProps) {
  const { data, isFetching } = useDistrict(value);

  const [options, setOptions] = useState<
    {
      label: string;
      value: number;
      isLeaf: boolean;
    }[]
  >([]);

  const { mutateAsync, isPending: isFetchingDistrict } = useTableRequest<
    DistrictResponse,
    DistrictQuery
  >("/district");

  useEffect(() => {
    mutateAsync({
      params: {
        pageSize: 100,
        root: true,
      },
      sort: {},
      filter: {},
    }).then((res) => {
      setOptions(
        res.data.map((item) => ({
          label: item.name,
          value: item.id,
          isLeaf: item.level === maxLevel,
        })),
      );
    });
  }, []);

  return (
    <ProFormCascader
      initialValue={value}
      fieldProps={{
        loading: isFetching || isFetchingDistrict,
        displayRender: (v: any) => {
          if (data) {
            return data.path;
          }
        },
        options,
        loadData: (v) => {
          const target = v[v.length - 1];
          mutateAsync({
            params: {
              parent: target.value,
              pageSize: 100,
            },
            sort: {},
            filter: {},
          }).then((res) => {
            target.children = res.data.map((item) => ({
              label: item.name,
              value: item.id,
              isLeaf: item.level === maxLevel,
            }));
            setOptions([...options]);
          });
        },
        ...fieldProps,
        onChange: (v) => {
          if (Array.isArray(v)) {
            fieldProps?.onChange?.(v[v.length - 1]);
          }
        },
      }}
    />
  );
}
