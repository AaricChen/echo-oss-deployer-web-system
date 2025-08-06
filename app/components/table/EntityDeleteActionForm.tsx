import { Button, Popconfirm } from "antd";
import { useMemo } from "react";
import Authorization from "~/components/security/Authorization";
import type { EntityDeleteAction } from "~/components/table/EntityTable";
import { useDelete } from "~/hooks/http";
import type { EntityResponse } from "~/types/entity";

export interface EntityDeleteActionFormProps<
  Response extends EntityResponse = EntityResponse,
> {
  name: string; // 实体名称
  baseUrl: string; // 实体接口路径
  entity: Response;
  action: Omit<EntityDeleteAction, "action">;
  onFinish?: () => void | Promise<void>;
}

export default function EntityDeleteActionForm<
  Response extends EntityResponse = EntityResponse,
>({
  name,
  baseUrl,
  entity,
  action,
  onFinish,
}: EntityDeleteActionFormProps<Response>) {
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

  const { mutateAsync: deleteEntity } = useDelete<Request, Response>({
    url: actionUrl,
    action: title,
  });

  return (
    <Authorization permission={action.permission}>
      <Popconfirm
        title={`确定删除该 ${name} 吗？`}
        onConfirm={async () => {
          const payload = { id: entity.id } as unknown as Request;
          await deleteEntity(payload);
          if (onFinish) {
            await onFinish();
          }
        }}
      >
        <Button
          type={action.buttonProps?.type ?? "link"}
          disabled={action.buttonProps?.disabled}
          loading={action.buttonProps?.loading}
          danger
        >
          删除
        </Button>
      </Popconfirm>
    </Authorization>
  );
}
