"use client";

import React, { createContext, useContext, useState, useCallback } from "react";

type ModalType = "contact" | "image" | "gallery" | null;

interface ModalState {
  type: ModalType;
  data?: {
    imageUrl?: string;
    onImageSelect?: (url: string) => void;
    projectTitle?: string | null;
  };
}

interface ModalContextValue {
  isOpen: boolean;
  modalType: ModalType;
  modalData: ModalState["data"];
  openModal: (type: ModalType, data?: ModalState["data"]) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextValue | undefined>(undefined);

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [modalState, setModalState] = useState<ModalState>({
    type: null,
    data: undefined,
  });

  const openModal = useCallback(
    (type: ModalType, data?: ModalState["data"]) => {
      setModalState({ type, data });
      // Блокируем скролл при открытии модалки
      document.body.style.overflow = "hidden";
    },
    [],
  );

  const closeModal = useCallback(() => {
    setModalState({ type: null, data: undefined });
    // Восстанавливаем скролл
    document.body.style.overflow = "";
  }, []);

  const value: ModalContextValue = {
    isOpen: !!modalState.type,
    modalType: modalState.type,
    modalData: modalState.data,
    openModal,
    closeModal,
  };

  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
}

export function useModal() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within ModalProvider");
  }
  return context;
}

// Хуки для удобства
export function useContactModal() {
  const { openModal, closeModal, modalData } = useModal();

  const openContactModal = useCallback(
    (projectTitle?: string) => {
      openModal("contact", { projectTitle: projectTitle ?? null });
    },
    [openModal],
  );

  return {
    openContactModal,
    closeModal,
    projectTitle: modalData?.projectTitle,
  };
}

export function useImageModal() {
  const { openModal, closeModal } = useModal();

  const openImageModal = useCallback(
    (imageUrl: string) => {
      openModal("image", { imageUrl });
    },
    [openModal],
  );

  return {
    openImageModal,
    closeModal,
  };
}

export function useGalleryModal() {
  const { openModal, closeModal } = useModal();

  const openGalleryModal = useCallback(
    (onImageSelect: (url: string) => void) => {
      openModal("gallery", { onImageSelect });
    },
    [openModal],
  );

  return {
    openGalleryModal,
    closeModal,
  };
}
