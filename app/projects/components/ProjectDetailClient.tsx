"use client";

import { useState } from "react";
import Image from "next/image";
import ImageModal from "../../components/ImageModal";
import BentoButton from "../../components/BentoButton";
import { useContactModal } from "@/contexts/ModalContext";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw"; // Import rehypeRaw
import MarkdownImage from "../../components/MarkdownImage"; // Import MarkdownImage

interface ProjectDetailClientProps {
  project: {
    slug: string;
    title?: string;
    projectIcon?: string;
    shortDescriptionHomepage?: string;
    shortDescriptionProjectsPage?: string;
    trylink?: string;
    introDescription?: string;
    fullDescription?: string;
    // Add other fields that might be used by the UI
    [key: string]: unknown;
  };
}

export default function ProjectDetailClient({ project }: ProjectDetailClientProps) {
  const [modalImageUrl, setModalImageUrl] = useState<string | null>(null);
  const { openContactModal } = useContactModal();

  const closeModal = () => {
    setModalImageUrl(null);
  };

  return (
    <>
      <main className="bg-white py-16">
        <div className="container mx-auto max-w-4xl">
          <div className="flex items-center mb-8">
            {project.projectIcon && (
              <Image
                src={project.projectIcon}
                alt={project.title ?? "Project icon"}
                width={60}
                height={60}
                className="rounded-xl mr-6 object-cover"
              />
            )}
            <h1 className="text-5xl font-bold font-unbounded-fix">{project.title}</h1>
          </div>
          <div className="prose lg:prose-xl max-w-4xl">
            {/* Render the intro description using ReactMarkdown */}
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw]}
              components={{
                img: ({ ...props }) => <MarkdownImage {...props} onImageClick={setModalImageUrl} />,
              }}
            >
              {project.introDescription ?? ""}
            </ReactMarkdown>

            {/* --- In-content button inserted after the intro --- */}
            {!project.trylink && (
              <div className="my-8 flex justify-start">
                <BentoButton
                  onClick={() => openContactModal(project.title)}
                  variant="primary"
                  size="default"
                >
                  Заказать настройку
                </BentoButton>
              </div>
            )}

            {/* Render the rest of the description using ReactMarkdown */}
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw]}
              components={{
                img: ({ ...props }) => <MarkdownImage {...props} onImageClick={setModalImageUrl} />,
              }}
            >
              {project.fullDescription ?? ""}
            </ReactMarkdown>
          </div>

          {/* --- Button at the end of the content --- */}
          <div className="mt-12 flex justify-start">
            {project.trylink ? (
              <BentoButton href={project.trylink} variant="primary" size="default">
                Попробовать
              </BentoButton>
            ) : (
              <BentoButton
                onClick={() => openContactModal(project.title)}
                variant="primary"
                size="default"
              >
                Заказать настройку
              </BentoButton>
            )}
          </div>
        </div>

        {modalImageUrl && <ImageModal imageUrl={modalImageUrl} onClose={closeModal} />}
      </main>
    </>
  );
}
