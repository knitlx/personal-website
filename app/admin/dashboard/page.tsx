export const dynamic = "force-dynamic";

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getAllContent } from "@/lib/content";
import DashboardClient from "./components/DashboardClient";

export default async function DashboardPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/admin/login");
  }

  // Извлечение параметров пагинации и поиска для проектов и статей
  const projectsPage = searchParams?.projectsPage
    ? Number(searchParams.projectsPage)
    : 1;
  const projectsSearch = searchParams?.projectsSearch
    ? String(searchParams.projectsSearch)
    : undefined;
  const blogPage = searchParams?.blogPage ? Number(searchParams.blogPage) : 1;
  const blogSearch = searchParams?.blogSearch
    ? String(searchParams.blogSearch)
    : undefined;
  const limit = searchParams?.limit ? Number(searchParams.limit) : 10; // Может быть общим или отдельным

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
