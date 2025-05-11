import { Button } from "antd";
import { Outlet } from "react-router";
import { useCurrentAccount } from "~/apis/account";

export default function AdminLayout() {
  useCurrentAccount();
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-1">
      <h1 className="text-2xl font-bold">Admin</h1>
      <Button>Go</Button>
      <Outlet />
    </div>
  );
}
