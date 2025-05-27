import {
  PageLoading,
  ProForm,
  ProFormDatePicker,
  ProFormText,
} from "@ant-design/pro-components";
import { Typography } from "antd";
import {
  useCurrentAccountInfo,
  useUpdateCurrentAccountInfo,
} from "~/apis/account";
import type { AccountInfo } from "~/types/account";

export default function UserInfoForm() {
  const { data, isPending, refetch } = useCurrentAccountInfo();
  const { mutateAsync: updateAccountInfo } = useUpdateCurrentAccountInfo();
  return (
    <div>
      <Typography.Title level={5}>基本资料</Typography.Title>
      {isPending ? (
        <PageLoading />
      ) : (
        <ProForm<AccountInfo>
          grid
          initialValues={data}
          submitter={{
            searchConfig: {
              submitText: "更新基本资料",
            },
          }}
          onFinish={async (values) => {
            await updateAccountInfo(values);
            await refetch();
          }}
        >
          <ProForm.Group>
            <ProFormText
              name="nickname"
              label="昵称"
              placeholder="请输入昵称"
              colProps={{ xs: 24, lg: 4 }}
            />
            <ProFormText
              name="remark"
              label="备注"
              placeholder="请输入备注"
              colProps={{ xs: 24, lg: 8 }}
            />
          </ProForm.Group>
          <ProForm.Group>
            <ProFormText
              name="realname"
              label="真实姓名"
              placeholder="请输入真实姓名"
              colProps={{ xs: 24, lg: 4 }}
            />
            <ProFormDatePicker
              name="birthday"
              label="生日"
              placeholder="请选择生日"
              colProps={{ xs: 24, lg: 4 }}
              fieldProps={{
                style: {
                  width: "100%",
                },
              }}
            />
            <ProFormText
              name="genderCode"
              label="性别"
              placeholder="请选择性别"
              colProps={{ xs: 24, lg: 4 }}
            />
          </ProForm.Group>
          <ProForm.Group>
            <ProFormText
              name="countryCode"
              label="国家"
              placeholder="请输入国家"
              colProps={{ xs: 24, lg: 4 }}
            />
            <ProFormText
              name="provinceCode"
              label="省份"
              placeholder="请输入省份"
              colProps={{ xs: 24, lg: 4 }}
            />
            <ProFormText
              name="cityCode"
              label="城市"
              placeholder="请输入城市"
              colProps={{ xs: 24, lg: 4 }}
            />
          </ProForm.Group>
          <ProForm.Group>
            <ProFormText
              name="idCard"
              label="身份证号"
              placeholder="请输入身份证号"
              colProps={{ xs: 24, lg: 4 }}
            />
            <ProFormText
              name="nationCode"
              label="民族"
              placeholder="请输入民族"
              colProps={{ xs: 24, lg: 4 }}
            />
            <ProFormText
              name="languageCode"
              label="语言"
              placeholder="请输入语言"
              colProps={{ xs: 24, lg: 4 }}
            />
          </ProForm.Group>
          <ProFormText
            name="bio"
            label="简介"
            placeholder="请输入简介"
            colProps={{ xs: 24 }}
          />
          <ProFormText
            name="address"
            label="地址"
            placeholder="请输入地址"
            colProps={{ xs: 24 }}
          />
        </ProForm>
      )}
    </div>
  );
}
