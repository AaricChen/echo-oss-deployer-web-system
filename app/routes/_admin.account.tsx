import { PageContainer } from "@ant-design/pro-components";
import { Tag } from "antd";
import AccountInfoForm from "~/components/account/AccountInfoForm";
import AccountPasswordForm from "~/components/account/AccountPasswordForm";
import EntityTable from "~/components/entity/EntityTable";
import type {
  AccountCreateRequest,
  AccountDeleteRequest,
  AccountQuery,
  AccountResponse,
  AccountUpdateRequest,
} from "~/types/account";
import { AccountEntity } from "~/types/account";

export default function AccountPage() {
  return (
    <PageContainer
      content={
        <EntityTable<
          AccountResponse,
          AccountQuery,
          AccountCreateRequest,
          AccountUpdateRequest,
          AccountDeleteRequest
        >
          entityConfig={AccountEntity}
          deleteAction={false}
          rowActionRender={({ entity, action }) => {
            return [
              <AccountInfoForm
                key="editAccountInfo"
                entity={{
                  ...entity.accountInfo,
                  id: entity.id,
                  gender: entity.accountInfo.gender?.code,
                  nation: entity.accountInfo.nation?.code,
                  language: entity.accountInfo.language?.code,
                }}
                onFinish={async () => {
                  await action?.reload();
                }}
              />,
              <AccountPasswordForm
                key="editAccountPassword"
                id={entity.id}
                onFinish={async () => {
                  await action?.reload();
                }}
              />,
            ];
          }}
          columns={[
            {
              dataIndex: "id",
              hideInSearch: true,
              hideInTable: true,
              formItemProps: {
                hidden: true,
              },
            },
            {
              title: "账户资料",
              dataIndex: ["accountInfo", "info"],
              hideInTable: true,
              hideInForm: true,
              search: {
                transform: (value) => {
                  return {
                    info: value,
                  };
                },
              },
            },
            {
              title: "头像",
              dataIndex: ["accountInfo", "avatar"],
              valueType: "avatar",
              search: false,
              width: 48,
              fixed: "left",
              align: "center",
              hideInForm: true,
            },
            {
              title: "昵称",
              dataIndex: ["accountInfo", "nickname"],
              search: false,
              fixed: "left",
              align: "center",
              hideInForm: true,
            },
            {
              title: "用户名",
              dataIndex: "username",
              align: "center",
              render: (text: React.ReactNode, record: AccountResponse) => (
                <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  <span>{text}</span>
                  {record.admin && (
                    <Tag color="blue" style={{ marginLeft: 4 }}>
                      管理员
                    </Tag>
                  )}
                </div>
              ),
              colProps: { xs: 24, lg: 8 },
            },
            {
              title: "邮箱",
              dataIndex: "email",
              align: "center",
              colProps: { xs: 24, lg: 8 },
            },
            {
              title: "手机号",
              dataIndex: "phone",
              align: "center",
              colProps: { xs: 24, lg: 8 },
            },
            {
              title: "状态",
              dataIndex: "disabled",
              align: "center",
              valueType: "switch",
              fieldProps: {
                checkedChildren: "禁用",
                unCheckedChildren: "正常",
              },
              formItemProps: {
                label: "是否禁用",
              },
              colProps: { xs: 24, lg: 12 },
            },
            {
              title: "管理员",
              dataIndex: "admin",
              hideInTable: true,
              valueType: "switch",
              fieldProps: {
                checkedChildren: "是",
                unCheckedChildren: "否",
              },
              colProps: { xs: 24, lg: 12 },
            },
            {
              title: "登录时间",
              dataIndex: "loginAt",
              valueType: "dateTime",
              align: "center",
              hideInSearch: true,
              sorter: true,
              hideInForm: true,
            },
            {
              title: "创建时间",
              dataIndex: "createAt",
              valueType: "dateTime",
              align: "center",
              hideInSearch: true,
              sorter: true,
              hideInForm: true,
            },
            {
              title: "备注",
              align: "center",
              dataIndex: ["accountInfo", "remark"],
              hideInForm: true,
            },
            {
              title: "真实姓名",
              align: "center",
              dataIndex: ["accountInfo", "realname"],
              hideInSearch: true,
              hideInForm: true,
            },
            {
              title: "身份证号",
              align: "center",
              dataIndex: ["accountInfo", "idCard"],
              hideInSearch: true,
              hideInForm: true,
            },
            {
              title: "生日",
              align: "center",
              dataIndex: ["accountInfo", "birthday"],
              valueType: "date",
              hideInSearch: true,
              sorter: true,
              hideInForm: true,
            },
            {
              title: "性别",
              align: "center",
              dataIndex: ["accountInfo", "gender", "name"],
              hideInSearch: true,
              hideInForm: true,
            },
            {
              title: "行政区",
              align: "center",
              dataIndex: ["accountInfo", "district", "path"],
              hideInSearch: true,
              hideInForm: true,
            },
            {
              title: "民族",
              align: "center",
              dataIndex: ["accountInfo", "nation", "name"],
              hideInSearch: true,
              hideInForm: true,
            },
            {
              title: "语言",
              align: "center",
              dataIndex: ["accountInfo", "language", "name"],
              hideInSearch: true,
              hideInForm: true,
            },
            {
              title: "账户部门",
              dataIndex: "departments",
              valueType: "department" as any,
              hideInSearch: true,
              hideInTable: true,
              fieldProps: {
                multiple: true,
              },
            },
            {
              title: "账户角色",
              dataIndex: "roles",
              valueType: "role" as any,
              hideInSearch: true,
              hideInTable: true,
              fieldProps: {
                mode: "multiple",
              },
            },
            {
              title: "账户权限",
              dataIndex: "permissions",
              valueType: "permission" as any,
              hideInSearch: true,
              hideInTable: true,
              fieldProps: {
                multiple: true,
              },
            },
          ]}
        />
      }
    />
  );
}
