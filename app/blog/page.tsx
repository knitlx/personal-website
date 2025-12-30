import { getAllContent } from "@/lib/content";
import BlogClientPage from "./components/BlogClientPage";

export default async function BlogPage() {
  const posts = getAllContent("blog").data.map((post) => ({
    ...post,
    creationDate: post.creationDate || post.date, // Ensure creationDate is available
    shortDescription: post.shortDescription || post.description,
    slug: String(post.slug),
  }));

  return (
    <main className="py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-12 font-unbounded-fix bg-[linear-gradient(135deg,#9137DF_50%,#7B68EE_75%)] bg-clip-text text-transparent">
          Блог
        </h1>
        <BlogClientPage posts={posts} />
      </div>
    </main>
  );
}
