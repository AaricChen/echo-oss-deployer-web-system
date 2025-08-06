import { App, Button } from "antd";
import { useMemo } from "react";
import Authorization from "~/components/security/Authorization";
import type { EntityBatchDeleteAction } from "~/components/table/EntityTable";
import { useDelete } from "~/hooks/http";

export interface EntityBatchDeleteActionFormProps {
  name: string; // 实体名称
  baseUrl: string; // 实体接口路径
  selectedRowKeys: React.Key[];
  action: Omit<EntityBatchDeleteAction, "action">;
  onFinish?: () => void | Promise<void>;
}

export default function EntityBatchDeleteActionForm({
  name,
  baseUrl,
  selectedRowKeys,
  action,
  onFinish,
}: EntityBatchDeleteActionFormProps) {
  const { modal } = App.useApp();
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
      <Button
        key="batchDelete"
        type="link"
        danger
        onClick={() => {
          modal.confirm({
            title: `确定删除选中的 ${selectedRowKeys.length} 条${name ?? "数据"}吗？`,
            onOk: async () => {
              const payload = { ids: selectedRowKeys } as unknown as Request;
              await deleteEntity(payload);
              if (onFinish) {
                await onFinish();
              }
            },
          });
        }}
      >
        批量删除
      </Button>
    </Authorization>
  );
}
