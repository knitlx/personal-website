// app/components/SeoPreview.tsx
import React from "react";
import Image from "next/image";

interface SeoPreviewProps {
  title: string;
  description: string;
  imageUrl?: string;
  url: string; // Canonical URL
  type?: "website" | "article"; // Open Graph type
}

const SeoPreview: React.FC<SeoPreviewProps> = ({
  title,
  description,
  imageUrl,
  url,
  type: _type = "website",
}) => {
  // Simple mock-up of a social media card
  return (
    <div className="border border-gray-300 rounded-lg p-4 max-w-xl mx-auto shadow-md bg-white">
      <p className="text-sm text-gray-500 mb-2">
        Предпросмотр Open Graph / Twitter Card:
      </p>
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        {imageUrl && (
          <div className="w-full h-56 relative bg-gray-100 flex items-center justify-center">
            <Image
              src={imageUrl}
              alt="Open Graph Image"
              fill
              style={{ objectFit: "cover" }}
              className="object-cover"
            />
          </div>
        )}
        <div className="p-3">
          <p className="text-gray-600 text-xs uppercase mb-1">
            {new URL(url).hostname}
          </p>
          <h3 className="font-semibold text-gray-800 text-base mb-1 truncate">
            {title || "Заголовок"}
          </h3>
          <p className="text-gray-700 text-sm line-clamp-2">
            {description || "Описание"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SeoPreview;
