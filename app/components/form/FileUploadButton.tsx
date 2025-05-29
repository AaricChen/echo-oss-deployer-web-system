import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import { Button, Upload, type ButtonProps, type UploadProps } from "antd";
import type React from "react";
import { useMemo } from "react";
import { useApiStore } from "~/stores/api";

export type FileUploadButtonProps = Omit<UploadProps, "onChange"> & {
  value?: string[];

  icon?: React.ReactNode;

  buttonProps?: ButtonProps;

  disabled?: boolean;

  title?: React.ReactNode;

  onChange?: (value: string | string[]) => void;
};

export default function FileUploadButton(props: FileUploadButtonProps) {
  const { endpoint } = useApiStore();
  const {
    name,
    action,
    accept,
    listType,
    disabled,
    fileList,
    maxCount,
    multiple,
    icon = <UploadOutlined />,
    buttonProps,
    title = "单击上传",
    value,
    onChange,
    ...restProps
  } = props;

  const finalAction = useMemo(() => {
    if (action) {
      return action;
    }
    return `${endpoint}/upload/file`;
  }, [endpoint, action]);

  const showUploadButton = useMemo(() => {
    return maxCount === undefined || !value || value?.length < maxCount;
  }, [maxCount, value]);

  const isPictureCard = useMemo(() => {
    return listType === "picture-card";
  }, [listType]);

  return (
    <Upload
      action={finalAction}
      accept={accept}
      listType={listType}
      multiple={multiple}
      {...restProps}
      onChange={(info) => {
        const tokens = info.fileList.map((it) => it.response?.data.token ?? "");
        if (onChange) {
          if (multiple) {
            onChange(tokens);
          } else {
            onChange(tokens[0] ?? "");
          }
        }
      }}
    >
      {showUploadButton &&
        (isPictureCard ? (
          <PlusOutlined />
        ) : (
          <Button icon={icon} disabled={disabled} {...buttonProps}>
            {title}
          </Button>
        ))}
    </Upload>
  );
}
