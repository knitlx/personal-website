"use client";

import { projectsData } from "../../data/projectsData"; // This should be blogData
import { blogData } from "../../data/blogData";
import { useParams } from "next/navigation";

export default function PostPage() {
  const params = useParams();
  const slug = params.slug as string;
  const post = blogData.find((p) => p.slug === slug);

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <>
      <main className="bg-white py-16">
        <div className="container mx-auto max-w-3xl px-4">
            <h1 className="text-4xl md:text-5xl font-bold font-unbounded-fix mb-4">
              {post.title}
            </h1>
            <p className="text-gray-500 mb-8">{post.date}</p>
          
          <div
            className="prose lg:prose-xl max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

        </div>
      </main>
    </>
  );
}
