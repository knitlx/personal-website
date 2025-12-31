import { getAllContent } from "@/lib/content";
import InfiniteScrollBlog from "./components/InfiniteScrollBlog";

export default async function BlogPage() {
  const { data: allPosts, totalItems } = getAllContent("blog");

  const posts = allPosts.map((post) => ({
    ...post,
    creationDate: post.creationDate || post.date,
    shortDescription: post.shortDescription || post.description,
    slug: String(post.slug),
  }));

  // Показываем первые 5 статей изначально
  const initialPosts = posts.slice(0, 5);

  return (
    <main className="py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-12 font-unbounded-fix bg-[linear-gradient(135deg,#9137DF_50%,#7B68EE_75%)] bg-clip-text text-transparent">
          Блог
        </h1>
        <InfiniteScrollBlog
          initialPosts={initialPosts}
          totalPosts={totalItems}
        />
      </div>
    </main>
  );
}
