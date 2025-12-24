"use client";

import { useState, useEffect, FormEvent } from "react";
import BentoButton from "./BentoButton"; // Import BentoButton

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

const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose, projectTitle }) => {
  const [view, setView] = useState<"main" | "form" | "success">("main");
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  // Reset view when the modal is closed
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setView("main");
        setStatusMessage("");
        setFormData({ name: "", contact: "", message: "" });
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
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatusMessage("");

    const payload = {
      ...formData,
      projectTitle: projectTitle, // Add the project title to the payload
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload), // Send the new payload
      });

      const result = await response.json();

      if (response.ok) {
        setStatusMessage(result.message);
        setView("success");
      } else {
        setStatusMessage(result.message || "Произошла ошибка.");
      }
    } catch (error) {
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
      onClick={handleClose}
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}
    >
      <div
        className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-md relative transition-all duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 transition-colors z-10 cursor-pointer"
          aria-label="Close modal"
        >
          <CloseIcon />
        </button>

        {view === "main" && (
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-bold text-center mb-4 font-unbounded-fix">
              Связаться со мной
            </h2>
            <a
              href="https://t.me/knitlx"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full"
            >
              <button className="w-full bg-[#619BEC] text-white py-3 rounded-lg font-semibold hover:bg-[#5081E1] transition-colors cursor-pointer">
                Написать в Telegram
              </button>
            </a>
            <a
              href="https://wa.me/79154683416"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full"
            >
              <button className="w-full bg-[#7A68EE] text-white py-3 rounded-lg font-semibold hover:bg-[#6c58de] transition-colors cursor-pointer">
                Написать в WhatsApp
              </button>
            </a>
            <a
              href="https://t.me/ai_universal_assistantbot"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full"
            >
              <button className="w-full bg-[#AB5EED] text-white py-3 rounded-lg font-semibold hover:bg-[#9a4edb] transition-colors cursor-pointer">
                Написать боту-ассистенту
              </button>
            </a>
            <button
              onClick={handleShowForm}
              className="w-full bg-gray-200 text-gray-800 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors cursor-pointer"
            >
              Оставить заявку
            </button>
          </div>
        )}

        {view === "form" && (
          <div>
            <h2 className="text-2xl font-bold text-center mb-4 font-unbounded-fix">
              Оставить заявку
            </h2>
            {projectTitle && (
              <p className="text-center text-gray-600 mb-6">
                Запрос по проекту: <span className="font-semibold">{projectTitle}</span>
              </p>
            )}
            <form onSubmit={handleSubmit}>
              <input type="hidden" name="projectTitle" value={projectTitle || ''} />
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-gray-700 font-semibold mb-2"
                >
                  Ваше имя
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Иван"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="contact"
                  className="block text-gray-700 font-semibold mb-2"
                >
                  Email или Telegram
                </label>
                <input
                  type="text"
                  id="contact"
                  name="contact"
                  value={formData.contact}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="example@mail.com или @username"
                  required
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="message"
                  className="block text-gray-700 font-semibold mb-2"
                >
                  Сообщение
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Кратко опишите вашу задачу..."
                  required
                ></textarea>
              </div>
              {statusMessage && (
                <p
                  className={`text-center mb-4 ${statusMessage.includes("ошибка") ? "text-red-500" : "text-green-500"}`}
                >
                  {statusMessage}
                </p>
              )}
              <div className="flex justify-between items-center">
                <button
                  type="button"
                  onClick={handleShowMain}
                  className="text-gray-600 hover:text-gray-900 font-semibold transition-colors disabled:opacity-50 cursor-pointer"
                  disabled={isSubmitting}
                >
                  &larr; Назад
                </button>
                <BentoButton
                  type="submit"
                  variant="primary"
                  size="default"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Отправка..." : "Отправить"}
                </BentoButton>
              </div>
            </form>
          </div>
        )}

        {view === "success" && (
          <div className="text-center">
            <h2 className="text-2xl font-bold text-center mb-4 font-unbounded-fix bg-gradient-to-b from-[var(--accent-color)] to-[var(--primary-color)] bg-clip-text text-transparent">
              Спасибо!
            </h2>
            <p className="text-gray-700">{statusMessage}</p>
            <p className="mt-4 text-gray-600">
              Ваша заявка принята. Я скоро с вами свяжусь.
            </p>
            <BentoButton onClick={handleClose} variant="primary" size="default" className="mt-6">
              Закрыть
            </BentoButton>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactModal;
