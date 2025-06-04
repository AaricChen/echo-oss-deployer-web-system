import { useGet } from "~/hooks/http";
import type { SystemDictResponse } from "~/types/systemDict";

export function useSystemDict(id?: string) {
  return useGet<SystemDictResponse>({
    queryKey: ["system", "dict", id],
    url: `/system/dict/${id}`,
    options: {
      enabled: !!id,
    },
  });
}
