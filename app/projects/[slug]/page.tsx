import { getMarkdownFile } from "@/lib/content";
import { notFound } from "next/navigation";
import ProjectDetailClient from "../components/ProjectDetailClient"; // Import the new Client Component

interface ProjectDetailPageProps {
  params: {
    slug: string;
  };
}

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { slug } = params;

  const projectFile = getMarkdownFile("projects", slug);

  if (!projectFile) {
    notFound();
  }

  // Combine frontmatter data with content
  const project = {
    ...projectFile.data,
    introDescription: projectFile.data.introDescription || "",
    fullDescription: projectFile.data.fullDescription || "",
    slug: projectFile.slug,
  };
  // Ensure the projectIcon field matches the expected name in ProjectDetailClient
  if (project.icon) { // Check if 'icon' property exists from old data structure
    project.projectIcon = project.icon; // Map 'icon' to 'projectIcon'
    delete project.icon; // Remove 'icon' if it exists to avoid redundancy
  }


  return (
    <ProjectDetailClient project={project} />
  );
}
