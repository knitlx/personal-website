"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import toast from "react-hot-toast";

interface ImageGalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectImage: (imageUrl: string) => void;
}

export default function ImageGalleryModal({ isOpen, onClose, onSelectImage }: ImageGalleryModalProps) {
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [deletingImage, setDeletingImage] = useState<string | null>(null); // State to track which image is being deleted

  useEffect(() => {
    if (isOpen) {
      fetchImages();
    }
  }, [isOpen]);

  const fetchImages = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/admin/gallery");
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Не удалось загрузить изображения.");
      }
      const data = await response.json();
      setImages(data.images);
    } catch (err: any) {
      toast.error(`Ошибка загрузки галереи: ${err.message}`);
      console.error("Ошибка загрузки галереи:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteImage = async (imageUrl: string) => {
    if (!window.confirm("Вы уверены, что хотите удалить это изображение? Это действие необратимо.")) {
      return;
    }

    setDeletingImage(imageUrl); // Set state to indicate this image is being deleted
    try {
      // Extract filename from imageUrl
      const urlParts = imageUrl.split('/');
      const filename = urlParts[urlParts.length - 1];

      const response = await fetch("/api/admin/gallery", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ filename }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Ошибка удаления изображения.");
      }

      toast.success("Изображение успешно удалено!");
      await fetchImages(); // Refresh the image list
    } catch (err: any) {
      toast.error(`Ошибка при удалении: ${err.message}`);
      console.error("Ошибка удаления изображения:", err);
    } finally {
      setDeletingImage(null); // Reset deleting state
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-11/12 max-w-3xl max-h-[90vh] overflow-y-auto relative">
        <h2 className="text-2xl font-bold mb-4">Галерея изображений</h2>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-3xl leading-none"
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
                <Image
                  src={url}
                  alt="Gallery Image"
                  width={150}
                  height={150}
                  objectFit="cover"
                  className="w-full h-full cursor-pointer"
                  onClick={() => {
                    onSelectImage(url);
                    onClose();
                  }}
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteImage(url);
                  }}
                  disabled={deletingImage === url}
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 text-xs opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-50"
                  title="Удалить изображение"
                >
                  {deletingImage === url ? (
                    <svg className="animate-spin h-3 w-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
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
