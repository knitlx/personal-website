import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { exec } from "child_process"
import { promisify } from "util"

const execAsync = promisify(exec)

const projectRoot = path.join(process.cwd(), "personal-website")
const contentDirectory = path.join(projectRoot, "content", "projects")

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
  }

  try {
    const projectData = await req.json()

    if (!projectData.slug || !projectData.title) {
      return NextResponse.json({ message: "Slug and Title are required" }, { status: 400 })
    }

    const { slug, introDescription, fullDescription, ...frontmatterData } = projectData

    const markdownContent = `${introDescription || ''}\n${fullDescription || ''}`.trim()
    const fullMarkdown = matter.stringify(markdownContent, frontmatterData)
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
      return NextResponse.json({ message: "Project saved, but Git push failed: GITHUB_PAT is not set." }, { status: 500 })
    }

    // Set Git config for the current command execution
    await execAsync(`git config user.name "${gitUserName}"`, { cwd: projectRoot })
    await execAsync(`git config user.email "${gitUserEmail}"`, { cwd: projectRoot })

    // Add the file
    await execAsync(`git add "${path.relative(projectRoot, filePath)}"`, { cwd: projectRoot })

    // Commit the change
    const commitMessage = `feat: Update project: ${projectData.title}`
    await execAsync(`git commit -m "${commitMessage}"`, { cwd: projectRoot })

    // Push to remote using PAT
    // The URL needs to be in the format: https://<PAT>@github.com/<owner>/<repo>.git
    // We need to infer owner/repo from current remote, or hardcode it.
    // For now, let's assume 'origin' remote is already configured and use PAT
    // This is a simplified approach, a more robust solution would parse the remote URL.
    const remoteUrl = `https://${githubPat}@github.com/${process.env.VERCEL_GIT_REPO_OWNER}/${process.env.VERCEL_GIT_REPO_SLUG}.git`;
    // Fallback if Vercel env vars are not present (e.g. local dev)
    const pushCommand = `git push ${remoteUrl} main`; // Assuming 'main' branch

    // Attempt to push
    await execAsync(pushCommand, { cwd: projectRoot });


    return NextResponse.json({ message: "Project saved and committed successfully!", slug }, { status: 200 })
  } catch (error: any) {
    console.error("Error saving or committing project:", error)
    return NextResponse.json({ message: "Failed to save project or commit to Git", error: error.message }, { status: 500 })
  }
}
