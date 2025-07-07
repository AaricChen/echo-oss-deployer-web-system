import { useEffect, useState } from "react";
import { useTableRequest } from "~/hooks/http";
import {
  type SystemDictItemQuery,
  type SystemDictItemResponse,
} from "~/types/systemDict";

export interface SystemDictTextProps {
  dict: string;
  code?: string;
}

export default function SystemDictText({ dict, code }: SystemDictTextProps) {
  const [text, setText] = useState("-");
  const { mutateAsync, data } = useTableRequest<
    SystemDictItemResponse,
    SystemDictItemQuery
  >("/system/dict/item");

  useEffect(() => {
    if (dict && code) {
      mutateAsync({
        params: {
          dict,
          code,
        },
        sort: {},
        filter: {},
      });
    }
  }, [dict, code]);

  useEffect(() => {
    if (data && data.data.length > 0) {
      setText(data.data[0].name);
    }
  }, [data]);

  return <div>{text}</div>;
}
