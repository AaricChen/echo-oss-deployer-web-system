import {
  ModalForm,
  PageContainer,
  ProFormText,
} from "@ant-design/pro-components";
import { Button, Card, Modal, Space, Tree, Typography } from "antd";
import { useEffect, useState } from "react";
import { useDebounce } from "react-use";
import {
  useCreateDepartment,
  useDeleteDepartment,
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
  const { mutateAsync: deleteDepartment } = useDeleteDepartment();
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
            <Button
              type="primary"
              danger
              disabled={!selectedDepartment}
              onClick={async () => {
                Modal.confirm({
                  title: `确定要删除部门${selectedDepartment?.name} ？`,
                  onOk: async () => {
                    await deleteDepartment({
                      id: selectedDepartment?.id,
                    });
                    setSelectedDepartment(null);
                    await refresh();
                  },
                });
              }}
            >
              删除
            </Button>
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
            const dropPos = node.pos.split("-");
            const sequence = Number(dropPos[dropPos.length - 1]);
            const dropType = dropPosition - sequence;

            /**
             * -1 是移动到和dropKey的平级 并在其上面(即info.dropPosition比dropKey的下标小一个)。
             * 1 是移动到和dropKey的平级 并在其下面(info.dropPosition比dropKey的下标大一个)。
             * 0 是移动到dropKey下面作为他的子级(info.dropPosition和dropKey的下标同样大)。
             */

            if (dropType === 0) {
              // 将Drop的部门设为父级
              await updateDepartmentParent({
                id: dragNode.id,
                parent: node.id,
                sequence,
              });
            } else if (dropType === -1) {
              // 将Drop的部门设为同级，并且Sequence小一个
              await updateDepartmentParent({
                id: dragNode.id,
                parent: node.parent,
                sequence: node.sequence - 1,
              });
            } else if (dropType === 1) {
              await updateDepartmentParent({
                id: dragNode.id,
                parent: node.parent,
                sequence: node.sequence + 1,
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
