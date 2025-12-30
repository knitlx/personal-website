"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { SignOutButton } from "./SignOutButton";

import { GetAllContentResult } from "@/lib/content";

interface DashboardClientProps {
  userName: string;
  userEmail: string;
  projects: GetAllContentResult;
  blogPosts: GetAllContentResult;
}

export default function DashboardClient({
  userName,
  userEmail,
  projects,
  blogPosts,
}: DashboardClientProps) {
  const router = useRouter();
  const currentSearchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState("projects");
  const [deleting, setDeleting] = useState(false);

  // Separate states for search queries and current pages for projects and blog posts
  const [projectSearchQuery, setProjectSearchQuery] = useState(
    currentSearchParams?.get("projectsSearch") || "",
  );
  const [blogSearchQuery, setBlogSearchQuery] = useState(
    currentSearchParams?.get("blogSearch") || "",
  );

  // Function to update URL with new query parameters
  const updateUrl = (
    collection: "projects" | "blog",
    newPage: number,
    newSearchQuery: string,
  ) => {
    const params = new URLSearchParams(currentSearchParams?.toString() || "");

    if (collection === "projects") {
      params.set("projectsPage", newPage.toString());
      if (newSearchQuery.trim() !== "") {
        params.set("projectsSearch", newSearchQuery.trim());
      } else {
        params.delete("projectsSearch");
      }
      // Preserve blog post search and page
      params.set("blogPage", (blogPosts.currentPage || 1).toString());
      if (blogSearchQuery.trim() !== "") {
        params.set("blogSearch", blogSearchQuery.trim());
      } else {
        params.delete("blogSearch");
      }
    } else {
      // collection === "blog"
      params.set("blogPage", newPage.toString());
      if (newSearchQuery.trim() !== "") {
        params.set("blogSearch", newSearchQuery.trim());
      } else {
        params.delete("blogSearch");
      }
      // Preserve project search and page
      params.set("projectsPage", (projects.currentPage || 1).toString());
      if (projectSearchQuery.trim() !== "") {
        params.set("projectsSearch", projectSearchQuery.trim());
      } else {
        params.delete("projectsSearch");
      }
    }

    router.push(`/admin/dashboard?${params.toString()}`);
  };

  // Handle search input change for projects
  const handleProjectSearchChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setProjectSearchQuery(e.target.value);
  };

  // Handle search input change for blog posts
  const handleBlogSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBlogSearchQuery(e.target.value);
  };

  // Handle search submit for projects
  const handleProjectSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateUrl("projects", 1, projectSearchQuery); // Reset to page 1 on new search
  };

  // Handle search submit for blog posts
  const handleBlogSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateUrl("blog", 1, blogSearchQuery); // Reset to page 1 on new search
  };

  // Handle pagination change
  const handlePageChange = (
    collection: "projects" | "blog",
    newPage: number,
  ) => {
    if (collection === "projects") {
      updateUrl("projects", newPage, projectSearchQuery);
    } else {
      updateUrl("blog", newPage, blogSearchQuery);
    }
  };

  const renderPagination = (
    collection: "projects" | "blog",
    totalPages: number,
    currentPage: number,
    // Add current search query to pass through URL updates
    _currentSearch: string,
  ) => {
    if (totalPages <= 1) return null;

    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
      <nav className="flex justify-center items-center space-x-2 mt-4">
        <button
          onClick={() => handlePageChange(collection, currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 bg-gray-200 rounded-md disabled:opacity-50"
        >
          Предыдущая
        </button>
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(collection, page)}
            className={`px-3 py-1 rounded-md ${
              page === currentPage ? "bg-[#A9A2E5] text-white" : "bg-gray-200"
            }`}
          >
            {page}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(collection, currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 bg-gray-200 rounded-md disabled:opacity-50"
        >
          Следующая
        </button>
      </nav>
    );
  };

  const handleDelete = async (
    type: "projects" | "blog",
    slug: string,
    title: string,
  ) => {
    if (
      !window.confirm(
        `Вы уверены, что хотите удалить "${title}"? Это действие необратимо.`,
      )
    ) {
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

      toast.success(`${title} успешно удален!`);
      router.refresh();
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Неизвестная ошибка";
      toast.error(`Ошибка при удалении: ${errorMessage}`);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Админ-панель</h1>
          <p className="text-gray-500">
            Вы вошли как {userName} ({userEmail})
          </p>
        </div>
        <SignOutButton />
      </div>

      <div className="mb-8">
        <div className="flex border-b">
          <button
            className={`py-2 px-4 text-lg ${activeTab === "projects" ? "border-b-2 border-[#A9A2E5] font-semibold" : "text-gray-500"}`}
            onClick={() => setActiveTab("projects")}
          >
            Проекты
          </button>
          <button
            className={`py-2 px-4 text-lg ${activeTab === "blog" ? "border-b-2 border-[#A9A2E5] font-semibold" : "text-gray-500"}`}
            onClick={() => setActiveTab("blog")}
          >
            Статьи
          </button>
        </div>
      </div>

      <div>
        {activeTab === "projects" && (
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Проекты</h2>
            <form onSubmit={handleProjectSearchSubmit} className="flex mb-4">
              <input
                type="text"
                placeholder="Поиск по проектам..."
                className="flex-grow rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                value={projectSearchQuery}
                onChange={handleProjectSearchChange}
              />
              <button
                type="submit"
                className="ml-2 px-4 py-2 bg-[#621F9B] text-white font-semibold rounded-lg hover:bg-[#511A80]"
              >
                Поиск
              </button>
            </form>
            <Link
              href="/admin/projects/new"
              className="inline-block mt-4 px-4 py-2 bg-[#33239C] text-white font-semibold rounded-lg hover:bg-[#2A1E82]"
            >
              Добавить проект
            </Link>
            <ul className="mt-4 space-y-2">
              {projects.data.length === 0 ? (
                <li className="text-gray-600">Пока нет проектов.</li>
              ) : (
                projects.data.map((project) => (
                  <li
                    key={project.slug}
                    className="grid grid-cols-[1fr_auto_auto] items-center gap-4 bg-gray-100 p-3 rounded-md"
                  >
                    <span className="text-lg truncate">{project.title}</span>
                    <span className="text-sm text-gray-500">
                      {project.updateDate
                        ? `Обновлено: ${new Date(project.updateDate).toLocaleString("ru-RU")}`
                        : project.creationDate
                          ? `Создано: ${new Date(project.creationDate).toLocaleString("ru-RU")}`
                          : "Дата неизвестна"}
                    </span>{" "}
                    <div className="flex items-center">
                      <Link
                        href={`/admin/projects/edit/${project.slug}`}
                        className="px-3 py-1 bg-[#20549B] text-white rounded-md hover:bg-[#1A4785]"
                      >
                        Редактировать
                      </Link>
                      <button
                        onClick={() =>
                          handleDelete(
                            "projects",
                            project.slug,
                            project.title || "Проект",
                          )
                        }
                        disabled={deleting}
                        className="ml-2 px-3 py-1 bg-gray-700 text-white rounded-md hover:bg-gray-800 disabled:opacity-50"
                      >
                        Удалить
                      </button>
                    </div>
                  </li>
                ))
              )}
            </ul>
            {renderPagination(
              "projects",
              projects.totalPages,
              projects.currentPage,
              projectSearchQuery,
            )}
          </div>
        )}

        {activeTab === "blog" && (
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Статьи блога</h2>
            <form onSubmit={handleBlogSearchSubmit} className="flex mb-4">
              <input
                type="text"
                placeholder="Поиск по статьям..."
                className="flex-grow rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                value={blogSearchQuery}
                onChange={handleBlogSearchChange}
              />
              <button
                type="submit"
                className="ml-2 px-4 py-2 bg-[#621F9B] text-white font-semibold rounded-lg hover:bg-[#511A80]"
              >
                Поиск
              </button>
            </form>
            <Link
              href="/admin/blog/new"
              className="inline-block mt-4 px-4 py-2 bg-[#33239C] text-white font-semibold rounded-lg hover:bg-[#2A1E82]"
            >
              Добавить статью
            </Link>
            <ul className="mt-4 space-y-2">
              {blogPosts.data.length === 0 ? (
                <li className="text-gray-600">Пока нет статей.</li>
              ) : (
                blogPosts.data.map((post) => (
                  <li
                    key={post.slug}
                    className="grid grid-cols-[1fr_auto_auto] items-center gap-4 bg-gray-100 p-3 rounded-md"
                  >
                    <span className="text-lg truncate">{post.title}</span>
                    <span className="text-sm text-gray-500">
                      {post.updateDate
                        ? `Обновлено: ${new Date(post.updateDate).toLocaleString("ru-RU")}`
                        : post.creationDate
                          ? `Создано: ${new Date(post.creationDate).toLocaleString("ru-RU")}`
                          : "Дата неизвестна"}
                    </span>{" "}
                    <div className="flex items-center">
                      <Link
                        href={`/admin/blog/edit/${post.slug}`}
                        className="px-3 py-1 bg-[#20549B] text-white rounded-md hover:bg-[#1A4785]"
                      >
                        Редактировать
                      </Link>
                      <button
                        onClick={() =>
                          handleDelete(
                            "blog",
                            post.slug,
                            post.title || "Статья",
                          )
                        }
                        disabled={deleting}
                        className="ml-2 px-3 py-1 bg-gray-700 text-white rounded-md hover:bg-gray-800 disabled:opacity-50"
                      >
                        Удалить
                      </button>
                    </div>
                  </li>
                ))
              )}
            </ul>
            {renderPagination(
              "blog",
              blogPosts.totalPages,
              blogPosts.currentPage,
              blogSearchQuery,
            )}
          </div>
        )}
      </div>
    </div>
  );
}
