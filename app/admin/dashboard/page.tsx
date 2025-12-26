export const dynamic = 'force-dynamic'

import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import { getAllContent } from "@/lib/content"
import DashboardClient from "./components/DashboardClient" // Импорт DashboardClient

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
    <DashboardClient
      userName={session.user?.name || "Пользователь"}
      userEmail={session.user?.email || "email@example.com"}
      projects={projects}
      blogPosts={blogPosts}
    />
  )
}
