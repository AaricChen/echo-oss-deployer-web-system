import { ProLayout } from "@ant-design/pro-components";
import { Link, Outlet } from "react-router";
import { useCurrentAccount } from "~/apis/account";
import { useAdminSidebar } from "~/apis/menu";
import { appConfig } from "~/configs/app";
export default function AdminLayout() {
  useCurrentAccount();

  const { menuItems } = useAdminSidebar();

  return (
    <ProLayout
      title={appConfig.name}
      logo={appConfig.logo}
      menuDataRender={() => menuItems}
      menuItemRender={(item, dom) => {
        if (!item.path) {
          return dom;
        }
        return <Link to={item.path ?? "/"}>{dom}</Link>;
      }}
      subMenuItemRender={(item, dom) => {
        if (!item.path) {
          return dom;
        }
        return <Link to={item.path ?? "/"}>{dom}</Link>;
      }}
    >
      <Outlet />
    </ProLayout>
  );
}
