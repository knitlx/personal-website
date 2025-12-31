import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import { commitAndPush } from "@/lib/git";
import { projectSchema } from "@/lib/validations/project";
import { deleteSchema } from "@/lib/validations/common";
import { execa } from "execa";

const projectRoot = process.cwd();
const contentDirectory = path.join(projectRoot, "content", "projects");

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const projectData = await req.json();

    // Convert localhost URLs to relative paths for production compatibility
    const processUrl = (url: string | undefined): string => {
      if (!url) return "";
      const siteUrl =
        process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
      return url.replace(siteUrl, "");
    };

    projectData.projectIcon = processUrl(projectData.projectIcon);
    projectData.openGraphImage = processUrl(projectData.openGraphImage);
    projectData.canonicalUrl = processUrl(projectData.canonicalUrl);

    // Валидация с помощью Zod
    const validationResult = projectSchema.safeParse(projectData);

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
    const { slug, introDescription, fullDescription, ...frontmatterData } =
      validatedData;

    // FIXED: fullDescription as content, introDescription in frontmatter
    const fullMarkdown = matter.stringify(fullDescription || "", {
      slug: slug,
      ...frontmatterData,
      introDescription: introDescription,
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
      commitMessage: `feat: Update project: ${validatedData.title}`,
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

    // Revalidate relevant paths
    revalidatePath("/admin/dashboard");
    revalidatePath("/projects");
    revalidatePath(`/projects/${validatedData.slug}`);

    // Regenerate content cache after successful save and commit
    try {
      // Use execa to run the cache generation script
      const { stdout, stderr } = await execa(
        "node",
        [path.join(projectRoot, "scripts", "generate-content-cache.ts")],
        { cwd: projectRoot },
      );
      if (stdout) console.log("Cache generation stdout:", stdout);
      if (stderr) console.error("Cache generation stderr:", stderr);
      console.log("Content cache regenerated successfully.");
    } catch (cacheError) {
      console.error("Failed to regenerate content cache:", cacheError);
      return NextResponse.json(
        { message: "Project saved, but failed to regenerate content cache." },
        { status: 500 },
      );
    }

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
        { message: "Project not found" },
        { status: 404 },
      );
    }

    // Delete file from file system (async)
    await fs.unlink(filePath);

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
    revalidatePath(`/projects/${slug}`);

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
