"use client";

import Link from "next/link";
import { blogData } from "../data/blogData";
import styles from "./blog.module.css";

export default function BlogPage() {
  return (
    <>
      <main className="py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-12 font-unbounded-fix bg-[linear-gradient(135deg,#9137DF_50%,#7B68EE_75%)] bg-clip-text text-transparent">
            Блог
          </h1>
          <div className="max-w-3xl mx-auto space-y-10">
            {blogData.map((post) => (
              <div key={post.slug} className={styles.blogCard}>
                <div className="mb-2">
                  <p className="text-sm text-gray-500">{post.date}</p>
                </div>
                <Link href={`/blog/${post.slug}`} className="group">
                  <h2 className="text-3xl font-semibold text-[#333333]">{post.title}</h2>
                </Link>
                <p className="text-gray-600 mt-4 text-lg flex-grow">{post.description}</p>
                <div className="mt-6">
                    <Link href={`/blog/${post.slug}`} className={styles.blogLink}>
                        Читать далее
                    </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}