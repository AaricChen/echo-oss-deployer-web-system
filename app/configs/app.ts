import LOGO from "~/assets/logo.png";

export const appConfig = {
  name: "Echo Framework",
  description: "管理后台",
  version: "1.0.0",
  logo: LOGO,
  api: {
    endpoint: "http://localhost:8080",
    timeout: 10000,
    retry: 3,
  },
};
