"use client";

import Image from "next/image";
import React, { useEffect } from "react";

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

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        data-testid="image-modal-frame"
        className="relative h-[min(88vh,900px)] w-[min(96vw,1200px)]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="image-modal-title"
        tabIndex={-1}
      >
        <h2 id="image-modal-title" className="sr-only">
          Просмотр изображения
        </h2>
        <button
          onClick={onClose}
          className="absolute right-2 top-2 z-20 rounded-full bg-white/95 p-1 text-2xl leading-none text-black hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
        <div className="relative h-full w-full overflow-hidden">
          <Image
            src={imageUrl}
            alt="Просмотр изображения в полном размере"
            fill
            priority
            className="object-contain select-none"
            sizes="(max-width: 1200px) 100vw, 1200px"
          />
        </div>
      </div>
    </div>
  );
};

export default ImageModal;
