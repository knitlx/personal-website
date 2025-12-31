"use client";

import React from "react";
import { useEffect } from "react";

interface ImageModalProps {
  imageUrl: string;
  onClose: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({ imageUrl, onClose }) => {
  // Блокируем скролл body при открытом модальном окне
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  // Обработка ESC для закрытия
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 flex justify-center items-center z-50"
      onClick={onClose}
      style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="image-modal-title"
    >
      <div
        className="relative p-4 bg-white rounded-lg shadow-lg"
        onClick={(e) => e.stopPropagation()}
        role="document"
      >
        <h2 id="image-modal-title" className="sr-only">
          Просмотр изображения
        </h2>
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-black bg-white rounded-full p-1 text-2xl leading-none hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          style={{
            width: "30px",
            height: "30px",
            lineHeight: "28px",
            textAlign: "center",
          }}
          aria-label="Закрыть просмотр изображения"
        >
          &times;
        </button>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imageUrl}
          alt="Просмотр изображения в полном размере"
          className="max-w-screen-lg max-h-screen-lg"
        />
      </div>
    </div>
  );
};

export default ImageModal;
