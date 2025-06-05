import {
  ProFormCascader,
  type ProFormItemProps,
} from "@ant-design/pro-components";
import { useEffect, useState } from "react";
import { useTableRequest } from "~/hooks/http";
import type { DistrictQuery, DistrictResponse } from "~/types/district";

export interface DistrictSelectProps extends ProFormItemProps {
  maxLevel?: number; // 行政区最大层级 默认3级 支持1-5级
}

export default function DistrictSelect(props: DistrictSelectProps) {
  const { maxLevel = 3, ...formProps } = props;

  const [options, setOptions] = useState<
    {
      label: string;
      value: number;
      isLeaf: boolean;
    }[]
  >([]);

  const { mutateAsync } = useTableRequest<DistrictResponse, DistrictQuery>(
    "/district",
  );

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
      transform={(v: any) => {
        if (v.id) {
          return v.id;
        } else {
          return v[v.length - 1];
        }
      }}
      {...formProps}
      fieldProps={{
        displayRender: (v: any) => {
          if (Array.isArray(v)) {
            if (v.length < maxLevel) {
              return v[v.length - 1].path;
            }
            return v.join("/");
          }
          return null;
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
        ...formProps.fieldProps,
      }}
    />
  );
}
