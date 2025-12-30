import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { commitAndPush } from "@/lib/git";

const projectRoot = process.cwd(); // Assumes process.cwd() is already the project root
const contentDirectory = path.join(projectRoot, "content", "blog"); // Target blog content directory

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const blogPostData = await req.json();

    if (!blogPostData.slug || !blogPostData.title) {
      return NextResponse.json(
        { message: "Slug and Title are required" },
        { status: 400 },
      );
    }

    const { slug, description, articleBody, ...frontmatterData } = blogPostData;

    // Map description and articleBody to the content as required
    const markdownContent = ""; // Content is now stored in frontmatter fields
    const fullMarkdown = matter.stringify(markdownContent, {
      slug: slug, // Explicitly add slug to frontmatter
      ...frontmatterData,
      description: description,
      articleBody: articleBody,
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
      commitMessage: `feat: Update blog post: ${blogPostData.title}`,
      operation: "add",
    });

    if (!gitResult.success) {
      return NextResponse.json(
        {
          message: `Blog post saved, but Git push failed: ${gitResult.error}`,
        },
        { status: 500 },
      );
    }

    // Revalidate the dashboard path to show new/updated content
    console.log("revalidatePath('/admin/dashboard') called for blog post");
    revalidatePath("/admin/dashboard");

    return NextResponse.json(
      { message: "Blog post saved and committed successfully!", slug },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error saving or committing blog post:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      {
        message: "Failed to save blog post or commit to Git",
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
        { message: "Blog post not found" },
        { status: 404 },
      );
    }

    // Delete file from file system
    fs.unlinkSync(filePath);

    // --- Git Operations for deletion ---
    const relativeFilePath = path.relative(projectRoot, filePath);
    const gitResult = await commitAndPush({
      filePath: relativeFilePath,
      commitMessage: `feat: Delete blog post: ${slug}`,
      operation: "rm",
    });

    if (!gitResult.success) {
      return NextResponse.json(
        {
          message: `Blog post deleted, but Git push failed: ${gitResult.error}`,
        },
        { status: 500 },
      );
    }

    // Revalidate relevant paths
    revalidatePath("/admin/dashboard");
    revalidatePath("/blog");
    revalidatePath(`/blog/${slug}`); // Revalidate the specific blog post page

    return NextResponse.json(
      { message: "Blog post deleted and committed successfully!" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error deleting or committing blog post:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      {
        message: "Failed to delete blog post or commit to Git",
        error: errorMessage,
      },
      { status: 500 },
    );
  }
}
