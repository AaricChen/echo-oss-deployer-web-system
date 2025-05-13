import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { LoginFormPage, ProFormText } from "@ant-design/pro-components";
import { theme } from "antd";
import { useLogin } from "~/apis/auth";

export default function Login() {
  const { token } = theme.useToken();
  const login = useLogin();
  return (
    <LoginFormPage
      backgroundVideoUrl="https://gw.alipayobjects.com/v/huamei_gcee1x/afts/video/jXRBRK_VAwoAAAAAAAAAAAAAK4eUAQBr"
      title="欢迎"
      subTitle="登录到你的账户"
      containerStyle={{
        backgroundColor: "rgba(0, 0, 0,0.65)",
        backdropFilter: "blur(4px)",
      }}
      onFinish={async (values) => {
        await login.mutateAsync({
          username: values.username,
          password: values.password,
        });
      }}
    >
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
        placeholder={"请输入用户名"}
        rules={[
          {
            required: true,
            message: "请输入用户名!",
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
