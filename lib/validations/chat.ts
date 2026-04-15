import { z } from "zod";

export const chatRequestSchema = z.object({
  chat_id: z.string().min(1, "chat_id обязателен"),
  text: z.string().min(1, "Текст сообщения обязателен"),
});

export const chatResponseSchema = z.object({
  response: z.string(),
});

export type ChatRequestData = z.infer<typeof chatRequestSchema>;
export type ChatResponseData = z.infer<typeof chatResponseSchema>;
