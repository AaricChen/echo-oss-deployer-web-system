import { useMutation, type DefaultError } from "@tanstack/react-query";
import { useApiStore } from "~/stores/api";
import { useAuthStore } from "~/stores/auth";
import type { ChatRequest } from "~/types/ai/chat";

export function useChat(onChunk: (chunk: string) => void) {
  const { endpoint } = useApiStore();
  const { accessToken } = useAuthStore();

  return useMutation<void, DefaultError, ChatRequest>({
    mutationFn: async ({ id, message }) => {
      const response = await fetch(`${endpoint}/ai/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          id,
          message,
        }),
      });

      if (!response.ok || !response.body) {
        throw new Error("发送聊天请求失败");
      }

      const reader = response.body.getReader();
      if (!reader) {
        throw new Error("获取聊天响应失败");
      }

      const decoder = new TextDecoder("utf-8");

      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const chunk = decoder.decode(value);
          console.log("🚀 ~ mutationFn: ~ chunk:", chunk);
          onChunk(chunk);
        }
      } catch (error) {
        console.error(error);
      } finally {
        reader.releaseLock();
      }
    },
  });
}
