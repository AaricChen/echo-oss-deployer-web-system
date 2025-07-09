import { BetaSchemaForm } from "@ant-design/pro-components";
import { Button, Modal, type FormInstance } from "antd";
import { useMemo, useRef, useState } from "react";
import { useUpdateAccountRole } from "~/apis/account";
import type {
  AccountResponse,
  AccountRoleUpdateRequest,
} from "~/types/account";
import type { SecurityScope } from "~/types/common";

export interface AccountRoleUpdateFormProps {
  account: AccountResponse;
  scope: keyof typeof SecurityScope;
  tenant?: string;
  onFinish?: () => Promise<void>;
}

export default function AccountRoleUpdateForm({
  account,
  scope,
  tenant,
  onFinish,
}: AccountRoleUpdateFormProps) {
  const formRef = useRef<FormInstance>(null);
  const [openModal, setOpenModal] = useState(false);
  const { mutateAsync: updateAccountRole } = useUpdateAccountRole();

  const initialValue = useMemo(() => {
    return account.roles.map((role) => role.id);
  }, [account]);

  return (
    <>
      <Button type="link" onClick={() => setOpenModal(true)}>
        分配角色
      </Button>
      <Modal
        open={openModal}
        onCancel={() => setOpenModal(false)}
        title="分配角色"
        footer={false}
      >
        <BetaSchemaForm<AccountRoleUpdateRequest>
          formRef={formRef}
          grid
          initialValues={{
            roles: initialValue,
          }}
          columns={[
            {
              title: "角色",
              dataIndex: "roles",
              valueType: "role" as any,
              fieldProps: {
                scope,
                tenant,
              },
            },
          ]}
          onFinish={async (values) => {
            await updateAccountRole({
              id: account.id,
              roles: values.roles,
            });
            if (onFinish) {
              await onFinish();
            }
            setOpenModal(false);
          }}
        />
      </Modal>
    </>
  );
}
