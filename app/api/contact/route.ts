import { type NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const { name, contact, message } = await request.json();

    // Basic validation
    if (!name || !contact || !message) {
      return NextResponse.json({ message: "Пожалуйста, заполните все поля." }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_SERVER_USER,
        pass: process.env.EMAIL_SERVER_PASSWORD,
      },
    });

    const mailOptions = {
      from: `"Сайт-портфолио" <${process.env.EMAIL_SERVER_USER}>`,
      to: process.env.EMAIL_TO,
      subject: `Новая заявка с сайта от ${name}`,
      html: `
        <h2>Новая заявка с вашего сайта-портфолио</h2>
        <p><strong>Имя:</strong> ${name}</p>
        <p><strong>Контакт:</strong> ${contact}</p>
        <p><strong>Сообщение:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: "Сообщение успешно отправлено!" }, { status: 200 });

  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ message: "Произошла ошибка при отправке сообщения." }, { status: 500 });
  }
}
