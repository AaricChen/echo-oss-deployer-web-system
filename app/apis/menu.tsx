import type { MenuDataItem } from "@ant-design/pro-components";
import { useMemo } from "react";
import { useCurrentAccount } from "~/apis/account";
import Icon, { iconMap } from "~/components/icon";
import { useGet } from "~/hooks/http";
import type { MenuResponse } from "~/types/menu";

export function useSidebar() {
  const { data: account } = useCurrentAccount();
  const { data } = useGet<MenuResponse>({
    queryKey: ["sidebar-menu"],
    url: "/menu",
    params: {
      id: "system:admin.sidebar",
    },
    options: {
      ignoreError: true,
      staleTime: Infinity,
      enabled: !!account,
    },
  });

  const menuItems: MenuDataItem[] = useMemo(() => {
    if (!data) return [];
    return convertMenuData(data.children, 0);
  }, [data]);

  return {
    menuItems,
  };
}

function convertMenuData(menus: MenuResponse[], level: number): MenuDataItem[] {
  return menus.map((menu) => {
    return {
      key: menu.id,
      name: menu.text,
      path: menu.link ?? undefined,
      icon: <Icon icon={menu.icon as keyof typeof iconMap} />,
      menuIcon:
        level > 0 ? (
          <Icon icon={menu.icon as keyof typeof iconMap} />
        ) : undefined,
      children: menu.children?.length
        ? convertMenuData(menu.children, level + 1)
        : [],
    };
  });
}
