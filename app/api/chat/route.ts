import { type NextRequest, NextResponse } from "next/server";
import { chatRequestSchema } from "@/lib/validations/chat";

const WEBHOOK_URL = process.env.CHAT_WEBHOOK_URL ?? "http://45.144.235.234:5678/webhook/rag-bot";

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as unknown;

    const validationResult = chatRequestSchema.safeParse(body);

    if (!validationResult.success) {
      const errors = validationResult.error.issues.map((err) => ({
        field: err.path.join("."),
        message: err.message,
      }));

      return NextResponse.json(
        {
          message: "Ошибки валидации",
          errors,
        },
        { status: 400 }
      );
    }

    const { chat_id, text } = validationResult.data;

    const webhookUrl = new URL(WEBHOOK_URL);
    webhookUrl.searchParams.set("chat_id", chat_id);
    webhookUrl.searchParams.set("text", text);

    const response = await fetch(webhookUrl.toString(), {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Webhook responded with status: ${response.status}`);
    }

    const data = (await response.json()) as { response?: string };

    return NextResponse.json({ response: data.response ?? "Нет ответа от бота" }, { status: 200 });
  } catch (error) {
    console.error("Error in chat API:", error);
    return NextResponse.json({ error: "Ошибка соединения с сервером" }, { status: 500 });
  }
}
