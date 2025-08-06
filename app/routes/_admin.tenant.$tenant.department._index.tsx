import type { Route } from ".react-router/types/app/routes/+types/_admin.tenant.$tenant.department._index";
import { PageContainer } from "@ant-design/pro-components";
import { Button } from "antd";
import { useNavigate } from "react-router";
import { useTenantBasicInfo } from "~/apis/tenant";
import Authorization from "~/components/security/Authorization";
import EntityTable from "~/components/table/EntityTable";
import {
  type DepartmentCreateRequest,
  type DepartmentQuery,
  type DepartmentResponse,
  type DepartmentUpdateRequest,
} from "~/types/department";

export default function TenantPermissionGroupPage({
  params,
}: Route.ComponentProps) {
  const { tenant } = params;
  const navigate = useNavigate();

  const { data: tenantBasicInfo, isPending } = useTenantBasicInfo({
    code: tenant,
  });

  return (
    <PageContainer
      title={tenantBasicInfo?.tenantInfo.name + " 部门管理"}
      loading={isPending}
      extra={<Button onClick={() => navigate("/tenant")}>返回租户管理</Button>}
      content={
        <EntityTable<
          DepartmentResponse,
          DepartmentQuery,
          {
            create: DepartmentCreateRequest;
            update: DepartmentUpdateRequest;
          }
        >
          entity="department"
          name="部门"
          baseUrl="/department"
          query={{ root: true, tenant }}
          search={false}
          toolbarActions={() => [
            {
              action: "create",
              permission: "system.department:create",
              initialValues: {
                tenant,
                departmentInfo: {
                  name: "",
                },
              },
              columns: [
                {
                  dataIndex: "tenant",
                  formItemProps: {
                    hidden: true,
                  },
                },
                {
                  title: "编码",
                  dataIndex: "code",
                  formItemProps: {
                    tooltip:
                      "部门编码，用于标识该部门，不能重复，设置以后不能修改",
                    rules: [
                      { required: true, message: "请输入编码" },
                      { max: 32, message: "编码长度不能超过32个字符" },
                    ],
                  },
                  colProps: {
                    xs: 24,
                    lg: 8,
                  },
                },
                {
                  title: "部门名称",
                  dataIndex: ["departmentInfo", "name"],
                  formItemProps: {
                    rules: [
                      { required: true, message: "请输入部门名称" },
                      { max: 32, message: "部门名称长度不能超过32个字符" },
                    ],
                  },
                  colProps: {
                    xs: 24,
                    lg: 8,
                  },
                },
                {
                  title: "上级部门",
                  dataIndex: "parent",
                  valueType: "department" as any,
                  fieldProps: {
                    tenant,
                  },
                  colProps: {
                    xs: 24,
                    lg: 8,
                  },
                },
                {
                  title: "部门排序",
                  dataIndex: "sequence",
                  formItemProps: {
                    tooltip:
                      "部门排序，用于标识该部门在租户中的排序，数字越大越靠后",
                  },
                  valueType: "digit",
                  fieldProps: {
                    style: {
                      width: "100%",
                    },
                  },
                  colProps: {
                    xs: 24,
                    lg: 8,
                  },
                },
                {
                  title: "部门备注",
                  dataIndex: ["departmentInfo", "remark"],
                  colProps: {
                    xs: 24,
                    lg: 16,
                  },
                },
                {
                  title: "成立日期",
                  dataIndex: ["departmentInfo", "establishedAt"],
                  valueType: "date",
                  fieldProps: {
                    style: {
                      width: "100%",
                    },
                  },
                  colProps: {
                    xs: 24,
                    lg: 8,
                  },
                },
                {
                  title: "部门地区",
                  dataIndex: ["departmentInfo", "district"],
                  valueType: "district" as any,
                  colProps: {
                    xs: 24,
                    lg: 16,
                  },
                },
                {
                  title: "部门地址",
                  dataIndex: ["departmentInfo", "address"],
                  colProps: {
                    xs: 24,
                  },
                },
                {
                  title: "部门联系人",
                  dataIndex: ["departmentInfo", "contactName"],
                  colProps: {
                    xs: 24,
                    lg: 8,
                  },
                },
                {
                  title: "部门联系电话",
                  dataIndex: ["departmentInfo", "contactPhone"],
                  colProps: {
                    xs: 24,
                    lg: 8,
                  },
                },
                {
                  title: "部门联系邮箱",
                  dataIndex: ["departmentInfo", "contactEmail"],
                  colProps: {
                    xs: 24,
                    lg: 8,
                  },
                },
              ],
            },
          ]}
          rowActions={({ entity }) => [
            <Authorization permission="system.role:query">
              <Button
                key="role"
                type="link"
                onClick={() => {
                  navigate(`/tenant/${tenant}/department/${entity.id}/role`);
                }}
              >
                角色管理
              </Button>
              ,
            </Authorization>,
            {
              action: "update",
              permission: "system.department:update",
              columns: [
                {
                  dataIndex: "id",
                  formItemProps: {
                    hidden: true,
                  },
                },
                {
                  dataIndex: "tenant",
                  formItemProps: {
                    hidden: true,
                  },
                },
                {
                  title: "编码",
                  dataIndex: "code",
                  formItemProps: {
                    tooltip: "部门编码，用于标识该部门，不能重复",
                    rules: [
                      { required: true, message: "请输入编码" },
                      { max: 32, message: "编码长度不能超过32个字符" },
                    ],
                  },
                  fieldProps: {
                    disabled: true,
                  },
                  colProps: {
                    xs: 24,
                    lg: 8,
                  },
                },
                {
                  title: "部门名称",
                  dataIndex: ["departmentInfo", "name"],
                  formItemProps: {
                    rules: [
                      { required: true, message: "请输入部门名称" },
                      { max: 32, message: "部门名称长度不能超过32个字符" },
                    ],
                  },
                  colProps: {
                    xs: 24,
                    lg: 8,
                  },
                },
                {
                  title: "上级部门",
                  dataIndex: "parent",
                  valueType: "department" as any,
                  fieldProps: {
                    tenant,
                  },
                  colProps: {
                    xs: 24,
                    lg: 8,
                  },
                },
                {
                  title: "部门排序",
                  dataIndex: "sequence",
                  formItemProps: {
                    tooltip:
                      "部门排序，用于标识该部门在租户中的排序，数字越大越靠后",
                  },
                  valueType: "digit",
                  fieldProps: {
                    style: {
                      width: "100%",
                    },
                  },
                  colProps: {
                    xs: 24,
                    lg: 8,
                  },
                },
                {
                  title: "部门备注",
                  dataIndex: ["departmentInfo", "remark"],
                  colProps: {
                    xs: 24,
                    lg: 16,
                  },
                },
                {
                  title: "成立日期",
                  dataIndex: ["departmentInfo", "establishedAt"],
                  valueType: "date",
                  fieldProps: {
                    style: {
                      width: "100%",
                    },
                  },
                  colProps: {
                    xs: 24,
                    lg: 8,
                  },
                },
                {
                  title: "部门地区",
                  dataIndex: ["departmentInfo", "district"],
                  valueType: "district" as any,
                  colProps: {
                    xs: 24,
                    lg: 16,
                  },
                },
                {
                  title: "部门地址",
                  dataIndex: ["departmentInfo", "address"],
                  colProps: {
                    xs: 24,
                  },
                },
                {
                  title: "部门联系人",
                  dataIndex: ["departmentInfo", "contactName"],
                  colProps: {
                    xs: 24,
                    lg: 8,
                  },
                },
                {
                  title: "部门联系电话",
                  dataIndex: ["departmentInfo", "contactPhone"],
                  colProps: {
                    xs: 24,
                    lg: 8,
                  },
                },
                {
                  title: "部门联系邮箱",
                  dataIndex: ["departmentInfo", "contactEmail"],
                  colProps: {
                    xs: 24,
                    lg: 8,
                  },
                },
              ],
            },
            {
              action: "delete",
              permission: "system.department:delete",
            },
          ]}
          batchOptionActions={() => [
            {
              action: "batch-delete",
              permission: "system.department:delete",
            },
          ]}
          columns={[
            {
              fixed: "left",
              width: 1,
              search: false,
            },
            {
              title: "编码",
              dataIndex: "code",
              align: "center",
              fixed: "left",
              width: 96,
            },
            {
              title: "部门名称",
              dataIndex: ["departmentInfo", "name"],
              align: "center",
              fixed: "left",
              width: 120,
            },
            {
              title: "部门排序",
              dataIndex: "sequence",
              align: "right",
            },
            {
              title: "下级部门",
              dataIndex: "children",
              align: "center",
              renderText: (children: DepartmentResponse[]) => {
                return children.map((it) => it.departmentInfo.name).join(",");
              },
            },
            {
              title: "部门备注",
              dataIndex: ["departmentInfo", "remark"],
              align: "center",
            },
            {
              title: "成立日期",
              dataIndex: ["departmentInfo", "establishedAt"],
              align: "center",
            },
            {
              title: "部门地区",
              dataIndex: ["departmentInfo", "district"],
              valueType: "district" as any,
              align: "center",
            },
            {
              title: "部门地址",
              dataIndex: ["departmentInfo", "address"],
              align: "center",
            },
            {
              title: "部门联系人",
              dataIndex: ["departmentInfo", "contactName"],
              align: "center",
            },
            {
              title: "部门联系电话",
              dataIndex: ["departmentInfo", "contactPhone"],
              align: "center",
            },
            {
              title: "部门联系邮箱",
              dataIndex: ["departmentInfo", "contactEmail"],
              align: "center",
            },
          ]}
        />
      }
    />
  );
}
