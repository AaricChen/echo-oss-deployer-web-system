import { ProConfigProvider } from "@ant-design/pro-components";
import { Outlet } from "react-router";

export default function Auth() {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-white">
      <ProConfigProvider dark>
        <Outlet />
      </ProConfigProvider>
    </div>
  );
}
