import { type NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { contactFormSchema } from "@/lib/validations/contact";
import { rateLimit } from "@/lib/rate-limit";
import {
  ALLOWED_EXTENSIONS,
  FILE_SIZE_LIMITS,
  ALLOWED_IMAGE_EXTENSIONS,
} from "@/lib/file-validation";

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
      { status: 429 },
    );
  }

  try {
    const formData = await request.formData();
    const rawData = {
      name: formData.get("name") as string,
      contact: formData.get("contact") as string,
      message: formData.get("message") as string,
      projectTitle: formData.get("projectTitle") as string | null,
    };
    console.log("Received rawData for validation:", rawData); // DEBUG LOG

    // Валидация с помощью zod
    const validationResult = contactFormSchema.safeParse(rawData);

    if (!validationResult.success) {
      console.error("Zod validation failed:", validationResult.error); // DEBUG LOG
      const errors = validationResult.error.issues.map((err) => ({
        field: err.path.join("."),
        message: err.message,
      }));

      return NextResponse.json(
        {
          message: "Ошибки валидации",
          errors,
        },
        { status: 400 },
      );
    }

    const { name, contact, message, projectTitle } = validationResult.data;
    const attachment = formData.get("attachment") as File | null;

    if (attachment) {
      const fileName = attachment.name;
      const fileExtension = fileName
        .substring(fileName.lastIndexOf("."))
        .toLowerCase();

      // Check file extension
      if (!ALLOWED_EXTENSIONS.includes(fileExtension)) {
        return NextResponse.json(
          { message: "Недопустимый тип файла." },
          { status: 400 },
        );
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
          { status: 400 },
        );
      }
    }

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_SERVER_USER,
        pass: process.env.EMAIL_SERVER_PASSWORD,
      },
    });

    const mailOptions: MailOptions = {
      from: `"Сайт-портфолио" <${process.env.EMAIL_SERVER_USER}>`,
      to: process.env.EMAIL_TO,
      subject: `Новая заявка с сайта от ${name}`,
      html: `
        <h2>Новая заявка с вашего сайта-портфолио</h2>
        ${projectTitle ? `<h3>Заявка по проекту: ${projectTitle}</h3>` : ""}
        <p><strong>Имя:</strong> ${name}</p>
        <p><strong>Контакт:</strong> ${contact}</p>
        <p><strong>Сообщение:</strong></p>
        <p>${message.replace(/\n/g, "<br>")}</p>
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

    return NextResponse.json(
      { message: "Сообщение успешно отправлено!" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { message: "Произошла ошибка при отправке сообщения." },
      { status: 500 },
    );
  }
}
