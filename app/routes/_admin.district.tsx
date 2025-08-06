import { PageContainer } from "@ant-design/pro-components";
import { App, Button } from "antd";
import { useNavigate } from "react-router";
import { useResetDistrict } from "~/apis/district";
import Authorization from "~/components/security/Authorization";
import EntityTable from "~/components/table/EntityTable";
import { useGet } from "~/hooks/http";
import {
  type DistrictCreateRequest,
  type DistrictQuery,
  type DistrictResponse,
  type DistrictUpdateRequest,
} from "~/types/district";
import type { Route } from "./+types/_admin._index";

export default function DistrictPage({ params }: Route.ComponentProps) {
  const { district } = params;
  const navigate = useNavigate();
  const { mutate: resetDistrict } = useResetDistrict();
  const { modal } = App.useApp();

  const { data, isSuccess } = useGet<DistrictResponse>({
    queryKey: ["district", district],
    url: `/district/${district}`,
    options: { enabled: !!district },
  });
  return (
    <PageContainer
      title="行政区管理"
      content={
        <Authorization permission="system.district:query">
          <EntityTable<
            DistrictResponse,
            DistrictQuery,
            {
              create: DistrictCreateRequest;
              update: DistrictUpdateRequest;
            }
          >
            entity="district"
            name="行政区管理"
            baseUrl="/district"
            query={{
              root: district ? false : true,
              parent: district ? Number(district) : undefined,
            }}
            toolbarActions={() => [
              district && (
                <Button
                  key="parent"
                  type="link"
                  disabled={!isSuccess}
                  onClick={() => {
                    if (isSuccess) {
                      if (data.parent) {
                        navigate(`/district/${data.parent}`);
                      } else {
                        navigate(`/district`);
                      }
                    }
                  }}
                >
                  返回上级
                </Button>
              ),
              {
                action: "create",
                initialValues: {
                  parent: district,
                  disabled: false,
                  name: "",
                  id: "",
                },
                buttonProps: {
                  disabled: !district,
                },
                columns: [
                  {
                    dataIndex: "parent",
                    search: false,
                    hideInTable: true,
                    formItemProps: {
                      hidden: true,
                    },
                  },
                  {
                    title: "行政区编码",
                    dataIndex: "id",
                    align: "center",
                    formItemProps: {
                      rules: [{ required: true, message: "请输入行政区编码" }],
                    },
                    colProps: {
                      xs: 24,
                      lg: 12,
                    },
                  },
                  {
                    title: "行政区名称",
                    dataIndex: "name",
                    align: "center",
                    formItemProps: {
                      rules: [
                        { required: true, message: "请输入行政区名称" },
                        { max: 32, message: "行政区名称长度不能超过32个字符" },
                      ],
                    },
                    colProps: {
                      xs: 24,
                      lg: 12,
                    },
                  },
                ],
              },
            ]}
            rowActions={(_, { entity }) => [
              <Button
                key="children"
                type="link"
                onClick={() => {
                  navigate(`/district/${entity.id}`);
                }}
              >
                管理行政区
              </Button>,
              entity.level >= 3 && (
                <Authorization permission="system.district:reset">
                  <Button
                    key="reset"
                    type="link"
                    danger
                    onClick={() => {
                      modal.confirm({
                        title: "重置行政区",
                        content: "确定要重置行政区吗？",
                        onOk: () => {
                          resetDistrict({ id: entity.id });
                        },
                      });
                    }}
                  >
                    重置行政区
                  </Button>
                </Authorization>
              ),
            ]}
            columns={[
              {
                title: "行政区编码",
                dataIndex: "id",
                align: "center",
              },
              {
                title: "行政区名称",
                dataIndex: "name",
                align: "center",
              },
              {
                title: "行政区层级",
                dataIndex: "level",
                align: "center",
                width: 120,
                hideInForm: true,
                search: false,
              },
              {
                title: "行政区路径",
                dataIndex: "path",
                align: "center",
                hideInForm: true,
                search: false,
              },
            ]}
          />
        </Authorization>
      }
    />
  );
}
