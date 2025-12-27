import { getAllContent } from "@/lib/content";
import ProjectsClientPage from "./components/ProjectsClientPage";

export default async function ProjectsPage() {
  const projects = (getAllContent("projects")).data.map(project => ({
    ...project,
    projectIcon: project.projectIcon || project.icon, // Ensure projectIcon is available
    shortDescriptionHomepage: project.shortDescriptionHomepage || project.description,
    shortDescriptionProjectsPage: project.shortDescriptionProjectsPage || project.pageDescription,
    // Ensure slug is a string
    slug: String(project.slug),
  }));

  return (
    <main className="py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-12 font-unbounded-fix">
          Проекты
        </h1>
        <ProjectsClientPage projects={projects} />
      </div>
    </main>
  );
}

