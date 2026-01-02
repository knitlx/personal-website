"use client";

import Link from "next/link";

interface BlogPost {
  slug: string;
  title?: string;
  creationDate?: string; // Corresponds to 'date' in old data
  shortDescription?: string; // Corresponds to 'description'
  // Other fields from frontmatter will also be present
}

interface BlogClientPageProps {
  posts: BlogPost[];
}

export default function BlogClientPage({ posts }: BlogClientPageProps) {
  return (
    <div className="max-w-3xl mx-auto space-y-10">
      {posts.map((post) => (
        <div
          key={post.slug}
          className="p-6 rounded-xl border border-black/5 shadow-card hover:shadow-card-hover-alt hover:-translate-y-1 transition-all duration-300 gradient-border-card"
        >
          {post.creationDate && (
            <div className="mb-2">
              <p className="text-sm text-gray-500">{post.creationDate}</p>
            </div>
          )}
          <Link href={`/blog/${post.slug}`} className="group">
            <h2 className="text-3xl font-semibold text-[#333333] group-hover:bg-gradient-to-r group-hover:from-accent group-hover:to-primary group-hover:bg-clip-text group-hover:text-transparent transition-colors">
              {post.title ?? "Без названия"}
            </h2>
          </Link>
          {post.shortDescription && (
            <p className="text-gray-600 mt-4 text-lg flex-grow">
              {post.shortDescription}
            </p>
          )}
          <div className="mt-6">
            <Link href={`/blog/${post.slug}`} className="gradient-link">
              Читать далее
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
