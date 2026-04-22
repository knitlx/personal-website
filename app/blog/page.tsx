import { getAllContent, getAllTags } from "@/lib/content";
import InfiniteScrollBlog from "./components/InfiniteScrollBlog";
import { PAGINATION, SITE_URL } from "@/lib/constants";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Блог про автоматизацию, AI и цифровые процессы | NoChaos",
  description:
    "Заметки и статьи про автоматизацию, n8n, систематизацию процессов и использование ИИ в реальных рабочих задачах. Практический опыт без лишней теории.",
  keywords:
    "блог автоматизация, статьи ai, цифровые процессы, систематизация информации, автоматизация работы",
  alternates: {
    canonical: `${SITE_URL}/blog`,
  },
  openGraph: {
    url: `${SITE_URL}/blog`,
  },
};

interface BlogPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const resolvedSearchParams = await searchParams;
  const activeTag =
    typeof resolvedSearchParams.tag === "string" ? resolvedSearchParams.tag : undefined;

  const { data: allPosts, totalItems } = getAllContent("blog", {
    limit: PAGINATION.BLOG_POSTS_PER_PAGE,
    tag: activeTag,
  });

  const allTags = getAllTags();

  const posts = allPosts.map((post) => ({
    ...post,
    creationDate: post.creationDate ?? post.date,
    shortDescription: post.shortDescription ?? post.description,
    slug: String(post.slug),
  }));

  return (
    <main className="py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-12 font-unbounded-fix gradient-text-diagonal">
          Блог
        </h1>
        <InfiniteScrollBlog
          initialPosts={posts}
          totalPosts={totalItems}
          allTags={allTags}
          activeTag={activeTag}
        />
      </div>
    </main>
  );
}
