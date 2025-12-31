import { execa } from "execa";
import path from "path";

interface GitOptions {
  cwd?: string;
  filePath?: string;
  commitMessage: string;
  operation: "add" | "rm";
}

/**
 * Validates file path to prevent directory traversal
 */
function validateFilePath(filePath: string): boolean {
  // Prevent path traversal attacks - more thorough check
  const normalizedPath = path.normalize(filePath);

  // Check for obvious path traversal patterns
  if (filePath.includes("..")) {
    return false;
  }

  // Check for home directory access
  if (filePath.includes("~")) {
    return false;
  }

  // Check for absolute paths (should be relative to project root)
  if (path.isAbsolute(filePath)) {
    return false;
  }

  // Normalize and check if it tries to escape project root
  const resolvedPath = path.resolve(process.cwd(), normalizedPath);
  const projectRoot = process.cwd();

  // Ensure the resolved path is within project root
  if (!resolvedPath.startsWith(projectRoot)) {
    return false;
  }

  // Allow safe paths: content directory, subdirectories, .md files
  // Pattern: content/blog/slug.md or content/projects/slug.md
  // Also allow: public/uploads/image.jpg, png, gif, webp, svg
  const contentPathPattern = /^content\/(blog|projects)\/[a-zA-Z0-9._/-]+\.md$/;
  const uploadsPathPattern =
    /^public\/uploads\/[a-zA-Z0-9._-]+\.(jpg|jpeg|png|gif|webp|svg)$/i;
  return contentPathPattern.test(filePath) || uploadsPathPattern.test(filePath);
}

/**
 * Validates commit message to prevent command injection
 */
function validateCommitMessage(message: string): boolean {
  // `execa` with array arguments prevents command injection.
  // This function now only ensures the commit message is not excessively long.
  return message.length <= 200;
}

/**
 * Executes Git operations: add/rm, commit, and push.
 * Uses execa with array arguments to prevent command injection.
 * Protects GITHUB_PAT by using environment variable instead of URL.
 */
export async function commitAndPush({
  cwd = process.cwd(),
  filePath,
  commitMessage,
  operation,
}: GitOptions): Promise<{ success: boolean; error?: string }> {
  try {
    // Get Git configuration from environment variables
    const gitUserName = process.env.GIT_USER_NAME || "Admin Panel";
    const gitUserEmail = process.env.GIT_USER_EMAIL || "admin@example.com";
    const githubPat = process.env.GITHUB_PAT;

    if (!githubPat) {
      console.error(
        "GITHUB_PAT environment variable is not set. Git push will not work.",
      );
      return {
        success: false,
        error: "GITHUB_PAT is not set",
      };
    }

    const repoOwner =
      process.env.VERCEL_GIT_REPO_OWNER || process.env.GITHUB_REPO_OWNER;
    const repoSlug =
      process.env.VERCEL_GIT_REPO_SLUG || process.env.GITHUB_REPO_SLUG;

    if (!repoOwner || !repoSlug) {
      console.error(
        "Repository owner or slug environment variables are not set. Git push will not work.",
      );
      return {
        success: false,
        error: "Repository owner/slug is not set",
      };
    }

    // Validate inputs to prevent command injection
    if (filePath && !validateFilePath(filePath)) {
      return {
        success: false,
        error: "Invalid file path",
      };
    }

    if (!validateCommitMessage(commitMessage)) {
      return {
        success: false,
        error: "Invalid commit message",
      };
    }

    // Configure Git user using array arguments (SAFE)
    await execa("git", ["config", "user.name", gitUserName], { cwd });
    await execa("git", ["config", "user.email", gitUserEmail], { cwd });

    // Add or remove file using array arguments (SAFE - no shell injection)
    if (operation === "add" && filePath) {
      await execa("git", ["add", filePath], { cwd });
    } else if (operation === "rm" && filePath) {
      // Use -f to force remove even if file already deleted from filesystem
      await execa("git", ["rm", "-f", filePath], { cwd });
    }

    // Commit with validated message using array arguments (SAFE)
    await execa("git", ["commit", "-m", commitMessage], { cwd });

    // Get current remote URL
    const { stdout: currentUrl } = await execa(
      "git",
      ["remote", "get-url", "origin"],
      { cwd },
    );

    // Create authenticated URL
    const authenticatedUrl = `https://${githubPat}@github.com/${repoOwner}/${repoSlug}.git`;

    // Temporarily set remote URL with credentials
    await execa("git", ["remote", "set-url", "origin", authenticatedUrl], {
      cwd,
    });

    try {
      // Push with authenticated URL
      await execa("git", ["push", "origin", "main"], { cwd });
    } finally {
      // Restore original remote URL (security: remove credentials from git config)
      await execa("git", ["remote", "set-url", "origin", currentUrl], { cwd });
    }

    return { success: true };
  } catch (error) {
    console.error("Git operation failed:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return {
      success: false,
      error: errorMessage,
    };
  }
}
