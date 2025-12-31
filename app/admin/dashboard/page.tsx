export const dynamic = "force-dynamic";

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getAllContent } from "@/lib/content";
import DashboardClient from "./components/DashboardClient";

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/admin/login");
  }

  // Await searchParams в Next.js 15+
  const params = await searchParams;

  // Извлечение параметров пагинации и поиска для проектов и статей
  const projectsPage = params?.projectsPage ? Number(params.projectsPage) : 1;
  const projectsSearch = params?.projectsSearch
    ? String(params.projectsSearch)
    : undefined;
  const blogPage = params?.blogPage ? Number(params.blogPage) : 1;
  const blogSearch = params?.blogSearch ? String(params.blogSearch) : undefined;
  const limit = params?.limit ? Number(params.limit) : 10; // Может быть общим или отдельным

  const projectsResult = getAllContent("projects", {
    page: projectsPage,
    limit,
    search: projectsSearch,
  });
  const blogPostsResult = getAllContent("blog", {
    page: blogPage,
    limit,
    search: blogSearch,
  });

  return (
    <DashboardClient
      userName={session.user?.name || "Пользователь"}
      userEmail={session.user?.email || "email@example.com"}
      projects={projectsResult}
      blogPosts={blogPostsResult}
    />
  );
}
