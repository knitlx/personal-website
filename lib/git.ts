import { execa } from "execa";
import path from "path";

const isDevelopment = process.env.NODE_ENV === "development";

const validateGitEnvVars = () => {
  if (isDevelopment && !process.env.GITHUB_PAT) {
    console.warn("GITHUB_PAT not set. Git operations will fail in development.");
    return false;
  }

  if (!isDevelopment && !process.env.GITHUB_PAT) {
    throw new Error("GITHUB_PAT environment variable is required for git operations in production");
  }

  if (!isDevelopment && !process.env.GITHUB_USERNAME) {
    throw new Error(
      "GITHUB_USERNAME environment variable is required for git operations in production"
    );
  }

  return true;
};

validateGitEnvVars();

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
  const uploadsPathPattern = /^public\/uploads\/[a-zA-Z0-9._-]+\.(jpg|jpeg|png|gif|webp|svg)$/i;
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
    const gitUserName = process.env.GIT_USER_NAME ?? "Admin Panel";
    const gitUserEmail = process.env.GIT_USER_EMAIL ?? "admin@example.com";
    const githubPat = process.env.GITHUB_PAT;
    const githubUsername = process.env.GITHUB_USERNAME; // You need to set this on your server

    if (!githubPat || !githubUsername) {
      const errorMessage =
        "GITHUB_PAT or GITHUB_USERNAME environment variables are not set. Git push will not work.";
      console.error(errorMessage);
      return {
        success: false,
        error: errorMessage,
      };
    }

    const repoOwner = process.env.VERCEL_GIT_REPO_OWNER ?? process.env.GITHUB_REPO_OWNER;
    const repoSlug = process.env.VERCEL_GIT_REPO_SLUG ?? process.env.GITHUB_REPO_SLUG;

    if (!isDevelopment && (!repoOwner || !repoSlug)) {
      const errorMessage =
        "Repository owner or slug environment variables are not set. Git push will not work.";
      if (!isDevelopment) {
        console.error(errorMessage);
      }
      return {
        success: false,
        error: errorMessage,
      };
    }

    // Validate inputs
    if (filePath && !validateFilePath(filePath)) {
      return { success: false, error: "Invalid file path" };
    }
    if (!validateCommitMessage(commitMessage)) {
      return { success: false, error: "Invalid commit message" };
    }

    // Define environment for execa to disable interactive prompts and secure credentials
    const gitEnv = {
      GIT_TERMINAL_PROMPT: "0",
      GIT_ASKPASS: "/bin/echo",
      GIT_PASSWORD: githubPat,
      GIT_USERNAME: githubUsername,
    };

    // Configure Git user
    await execa("git", ["config", "user.name", gitUserName], {
      cwd,
      env: gitEnv,
    });
    await execa("git", ["config", "user.email", gitUserEmail], {
      cwd,
      env: gitEnv,
    });

    // Add or remove file
    if (operation === "add" && filePath) {
      await execa("git", ["add", filePath], { cwd, env: gitEnv });
    } else if (operation === "rm" && filePath) {
      await execa("git", ["rm", "-f", filePath], { cwd, env: gitEnv });
    }

    // Commit
    await execa("git", ["commit", "-m", commitMessage], { cwd, env: gitEnv });

    // Push using credential helper environment variables instead of URL-embedded token
    const remoteUrl = `https://github.com/${repoOwner}/${repoSlug}.git`;
    await execa("git", ["push", remoteUrl, "main"], { cwd, env: gitEnv });

    return { success: true };
  } catch (error) {
    console.error("Git operation failed:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return {
      success: false,
      error: errorMessage,
    };
  }
}
