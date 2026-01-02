import { getMarkdownFile, ContentItem } from "@/lib/content";
import { notFound } from "next/navigation";
import ProjectDetailClient from "../components/ProjectDetailClient"; // Import the new Client Component
import { Metadata } from "next";

interface ProjectDetailPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({
  params,
}: ProjectDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const projectFile = getMarkdownFile("projects", slug);

  if (!projectFile) {
    return {
      title: "Проект не найден",
    };
  }

  const project = projectFile.data;

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const canonicalUrl = project.canonicalUrl ?? `${baseUrl}/projects/${slug}`;
  const title = project.seoTitle ?? project.title;
  const description =
    project.seoDescription ?? project.shortDescriptionHomepage ?? "";

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: `${baseUrl}/projects/${slug}`,
      siteName: "Личный сайт",
      locale: "ru_RU",
      type: "website",
      images: project.openGraphImage
        ? [{ url: project.openGraphImage }]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: project.openGraphImage ? [project.openGraphImage] : undefined,
    },
    keywords: project.seoTags,
  };
}

// Helper function to generate the correct schema based on project data
const generateProjectSchema = (project: ContentItem, baseUrl: string) => {
  const imageUrl = project.projectIcon
    ? `${baseUrl}${project.projectIcon}`
    : `${baseUrl}/profile.png`;

  const baseSchema = {
    "@context": "https://schema.org",
    name: project.title,
    description: project.shortDescriptionProjectsPage,
    image: imageUrl,
    url: `${baseUrl}/projects/${project.slug}`,
    author: {
      "@type": "Person",
      name: "Александра",
      url: baseUrl,
    },
    publisher: {
      "@type": "Organization",
      name: "Александра | AI-универсал и промт-инженер",
      logo: {
        "@type": "ImageObject",
        url: `${baseUrl}/profile.png`,
      },
    },
  };

  switch (project.schemaType) {
    case "SoftwareApplication":
      return {
        ...baseSchema,
        "@type": "SoftwareApplication",
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web", // Assuming it's a web application
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "RUB",
        },
      };
    case "Service":
      return {
        ...baseSchema,
        "@type": "Service",
        serviceType: "Consulting", // Example, can be more specific
        provider: {
          "@type": "Person",
          name: "Александра",
        },
      };
    default:
      return null;
  }
};

export default async function ProjectDetailPage({
  params,
}: ProjectDetailPageProps) {
  const { slug } = await params;

  const projectFile = getMarkdownFile("projects", slug);

  if (!projectFile) {
    notFound();
  }

  // Combine frontmatter data with content
  let project: ContentItem = {
    ...projectFile.data,
    introDescription: (projectFile.data.introDescription as string) ?? "",
    fullDescription:
      (projectFile.data.fullDescription as string) ?? projectFile.content ?? "", // Fix: Conditionally assign fullDescription
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

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const jsonLd = generateProjectSchema(project, baseUrl);

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <ProjectDetailClient project={project} />
    </>
  );
}
