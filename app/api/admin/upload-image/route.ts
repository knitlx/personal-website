import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import fs from "fs";
import path from "path";
import { exec } from "child_process";
import { promisify } from "util";
import { revalidatePath } from "next/cache";

const execAsync = promisify(exec);

const projectRoot = process.cwd();
const uploadDirectory = path.join(projectRoot, "public", "uploads");

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ message: "No file uploaded." }, { status: 400 });
    }

    // Basic file validation
    const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ message: "Unsupported file type." }, { status: 400 });
    }

    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      return NextResponse.json({ message: "File size exceeds 5MB limit." }, { status: 400 });
    }

    // Sanitize filename to prevent path traversal issues
    const originalFilename = file.name;
    const fileExtension = path.extname(originalFilename);
    const baseFilename = path.basename(originalFilename, fileExtension);
    const sanitizedFilename = `${baseFilename.replace(/[^a-z0-9-]/gi, '_')}${fileExtension}`;

    const filePath = path.join(uploadDirectory, sanitizedFilename);
    const publicPath = `/uploads/${sanitizedFilename}`; // Publicly accessible URL

    // Ensure upload directory exists
    if (!fs.existsSync(uploadDirectory)) {
      fs.mkdirSync(uploadDirectory, { recursive: true });
    }

    // Read file content and write to disk
    const buffer = Buffer.from(await file.arrayBuffer());
    fs.writeFileSync(filePath, buffer);

    // --- Git Operations ---
    const gitUserName = process.env.GIT_USER_NAME || "Admin Panel";
    const gitUserEmail = process.env.GIT_USER_EMAIL || "admin@example.com";
    const githubPat = process.env.GITHUB_PAT;

    if (!githubPat) {
      console.error("GITHUB_PAT environment variable is not set. Git push will not work.");
      return NextResponse.json({ message: "File uploaded, but Git push failed: GITHUB_PAT is not set." }, { status: 500 });
    }

    const repoOwner = process.env.VERCEL_GIT_REPO_OWNER || process.env.GITHUB_REPO_OWNER;
    const repoSlug = process.env.VERCEL_GIT_REPO_SLUG || process.env.GITHUB_REPO_SLUG;

    if (!repoOwner || !repoSlug) {
      console.error("Repository owner or slug environment variables are not set. Git push will not work.");
      return NextResponse.json({ message: "File uploaded, but Git push failed: Repository owner/slug is not set." }, { status: 500 });
    }

    await execAsync(`git config user.name "${gitUserName}"`, { cwd: projectRoot });
    await execAsync(`git config user.email "${gitUserEmail}"`, { cwd: projectRoot });

    await execAsync(`git add "${path.relative(projectRoot, filePath)}"`, { cwd: projectRoot });

    const commitMessage = `feat: Upload image: ${sanitizedFilename}`;
    await execAsync(`git commit -m "${commitMessage}"`, { cwd: projectRoot });

    const remoteUrl = `https://${githubPat}@github.com/${repoOwner}/${repoSlug}.git`;
    const pushCommand = `git push ${remoteUrl} main`;
    await execAsync(pushCommand, { cwd: projectRoot });

    // Revalidate relevant paths if necessary (e.g., dashboard if images are shown there)
    revalidatePath('/admin/dashboard'); // Example, adjust as needed

    return NextResponse.json({ message: "File uploaded and committed successfully!", url: publicPath }, { status: 200 });
  } catch (error: any) {
    console.error("Error uploading or committing file:", error);
    return NextResponse.json({ message: "Failed to upload file or commit to Git", error: error.message }, { status: 500 });
  }
}
