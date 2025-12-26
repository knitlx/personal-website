import { getMarkdownFile } from "@/lib/content"
import BlogForm from "../../components/BlogForm"
import { notFound } from "next/navigation";

interface BlogEditPageProps {
  params: {
    slug: string
  }
}

export default async function BlogEditPage({ params }: BlogEditPageProps) {
  const { slug } = params
  let blogPost = null

  if (slug !== "new") {
    blogPost = getMarkdownFile("blog", slug)
    if (!blogPost) {
        notFound();
    }
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"; // Fallback for local development

  const initialData = blogPost ? {
    ...blogPost.data,
    articleBody: blogPost.data.articleBody || "", // Ensure articleBody is there
    slug: blogPost.slug, // Explicitly pass slug from file name
  } : null;

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">{slug === "new" ? "Создать новую статью" : `Редактировать статью: ${blogPost?.data.title}`}</h1>
      <BlogForm
        initialData={initialData}
        baseUrl={baseUrl}
      />
    </div>
  )
}
