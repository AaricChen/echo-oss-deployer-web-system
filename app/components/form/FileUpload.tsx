import { InboxOutlined } from "@ant-design/icons";
import {} from "@ant-design/pro-components";
import { Form, Upload, type UploadFile, type UploadProps } from "antd";
import { useEffect, useMemo, useState } from "react";
import { useApiStore } from "~/stores/api";
import type { FileUploadResponse } from "~/types/file";
import type { HttpResponse } from "~/types/http";

const { Dragger } = Upload;

export interface FileUploadProps extends Omit<UploadProps, "onChange"> {
  accept?: string;
  maxCount?: number;
  pastable?: boolean;
  disabled?: boolean;
  desc?: string;
  onChange?: (value: string | string[]) => void;
}

export default function FileUpload({
  accept,
  maxCount = 1,
  disabled,
  desc = "",
  onChange,
}: FileUploadProps) {
  const { endpoint } = useApiStore();
  const [fileList, setFileList] = useState<
    UploadFile<HttpResponse<FileUploadResponse>>[]
  >([]);

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
    <Form.Item>
      <Dragger
        accept={accept}
        disabled={disabled}
        multiple={multiple}
        action={`${endpoint}/upload/file`}
        onChange={({ fileList }) => {
          setFileList(fileList);
        }}
      >
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">点击或拖拽文件到此区域上传</p>
        <p className="ant-upload-hint">{desc}</p>
        {/* <Upload<HttpResponse<FileUploadResponse>>
        disabled={disabled}
        accept={accept}
        action={`${endpoint}/upload/file`}
        multiple={multiple}
        listType="picture-card"
        maxCount={maxCount}
        fileList={fileList}
        onChange={({ fileList }) => {
          setFileList(fileList);
        }}
      >
        {showUploadButton && uploadButton}
      </Upload> */}
      </Dragger>
    </Form.Item>
  );
}
