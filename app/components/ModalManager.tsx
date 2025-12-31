"use client";

import { useModal } from "@/contexts/ModalContext";
import ContactModal from "./ContactModal";
import ImageModal from "./ImageModal";
import ImageGalleryModal from "../admin/components/ImageGalleryModal";

export default function ModalManager() {
  const { isOpen, modalType, modalData, closeModal } = useModal();

  if (!isOpen) return null;

  return (
    <>
      {modalType === "contact" && (
        <ContactModal
          isOpen={isOpen}
          onClose={closeModal}
          projectTitle={modalData?.projectTitle}
        />
      )}

      {modalType === "image" && modalData?.imageUrl && (
        <ImageModal imageUrl={modalData.imageUrl} onClose={closeModal} />
      )}

      {modalType === "gallery" && modalData?.onImageSelect && (
        <ImageGalleryModal
          isOpen={isOpen}
          onClose={closeModal}
          onSelectImage={modalData.onImageSelect}
        />
      )}
    </>
  );
}
