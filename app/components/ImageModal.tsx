"use client";

import React from "react";
import { useEffect, useCallback } from "react"; // Add useCallback
import Image from "next/image";

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

  // Обработка ESC для закрытия (already present)
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  // Define handleOverlayKeyDown
  const handleOverlayKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onClose();
      }
    },
    [onClose]
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
      // Modify onClick to only close if the actual overlay is clicked
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
      onKeyDown={handleOverlayKeyDown} // Added for jsx-a11y/click-events-have-key-events
      role="dialog"
      aria-modal="true"
      aria-labelledby="image-modal-title"
      tabIndex={0} // Changed to 0 so it's focusable by keyboard for onKeyDown, or -1 as before if only Escape is global
    >
      <div
        data-testid="image-modal-frame"
        className="relative h-[min(88vh,900px)] w-[min(96vw,1200px)] rounded-lg bg-white p-4 shadow-lg"
        // Remove onClick={(e) => e.stopPropagation()} as it's no longer needed
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
        <div className="relative h-full w-full overflow-hidden rounded-md">
          <Image
            src={imageUrl}
            alt="Просмотр изображения в полном размере"
            fill
            sizes="(max-width: 1024px) 100vw, 1024px" // Adjust sizes based on your layout
            style={{ objectFit: "contain" }}
            className="rounded-lg" // Apply any existing styles if needed
          />
        </div>
      </div>
    </div>
  );
};

export default ImageModal;
