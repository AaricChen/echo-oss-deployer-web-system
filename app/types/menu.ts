export interface MenuResponse {
  id: string;
  text: string;
  link: string;
  children: MenuResponse[];
}
