import { useMemo } from "react";
import ActionForm from "~/components/form/ActionForm";
import type { EntityToolbarAction } from "~/components/table/EntityTable";
import { usePost } from "~/hooks/http";
import type { EntityRequest, EntityResponse } from "~/types/entity";

export interface EntityToolbarActionFormProps<
  Response extends EntityResponse = EntityResponse,
> {
  name: string; // 实体名称
  baseUrl: string; // 实体接口路径
  selectedRowKeys?: React.Key[];
  selectedRows?: Response[];
}

export default function EntityToolbarActionForm<
  Request extends EntityRequest = EntityRequest,
  Response extends EntityResponse = EntityResponse,
>({
  name,
  baseUrl,
  selectedRowKeys,
  selectedRows,
  render,
}: EntityToolbarActionFormProps<Response> &
  Pick<EntityToolbarAction<Request, Response>, "render">) {
  const action = useMemo(() => {
    return render();
  }, [selectedRowKeys, selectedRows, render]);

  const actionUrl = useMemo(() => {
    if (action.baseUrl) {
      return `${action.baseUrl}${action.suffix ?? ""}`;
    } else {
      return `${baseUrl}${action.suffix ?? ""}`;
    }
  }, [baseUrl, action.baseUrl, action.suffix]);

  const title = useMemo(() => {
    return `${action.name}${name}`;
  }, [action.name, name]);

  const mutation = usePost<Request, Response>({
    url: actionUrl,
    action: title,
  });

  return (
    <ActionForm<Request, Response>
      {...action}
      title={title}
      mutation={mutation}
    />
  );
}
