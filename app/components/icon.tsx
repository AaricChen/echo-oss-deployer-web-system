import {
  ApartmentOutlined,
  AppstoreOutlined,
  ControlOutlined,
  FileSearchOutlined,
  HomeOutlined,
  LockOutlined,
  ProductOutlined,
  ProfileOutlined,
  SecurityScanOutlined,
  SolutionOutlined,
  TagsOutlined,
  TeamOutlined,
} from "@ant-design/icons";

export const iconMap = {
  HomeOutlined: HomeOutlined,
  SecurityScanOutlined: SecurityScanOutlined,
  ProductOutlined: ProductOutlined,
  TeamOutlined: TeamOutlined,
  TagsOutlined: TagsOutlined,
  ProfileOutlined: ProfileOutlined,
  FileSearchOutlined: FileSearchOutlined,
  ControlOutlined: ControlOutlined,
  AppstoreOutlined: AppstoreOutlined,
  SolutionOutlined: SolutionOutlined,
  LockOutlined: LockOutlined,
  ApartmentOutlined: ApartmentOutlined,
};

export interface IconProps {
  icon: keyof typeof iconMap;
}

export default function Icon({ icon }: IconProps) {
  const IconComponent = iconMap[icon];
  return IconComponent ? <IconComponent /> : null;
}
