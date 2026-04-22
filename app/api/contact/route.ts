import { type NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { contactFormSchema } from "@/lib/validations/contact";
import { rateLimit } from "@/lib/rate-limit";
import {
  ALLOWED_EXTENSIONS,
  FILE_SIZE_LIMITS,
  ALLOWED_IMAGE_EXTENSIONS,
} from "@/lib/file-validation";

const isDevelopment = process.env.NODE_ENV === "development";

const { EMAIL_SERVER_USER, EMAIL_SERVER_PASSWORD, EMAIL_TO } = process.env;
if (!EMAIL_SERVER_USER || !EMAIL_SERVER_PASSWORD || !EMAIL_TO) {
  console.error(
    "[contact/route] Missing required env vars: EMAIL_SERVER_USER, EMAIL_SERVER_PASSWORD, EMAIL_TO"
  );
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

interface MailOptions {
  from: string;
  to: string | undefined;
  subject: string;
  html: string;
  attachments: Array<{
    filename: string;
    content: Buffer;
    contentType: string;
  }>;
}

export async function POST(request: NextRequest) {
  // Rate limiting - max 3 messages per 10 minutes per IP
  const ip = request.headers.get("x-forwarded-for") ?? "unknown";
  const rateLimitResult = rateLimit(ip, {
    interval: 10 * 60 * 1000, // 10 minutes
    limit: 3,
  });

  if (!rateLimitResult.success) {
    return NextResponse.json(
      { message: "Слишком много сообщений. Попробуйте позже." },
      { status: 429 }
    );
  }

  try {
    const formData = await request.formData();
    const rawData = {
      name: (formData.get("name") as string) ?? "",
      contact: (formData.get("contact") as string) ?? "",
      message: (formData.get("message") as string) ?? "",
      projectTitle: (formData.get("projectTitle") as string) || undefined,
    };
    if (isDevelopment) {
      console.log("Received rawData for validation:", rawData);
    }

    // Валидация с помощью zod
    const validationResult = contactFormSchema.safeParse(rawData);

    if (!validationResult.success) {
      if (isDevelopment) {
        console.error("Zod validation failed:", validationResult.error);
      }
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

    const { name, contact, message, projectTitle } = validationResult.data;
    const attachment = formData.get("attachment") as File | null;

    if (attachment) {
      const fileName = attachment.name;
      const fileExtension = fileName.substring(fileName.lastIndexOf(".")).toLowerCase();

      // Check file extension
      if (!ALLOWED_EXTENSIONS.includes(fileExtension)) {
        return NextResponse.json({ message: "Недопустимый тип файла." }, { status: 400 });
      }

      // Check file size - different limits for images vs other files
      const isImage = ALLOWED_IMAGE_EXTENSIONS.includes(fileExtension);
      const maxSize = isImage
        ? FILE_SIZE_LIMITS.MAX_IMAGE_SIZE // 5MB for images
        : FILE_SIZE_LIMITS.MAX_FILE_SIZE; // 10MB for other files

      if (attachment.size > maxSize) {
        const maxSizeMB = (maxSize / (1024 * 1024)).toFixed(0);
        return NextResponse.json(
          {
            message: `Файл слишком большой. Максимальный размер: ${maxSizeMB}MB.`,
          },
          { status: 400 }
        );
      }
    }

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: EMAIL_SERVER_USER,
        pass: EMAIL_SERVER_PASSWORD,
      },
    });

    const mailOptions: MailOptions = {
      from: `"Сайт-портфолио" <${EMAIL_SERVER_USER}>`,
      to: EMAIL_TO,
      subject: `Новая заявка с сайта от ${escapeHtml(name)}`,
      html: `
        <h2>Новая заявка с вашего сайта-портфолио</h2>
        ${projectTitle ? `<h3>Заявка по проекту: ${escapeHtml(projectTitle)}</h3>` : ""}
        <p><strong>Имя:</strong> ${escapeHtml(name)}</p>
        <p><strong>Контакт:</strong> ${escapeHtml(contact)}</p>
        <p><strong>Сообщение:</strong></p>
        <p>${escapeHtml(message).replace(/\n/g, "<br>")}</p>
      `,
      attachments: [],
    };

    if (attachment) {
      const buffer = Buffer.from(await attachment.arrayBuffer());
      mailOptions.attachments.push({
        filename: attachment.name,
        content: buffer,
        contentType: attachment.type,
      });
    }

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: "Сообщение успешно отправлено!" }, { status: 200 });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { message: "Произошла ошибка при отправке сообщения." },
      { status: 500 }
    );
  }
}
