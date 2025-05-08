import { Link, Outlet } from "react-router";
import type { Route } from "./+types/_admin._index";

export default function Home({ loaderData }: Route.ComponentProps) {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-1">
      <h1 className="text-2xl font-bold">Home</h1>
      <Link to={"/accounts"}>Accounts</Link>
      <Link to={"/login"}>Login</Link>
      <Outlet />
    </div>
  );
}
