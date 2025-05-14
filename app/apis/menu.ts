import type { MenuDataItem } from "@ant-design/pro-components";
import { useMemo } from "react";
import { useGet } from "~/hooks/http";
import type { MenuResponse } from "~/types/menu";

export function useAdminSidebar() {
  const { data } = useGet<MenuResponse>({
    queryKey: [""],
    url: "/menus",
    params: {
      id: "admin.sidebar",
    },
  });

  const menuItems: MenuDataItem[] = useMemo(() => {
    if (!data) return [];
    return convertMenuData(data.children);
  }, [data]);

  return {
    menuItems,
  };
}

function convertMenuData(menus: MenuResponse[]): MenuDataItem[] {
  return menus.map((menu) => {
    return {
      key: menu.id,
      name: menu.text,
      path: menu.link,
      children: menu.children?.length ? convertMenuData(menu.children) : [],
    };
  });
}
