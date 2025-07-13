import { useGet, useHttpMutation } from "~/hooks/http";
import type { DistrictResponse } from "~/types/district";

export function useDistrict(id?: number) {
  return useGet<DistrictResponse>({
    queryKey: ["district", id],
    url: `/district/${id}`,
    options: {
      enabled: !!id,
      staleTime: Infinity,
    },
  });
}

export function useResetDistrict() {
  return useHttpMutation<{ id: number }, void>({
    method: "POST",
    url: (request) => `/district/${request.id}/reset`,
    action: "重置行政区",
  });
}
