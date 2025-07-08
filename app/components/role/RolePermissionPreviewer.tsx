import { Button, Modal, Table } from "antd";
import { useMemo, useState } from "react";
import { useGetPermissions } from "~/apis/permission";
import type { SecurityScope } from "~/types/common";
import type { PermissionResponse } from "~/types/permission";
import type { RoleResponse } from "~/types/role";

export interface RolePermissionPreviewerProps {
  scope: keyof typeof SecurityScope;
  role: RoleResponse;
}

export default function RolePermissionPreviewer({
  scope,
  role,
}: RolePermissionPreviewerProps) {
  const { data: allPermissions } = useGetPermissions(scope);
  const [open, setOpen] = useState(false);

  const calcPermissions: PermissionResponse[] = useMemo(() => {
    const permissions = role.permissions;
    const permissionGroups = role.permissionGroups;
    const aggregatedPermissions = [];
    for (const permission of permissions) {
      aggregatedPermissions.push(permission);
    }

    // TODO 计算权限组的权限

    return aggregatedPermissions
      .map((permission) => {
        if (allPermissions) {
          return allPermissions.find((p) => p.id === permission);
        } else {
          return {
            key: permission,
            id: permission,
            name: "",
            children: [],
          };
        }
      })
      .filter((p) => p !== undefined);
  }, [role, allPermissions]);

  return (
    <>
      <Button type="link" onClick={() => setOpen(true)}>
        查看权限列表
      </Button>
      <Modal open={open} onCancel={() => setOpen(false)} title="权限列表">
        <Table<PermissionResponse>
          rowKey="id"
          columns={[
            {
              dataIndex: "name",
              title: "名称",
            },
          ]}
          dataSource={calcPermissions}
          pagination={false}
        />
      </Modal>
    </>
  );
}
