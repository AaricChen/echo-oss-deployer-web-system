import { Avatar, Typography } from "antd";

export interface AccountAvatarProps {
  avatar?: string;
  nickname?: string;
}

export default function AccountAvatar({
  avatar,
  nickname,
}: AccountAvatarProps) {
  if (!avatar) {
    return "-";
  }
  return (
    <div className="flex items-center justify-center gap-1">
      <Avatar src={avatar} />
      <Typography.Text>{nickname}</Typography.Text>
    </div>
  );
}
