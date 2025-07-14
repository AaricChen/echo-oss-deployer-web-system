import { App } from "antd";
import { useLocation, useNavigate } from "react-router";
import { useAuthStore } from "~/stores/auth";

export function useErrorHandler() {
  const { message } = App.useApp();
  const navigate = useNavigate();
  const { logout } = useAuthStore();
  const location = useLocation();

  const handleError = (err: any) => {
    if (err.code) {
      if (err.code === "10003") {
        // 处理认证异常
        if (err.message === "用户名密码错误") {
          message.error(err.message);
        } else {
          if (err.message === "无效的Access Token") {
            logout();
          }
          navigate(`/login?redirect=${location.pathname}`);
        }
      } else {
        message.error(err.message);
      }
    } else {
      message.error("服务器开小差了，请稍后再试");
    }
  };

  return { handleError };
}
