import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { commitAndPush } from "@/lib/git";

const projectRoot = process.cwd(); // Assume project root for Git operations

export async function GET() {
  const uploadsDirectory = path.join(projectRoot, "public", "uploads");

  try {
    const files = await fs.readdir(uploadsDirectory);
    const imageUrls = files
      .filter((file) => /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(file))
      .map((file) => `/uploads/${file}`);

    return NextResponse.json({ images: imageUrls });
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      return NextResponse.json({ images: [] });
    }
    console.error("Ошибка при чтении папки uploads:", error);
    return NextResponse.json(
      { message: "Ошибка при получении изображений" },
      { status: 500 },
    );
  }
}

export async function DELETE(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json(
      { message: "Неавторизованный доступ" },
      { status: 401 },
    );
  }

  const { filename } = await request.json();

  if (!filename) {
    return NextResponse.json(
      { message: "Имя файла не указано" },
      { status: 400 },
    );
  }

  const uploadsDirectory = path.join(projectRoot, "public", "uploads"); // Use projectRoot
  const filePath = path.join(uploadsDirectory, filename);

  // Проверка на безопасность: убедиться, что файл находится внутри uploadsDirectory
  if (!filePath.startsWith(uploadsDirectory)) {
    return NextResponse.json(
      { message: "Недопустимый путь к файлу" },
      { status: 400 },
    );
  }

  try {
    await fs.unlink(filePath); // Удаляем файл с файловой системы

    // --- Git Operations ---
    const relativeFilePath = path.relative(projectRoot, filePath);
    const gitResult = await commitAndPush({
      filePath: relativeFilePath,
      commitMessage: `feat: Delete image: ${filename}`,
      operation: "rm",
    });

    if (!gitResult.success) {
      return NextResponse.json(
        {
          message: `File deleted, but Git push failed: ${gitResult.error}`,
        },
        { status: 500 },
      );
    }

    return NextResponse.json({
      message: `Файл ${filename} успешно удален и изменение закоммичено в Git`,
    });
  } catch (error) {
    console.error("Ошибка при удалении файла или Git-операциях:", error);
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      return NextResponse.json({ message: "Файл не найден" }, { status: 404 });
    }
    return NextResponse.json(
      {
        message: `Ошибка при удалении файла ${filename} или фиксации изменения в Git`,
      },
      { status: 500 },
    );
  }
}