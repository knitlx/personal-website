import { useState, useCallback, useRef } from "react";
import toast from "react-hot-toast";
import { API_ROUTES } from "@/lib/routes";

interface UploadState {
  uploading: Record<string, boolean>;
  uploadError: Record<string, string | null>;
  selectedFiles: Record<string, File | null>;
  previewUrls: Record<string, string | null>;
}

interface UseImageUploadOptions {
  onSuccess?: (field: string, url: string) => void;
  onError?: (field: string, error: string) => void;
}

export function useImageUpload(options: UseImageUploadOptions = {}) {
  const [state, setState] = useState<UploadState>({
    uploading: {},
    uploadError: {},
    selectedFiles: {},
    previewUrls: {},
  });

  const previewUrlRefs = useRef<Record<string, string | null>>({});

  // Обновление refs при изменении previewUrls
  const updatePreviewUrlRef = useCallback(
    (field: string, url: string | null) => {
      previewUrlRefs.current[field] = url;
    },
    [],
  );

  // Обработчик выбора файла
  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
      const file = e.target.files && e.target.files[0];
      if (file) {
        // Revoke previous object URL
        if (state.previewUrls[field]) {
          URL.revokeObjectURL(state.previewUrls[field]!);
        }

        const newPreviewUrl = URL.createObjectURL(file);
        updatePreviewUrlRef(field, newPreviewUrl);

        setState((prev) => ({
          ...prev,
          previewUrls: { ...prev.previewUrls, [field]: newPreviewUrl },
          selectedFiles: { ...prev.selectedFiles, [field]: file },
          uploadError: { ...prev.uploadError, [field]: null },
        }));
      } else {
        // Clear if no file selected
        if (state.previewUrls[field]) {
          URL.revokeObjectURL(state.previewUrls[field]!);
        }
        updatePreviewUrlRef(field, null);

        setState((prev) => ({
          ...prev,
          previewUrls: { ...prev.previewUrls, [field]: null },
          selectedFiles: { ...prev.selectedFiles, [field]: null },
        }));
      }
    },
    [state.previewUrls, updatePreviewUrlRef],
  );

  // Обработчик загрузки файла
  const handleUpload = useCallback(
    async (field: string) => {
      if (!state.selectedFiles[field]) {
        setState((prev) => ({
          ...prev,
          uploadError: {
            ...prev.uploadError,
            [field]: "Пожалуйста, выберите файл для загрузки.",
          },
        }));
        return null;
      }

      setState((prev) => ({
        ...prev,
        uploading: { ...prev.uploading, [field]: true },
        uploadError: { ...prev.uploadError, [field]: null },
      }));

      const formData = new FormData();
      formData.append("file", state.selectedFiles[field]!);

      try {
        const response = await fetch(API_ROUTES.ADMIN_UPLOAD_IMAGE, {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Ошибка загрузки файла.");
        }

        const result = await response.json();

        // Clean up preview URL after successful upload
        if (state.previewUrls[field]) {
          URL.revokeObjectURL(state.previewUrls[field]!);
          updatePreviewUrlRef(field, null);
        }

        setState((prev) => ({
          ...prev,
          uploading: { ...prev.uploading, [field]: false },
          selectedFiles: { ...prev.selectedFiles, [field]: null },
          previewUrls: { ...prev.previewUrls, [field]: null },
        }));

        toast.success("Изображение успешно загружено!");
        options.onSuccess?.(field, result.url);
        return result.url;
      } catch (err) {
        const error = err instanceof Error ? err.message : "Неизвестная ошибка";
        toast.error(`Ошибка загрузки: ${error}`);

        setState((prev) => ({
          ...prev,
          uploading: { ...prev.uploading, [field]: false },
          uploadError: { ...prev.uploadError, [field]: error },
        }));

        options.onError?.(field, error);
        return null;
      }
    },
    [state.selectedFiles, state.previewUrls, updatePreviewUrlRef, options],
  );

  // Очистка при размонтировании
  const cleanup = useCallback(() => {
    Object.values(previewUrlRefs.current).forEach((url) => {
      if (url) URL.revokeObjectURL(url);
    });
    previewUrlRefs.current = {};
  }, []);

  // Сброс состояния
  const reset = useCallback(() => {
    // Clean up all preview URLs
    Object.values(state.previewUrls).forEach((url) => {
      if (url) URL.revokeObjectURL(url);
    });

    setState({
      uploading: {},
      uploadError: {},
      selectedFiles: {},
      previewUrls: {},
    });
    previewUrlRefs.current = {};
  }, [state.previewUrls]);

  // Установка значения напрямую (например, из галереи)
  const setValue = useCallback(
    (field: string, url: string) => {
      if (state.previewUrls[field]) {
        URL.revokeObjectURL(state.previewUrls[field]!);
      }
      updatePreviewUrlRef(field, null);

      setState((prev) => ({
        ...prev,
        selectedFiles: { ...prev.selectedFiles, [field]: null },
        previewUrls: { ...prev.previewUrls, [field]: null },
        uploadError: { ...prev.uploadError, [field]: null },
      }));
    },
    [state.previewUrls, updatePreviewUrlRef],
  );

  return {
    uploading: state.uploading,
    uploadError: state.uploadError,
    selectedFiles: state.selectedFiles,
    previewUrls: state.previewUrls,
    handleFileChange,
    handleUpload,
    setValue,
    reset,
    cleanup,
  };
}
