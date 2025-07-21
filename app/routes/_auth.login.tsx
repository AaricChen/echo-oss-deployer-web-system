import {
  LockOutlined,
  MailOutlined,
  PhoneOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  LoginForm,
  ProFormCaptcha,
  ProFormDependency,
  ProFormText,
} from "@ant-design/pro-components";
import { Tabs, theme, type FormInstance } from "antd";
import { useEffect, useMemo, useRef, useState } from "react";
import { useAuthCaptcha, useAuthenticationConfig, useLogin } from "~/apis/auth";
import ImageCaptcha from "~/components/form/ImageCaptcha";
import { appConfig } from "~/configs/app";
import { AuthenticationType } from "~/types/auth";

export default function LoginPage() {
  const { token } = theme.useToken();
  const login = useLogin();
  const { data: config } = useAuthenticationConfig();
  const [type, setType] = useState<keyof typeof AuthenticationType>("USERNAME");
  const { mutateAsync: sendCaptcha } = useAuthCaptcha(
    type === "PHONE_CAPTCHA" ? "phone" : "email",
  );
  const formRef = useRef<FormInstance>(null);
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
      <LoginForm<any>
        formRef={formRef}
        logo={appConfig.logo}
        title="欢迎"
        subTitle="登录到你的账户"
        onFinish={async (values) => {
          if (type === "USERNAME") {
            await login.mutateAsync({
              type,
              identity: values.username,
              credential: values.password,
            });
          } else if (type === "PHONE_CAPTCHA") {
            await login.mutateAsync({
              type,
              identity: values.phone,
              credential: values.captcha,
            });
          } else if (type === "EMAIL_CAPTCHA") {
            await login.mutateAsync({
              type,
              identity: values.email,
              credential: values.captcha,
            });
          } else if (type === "CRYPTO") {
            await login.mutateAsync({
              type,
              identity: values.address,
              credential: values.signature,
              message: values.message,
            });
          }
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
        {type === "USERNAME" && (
          <>
            <ProFormText
              name="username"
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
              placeholder="请输入用户名 手机号 或 邮箱"
              rules={[
                {
                  required: true,
                  message: "请输入用户名 手机号 或 邮箱!",
                },
              ]}
            />
            <ProFormText.Password
              name="password"
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
              placeholder="请输入密码"
              rules={[
                {
                  required: true,
                  message: "请输入密码!",
                },
              ]}
            />
          </>
        )}
        {type === "PHONE_CAPTCHA" && (
          <>
            <ProFormText
              name="phone"
              fieldProps={{
                size: "large",
                prefix: (
                  <PhoneOutlined
                    style={{
                      color: token.colorText,
                    }}
                  />
                ),
              }}
              placeholder="请输入手机号"
              rules={[
                {
                  required: true,
                  message: "请输入手机号!",
                },
                {
                  pattern: /^1[3-9]\d{9}$/,
                  message: "请输入正确的手机号!",
                },
              ]}
            />
            <ImageCaptcha
              onTimestampChange={(timestamp) => {
                formRef.current?.setFieldsValue({
                  timestamp,
                });
              }}
              onCaptchaChange={(captcha) => {
                formRef.current?.setFieldsValue({
                  imageCaptcha: captcha,
                });
              }}
            />
            <ProFormDependency name={["timestamp", "imageCaptcha"]}>
              {({ timestamp, imageCaptcha }) => {
                return (
                  <ProFormCaptcha
                    name="captcha"
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
                    captchaProps={{
                      size: "large",
                    }}
                    placeholder="请输入验证码"
                    rules={[
                      {
                        required: true,
                        message: "请输入验证码!",
                      },
                    ]}
                    phoneName="phone"
                    onGetCaptcha={async (phone) => {
                      await sendCaptcha({
                        scope: "SYSTEM",
                        target: phone,
                        timestamp,
                        captcha: imageCaptcha,
                      });
                    }}
                  />
                );
              }}
            </ProFormDependency>
          </>
        )}
        {type === "EMAIL_CAPTCHA" && (
          <>
            <ProFormText
              name="email"
              fieldProps={{
                size: "large",
                prefix: (
                  <MailOutlined
                    style={{
                      color: token.colorText,
                    }}
                  />
                ),
              }}
              placeholder="请输入邮箱"
              rules={[
                {
                  required: true,
                  message: "请输入邮箱!",
                },
                {
                  pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "请输入正确的邮箱!",
                },
              ]}
            />
            <ImageCaptcha
              onTimestampChange={(timestamp) => {
                formRef.current?.setFieldsValue({
                  timestamp,
                });
              }}
              onCaptchaChange={(captcha) => {
                formRef.current?.setFieldsValue({
                  imageCaptcha: captcha,
                });
              }}
            />
            <ProFormDependency name={["timestamp", "imageCaptcha"]}>
              {({ timestamp, imageCaptcha }) => {
                return (
                  <ProFormCaptcha
                    name="captcha"
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
                    captchaProps={{
                      size: "large",
                    }}
                    placeholder="请输入验证码"
                    rules={[
                      {
                        required: true,
                        message: "请输入验证码!",
                      },
                    ]}
                    phoneName="email"
                    onGetCaptcha={async (email) => {
                      await sendCaptcha({
                        scope: "SYSTEM",
                        target: email,
                        timestamp,
                        captcha: imageCaptcha,
                      });
                    }}
                  />
                );
              }}
            </ProFormDependency>
          </>
        )}
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
