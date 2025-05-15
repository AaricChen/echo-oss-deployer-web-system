export interface MenuResponse {
  id: string;
  text: string;
  link: string;
  icon: string;
  children: MenuResponse[];
}
