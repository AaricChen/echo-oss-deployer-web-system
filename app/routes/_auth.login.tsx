import { LockOutlined, UserOutlined } from "@ant-design/icons";
import {
  LoginFormPage,
  ProFormSelect,
  ProFormText,
} from "@ant-design/pro-components";
import { theme } from "antd";
import { useLogin } from "~/apis/auth";
import { appConfig } from "~/configs/app";
import { AuthenticationType, type LoginRequest } from "~/types/auth";

export default function LoginPage() {
  const { token } = theme.useToken();
  const login = useLogin();
  return (
    <LoginFormPage<LoginRequest>
      logo={appConfig.logo}
      backgroundImageUrl={appConfig.loginBackground}
      title="欢迎"
      subTitle="登录到你的账户"
      containerStyle={{
        backgroundColor: "rgba(0, 0, 0,0.65)",
        backdropFilter: "blur(4px)",
      }}
      onFinish={async (values) => {
        await login.mutateAsync(values);
      }}
    >
      <ProFormSelect
        name="type"
        hidden
        initialValue={AuthenticationType.USERNAME}
        options={Object.values(AuthenticationType).map((type) => ({
          label: type,
          value: type,
        }))}
      />
      <ProFormText
        name="identity"
        fieldProps={{
          size: "large",
          prefix: (
            <UserOutlined
              style={{
                color: token.colorText,
              }}
            />
          ),
        }}
        placeholder={"请输入用户名"}
        rules={[
          {
            required: true,
            message: "请输入用户名!",
          },
        ]}
      />
      <ProFormText.Password
        name="credential"
        fieldProps={{
          size: "large",
          prefix: (
            <LockOutlined
              style={{
                color: token.colorText,
              }}
            />
          ),
        }}
        placeholder={"请输入密码"}
        rules={[
          {
            required: true,
            message: "请输入密码!",
          },
        ]}
      />
    </LoginFormPage>
  );
}

export function meta() {
  return [
    {
      title: "登录",
    },
  ];
}
