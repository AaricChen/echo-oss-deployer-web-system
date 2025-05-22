import {
  ModalForm,
  PageContainer,
  ProFormText,
} from "@ant-design/pro-components";
import { Button, Card, Space, Tree, Typography } from "antd";
import { useEffect, useState } from "react";
import {
  useCreateDepartment,
  useUpdateDepartment,
  useUpdateDepartmentParent,
} from "~/apis/department";
import { useTableRequest } from "~/hooks/http";
import type {
  DepartmentCreateRequest,
  DepartmentQuery,
  DepartmentResponse,
  DepartmentUpdateRequest,
} from "~/types/department";
import { DepartmentEntity } from "~/types/department";

export default function Accounts() {
  const { mutateAsync: getDepartments, isPending } = useTableRequest<
    DepartmentResponse,
    DepartmentQuery
  >(DepartmentEntity.baseUrl);
  const { mutateAsync: createDepartment } = useCreateDepartment();
  const { mutateAsync: updateDepartment } = useUpdateDepartment();
  const { mutateAsync: updateDepartmentParent } = useUpdateDepartmentParent();
  const [departments, setDepartments] = useState<DepartmentResponse[]>([]);
  const [selectedDepartment, setSelectedDepartment] =
    useState<DepartmentResponse | null>(null);

  const refresh = async () => {
    const res = await getDepartments({
      params: {
        pageSize: 1000,
        root: true,
      },
      sort: {},
      filter: {},
    });
    setDepartments(res.data);
  };
  useEffect(() => {
    refresh();
  }, []);

  return (
    <PageContainer title="部门管理">
      <Card
        title="部门列表"
        loading={isPending}
        extra={
          <Space>
            <ModalForm<DepartmentCreateRequest>
              grid
              title="新增部门"
              width={640}
              trigger={<Button type="primary">新增</Button>}
              onFinish={async (values) => {
                await createDepartment(values);
                await refresh();
                return true;
              }}
              modalProps={{ destroyOnHidden: true }}
            >
              <ProFormText
                name="name"
                label="部门名称"
                colProps={{ span: 12 }}
                formItemProps={{
                  rules: [
                    { required: true, message: "请输入部门名称" },
                    { max: 32 },
                  ],
                }}
              />
              <ProFormText
                name="remark"
                label="备注"
                colProps={{ span: 12 }}
                formItemProps={{ rules: [{ max: 64 }] }}
              />
            </ModalForm>
            <ModalForm<DepartmentUpdateRequest>
              grid
              title="编辑部门"
              width={640}
              initialValues={
                selectedDepartment
                  ? {
                      id: selectedDepartment.id,
                      name: selectedDepartment.name,
                      remark: selectedDepartment.remark,
                      sequence: selectedDepartment.sequence,
                    }
                  : {}
              }
              trigger={
                <Button type="primary" disabled={!selectedDepartment}>
                  编辑
                </Button>
              }
              onFinish={async (values) => {
                await updateDepartment(values);
                setSelectedDepartment(null);
                await refresh();
                return true;
              }}
              modalProps={{ destroyOnHidden: true }}
            >
              <ProFormText name="id" hidden />
              <ProFormText name="sequence" hidden />
              <ProFormText
                name="name"
                label="部门名称"
                colProps={{ span: 12 }}
                formItemProps={{
                  rules: [
                    { required: true, message: "请输入部门名称" },
                    { max: 32 },
                  ],
                }}
              />
              <ProFormText
                name="remark"
                label="备注"
                colProps={{ span: 12 }}
                formItemProps={{ rules: [{ max: 64 }] }}
              />
            </ModalForm>
          </Space>
        }
      >
        <Tree<DepartmentResponse>
          showLine
          defaultExpandAll
          blockNode
          draggable
          selectable
          titleRender={(node) => {
            return (
              <div className="flex items-center gap-2">
                <Typography.Text>{node.name}</Typography.Text>
                <Typography.Text type="secondary" style={{ fontSize: 12 }}>
                  {node.remark}
                </Typography.Text>
              </div>
            );
          }}
          onSelect={async (_, info) => {
            const { node, selected } = info;
            setSelectedDepartment(selected ? node : null);
          }}
          onDrop={async ({ node, dragNode, dropToGap, dropPosition }) => {
            if (dropToGap && dropPosition === -1) {
              // 拖拽到节点之间
              await updateDepartmentParent({
                id: dragNode.id,
                parent: "",
              });
            } else {
              // 拖拽到节点内部 成为子部门
              await updateDepartmentParent({
                id: dragNode.id,
                parent: node.id,
              });
            }

            await refresh();
            return true;
          }}
          treeData={departments}
          fieldNames={{ title: "name", key: "id", children: "children" }}
        />
      </Card>
    </PageContainer>
  );
}
