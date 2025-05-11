import { message } from "antd";
import type { JointContent } from "antd/es/message/interface";

export function useSnackbar() {
  const [messageApi, contextHolder] = message.useMessage();

  return {
    info: (message: JointContent) => messageApi.info(message),
    warning: (message: JointContent) => messageApi.warning(message),
    error: (message: JointContent) => messageApi.error(message),
    success: (message: JointContent) => messageApi.success(message),
    loading: (message: JointContent) => messageApi.loading(message),
  };
}
