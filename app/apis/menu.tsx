import type { MenuDataItem } from "@ant-design/pro-components";
import { useMemo } from "react";
import Icon, { iconMap } from "~/components/icon";
import { useGet } from "~/hooks/http";
import type { MenuResponse } from "~/types/menu";
export function useSidebar() {
  const { data } = useGet<MenuResponse>({
    queryKey: [""],
    url: "/menus",
    params: {
      id: "system.sidebar",
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
