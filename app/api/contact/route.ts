import { type NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

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

const ALLOWED_EXTENSIONS = [
  ".jpg",
  ".jpeg",
  ".png",
  ".gif",
  ".webp",
  ".svg",
  ".heic",
  ".bmp",
  ".pdf",
  ".doc",
  ".docx",
  ".xls",
  ".xlsx",
  ".ppt",
  ".pptx",
  ".txt",
  ".rtf",
  ".pages",
  ".numbers",
  ".key",
  ".zip",
  ".rar",
  ".7z",
];

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const name = formData.get("name") as string;
    const contact = formData.get("contact") as string;
    const message = formData.get("message") as string;
    const projectTitle = formData.get("projectTitle") as string | null;
    const attachment = formData.get("attachment") as File | null;

    if (attachment) {
      const fileName = attachment.name;
      const fileExtension = fileName
        .substring(fileName.lastIndexOf("."))
        .toLowerCase();
      if (!ALLOWED_EXTENSIONS.includes(fileExtension)) {
        return NextResponse.json(
          { message: "Недопустимый тип файла." },
          { status: 400 },
        );
      }
    }

    // Basic validation
    if (!name || !contact || !message) {
      return NextResponse.json(
        { message: "Пожалуйста, заполните все поля." },
        { status: 400 },
      );
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
