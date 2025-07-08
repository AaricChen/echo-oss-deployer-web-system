import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { DefaultFooter, ProLayout } from "@ant-design/pro-components";
import { Dropdown } from "antd";
import { Link, Outlet, useNavigate } from "react-router";
import { useCurrentAccount } from "~/apis/account";
import { useLogout } from "~/apis/auth";
import { useSidebar } from "~/apis/menu";
import { appConfig } from "~/configs/app";

export default function AdminLayout() {
  const { data: account } = useCurrentAccount();
  const { menuItems } = useSidebar();
  const { mutate: logout } = useLogout();
  const navigate = useNavigate();
  return (
    <ProLayout
      loading={!account || !menuItems}
      layout="mix"
      title="系统管理后台"
      logo={appConfig.logo}
      headerTitleRender={(logo, title) => (
        <Link to="/" className="flex items-center gap-2">
          {logo}
          {title}
        </Link>
      )}
      menu={{
        type: "sub",
      }}
      menuDataRender={() => menuItems}
      menuItemRender={(item, dom) => {
        if (item.menuIcon) {
          return (
            <Link className="flex items-center gap-2" to={item.path ?? "/"}>
              {item.icon} {dom}
            </Link>
          );
        } else {
          return <Link to={item.path ?? "/"}>{dom}</Link>;
        }
      }}
      menuFooterRender={(props) => {
        if (props?.collapsed) return null;
        return (
          <DefaultFooter
            copyright={`${appConfig.name} ${new Date().getFullYear()}`}
          />
        );
      }}
      avatarProps={{
        src: account?.avatar,
        title: account?.nickname,
        size: "small",
        render: (_, dom) => {
          return (
            <Dropdown
              menu={{
                items: [
                  {
                    key: "info",
                    icon: <UserOutlined />,
                    label: "账户设置",
                    onClick: () => {
                      navigate("/user");
                    },
                  },
                  {
                    type: "divider",
                  },
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
