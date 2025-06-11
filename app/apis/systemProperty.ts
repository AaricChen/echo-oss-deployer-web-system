import { useHttpMutation } from "~/hooks/http";

export function useResetSystemProperty() {
  return useHttpMutation<{ id: string }, void>({
    url: (request) => `/system/property/${request.id}/reset`,
    method: "POST",
    action: "重置系统属性",
  });
}
