import {
  ModalForm,
  ProFormText,
  type ProFormInstance,
} from "@ant-design/pro-components";
import { Button } from "antd";
import { useRef } from "react";
import { useUpdateAccountPassword } from "~/apis/account";
import { type AccountPasswordUpdateRequest } from "~/types/account";

export interface AccountPasswordFormProps {
  id: string;
  onFinish?: () => Promise<void>;
}

export default function AccountPasswordForm({
  id,
  onFinish,
}: AccountPasswordFormProps) {
  const formRef = useRef<ProFormInstance>(null);

  const { mutateAsync: updateAccountPassword } = useUpdateAccountPassword();

  return (
    <ModalForm<AccountPasswordUpdateRequest>
      formRef={formRef}
      trigger={<Button type="link">登录密码</Button>}
      title="设置账户登录密码"
      grid
      onFinish={async (values) => {
        await updateAccountPassword(values);
        await onFinish?.();
        return true;
      }}
      width={480}
      initialValues={{ id, password: "" }}
    >
      <ProFormText name="id" hidden />
      <ProFormText.Password
        name="password"
        label="新密码"
        placeholder="请输入新密码"
        colProps={{ xs: 24 }}
        rules={[{ required: true, message: "请输入账户登录密码" }]}
      />
    </ModalForm>
  );
}
