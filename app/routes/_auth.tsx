import { ProConfigProvider } from "@ant-design/pro-components";
import { Outlet } from "react-router";
import { appConfig } from "~/configs/app";

export default function Auth() {
  return (
    <div
      className="flex h-screen w-screen flex-col items-center justify-center bg-white"
      style={{
        backgroundImage: `url(${appConfig.loginBackground})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <ProConfigProvider>
        <Outlet />
      </ProConfigProvider>
    </div>
  );
}
