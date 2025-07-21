import { LockOutlined, UserOutlined } from "@ant-design/icons";
import {
  LoginForm,
  ProFormSelect,
  ProFormText,
} from "@ant-design/pro-components";
import { Tabs, theme } from "antd";
import { useEffect, useMemo, useState } from "react";
import { useAuthenticationConfig, useLogin } from "~/apis/auth";
import { appConfig } from "~/configs/app";
import { AuthenticationType, type AuthRequest } from "~/types/auth";

export default function LoginPage() {
  const { token } = theme.useToken();
  const login = useLogin();
  const { data: config } = useAuthenticationConfig();
  const [type, setType] = useState<keyof typeof AuthenticationType>("USERNAME");

  useEffect(() => {
    if (config) {
      if (config.usernameAuthentication) {
        setType("USERNAME");
      } else if (config.phoneCaptchaAuthentication) {
        setType("PHONE_CAPTCHA");
      } else if (config.emailCaptchaAuthentication) {
        setType("EMAIL_CAPTCHA");
      } else if (config.cryptoAuthentication) {
        setType("CRYPTO");
      }
    }
  }, [config]);

  const supportedTypes = useMemo(() => {
    if (!config) return [];
    return [
      config.usernameAuthentication ? "USERNAME" : null,
      config.phoneCaptchaAuthentication ? "PHONE_CAPTCHA" : null,
      config.emailCaptchaAuthentication ? "EMAIL_CAPTCHA" : null,
      config.cryptoAuthentication ? "CRYPTO" : null,
    ].filter((it) => it !== null);
  }, [config]);

  return (
    <div style={{ backgroundColor: token.colorBgContainer }}>
      <LoginForm<AuthRequest>
        logo={appConfig.logo}
        title="欢迎"
        subTitle="登录到你的账户"
        onFinish={async (values) => {
          await login.mutateAsync({ ...values, type });
        }}
      >
        <Tabs
          items={supportedTypes.map((it) => ({
            key: it,
            label:
              AuthenticationType[it as keyof typeof AuthenticationType].text,
          }))}
          onChange={(key) => {
            setType(key as keyof typeof AuthenticationType);
          }}
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
      </LoginForm>
    </div>
  );
}

export function meta() {
  return [
    {
      title: "登录",
    },
  ];
}
