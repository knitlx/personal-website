import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

export async function GET() {
  const downloadsDir = path.join(process.cwd(), "public", "downloads");

  try {
    const filenames = await fs.readdir(downloadsDir);
    const files = await Promise.all(
      filenames.map(async (name) => {
        const filePath = path.join(downloadsDir, name);
        const stats = await fs.stat(filePath);
        return {
          name,
          url: `/downloads/${name}`,
          size: stats.size,
        };
      }),
    );

    return NextResponse.json(files);
  } catch (error) {
    // If the directory doesn't exist, return an empty array.
    if (error instanceof Error && "code" in error && error.code === "ENOENT") {
      return NextResponse.json([]);
    }
    console.error("Failed to read download files:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
