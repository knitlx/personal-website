
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import { SignOutButton } from "./components/SignOutButton"
import { getAllContent } from "@/lib/content"
import Link from "next/link"

interface ContentItem {
  slug: string;
  title: string;
  // Add other common fields here if needed for display
  // The full data object from gray-matter is available if more detailed types are needed
}

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/admin/login")
  }

  const projects = getAllContent("projects") as ContentItem[]
  const blogPosts = getAllContent("blog") as ContentItem[]

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Админ-панель</h1>
          <p className="text-gray-500">Вы вошли как {session.user?.name} ({session.user?.email})</p>
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
                    {/* Delete button placeholder */}
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
                    {/* Delete button placeholder */}
                  </div>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </div>
  )
}
