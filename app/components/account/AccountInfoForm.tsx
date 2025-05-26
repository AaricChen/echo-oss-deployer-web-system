import {
  DrawerForm,
  ProForm,
  ProFormDatePicker,
  ProFormText,
  type ProFormInstance,
} from "@ant-design/pro-components";
import { Button } from "antd";
import { useRef, useState } from "react";
import { useUpdateAccountInfo } from "~/apis/account";
import { type AccountInfoUpdateRequest } from "~/types/account";

export interface AccountInfoFormProps {
  entity: AccountInfoUpdateRequest;
  onFinish?: () => Promise<void>;
}

export default function AccountInfoForm({
  entity,
  onFinish,
}: AccountInfoFormProps) {
  const formRef = useRef<ProFormInstance>(null);

  const { mutateAsync: updateAccountInfo } = useUpdateAccountInfo();

  return (
    <DrawerForm<AccountInfoUpdateRequest>
      formRef={formRef}
      trigger={<Button type="link">基本资料</Button>}
      title="编辑基本资料"
      grid
      onFinish={async (values) => {
        await updateAccountInfo(values);
        await onFinish?.();
        return true;
      }}
      width={640}
      initialValues={entity}
      submitter={{
        searchConfig: {
          resetText: "重置",
        },
        resetButtonProps: {
          onClick: () => {
            formRef.current?.resetFields();
          },
        },
      }}
    >
      <ProFormText name="id" hidden />
      <ProFormText
        name="nickname"
        label="昵称"
        placeholder="请输入昵称"
        colProps={{ xs: 24, lg: 8 }}
      />
      <ProFormText
        name="remark"
        label="备注"
        placeholder="请输入备注"
        colProps={{ xs: 24, lg: 8 }}
      />
      <ProFormText
        name="realname"
        label="真实姓名"
        placeholder="请输入真实姓名"
        colProps={{ xs: 24, lg: 8 }}
      />
      <ProForm.Group>
        <ProFormDatePicker
          name="birthday"
          label="生日"
          placeholder="请选择生日"
          colProps={{ xs: 24, lg: 8 }}
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
          colProps={{ xs: 24, lg: 8 }}
        />
      </ProForm.Group>
      <ProFormText
        name="countryCode"
        label="国家"
        placeholder="请输入国家"
        colProps={{ xs: 24, lg: 8 }}
      />
      <ProFormText
        name="provinceCode"
        label="省份"
        placeholder="请输入省份"
        colProps={{ xs: 24, lg: 8 }}
      />
      <ProFormText
        name="cityCode"
        label="城市"
        placeholder="请输入城市"
        colProps={{ xs: 24, lg: 8 }}
      />
      <ProFormText
        name="idCard"
        label="身份证号"
        placeholder="请输入身份证号"
        colProps={{ xs: 24, lg: 8 }}
      />
      <ProFormText
        name="nationCode"
        label="民族"
        placeholder="请输入民族"
        colProps={{ xs: 24, lg: 8 }}
      />
      <ProFormText
        name="languageCode"
        label="语言"
        placeholder="请输入语言"
        colProps={{ xs: 24, lg: 8 }}
      />
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
    </DrawerForm>
  );
}
