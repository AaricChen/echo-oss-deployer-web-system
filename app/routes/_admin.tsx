import { LogoutOutlined } from "@ant-design/icons";
import { ProLayout } from "@ant-design/pro-components";
import { Dropdown } from "antd";
import { Link, Outlet } from "react-router";
import { useCurrentAccount } from "~/apis/account";
import { useLogout } from "~/apis/auth";
import { useAdminSidebar } from "~/apis/menu";
import { appConfig } from "~/configs/app";

export default function AdminLayout() {
  const { data: account } = useCurrentAccount();
  const { menuItems } = useAdminSidebar();
  const { mutate: logout } = useLogout();
  return (
    <ProLayout
      loading={!account || !menuItems}
      layout="mix"
      title={appConfig.name}
      logo={appConfig.logo}
      headerTitleRender={(logo, title) => (
        <Link to="/" className="flex items-center gap-2">
          {logo}
          {title}
        </Link>
      )}
      menu={{
        type: "group",
      }}
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
      avatarProps={{
        src: account?.avatar,
        title: account?.nickname,
        size: "small",
        render: (props, dom) => {
          return (
            <Dropdown
              menu={{
                items: [
                  {
                    key: "logout",
                    icon: <LogoutOutlined />,
                    label: "退出登录",
                    onClick: () => {
                      logout();
                    },
                  },
                ],
              }}
            >
              {dom}
            </Dropdown>
          );
        },
      }}
    >
      <Outlet />
    </ProLayout>
  );
}
