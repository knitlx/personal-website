"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { SignOutButton } from "./SignOutButton" // Import SignOutButton

interface ContentItem {
  slug: string;
  title: string;
}

interface DashboardClientProps {
  userName: string;
  userEmail: string;
  projects: ContentItem[];
  blogPosts: ContentItem[];
}

export default function DashboardClient({ userName, userEmail, projects, blogPosts }: DashboardClientProps) {
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async (type: "projects" | "blog", slug: string, title: string) => {
    if (!window.confirm(`Вы уверены, что хотите удалить "${title}"? Это действие необратимо.`)) {
      return;
    }

    setDeleting(true);
    try {
      const response = await fetch(`/api/admin/${type}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ slug }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Failed to delete ${type}.`);
      }

      router.refresh(); // Revalidate data on the dashboard
    } catch (error: any) {
      alert(`Ошибка при удалении: ${error.message}`);
      console.error(error);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Админ-панель</h1>
          <p className="text-gray-500">Вы вошли как {userName} ({userEmail})</p>
        </div>
        <SignOutButton />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Проекты</h2>
          <Link href="/admin/projects/new" className="inline-block mt-4 px-4 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600">
            Добавить проект
          </Link>
          <ul className="mt-4 space-y-2">
            {projects.length === 0 ? (
              <li className="text-gray-600">Пока нет проектов.</li>
            ) : (
              projects.map((project) => (
                <li key={project.slug} className="flex justify-between items-center bg-gray-100 p-3 rounded-md">
                  <span className="text-lg">{project.title}</span>
                  <div>
                    <Link href={`/admin/projects/edit/${project.slug}`} className="ml-2 px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                      Редактировать
                    </Link>
                    <button
                      onClick={() => handleDelete("projects", project.slug, project.title)}
                      disabled={deleting}
                      className="ml-2 px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 disabled:opacity-50"
                    >
                      Удалить
                    </button>
                  </div>
                </li>
              ))
            )}
          </ul>
        </div>
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Статьи блога</h2>
          <Link href="/admin/blog/new" className="inline-block mt-4 px-4 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600">
            Добавить статью
          </Link>
          <ul className="mt-4 space-y-2">
            {blogPosts.length === 0 ? (
              <li className="text-gray-600">Пока нет статей.</li>
            ) : (
              blogPosts.map((post) => (
                <li key={post.slug} className="flex justify-between items-center bg-gray-100 p-3 rounded-md">
                  <span className="text-lg">{post.title}</span>
                  <div>
                    <Link href={`/admin/blog/edit/${post.slug}`} className="ml-2 px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                      Редактировать
                    </Link>
                    <button
                      onClick={() => handleDelete("blog", post.slug, post.title)}
                      disabled={deleting}
                      className="ml-2 px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 disabled:opacity-50"
                    >
                      Удалить
                    </button>
                  </div>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
