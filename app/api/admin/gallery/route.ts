import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { exec } from "child_process"; // Import exec
import { promisify } from "util"; // Import promisify

const execAsync = promisify(exec); // Promisify exec

const projectRoot = process.cwd(); // Assume project root for Git operations

export async function GET() {
  const uploadsDirectory = path.join(projectRoot, 'public', 'uploads'); // Use projectRoot
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || '';

  try {
    const files = await fs.readdir(uploadsDirectory);
    const imageUrls = files
      .filter(file => /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(file))
      .map(file => `${baseUrl}/uploads/${file}`);

    return NextResponse.json({ images: imageUrls });
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      return NextResponse.json({ images: [] });
    }
    console.error('Ошибка при чтении папки uploads:', error);
    return NextResponse.json({ message: 'Ошибка при получении изображений' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: 'Неавторизованный доступ' }, { status: 401 });
  }

  const { filename } = await request.json();

  if (!filename) {
    return NextResponse.json({ message: 'Имя файла не указано' }, { status: 400 });
  }

  const uploadsDirectory = path.join(projectRoot, 'public', 'uploads'); // Use projectRoot
  const filePath = path.join(uploadsDirectory, filename);

  // Проверка на безопасность: убедиться, что файл находится внутри uploadsDirectory
  if (!filePath.startsWith(uploadsDirectory)) {
    return NextResponse.json({ message: 'Недопустимый путь к файлу' }, { status: 400 });
  }

  try {
    await fs.unlink(filePath); // Удаляем файл с файловой системы

    // --- Git Operations ---
    const gitUserName = process.env.GIT_USER_NAME || "Admin Panel";
    const gitUserEmail = process.env.GIT_USER_EMAIL || "admin@example.com";
    const githubPat = process.env.GITHUB_PAT;

    if (!githubPat) {
      console.error("GITHUB_PAT environment variable is not set. Git push will not work.");
      return NextResponse.json({ message: "File deleted, but Git push failed: GITHUB_PAT is not set." }, { status: 500 });
    }

    const repoOwner = process.env.VERCEL_GIT_REPO_OWNER || process.env.GITHUB_REPO_OWNER;
    const repoSlug = process.env.VERCEL_GIT_REPO_SLUG || process.env.GITHUB_REPO_SLUG;

    if (!repoOwner || !repoSlug) {
      console.error("Repository owner or slug environment variables are not set. Git push will not work.");
      return NextResponse.json({ message: "File deleted, but Git push failed: Repository owner/slug is not set." }, { status: 500 });
    }

    // Set Git config for the current command execution
    await execAsync(`git config user.name "${gitUserName}"`, { cwd: projectRoot });
    await execAsync(`git config user.email "${gitUserEmail}"`, { cwd: projectRoot });

    // Remove the file from Git index
    await execAsync(`git rm "${path.relative(projectRoot, filePath)}"`, { cwd: projectRoot });

    // Commit the deletion
    const commitMessage = `feat: Delete image: ${filename}`;
    await execAsync(`git commit -m "${commitMessage}"`, { cwd: projectRoot });

    // Push to remote using PAT
    const remoteUrl = `https://${githubPat}@github.com/${repoOwner}/${repoSlug}.git`;
    const pushCommand = `git push ${remoteUrl} main`; // Assuming 'main' branch

    // Attempt to push
    await execAsync(pushCommand, { cwd: projectRoot });

    return NextResponse.json({ message: `Файл ${filename} успешно удален и изменение закоммичено в Git` });
  } catch (error) {
    console.error('Ошибка при удалении файла или Git-операциях:', error);
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      return NextResponse.json({ message: 'Файл не найден' }, { status: 404 });
    }
    return NextResponse.json({ message: `Ошибка при удалении файла ${filename} или фиксации изменения в Git` }, { status: 500 });
  }
}
