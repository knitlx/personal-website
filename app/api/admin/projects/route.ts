import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { commitAndPush } from "@/lib/git";

const projectRoot = process.cwd(); // Assumes process.cwd() is already the project root
const contentDirectory = path.join(projectRoot, "content", "projects");

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const projectData = await req.json();

    if (!projectData.slug || !projectData.title) {
      return NextResponse.json(
        { message: "Slug and Title are required" },
        { status: 400 },
      );
    }

    const { slug, introDescription, fullDescription, ...frontmatterData } =
      projectData;

    const markdownContent = ""; // Content is now stored in frontmatter fields introDescription and fullDescription
    const fullMarkdown = matter.stringify(markdownContent, {
      slug: slug, // Explicitly add slug to frontmatter
      ...frontmatterData,
      introDescription: introDescription,
      fullDescription: fullDescription,
    });

    const filePath = path.join(contentDirectory, `${slug}.md`);

    if (!fs.existsSync(contentDirectory)) {
      fs.mkdirSync(contentDirectory, { recursive: true });
    }

    fs.writeFileSync(filePath, fullMarkdown, "utf8");

    // --- Git Operations ---
    const relativeFilePath = path.relative(projectRoot, filePath);
    const gitResult = await commitAndPush({
      filePath: relativeFilePath,
      commitMessage: `feat: Update project: ${projectData.title}`,
      operation: "add",
    });

    if (!gitResult.success) {
      return NextResponse.json(
        {
          message: `Project saved, but Git push failed: ${gitResult.error}`,
        },
        { status: 500 },
      );
    }

    // Revalidate the dashboard path to show new/updated content
    console.log("revalidatePath('/admin/dashboard') called");
    revalidatePath("/admin/dashboard");

    return NextResponse.json(
      { message: "Project saved and committed successfully!", slug },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error saving or committing project:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      {
        message: "Failed to save project or commit to Git",
        error: errorMessage,
      },
      { status: 500 },
    );
  }
}

export async function DELETE(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { slug } = await req.json();

    if (!slug) {
      return NextResponse.json(
        { message: "Slug is required" },
        { status: 400 },
      );
    }

    const filePath = path.join(contentDirectory, `${slug}.md`);

    if (!fs.existsSync(filePath)) {
      return NextResponse.json(
        { message: "Project not found" },
        { status: 404 },
      );
    }

    // Delete file from file system
    fs.unlinkSync(filePath);

    // --- Git Operations for deletion ---
    const relativeFilePath = path.relative(projectRoot, filePath);
    const gitResult = await commitAndPush({
      filePath: relativeFilePath,
      commitMessage: `feat: Delete project: ${slug}`,
      operation: "rm",
    });

    if (!gitResult.success) {
      return NextResponse.json(
        {
          message: `Project deleted, but Git push failed: ${gitResult.error}`,
        },
        { status: 500 },
      );
    }

    // Revalidate relevant paths
    revalidatePath("/admin/dashboard");
    revalidatePath("/projects");
    revalidatePath(`/projects/${slug}`); // Revalidate the specific project page

    return NextResponse.json(
      { message: "Project deleted and committed successfully!" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error deleting or committing project:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      {
        message: "Failed to delete project or commit to Git",
        error: errorMessage,
      },
      { status: 500 },
    );
  }
}
