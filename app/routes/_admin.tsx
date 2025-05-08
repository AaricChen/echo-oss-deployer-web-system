import { Outlet } from "react-router";

export default function AdminLayout() {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-1">
      <h1 className="text-2xl font-bold">Admin</h1>
      <Outlet />
    </div>
  );
}
