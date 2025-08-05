import { Image } from "antd";

export interface ImagePreviewProps {
  value: string | string[];
  width?: number;
}

export default function ImagePreview({
  value,
  width = 128,
}: ImagePreviewProps) {
  if (Array.isArray(value)) {
    return (
      <Image.PreviewGroup
        items={value.map((item) => ({
          src: item,
        }))}
      />
    );
  }

  return <Image width={width} src={value} style={{ borderRadius: 4 }} />;
}
