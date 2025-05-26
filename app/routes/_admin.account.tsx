import { PageContainer } from "@ant-design/pro-components";
import { Tag } from "antd";
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
    <PageContainer title="账户管理">
      <EntityTable<
        AccountResponse,
        AccountQuery,
        AccountCreateRequest,
        AccountUpdateRequest,
        AccountDeleteRequest
      >
        entityConfig={AccountEntity}
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
            colProps: { xs: 24, lg: 8 },
          },
          {
            title: "手机号",
            dataIndex: "phone",
            colProps: { xs: 24, lg: 8 },
          },
          {
            title: "状态",
            dataIndex: "disabled",
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
            hideInSearch: true,
            sorter: true,
            hideInForm: true,
          },
          {
            title: "备注",
            dataIndex: ["accountInfo", "remark"],
            hideInForm: true,
          },
          {
            title: "真实姓名",
            dataIndex: ["accountInfo", "realname"],
            hideInSearch: true,
            hideInForm: true,
          },
          {
            title: "身份证号",
            dataIndex: ["accountInfo", "idCard"],
            hideInSearch: true,
            hideInForm: true,
          },
          {
            title: "生日",
            dataIndex: ["accountInfo", "birthday"],
            valueType: "date",
            hideInSearch: true,
            sorter: true,
            hideInForm: true,
          },
          {
            title: "性别",
            dataIndex: ["accountInfo", "genderCode"],
            hideInSearch: true,
            hideInForm: true,
          },
          {
            title: "国家",
            dataIndex: ["accountInfo", "nationCode"],
            hideInSearch: true,
            hideInForm: true,
          },
          {
            title: "省份",
            dataIndex: ["accountInfo", "provinceCode"],
            hideInSearch: true,
            hideInForm: true,
          },
          {
            title: "城市",
            dataIndex: ["accountInfo", "cityCode"],
            hideInSearch: true,
            hideInForm: true,
          },
          {
            title: "民族",
            dataIndex: ["accountInfo", "nationCode"],
            hideInSearch: true,
            hideInForm: true,
          },
          {
            title: "语言",
            dataIndex: ["accountInfo", "languageCode"],
            hideInSearch: true,
            hideInForm: true,
          },
          {
            title: "账户部门",
            dataIndex: "departments",
            valueType: "department" as any,
            hideInTable: true,
            fieldProps: {
              multiple: true,
            },
          },
          {
            title: "账户角色",
            dataIndex: "roles",
            valueType: "role" as any,
            hideInTable: true,
            fieldProps: {
              mode: "multiple",
            },
          },
          {
            title: "账户权限",
            dataIndex: " permissions",
            valueType: "permission" as any,
            hideInTable: true,
            fieldProps: {
              multiple: true,
            },
          },
        ]}
      />
    </PageContainer>
  );
}
