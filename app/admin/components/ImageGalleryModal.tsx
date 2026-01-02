"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Image from "next/image"; // Добавлен импорт Image
import { API_ROUTES } from "@/lib/routes";

interface ImageGalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectImage: (imageUrl: string) => void;
}

export default function ImageGalleryModal({
  isOpen,
  onClose,
  onSelectImage,
}: ImageGalleryModalProps) {
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [deletingImage, setDeletingImage] = useState<string | null>(null);

  // Блокировка скролла и обработка ESC
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";

      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          onClose();
        }
      };
      window.addEventListener("keydown", handleEscape);

      return () => {
        document.body.style.overflow = "auto";
        window.removeEventListener("keydown", handleEscape);
      };
    }
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      fetchImages();
    }
  }, [isOpen]);

  const fetchImages = async () => {
    setLoading(true);
    try {
      console.log("Fetching images from:", API_ROUTES.ADMIN_GALLERY);
      const response = await fetch(API_ROUTES.ADMIN_GALLERY);
      console.log("Response status:", response.status);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message ?? "Не удалось загрузить изображения.",
        );
      }
      const data = await response.json();
      console.log("Received images:", data);
      setImages(data.images);
      console.log("Images state updated:", data.images);
    } catch (err) {
      const error = err instanceof Error ? err.message : "Неизвестная ошибка";
      toast.error(`Ошибка загрузки галереи: ${error}`);
      console.error("Ошибка загрузки галереи:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteImage = async (imageUrl: string) => {
    if (
      !window.confirm(
        "Вы уверены, что хотите удалить это изображение? Это действие необратимо.",
      )
    ) {
      return;
    }

    setDeletingImage(imageUrl);
    try {
      const urlParts = imageUrl.split("/");
      const filename = urlParts[urlParts.length - 1];

      const response = await fetch(API_ROUTES.ADMIN_GALLERY, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ filename }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message ?? "Ошибка удаления изображения.");
      }

      toast.success("Изображение успешно удалено!");
      await fetchImages();
    } catch (err) {
      const error = err instanceof Error ? err.message : "Неизвестная ошибка";
      toast.error(`Ошибка при удалении: ${error}`);
      console.error("Ошибка удаления изображения:", err);
    } finally {
      setDeletingImage(null);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="gallery-modal-title"
    >
      <div
        className="bg-white rounded-lg shadow-xl p-6 w-11/12 max-w-3xl max-h-[90vh] overflow-y-auto relative"
        role="document"
      >
        <h2 id="gallery-modal-title" className="text-2xl font-bold mb-4">
          Галерея изображений
        </h2>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-3xl leading-none focus:outline-none focus:ring-2 focus:ring-blue-500 rounded p-1"
          aria-label="Закрыть галерею"
        >
          &times;
        </button>

        {loading ? (
          <p>Загрузка изображений...</p>
        ) : images.length === 0 ? (
          <p>В папке uploads пока нет изображений.</p>
        ) : (
          <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
            {images.map((url) => (
              <div
                key={url}
                className="relative group border-2 border-transparent hover:border-blue-500 rounded-md overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => {
                    onSelectImage(url);
                    onClose();
                  }}
                  className="w-full h-full cursor-pointer"
                  aria-label={`Выбрать изображение: ${url.split("/").pop()}`}
                >
                  <Image
                    src={url}
                    alt={`Галерея: ${url.split("/").pop()}`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    style={{ objectFit: "cover" }}
                    className="rounded-md"
                  />
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteImage(url);
                  }}
                  disabled={deletingImage === url}
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 text-xs opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-50 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-red-700"
                  aria-label={`Удалить изображение: ${url.split("/").pop()}`}
                  title="Удалить изображение"
                >
                  {deletingImage === url ? (
                    <svg
                      className="animate-spin h-3 w-3 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                  ) : (
                    "X"
                  )}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
