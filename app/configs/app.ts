import LOGO from "~/assets/logo.png";
import BACKGROUND from "~/assets/login-bg.jpg";

export const appConfig = {
  name: "Echo",
  description: "管理后台",
  version: "1.0.0",
  logo: LOGO,
  loginBackground: BACKGROUND,
  url: "http://localhost:5173",
  api: {
    endpoint: "http://localhost:8080",
    timeout: 10000,
    retry: 3,
  },
};
