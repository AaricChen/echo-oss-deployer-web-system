import { PageContainer } from "@ant-design/pro-components";
import { App, Button } from "antd";
import { useNavigate } from "react-router";
import { useResetDistrict } from "~/apis/district";
import EntityTable from "~/components/entity/EntityTable";
import {
  DistrictEntity,
  type DistrictCreateRequest,
  type DistrictDeleteRequest,
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
  return (
    <PageContainer title="行政区管理">
      <EntityTable<
        DistrictResponse,
        DistrictQuery,
        DistrictCreateRequest,
        DistrictUpdateRequest,
        DistrictDeleteRequest
      >
        entityConfig={DistrictEntity}
        createInitialValues={{
          parent: district ? Number(district) : undefined,
          disabled: false,
          name: "",
          id: district ? Number(district) : 0,
        }}
        updateAction={false}
        disableRowDelete
        query={{
          root: district ? false : true,
          parent: district ? Number(district) : undefined,
        }}
        columns={[
          {
            dataIndex: "parent",
            hideInSearch: true,
            hideInTable: true,
            formItemProps: {
              hidden: true,
            },
          },
          {
            title: "行政区编码",
            dataIndex: "id",
            align: "center",
            width: 120,
            formItemProps: {
              rules: [{ required: true, message: "请输入行政区编码" }],
            },
            fieldProps: {
              type: "number",
              style: {
                width: "100%",
              },
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
          {
            title: "行政区层级",
            dataIndex: "level",
            align: "center",
            width: 120,
            hideInForm: true,
            hideInSearch: true,
          },
          {
            title: "行政区路径",
            dataIndex: "path",
            align: "center",
            hideInForm: true,
            hideInSearch: true,
          },
        ]}
        rowActionRender={({ entity }) => {
          return [
            <Button
              type="link"
              key="children"
              onClick={() => {
                navigate(`/district/${entity.id}`);
              }}
            >
              管理行政区
            </Button>,
            entity.level >= 3 && (
              <Button
                type="link"
                danger
                key="reset"
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
            ),
          ];
        }}
      />
    </PageContainer>
  );
}
