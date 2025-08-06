import {
  BetaSchemaForm,
  type ProFormColumnsType,
  type ProFormInstance,
} from "@ant-design/pro-components";
import type { DefaultError, UseMutationResult } from "@tanstack/react-query";
import { Button, Modal, type ButtonProps } from "antd";
import { useRef, useState } from "react";
import Authorization from "~/components/security/Authorization";
import type { EntityRequest } from "~/types/entity";
import type { Permission } from "~/types/permission";

export interface ActionFormProps<Request extends EntityRequest, Response> {
  name: string; // 操作名称，会用于操作按钮的文本
  title: string; // 操作标题，会用于操作弹窗的标题
  mutation: UseMutationResult<Response, DefaultError, Request, unknown>;
  columns: ProFormColumnsType<Request>[]; // 操作表单项配置
  permission?: Permission; // 该操作需要的权限
  buttonProps?: Pick<ButtonProps, "type" | "loading" | "disabled">; // 按钮属性
  initialValues?: Request; // 操作表单的初始值
  resetOnFinish?: boolean; // 操作成功以后是否重置表单
  onFinish?: () => void | Promise<void>; // 操作成功以后的回调
}

export default function ActionForm<Request extends EntityRequest, Response>({
  name,
  title,
  mutation,
  columns,
  permission,
  buttonProps,
  initialValues,
  resetOnFinish,
  onFinish,
}: ActionFormProps<Request, Response>) {
  const [openModal, setOpenModal] = useState(false);
  const formRef = useRef<ProFormInstance>(null);

  return (
    <>
      <Authorization permission={permission}>
        <Button {...buttonProps} onClick={() => setOpenModal(true)}>
          {name}
        </Button>
      </Authorization>
      <Modal
        open={openModal}
        onCancel={() => setOpenModal(false)}
        title={title}
        footer={false}
      >
        <BetaSchemaForm
          formRef={formRef}
          grid
          initialValues={initialValues}
          columns={columns}
          onFinish={async (values) => {
            await mutation.mutateAsync(values);
            if (onFinish) {
              await onFinish();
            }
            setOpenModal(false);
            if (resetOnFinish) {
              formRef.current?.resetFields();
            }
          }}
        />
      </Modal>
    </>
  );
}
