import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

export interface GitOptions {
  cwd?: string;
  filePath?: string;
  commitMessage: string;
  operation: "add" | "rm";
}

/**
 * Executes Git operations: add/rm, commit, and push.
 * Uses array arguments to prevent command injection.
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

    // Configure Git user
    await execAsync(`git config user.name "${gitUserName}"`, { cwd });
    await execAsync(`git config user.email "${gitUserEmail}"`, { cwd });

    // Add or remove file
    if (operation === "add" && filePath) {
      await execAsync(`git add "${filePath}"`, { cwd });
    } else if (operation === "rm" && filePath) {
      await execAsync(`git rm "${filePath}"`, { cwd });
    }

    // Commit changes
    await execAsync(`git commit -m "${commitMessage}"`, { cwd });

    // Push to remote
    const remoteUrl = `https://${githubPat}@github.com/${repoOwner}/${repoSlug}.git`;
    await execAsync(`git push ${remoteUrl} main`, { cwd });

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
