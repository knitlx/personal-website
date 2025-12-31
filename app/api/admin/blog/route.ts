import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import { commitAndPush } from "@/lib/git";
import { blogPostSchema } from "@/lib/validations/blog";
import { deleteSchema } from "@/lib/validations/common";

const projectRoot = process.cwd();
const contentDirectory = path.join(projectRoot, "content", "blog");

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const blogPostData = await req.json();

    // Convert localhost URLs to relative paths for production compatibility
    const processUrl = (url: string | undefined): string => {
      if (!url) return "";
      const siteUrl =
        process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
      return url.replace(siteUrl, "");
    };

    blogPostData.openGraphImage = processUrl(blogPostData.openGraphImage);
    blogPostData.canonicalUrl = processUrl(blogPostData.canonicalUrl);

    // Валидация с помощью Zod
    const validationResult = blogPostSchema.safeParse(blogPostData);

    if (!validationResult.success) {
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

    const validatedData = validationResult.data;
    const { slug, description, articleBody, ...frontmatterData } =
      validatedData;

    // FIXED: articleBody as content, not frontmatter
    const fullMarkdown = matter.stringify(articleBody || "", {
      slug: slug,
      ...frontmatterData,
      description: description,
    });

    const filePath = path.join(contentDirectory, `${slug}.md`);

    // Create directory if it doesn't exist (async)
    try {
      await fs.access(contentDirectory);
    } catch {
      await fs.mkdir(contentDirectory, { recursive: true });
    }

    // Write file (async)
    await fs.writeFile(filePath, fullMarkdown, "utf8");

    // --- Git Operations ---
    const relativeFilePath = path.relative(projectRoot, filePath);
    const gitResult = await commitAndPush({
      filePath: relativeFilePath,
      commitMessage: `feat: Update blog post: ${validatedData.title}`,
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
    const body = await req.json();

    // Валидация с помощью Zod
    const validationResult = deleteSchema.safeParse(body);

    if (!validationResult.success) {
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

    const { slug } = validationResult.data;
    const filePath = path.join(contentDirectory, `${slug}.md`);

    // Check if file exists (async)
    try {
      await fs.access(filePath);
    } catch {
      return NextResponse.json(
        { message: "Blog post not found" },
        { status: 404 },
      );
    }

    // Delete file from file system (async)
    await fs.unlink(filePath);

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
    revalidatePath(`/blog/${slug}`);

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
