import { UploadOutlined } from "@ant-design/icons";
import { Avatar, Button, Space, Upload, type ButtonProps } from "antd";
import type React from "react";
import { useMemo, useState } from "react";
import { useApiStore } from "~/stores/api";
import { getImageBase64, type FileType } from "~/utils/image";

export interface AvatarUploadProps {
  action?: string;

  size?: number;

  value?: string;

  icon?: React.ReactNode;

  buttonProps?: ButtonProps;

  disabled?: boolean;

  title?: React.ReactNode;

  onChange?: (value: string) => void;
}

export default function AvatarUpload({
  action,
  value,
  size = 128,
  disabled,
  onChange,
}: AvatarUploadProps) {
  const { endpoint } = useApiStore();

  const [loading, setLoading] = useState(false);
  const [imageContent, setImageContent] = useState<string>();

  const finalAction = useMemo(() => {
    if (action) {
      return action;
    }
    return `${endpoint}/upload/file`;
  }, [endpoint, action]);

  const imageUrl = useMemo(() => {
    return imageContent ?? value;
  }, [value, imageContent]);

  return (
    <Space direction="vertical" align="center" size={24}>
      <Avatar src={imageUrl} size={size} />
      <Upload
        action={finalAction}
        accept="image/*"
        showUploadList={false}
        onChange={(info) => {
          if (info.file.status === "uploading") {
            setLoading(true);
            return;
          }

          if (info.file.status === "done") {
            getImageBase64(info.file.originFileObj as FileType).then(
              (base64) => {
                setImageContent(base64);
                const tokens = info.fileList.map(
                  (it) => it.response?.data.token ?? "",
                );
                if (onChange) {
                  onChange(tokens[0] ?? "");
                }
                setLoading(false);
              },
            );
          }
        }}
      >
        <Button icon={<UploadOutlined />} disabled={disabled} loading={loading}>
          更换头像
        </Button>
      </Upload>
    </Space>
  );
}
