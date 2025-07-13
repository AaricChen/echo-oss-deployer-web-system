import type { Route } from ".react-router/types/app/routes/+types/_admin.tenant.$tenant..department.$department.role";
import { PageContainer } from "@ant-design/pro-components";
import { Button, Tag } from "antd";
import { useNavigate } from "react-router";
import { useTenantBasicInfo } from "~/apis/tenant";
import EntityTable from "~/components/entity/EntityTable";
import RolePermissionPreviewer from "~/components/role/RolePermissionPreviewer";
import { useGet } from "~/hooks/http";
import {
  DataScopeLevel,
  RoleEntity,
  type DataScopeEntity,
  type DataScopeResponse,
  type RoleCreateRequest,
  type RoleDeleteRequest,
  type RoleQuery,
  type RoleResponse,
  type RoleUpdateRequest,
} from "~/types/role";

export default function TenantRolePage({ params }: Route.ComponentProps) {
  const { tenant, department } = params;
  const navigate = useNavigate();

  const { data: tenantBasicInfo, isPending } = useTenantBasicInfo({
    code: tenant,
  });

  const { data: scopeEntities } = useGet<DataScopeEntity[]>({
    queryKey: ["role", "scope-entities"],
    url: "/role/scope-entities",
  });

  return (
    <PageContainer
      title={tenantBasicInfo?.tenantInfo.name + " 部门角色管理"}
      loading={isPending}
      extra={
        <Button onClick={() => navigate(`/tenant/${tenant}/department`)}>
          返回部门管理
        </Button>
      }
    >
      <EntityTable<
        RoleResponse,
        RoleQuery,
        RoleCreateRequest,
        RoleUpdateRequest,
        RoleDeleteRequest
      >
        query={{
          tenant,
          department,
        }}
        entityConfig={RoleEntity}
        createInitialValues={{
          scope: "TENANT",
          tenant,
          department,
          name: "",
          permissions: [],
          permissionGroups: [],
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
            dataIndex: "scope",
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
            dataIndex: "department",
            hideInSearch: true,
            hideInTable: true,
            formItemProps: {
              hidden: true,
            },
          },
          {
            title: "名称",
            dataIndex: "name",
            align: "center",
            formItemProps: {
              rules: [
                { required: true, message: "请输入名称" },
                { max: 32, message: "名称长度不能超过32个字符" },
              ],
            },
            colProps: {
              xs: 24,
              lg: 12,
            },
          },
          {
            title: "备注",
            dataIndex: "remark",
            align: "center",
            formItemProps: {
              rules: [{ max: 64, message: "备注长度不能超过64个字符" }],
            },
            colProps: {
              xs: 24,
              lg: 12,
            },
          },
          {
            title: "权限组数量",
            dataIndex: "permissionGroups",
            valueType: "permissionGroup" as any,
            hideInSearch: true,
            align: "right",
            formItemProps: {
              label: "权限组列表",
            },
            fieldProps: {
              mode: "multiple",
              scope: "TENANT",
              tenant,
            },
          },
          {
            title: "权限数量",
            dataIndex: "permissions",
            valueType: "permission" as any,
            hideInSearch: true,
            align: "right",
            formItemProps: {
              label: "权限列表",
            },
            fieldProps: {
              scope: "TENANT",
            },
          },
          {
            title: "权限列表",
            dataIndex: "aggregatedPermissions",
            align: "center",
            hideInForm: true,
            hideInSearch: true,
            render: (_, record) => {
              return <RolePermissionPreviewer scope="TENANT" role={record} />;
            },
          },
          {
            title: "数据范围",
            dataIndex: "dataScopes",
            valueType: "formList",
            hideInSearch: true,
            align: "center",
            formItemProps: {
              tooltip:
                "数据范围定义了该角色可以访问的实体和部门，一个角色可以有多个数据范围",
            },
            fieldProps: {
              creatorButtonProps: {
                creatorButtonText: "新增数据范围",
              },
            },
            renderText: (dataScopes: DataScopeResponse[]) => {
              return dataScopes.map((item) => (
                <Tag key={item.level}>{DataScopeLevel[item.level].text}</Tag>
              ));
            },
            columns: [
              {
                valueType: "group",
                columns: [
                  {
                    title: "访问级别",
                    dataIndex: "level",
                    valueType: "select",
                    valueEnum: DataScopeLevel,
                    formItemProps: {
                      tooltip: "访问级别定义了该角色可以访问的部门信息",
                    },
                    colProps: {
                      xs: 24,
                      lg: 10,
                    },
                  },
                  {
                    title: "实体列表",
                    dataIndex: "entities",
                    valueType: "select",
                    formItemProps: {
                      tooltip:
                        "设置该数据范围对那些实体有效，不选择表示该数据范围对所有实体有效",
                    },
                    fieldProps: {
                      options: scopeEntities,
                      mode: "multiple",
                    },
                    colProps: {
                      xs: 24,
                      lg: 14,
                    },
                  },
                ],
              },
              {
                valueType: "dependency",
                name: ["level"],
                columns: ({ level }) => {
                  if (level === "CUSTOM") {
                    return [
                      {
                        title: "自定义部门",
                        dataIndex: "departments",
                        valueType: "department" as any,
                        formItemProps: {
                          tooltip:
                            "在访问级别为自定义时，可以设置该数据范围对那些部门有效",
                        },
                        fieldProps: {
                          tenant,
                          mode: "multiple",
                        },
                      },
                    ];
                  } else {
                    return [];
                  }
                },
              },
            ],
          },
        ]}
      />
    </PageContainer>
  );
}
