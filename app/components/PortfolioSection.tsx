import Link from "next/link";
import styles from "./PortfolioSection.module.css";
import { getAllContent } from "@/lib/content"; // Import getAllContent
import PortfolioClient from "./PortfolioClient"; // Import the new Client Component

export default async function PortfolioSection() {
  const allProjects = (await getAllContent("projects")).data.map(project => ({
    slug: project.slug,
    title: project.title,
    projectIcon: project.projectIcon || project.icon, // Use projectIcon, fallback to icon for old data
    shortDescriptionHomepage: project.shortDescriptionHomepage || project.description, // Use shortDescriptionHomepage, fallback to description
    link: `/projects/${project.slug}`, // Construct the link
  }));



  return (
    <>
      <section className="bg-white relative z-[5] py-12 mb-[50px]">
        <div className="container text-center">
          <h2 className="font-unbounded-fix text-[40px] font-medium leading-tight text-[#333333] mb-[15px]">
            Мои проекты
          </h2>
          <p className="text-[18px] text-[#666] max-w-[700px] mx-auto mb-[50px]">
            Примеры проектов, которые я собрала с помощью AI.
          </p>
          <PortfolioClient projects={allProjects} />
        </div>
      </section>
    </>
  );
}