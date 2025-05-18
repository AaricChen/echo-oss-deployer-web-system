import { PageContainer } from "@ant-design/pro-components";
import { Card, Tree } from "antd";
import { useGetPermissions } from "~/apis/permission";
import type { PermissionResponse } from "~/types/permission";

export default function Accounts() {
  const { data: permissions, isPending } = useGetPermissions();

  return (
    <PageContainer title="权限管理">
      <Card title="权限列表" loading={isPending}>
        <Tree<PermissionResponse>
          showLine
          defaultExpandAll
          blockNode
          fieldNames={{
            key: "id",
            title: "name",
          }}
          treeData={permissions?.children}
        />
      </Card>
    </PageContainer>
  );
}
