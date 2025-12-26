import { getMarkdownFile } from "@/lib/content"
import ProjectForm from "../../components/ProjectForm"

interface ProjectEditPageProps {
  params: {
    slug: string
  }
}

export default async function ProjectEditPage({ params }: ProjectEditPageProps) {
  const { slug } = params
  let project = null

  if (slug !== "new") {
    project = getMarkdownFile("projects", slug)
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"; // Fallback for local development

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">{slug === "new" ? "Создать новый проект" : `Редактировать проект: ${project?.data.title}`}</h1>
      <ProjectForm
        initialData={project ? { ...project.data, content: project.content, slug: project.slug } : null}
        baseUrl={baseUrl}
      />
    </div>
  )
}
