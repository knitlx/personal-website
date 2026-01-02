import { getAllContent, getAllTags } from "@/lib/content";
import InfiniteScrollBlog from "./components/InfiniteScrollBlog";
import { PAGINATION } from "@/lib/constants";

interface BlogPageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const activeTag =
    typeof searchParams.tag === "string" ? searchParams.tag : undefined;

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
        <h1 className="text-4xl font-bold text-center mb-12 font-unbounded-fix bg-[linear-gradient(135deg,#9137DF_50%,#7B68EE_75%)] bg-clip-text text-transparent">
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
