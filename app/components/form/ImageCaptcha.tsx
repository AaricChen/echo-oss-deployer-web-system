import { LockOutlined } from "@ant-design/icons";
import { ProFormText } from "@ant-design/pro-components";
import { useEffect, useMemo, useState } from "react";
import { useApiStore } from "~/stores/api";

export interface ImageCaptchaProps {
  tenant?: string;
  onTimestampChange: (timestamp: number) => void;
  onCaptchaChange: (captcha: string) => void;
}
export default function ImageCaptcha({
  tenant,
  onTimestampChange,
  onCaptchaChange,
}: ImageCaptchaProps) {
  const defaultTimestamp = new Date().getTime();
  const [timestamp, setTimestamp] = useState(defaultTimestamp);
  const { endpoint } = useApiStore();

  useEffect(() => {
    onTimestampChange(timestamp);
  }, [timestamp]);

  const imgUrl = useMemo(() => {
    if (tenant) {
      return `${endpoint}/captcha/image?tenant=${tenant}&timestamp=${timestamp}`;
    } else {
      return `${endpoint}/captcha/image?timestamp=${timestamp}`;
    }
  }, [timestamp]);
  return (
    <div className="flex items-start gap-2">
      <ProFormText
        fieldProps={{
          size: "large",
          prefix: <LockOutlined />,
          onChange: (e) => {
            onCaptchaChange(e.target.value);
          },
        }}
        placeholder="请输入图形验证码"
      />
      <img
        src={imgUrl}
        alt="captcha"
        className="h-10 w-24 cursor-pointer"
        onClick={() => setTimestamp(new Date().getTime())}
      />
    </div>
  );
}
