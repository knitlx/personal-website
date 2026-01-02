import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import fs from "fs";
import path from "path";
import { commitAndPush } from "@/lib/git";
import { revalidatePath } from "next/cache";
import sharp from "sharp";

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
      return NextResponse.json(
        { message: "No file uploaded." },
        { status: 400 },
      );
    }

    // Basic file validation
    const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { message: "Unsupported file type." },
        { status: 400 },
      );
    }

    const maxSize = 10 * 1024 * 1024; // 10MB limit for original file
    if (file.size > maxSize) {
      return NextResponse.json(
        { message: "File size exceeds 10MB limit." },
        { status: 400 },
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    // --- Image Optimization with Sharp ---
    const originalFilename = file.name;
    const baseFilename = path
      .basename(originalFilename, path.extname(originalFilename))
      .replace(/[^a-z0-9-]/gi, "_");
    const newFilename = `${baseFilename}-${Date.now()}.webp`; // Add timestamp for uniqueness

    const filePath = path.join(uploadDirectory, newFilename);
    const publicPath = `/uploads/${newFilename}`; // Publicly accessible URL

    await sharp(buffer)
      .resize(1200, null, { withoutEnlargement: true }) // Resize width to 1200px max, no upscale
      .webp({ quality: 80 }) // Convert to webp with 80% quality
      .toFile(filePath);

    // Ensure upload directory exists
    if (!fs.existsSync(uploadDirectory)) {
      fs.mkdirSync(uploadDirectory, { recursive: true });
    }

    // --- Git Operations ---
    const relativeFilePath = path.relative(projectRoot, filePath);
    const gitResult = await commitAndPush({
      filePath: relativeFilePath,
      commitMessage: `feat: Upload optimized image: ${newFilename}`,
      operation: "add",
    });

    if (!gitResult.success) {
      return NextResponse.json(
        {
          message: `File uploaded, but Git push failed: ${gitResult.error}`,
        },
        { status: 500 },
      );
    }

    revalidatePath("/admin/dashboard");

    return NextResponse.json(
      { message: "File uploaded and committed successfully!", url: publicPath },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error uploading or committing file:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      {
        message: "Failed to upload file or commit to Git",
        error: errorMessage,
      },
      { status: 500 },
    );
  }
}
