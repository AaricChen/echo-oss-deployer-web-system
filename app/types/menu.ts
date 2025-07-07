import type { ReactNode } from "react";

export interface MenuResponse {
  id: string;
  text: string;
  link: string;
  icon: string;
  children: MenuResponse[];

  menuIcon?: ReactNode; // 计算值，用来判断是否需要渲染菜单的图标
}
