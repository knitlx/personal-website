import { revalidatePath } from "next/cache"
import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { exec } from "child_process"
import { promisify } from "util"

const execAsync = promisify(exec)

const projectRoot = process.cwd() // Assumes process.cwd() is already the project root
const contentDirectory = path.join(projectRoot, "content", "blog") // Target blog content directory

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
  }

  try {
    const blogPostData = await req.json()

    if (!blogPostData.slug || !blogPostData.title) {
      return NextResponse.json({ message: "Slug and Title are required" }, { status: 400 })
    }

    const { slug, description, articleBody, ...frontmatterData } = blogPostData

    // Map description and articleBody to the content as required
    const markdownContent = ""; // Content is now stored in frontmatter fields
    const fullMarkdown = matter.stringify(markdownContent, {
      slug: slug, // Explicitly add slug to frontmatter
      ...frontmatterData,
      description: description,
      articleBody: articleBody,
    })
    
    const filePath = path.join(contentDirectory, `${slug}.md`)

    if (!fs.existsSync(contentDirectory)) {
      fs.mkdirSync(contentDirectory, { recursive: true })
    }

    fs.writeFileSync(filePath, fullMarkdown, "utf8")

    // --- Git Operations ---
    const gitUserName = process.env.GIT_USER_NAME || "Admin Panel"
    const gitUserEmail = process.env.GIT_USER_EMAIL || "admin@example.com"
    const githubPat = process.env.GITHUB_PAT

    if (!githubPat) {
      console.error("GITHUB_PAT environment variable is not set. Git push will not work.")
      return NextResponse.json({ message: "Blog post saved, but Git push failed: GITHUB_PAT is not set." }, { status: 500 })
    }

    const repoOwner = process.env.VERCEL_GIT_REPO_OWNER || process.env.GITHUB_REPO_OWNER;
    const repoSlug = process.env.VERCEL_GIT_REPO_SLUG || process.env.GITHUB_REPO_SLUG;

    if (!repoOwner || !repoSlug) {
      console.error("Repository owner or slug environment variables are not set. Git push will not work.");
      return NextResponse.json({ message: "Blog post saved, but Git push failed: Repository owner/slug is not set." }, { status: 500 });
    }

    // Set Git config for the current command execution
    await execAsync(`git config user.name "${gitUserName}"`, { cwd: projectRoot })
    await execAsync(`git config user.email "${gitUserEmail}"`, { cwd: projectRoot })

    // Add the file
    await execAsync(`git add "${path.relative(projectRoot, filePath)}"`, { cwd: projectRoot })

    // Commit the change
    const commitMessage = `feat: Update blog post: ${blogPostData.title}`
    await execAsync(`git commit -m "${commitMessage}"`, { cwd: projectRoot })

    // Push to remote using PAT
    const remoteUrl = `https://${githubPat}@github.com/${repoOwner}/${repoSlug}.git`;
    const pushCommand = `git push ${remoteUrl} main`; // Assuming 'main' branch

    // Attempt to push
    await execAsync(pushCommand, { cwd: projectRoot });

    // Revalidate the dashboard path to show new/updated content
    console.log("revalidatePath('/admin/dashboard') called for blog post");
    revalidatePath('/admin/dashboard');

    return NextResponse.json({ message: "Blog post saved and committed successfully!", slug }, { status: 200 })
  } catch (error: any) {
    console.error("Error saving or committing blog post:", error)
    return NextResponse.json({ message: "Failed to save blog post or commit to Git", error: error.message }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
  }

  try {
    const { slug } = await req.json()

    if (!slug) {
      return NextResponse.json({ message: "Slug is required" }, { status: 400 })
    }

    const filePath = path.join(contentDirectory, `${slug}.md`)

    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ message: "Blog post not found" }, { status: 404 })
    }

    // Delete file from file system
    fs.unlinkSync(filePath)

    // --- Git Operations for deletion ---
    const gitUserName = process.env.GIT_USER_NAME || "Admin Panel"
    const gitUserEmail = process.env.GIT_USER_EMAIL || "admin@example.com"
    const githubPat = process.env.GITHUB_PAT

    if (!githubPat) {
      console.error("GITHUB_PAT environment variable is not set. Git push will not work.")
      return NextResponse.json({ message: "Blog post deleted, but Git push failed: GITHUB_PAT is not set." }, { status: 500 })
    }

    const repoOwner = process.env.VERCEL_GIT_REPO_OWNER || process.env.GITHUB_REPO_OWNER;
    const repoSlug = process.env.VERCEL_GIT_REPO_SLUG || process.env.GITHUB_REPO_SLUG;

    if (!repoOwner || !repoSlug) {
      console.error("Repository owner or slug environment variables are not set. Git push will not work.");
      return NextResponse.json({ message: "Blog post deleted, but Git push failed: Repository owner/slug is not set." }, { status: 500 });
    }

    // Set Git config for the current command execution
    await execAsync(`git config user.name "${gitUserName}"`, { cwd: projectRoot })
    await execAsync(`git config user.email "${gitUserEmail}"`, { cwd: projectRoot })

    // Remove the file from Git index
    await execAsync(`git rm "${path.relative(projectRoot, filePath)}"`, { cwd: projectRoot })

    // Commit the deletion
    const commitMessage = `feat: Delete blog post: ${slug}`
    await execAsync(`git commit -m "${commitMessage}"`, { cwd: projectRoot })

    // Push to remote using PAT
    const remoteUrl = `https://${githubPat}@github.com/${repoOwner}/${repoSlug}.git`;
    const pushCommand = `git push ${remoteUrl} main`; // Assuming 'main' branch

    // Attempt to push
    await execAsync(pushCommand, { cwd: projectRoot });

    // Revalidate relevant paths
    revalidatePath('/admin/dashboard')
    revalidatePath('/blog')
    revalidatePath(`/blog/${slug}`) // Revalidate the specific blog post page

    return NextResponse.json({ message: "Blog post deleted and committed successfully!" }, { status: 200 })
  } catch (error: any) {
    console.error("Error deleting or committing blog post:", error)
    return NextResponse.json({ message: "Failed to delete blog post or commit to Git", error: error.message }, { status: 500 })
  }
}
