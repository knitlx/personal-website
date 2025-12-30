"use client";

import React from "react";

interface ImageModalProps {
  imageUrl: string;
  onClose: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({ imageUrl, onClose }) => {
  return (
    <div
      className="fixed inset-0 flex justify-center items-center z-50"
      onClick={onClose}
      style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}
    >
      <div
        className="relative p-4 bg-white rounded-lg shadow-lg"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking on the image/padding
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-black bg-white rounded-full p-1 text-2xl leading-none hover:text-gray-800 cursor-pointer"
          style={{
            width: "30px",
            height: "30px",
            lineHeight: "28px",
            textAlign: "center",
          }}
          aria-label="Close"
        >
          &times;
        </button>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imageUrl}
          alt="Full size view"
          className="max-w-screen-lg max-h-screen-lg"
        />
      </div>
    </div>
  );
};

export default ImageModal;
