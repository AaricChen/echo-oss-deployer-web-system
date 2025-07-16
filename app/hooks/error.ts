import { App } from "antd";
import { useLocation, useNavigate } from "react-router";
import { useAuthStore } from "~/stores/auth";
import type { HttpResponse } from "~/types/http";

export function useErrorHandler() {
  const { message } = App.useApp();
  const navigate = useNavigate();
  const { logout } = useAuthStore();
  const location = useLocation();

  const handleError = (err: any) => {
    if (err.code) {
      const response = err as HttpResponse<any>;
      if (response.code.startsWith("002")) {
        // 002 开头的为安全相关错误
        if (response.code === "002003") {
          // 访问令牌失效，清空登录信息
          message.error("登录已过期，请重新登录");
          logout();
          navigate(`/login?redirect=${location.pathname}`);
        } else if (err.code === "002002") {
          // 刷新令牌失效，清空登录信息
          message.error(err.details ?? err.message);
        } else {
          navigate(`/login?redirect=${location.pathname}`);
        }
      } else if (err.code === "000002") {
        if (response.error) {
          let content = "";
          if (response.error.objectErrors) {
            content += response.error.objectErrors
              .map((it) => `${it.name}: ${it.message}`)
              .join("\n");
          }
          if (response.error.fieldErrors) {
            content += response.error.fieldErrors
              .map((it) => `${it.name}: ${it.message}`)
              .join("\n");
          }
          message.error(content);
        }
      } else {
        message.error(err.details ?? err.message);
      }
    } else {
      message.error("服务器开小差了，请稍后再试");
    }
  };

  return { handleError };
}
