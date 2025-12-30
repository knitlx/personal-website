import { getMarkdownFile, ContentItem } from "@/lib/content";
import { notFound } from "next/navigation";
import ProjectDetailClient from "../components/ProjectDetailClient"; // Import the new Client Component

interface ProjectDetailPageProps {
  params: {
    slug: string;
  };
}

export default async function ProjectDetailPage({
  params,
}: ProjectDetailPageProps) {
  const { slug } = params;

  const projectFile = getMarkdownFile("projects", slug);

  if (!projectFile) {
    notFound();
  }

  // Combine frontmatter data with content
  let project: ContentItem = {
    ...projectFile.data,
    introDescription: (projectFile.data.introDescription as string) || "",
    fullDescription: (projectFile.data.fullDescription as string) || "",
    slug: projectFile.slug,
  };
  // Ensure the projectIcon field matches the expected name in ProjectDetailClient
  if ("icon" in projectFile.data && projectFile.data.icon) {
    // Check if 'icon' property exists from old data structure
    project = {
      ...project,
      projectIcon: projectFile.data.icon as string,
    };
  }

  return <ProjectDetailClient project={project} />;
}
