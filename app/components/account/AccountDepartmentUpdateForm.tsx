import { BetaSchemaForm } from "@ant-design/pro-components";
import { Button, Modal, type FormInstance } from "antd";
import { useMemo, useRef, useState } from "react";
import { useUpdateAccountDepartment } from "~/apis/account";
import type {
  AccountDepartmentUpdateRequest,
  AccountResponse,
} from "~/types/account";

export interface AccountDepartmentUpdateFormProps {
  account: AccountResponse;
  tenant?: string;
  onFinish?: () => Promise<void>;
}

export default function AccountDepartmentUpdateForm({
  account,
  tenant,
  onFinish,
}: AccountDepartmentUpdateFormProps) {
  const formRef = useRef<FormInstance>(null);
  const [openModal, setOpenModal] = useState(false);
  const { mutateAsync: updateAccountDepartment } = useUpdateAccountDepartment();

  const initialValue = useMemo(() => {
    return account.departments.map((department) => department.id);
  }, [account]);

  return (
    <>
      <Button type="link" onClick={() => setOpenModal(true)}>
        分配部门
      </Button>
      <Modal
        open={openModal}
        onCancel={() => setOpenModal(false)}
        title="分配部门"
        footer={false}
      >
        <BetaSchemaForm<AccountDepartmentUpdateRequest>
          formRef={formRef}
          grid
          initialValues={{
            departments: initialValue,
          }}
          columns={[
            {
              title: "部门",
              dataIndex: "departments",
              valueType: "department" as any,
              fieldProps: {
                mode: "multiple",
                tenant,
              },
            },
          ]}
          onFinish={async (values) => {
            await updateAccountDepartment({
              id: account.id,
              departments: values.departments,
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
