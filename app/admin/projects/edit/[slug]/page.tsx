import { getMarkdownFile } from "@/lib/content";
import ProjectForm from "../../components/ProjectForm";
import { SITE_URL } from "@/lib/constants";

interface ProjectEditPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ProjectEditPage({ params }: ProjectEditPageProps) {
  const { slug } = await params;
  let project = null;

  if (slug !== "new") {
    project = getMarkdownFile("projects", slug);
  }

  const baseUrl = SITE_URL;

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">
        {slug === "new"
          ? "Создать новый проект"
          : `Редактировать проект: ${project?.data.title ?? ""}`}
      </h1>
      <ProjectForm
        initialData={
          project
            ? {
                ...project.data,
                fullDescription: project.content,
                slug: project.slug,
              }
            : undefined
        }
        baseUrl={baseUrl}
      />
    </div>
  );
}
