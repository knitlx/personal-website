"use client";

import { useState, useEffect, FormEvent, ChangeEvent, memo } from "react";
import { ALLOWED_EXTENSIONS } from "@/lib/file-validation";
import { API_ROUTES } from "@/lib/routes";
import BentoButton from "./BentoButton";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectTitle?: string | null;
}

// Simple X icon for closing
const CloseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-6 h-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6 18 18 6M6 6l12 12"
    />
  </svg>
);

const ContactModalImpl: React.FC<ContactModalProps> = ({
  isOpen,
  onClose,
  projectTitle,
}) => {
  const [view, setView] = useState<"main" | "form" | "success">("main");
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    message: "",
  });
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null); // New state for file error
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  // Reset view and states when the modal is closed
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setView("main");
        setStatusMessage("");
        setFormData({ name: "", contact: "", message: "" });
        setFile(null);
        setFileError(null); // Reset file error
      }, 300); // Reset after closing animation
    }
  }, [isOpen]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const handleClose = () => {
    onClose();
  };

  const handleShowForm = () => {
    setView("form");
    setStatusMessage("");
  };

  const handleShowMain = () => {
    setView("main");
    setStatusMessage("");
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      const fileName = selectedFile.name;
      const fileExtension = fileName
        .substring(fileName.lastIndexOf("."))
        .toLowerCase();

      if (!ALLOWED_EXTENSIONS.includes(fileExtension)) {
        setFileError(
          `Недопустимый тип файла: ${fileExtension}. Разрешены: ${ALLOWED_EXTENSIONS.join(", ")}`,
        );
        setFile(null);
        e.target.value = ""; // Clear file input
        return;
      }
      setFile(selectedFile);
      setFileError(null);
    } else {
      setFile(null);
      setFileError(null);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatusMessage("");

    if (fileError) {
      // Prevent submission if there's a file error
      setIsSubmitting(false);
      return;
    }

    const data = new FormData();
    data.append("name", formData.name);
    data.append("contact", formData.contact);
    data.append("message", formData.message);
    if (projectTitle) {
      data.append("projectTitle", projectTitle);
    }
    if (file) {
      data.append("attachment", file);
    }

    try {
      const response = await fetch(API_ROUTES.CONTACT, {
        method: "POST",
        body: data, // No 'Content-Type' header, browser sets it for FormData
      });

      const result = await response.json();

      if (response.ok) {
        setStatusMessage(result.message);
        setView("success");
      } else {
        setStatusMessage(result.message ?? "Произошла ошибка.");
      }
    } catch {
      setStatusMessage("Ошибка сети. Попробуйте снова.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex justify-center items-center p-4 transition-opacity duration-300"
      // Modify onClick to only close if the actual overlay is clicked
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          handleClose();
        }
      }}
      // Add keyboard accessibility for closing with Escape key (standard modal behavior)
      onKeyDown={(e) => {
        if (e.key === "Escape") {
          handleClose();
        }
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-modal-title"
      tabIndex={-1} // Allow focus, but don't add to tab sequence naturally
    >
      <div
        className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-md relative transition-all duration-300"
        // Remove onClick={(e) => e.stopPropagation()} as it's no longer needed with the overlay's improved onClick
        role="document"
      >
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 transition-colors z-10 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 rounded p-1"
          aria-label="Закрыть модальное окно"
        >
          <CloseIcon />
        </button>

        {view === "main" && (
          <div className="flex flex-col gap-4">
            <h2
              id="contact-modal-title"
              className="text-2xl font-bold text-center mb-4 font-unbounded-fix"
            >
              Связаться со мной
            </h2>
            <BentoButton
              href="https://t.me/knitlx"
              variant="custom"
              size="default"
              className="w-full bg-[#619BEC] text-white hover:bg-[#5081E1]"
            >
              Написать в Telegram
            </BentoButton>
            <BentoButton
              href="https://wa.me/79154683416"
              variant="custom"
              size="default"
              className="w-full bg-[#7A68EE] text-white hover:bg-[#6c58de]"
            >
              Написать в WhatsApp
            </BentoButton>
            {/* <BentoButton
              href="https://t.me/ai_universal_assistantbot"
              variant="custom"
              size="default"
              className="w-full bg-[#AB5EED] text-white hover:bg-[#9a4edb]"
            >
              Написать боту-ассистенту
            </BentoButton> */}
            <BentoButton
              onClick={handleShowForm}
              variant="outline"
              className="w-full"
            >
              Оставить заявку
            </BentoButton>
          </div>
        )}

        {view === "form" && (
          <div>
            <h2 className="text-2xl font-bold text-center mb-4 font-unbounded-fix">
              Оставить заявку
            </h2>
            {projectTitle && (
              <p className="text-center text-gray-600 mb-6">
                Запрос по проекту:{" "}
                <span className="font-semibold">{projectTitle}</span>
              </p>
            )}
            <form onSubmit={handleSubmit} aria-describedby="form-status">
              <input
                type="hidden"
                name="projectTitle"
                value={projectTitle ?? ""}
              />
              <div className="mb-4">
                <label
                  htmlFor="contact-name"
                  className="block text-gray-700 font-semibold mb-2"
                >
                  Ваше имя{" "}
                  <span className="text-red-500" aria-hidden="true">
                    *
                  </span>
                </label>
                <input
                  type="text"
                  id="contact-name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Иван"
                  required
                  aria-required="true"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="contact-info"
                  className="block text-gray-700 font-semibold mb-2"
                >
                  Telegram или WhatsApp{" "}
                  <span className="text-red-500" aria-hidden="true">
                    *
                  </span>
                </label>
                <input
                  type="text"
                  id="contact-info"
                  name="contact"
                  value={formData.contact}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="@username или +79991234567"
                  required
                  aria-required="true"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="contact-message"
                  className="block text-gray-700 font-semibold mb-2"
                >
                  Сообщение{" "}
                  <span className="text-red-500" aria-hidden="true">
                    *
                  </span>
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Кратко опишите вашу задачу..."
                  required
                  aria-required="true"
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="contact-attachment"
                  className="block text-gray-700 font-semibold mb-2"
                >
                  Приложить файл
                </label>
                <input
                  type="file"
                  id="contact-attachment"
                  name="attachment"
                  onChange={handleFileChange}
                  accept={ALLOWED_EXTENSIONS.join(",")}
                  className="w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-lg file:border file:border-gray-200
                    file:text-sm file:font-semibold file:bg-white file:text-[#1a1a1a]
                    hover:file:bg-gray-50 file:cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
                  aria-describedby={fileError ? "file-error" : undefined}
                  aria-invalid={!!fileError}
                />
                {fileError && (
                  <p
                    id="file-error"
                    className="text-red-500 text-xs mt-1"
                    role="alert"
                  >
                    {fileError}
                  </p>
                )}
              </div>
              {statusMessage && (
                <p
                  id="form-status"
                  className={`text-center mb-4 ${statusMessage.includes("ошибка") ? "text-red-500" : "text-green-500"}`}
                  role="status"
                  aria-live="polite"
                >
                  {statusMessage}
                </p>
              )}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-[#AB5EED] to-[#7A68EE] text-white py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-purple-600"
                aria-busy={isSubmitting}
              >
                {isSubmitting ? "Отправка..." : "Отправить"}
              </button>
              <button
                type="button"
                onClick={handleShowMain}
                className="w-full mt-3 bg-gray-200 text-gray-800 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-gray-400"
              >
                Назад
              </button>
            </form>
          </div>
        )}

        {view === "success" && (
          <div className="text-center" role="status" aria-live="polite">
            <h2 className="text-2xl font-bold text-center mb-4 font-unbounded-fix bg-gradient-to-b from-[var(--accent-color)] to-[var(--primary-color)] bg-clip-text text-transparent">
              Спасибо!
            </h2>
            <p className="text-gray-700 mb-6">{statusMessage}</p>
            <button
              onClick={handleClose}
              className="bg-gradient-to-r from-[#AB5EED] to-[#7A68EE] text-white py-3 px-8 rounded-lg font-semibold hover:opacity-90 transition-opacity cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple-600"
            >
              Закрыть
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const ContactModal = memo(ContactModalImpl);

export default ContactModal;
