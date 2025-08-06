import { useMemo } from "react";
import ActionForm from "~/components/form/ActionForm";
import type { EntityRowAction } from "~/components/table/EntityTable";
import { usePut } from "~/hooks/http";
import type { EntityRequest, EntityResponse } from "~/types/entity";

export interface EntityRowActionFormProps<
  Request extends EntityRequest = EntityRequest,
  Response extends EntityResponse = EntityResponse,
> {
  name: string; // 实体名称
  baseUrl: string; // 实体接口路径
  idField: string; // 实体ID字段
  entity: Response;
}

export default function EntityRowActionForm<
  Request extends EntityRequest = EntityRequest,
  Response extends EntityResponse = EntityResponse,
>({
  name,
  baseUrl,
  idField,
  entity,
  render,
}: EntityRowActionFormProps<Request, Response> &
  Pick<EntityRowAction<Request, Response>, "render">) {
  const action = useMemo(() => {
    return render();
  }, [entity, render]);

  const entityId = useMemo(() => {
    return entity[idField as keyof Response];
  }, [entity, idField]);

  const actionUrl = useMemo(() => {
    if (action.baseUrl) {
      return `${action.baseUrl}/${entityId}${action.suffix ?? ""}`;
    } else {
      return `${baseUrl}/${entityId}${action.suffix ?? ""}`;
    }
  }, [baseUrl, action.baseUrl, action.suffix]);

  const title = useMemo(() => {
    return `${action.name}${name}`;
  }, [action.name, name]);

  const mutation = usePut<Request, Response>({
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
