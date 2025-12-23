import { projectsData } from "../../data/projectsData";
import Image from "next/image";
import { notFound } from "next/navigation";

// This function can be used by Next.js to generate static pages for each project at build time.
export async function generateStaticParams() {
  return projectsData.map((project) => ({
    slug: project.slug,
  }));
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; // Await the params object
  const project = projectsData.find((p) => p.slug === slug);

  if (!project) {
    notFound(); // Redirect to a 404 page if project is not found
  }

  return (
    <main className="bg-white py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="flex items-center mb-8">
          <Image
            src={project.icon}
            alt={project.title}
            width={60}
            height={60}
            className="rounded-xl mr-6"
          />
          <h1 className="text-5xl font-bold font-unbounded-fix">
            {project.title}
          </h1>
        </div>
        <div className="prose lg:prose-xl max-w-none" dangerouslySetInnerHTML={{ __html: project.fullDescription || '' }} />
      </div>
    </main>
  );
}
