import { PageContainer } from "@ant-design/pro-components";
import { Bubble, Sender } from "@ant-design/x";
import { useState } from "react";
import { useChat } from "~/apis/ai/chat";
import type { Route } from "./+types/_admin._index";
import { Button, Space } from "antd";

export default function Home({}: Route.ComponentProps) {
  const [content, setContent] = useState("");
  const { mutateAsync: chat, isPending } = useChat((chunk) => {
    setContent((prev) => prev + chunk);
  });

  const handleSend = async (content: string) => {
    chat({ message: content });
  };

  return (
    <PageContainer title="首页">
      <Space direction="vertical" size="middle" style={{ width: "100%" }}>
        <Bubble content={content} />
        <Sender
          loading={isPending}
          onSubmit={(content) => {
            handleSend(content);
          }}
        />
        <Button type="link" onClick={() => setContent("")}>
          清空
        </Button>
      </Space>
    </PageContainer>
  );
}
