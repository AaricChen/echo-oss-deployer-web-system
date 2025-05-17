import { PageContainer, ProTable } from "@ant-design/pro-components";
import { useTableRequest } from "~/hooks/http";
import type { AccountEntity } from "~/types/account";

export default function Accounts() {
  const { mutateAsync: getAccounts } =
    useTableRequest<AccountEntity>("/account");
  return (
    <PageContainer title="账户管理">
      <ProTable<AccountEntity>
        rowKey="id"
        search={{}}
        columns={[
          {
            title: "用户名",
            dataIndex: "username",
            search: true,
          },
        ]}
        request={async (params, sort, filter) => {
          return getAccounts({ params, sort, filter });
        }}
      />
    </PageContainer>
  );
}
