import { PlusOutlined } from "@ant-design/icons";
import {} from "@ant-design/pro-components";
import { Image, Upload, type UploadFile, type UploadProps } from "antd";
import { useEffect, useMemo, useState } from "react";
import { useApiStore } from "~/stores/api";
import type { FileUploadResponse } from "~/types/file";
import type { HttpResponse } from "~/types/http";
import { getImageBase64, type FileType } from "~/utils/image";

export interface ImageUploadProps extends Omit<UploadProps, "onChange"> {
  uploadText?: string;
  maxCount?: number;
  pastable?: boolean;
  disabled?: boolean;
  onChange?: (value: string | string[]) => void;
}

export default function ImageUpload({
  uploadText = "选择图片",
  maxCount = 1,
  disabled,
  onChange,
}: ImageUploadProps) {
  const { endpoint } = useApiStore();
  const [fileList, setFileList] = useState<
    UploadFile<HttpResponse<FileUploadResponse>>[]
  >([]);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const uploadButton = useMemo(() => {
    return (
      <button className="cursor-pointer border-0 bg-transparent" type="button">
        <PlusOutlined />
        <div className="mt-2">{uploadText}</div>
      </button>
    );
  }, [uploadText]);

  const showUploadButton = useMemo(() => {
    return fileList.length < maxCount;
  }, [fileList, maxCount]);

  const multiple = useMemo(() => {
    return maxCount > 1;
  }, [maxCount]);

  useEffect(() => {
    const tokens = fileList
      .filter((file) => file.response && file.response.success)
      .map((file) => file.response?.data.token ?? "");

    if (onChange) {
      if (multiple) {
        onChange(tokens);
      } else {
        onChange(tokens[0]);
      }
    }
  }, [fileList, onChange]);

  return (
    <>
      <Upload<HttpResponse<FileUploadResponse>>
        disabled={disabled}
        accept="image/*"
        action={`${endpoint}/upload/file`}
        multiple={multiple}
        listType="picture-card"
        maxCount={maxCount}
        fileList={fileList}
        onPreview={async (file) => {
          if (!file.url && !file.preview) {
            file.preview = await getImageBase64(file.originFileObj as FileType);
          }
          setPreviewImage(file.url ?? (file.preview as string));
          setPreviewVisible(true);
        }}
        onChange={({ fileList }) => {
          setFileList(fileList);
        }}
      >
        {showUploadButton && uploadButton}
      </Upload>
      {previewImage && (
        <Image
          src={previewImage}
          wrapperStyle={{ display: "none" }}
          preview={{
            visible: previewVisible,
            onVisibleChange: setPreviewVisible,
            afterOpenChange: (visible) => {
              if (!visible) {
                setPreviewImage(null);
              }
            },
          }}
        />
      )}
    </>
  );
}
