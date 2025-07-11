import type { Route } from ".react-router/types/app/routes/+types/_admin.tenant.$tenant.department";
import { PageContainer } from "@ant-design/pro-components";
import { Button, type FormInstance } from "antd";
import { useNavigate } from "react-router";
import { useTenantBasicInfo } from "~/apis/tenant";
import EntityTable from "~/components/entity/EntityTable";
import {
  DepartmentEntity,
  type DepartmentCreateRequest,
  type DepartmentDeleteRequest,
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
          DepartmentCreateRequest,
          DepartmentUpdateRequest,
          DepartmentDeleteRequest
        >
          query={{
            root: true,
            tenant,
          }}
          search={false}
          entityConfig={DepartmentEntity}
          createInitialValues={{
            tenant,
            departmentInfo: {
              name: "",
            },
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
              dataIndex: "tenant",
              hideInSearch: true,
              hideInTable: true,
              formItemProps: {
                hidden: true,
              },
            },
            {
              title: "编码",
              dataIndex: "code",
              align: "center",
              formItemProps: {
                tooltip: "部门编码，用于标识该部门，不能重复",
                rules: [
                  { required: true, message: "请输入编码" },
                  { max: 32, message: "编码长度不能超过32个字符" },
                ],
              },
              fieldProps: (form?: FormInstance) => {
                if (form) {
                  const id = form.getFieldValue("id");
                  return {
                    disabled: !!id,
                  };
                }
                return {};
              },
              colProps: {
                xs: 24,
                lg: 8,
              },
            },
            {
              title: "部门排序",
              dataIndex: "sequence",
              align: "right",
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
              title: "上级部门",
              dataIndex: "parent",
              valueType: "department" as any,
              align: "center",
              hideInTable: true,
              hideInSearch: true,
              fieldProps: {
                tenant,
              },
              colProps: {
                xs: 24,
                lg: 8,
              },
            },
            {
              title: "部门名称",
              dataIndex: ["departmentInfo", "name"],
              align: "center",
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
              title: "下级部门",
              dataIndex: "children",
              align: "center",
              renderText: (children: DepartmentResponse[]) => {
                return children.map((it) => it.departmentInfo.name).join(",");
              },
              colProps: {
                xs: 24,
                lg: 8,
              },
            },
            {
              title: "部门备注",
              dataIndex: ["departmentInfo", "remark"],
              align: "center",
              colProps: {
                xs: 24,
                lg: 8,
              },
            },
            {
              title: "成立日期",
              dataIndex: ["departmentInfo", "establishedAt"],
              valueType: "date",
              align: "center",
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
              align: "center",
              colProps: {
                xs: 24,
                lg: 12,
              },
            },
            {
              title: "部门地址",
              dataIndex: ["departmentInfo", "address"],
              align: "center",
              colProps: {
                xs: 24,
                lg: 12,
              },
            },
            {
              title: "部门联系人",
              dataIndex: ["departmentInfo", "contactName"],
              align: "center",
              colProps: {
                xs: 24,
                lg: 8,
              },
            },
            {
              title: "部门联系电话",
              dataIndex: ["departmentInfo", "contactPhone"],
              align: "center",
              colProps: {
                xs: 24,
                lg: 8,
              },
            },
            {
              title: "部门联系邮箱",
              dataIndex: ["departmentInfo", "contactEmail"],
              align: "center",
              colProps: {
                xs: 24,
                lg: 8,
              },
            },
          ]}
        />
      }
    />
  );
}
