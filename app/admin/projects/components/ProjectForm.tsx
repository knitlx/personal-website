"use client";

import { useRef, useCallback } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { generateSlug } from "@/lib/slug";
import { useFormState } from "@/hooks/useFormState";
import { useImageUpload } from "@/hooks/useImageUpload";
import { useGalleryModal } from "@/contexts/ModalContext";
import { MD_EDITOR_HEIGHT } from "@/lib/constants";
import { API_ROUTES } from "@/lib/routes";
import FormInput from "../../components/FormInput";
import FormTextarea from "../../components/FormTextarea";
import ImageUploadField from "../../components/ImageUploadField";
import SeoFields from "../../components/SeoFields";
import SeoPreview from "../../../components/SeoPreview";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

interface ProjectFormData {
  slug: string;
  title: string;
  shortDescriptionHomepage: string;
  shortDescriptionProjectsPage: string;
  projectIcon: string;
  trylink: string;
  introDescription: string;
  fullDescription: string;
  creationDate: string;
  updateDate: string;
  seoTitle: string;
  seoDescription: string;
  seoTags: string;
  canonicalUrl: string;
  openGraphImage: string;
  schemaType: string;
  sortOrder: number;
}

interface ProjectFormProps {
  initialData?: Partial<ProjectFormData> & { content?: string };
  baseUrl: string;
}

interface ValidationError {
  field: string;
  message: string;
}

export default function ProjectForm({
  initialData,
  baseUrl,
}: ProjectFormProps) {
  const router = useRouter();
  const fileInputIntroRef = useRef<HTMLInputElement>(null);
  const fileInputFullRef = useRef<HTMLInputElement>(null);
  const { openGalleryModal } = useGalleryModal();

  // Используем хук для состояния формы
  const {
    formData,
    setFormData,
    handleChange, // Generic change handler from the hook
    handleSlugChange, // Specific slug handler from the hook
    validationErrors,
    setFieldError,
    loading,
    handleSubmit: handleFormSubmit,
  } = useFormState<ProjectFormData>({
    initialValues: {
      slug: initialData?.slug ?? "",
      title: initialData?.title ?? "",
      shortDescriptionHomepage: initialData?.shortDescriptionHomepage ?? "",
      shortDescriptionProjectsPage:
        initialData?.shortDescriptionProjectsPage ?? "",
      projectIcon: initialData?.projectIcon ?? "",
      trylink: initialData?.trylink ?? "",
      introDescription: initialData?.introDescription ?? "",
      fullDescription: initialData?.fullDescription ?? "",
      creationDate: initialData?.creationDate ?? "",
      updateDate: initialData?.updateDate ?? "",
      seoTitle: initialData?.seoTitle ?? "",
      seoDescription: initialData?.seoDescription ?? "",
      seoTags: initialData?.seoTags ?? "",
      canonicalUrl: initialData?.canonicalUrl ?? "",
      openGraphImage: initialData?.openGraphImage ?? "",
      schemaType: initialData?.schemaType ?? "",
      sortOrder: initialData?.sortOrder ?? 0,
    },
    validate: (data) => {
      const errors: Record<string, string> = {};

      if (!data.title.trim()) errors.title = "Название обязательно.";
      if (!data.slug.trim()) errors.slug = "ЧПУ обязательно.";
      if (!data.introDescription.trim()) {
        errors.introDescription = "Вводный абзац обязателен.";
      }
      if (!data.fullDescription.trim()) {
        errors.fullDescription = "Полное описание обязательно.";
      }
      if (
        data.shortDescriptionHomepage.length > 0 &&
        data.shortDescriptionHomepage.length < 10
      ) {
        errors.shortDescriptionHomepage =
          "Краткое описание для главной страницы должно быть не менее 10 символов.";
      }
      if (
        data.shortDescriptionProjectsPage.length > 0 &&
        data.shortDescriptionProjectsPage.length < 10
      ) {
        errors.shortDescriptionProjectsPage =
          "Краткое описание для страницы проектов должно быть не менее 10 символов.";
      }

      // Валидация URL
      const isValidUrl = (url: string) => {
        if (url.startsWith("/")) return true;
        try {
          new URL(url);
          return true;
        } catch {
          return false;
        }
      };

      if (
        data.projectIcon &&
        !data.projectIcon.startsWith("/") &&
        !isValidUrl(data.projectIcon)
      ) {
        errors.projectIcon =
          "Неверный формат URL для иконки проекта. Используйте полный URL (http/https) или относительный путь (начинающийся с /).";
      }
      if (data.trylink && !isValidUrl(data.trylink)) {
        errors.trylink = "Неверный формат URL для кнопки 'Попробовать'.";
      }
      if (
        data.openGraphImage &&
        !data.openGraphImage.startsWith("/") &&
        !isValidUrl(data.openGraphImage)
      ) {
        errors.openGraphImage =
          "Неверный формат URL для Open Graph изображения. Используйте полный URL (http/https) или относительный путь (начинающийся с /).";
      }

      return errors;
    },
    onSubmit: async (data) => {
      const dataToSubmit = {
        ...data,
        updateDate: new Date().toISOString(),
      };

      const response = await fetch(API_ROUTES.ADMIN_PROJECTS, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSubmit),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({
          message: "Failed to save project.",
        }));

        // Handle validation errors
        if (errorData.errors && Array.isArray(errorData.errors)) {
          const errorMessages = errorData.errors
            .map((e: ValidationError) => `${e.field}: ${e.message}`)
            .join(", ");
          toast.error(`Ошибки валидации: ${errorMessages}`);
          throw new Error(errorMessages);
        }

        toast.error(errorData.message ?? "Failed to save project.");
        throw new Error(errorData.message ?? "Failed to save project.");
      }

      toast.success("Проект успешно сохранен!");
      router.push("/admin/dashboard");
      router.refresh();
    },
  });

  // Используем хук для загрузки изображений
  const {
    uploading,
    uploadError,
    selectedFiles,
    previewUrls,
    handleFileChange,
    handleUpload,
    setValue: setImageValue,
  } = useImageUpload({
    onSuccess: (field, url) => {
      setFormData((prev) => ({ ...prev, [field]: url }));
    },
  });

  // Обработчик выбора изображения из галереи для projectIcon
  const handleSelectProjectIconFromGallery = useCallback(() => {
    openGalleryModal((url: string) => {
      setImageValue("projectIcon");
      setFormData((prev) => ({ ...prev, projectIcon: url }));
      setFieldError("projectIcon", "");
    });
  }, [openGalleryModal, setImageValue, setFormData, setFieldError]);

  // Обработчик выбора изображения из галереи для openGraphImage
  const handleSelectOpenGraphFromGallery = useCallback(() => {
    openGalleryModal((url: string) => {
      setImageValue("openGraphImage");
      setFormData((prev) => ({ ...prev, openGraphImage: url }));
      setFieldError("openGraphImage", "");
    });
  }, [openGalleryModal, setImageValue, setFormData, setFieldError]);

  // Обработчик загрузки изображения из MDEditor
  const handleMDEditorImageUpload = useCallback(
    async (file: File): Promise<string> => {
      const formDataToUpload = new FormData();
      formDataToUpload.append("file", file);

      try {
        const response = await fetch(API_ROUTES.ADMIN_UPLOAD_IMAGE, {
          method: "POST",
          body: formDataToUpload,
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message ?? "Ошибка загрузки файла.");
        }

        const result = await response.json();
        return result.url;
      } catch (err) {
        const error = err instanceof Error ? err.message : "Неизвестная ошибка";
        toast.error(`Ошибка загрузки изображения: ${error}`);
        throw err;
      }
    },
    [],
  );

  // Handler for rich text editor changes
  const handleRichTextChange = useCallback(
    (
      field: "introDescription" | "fullDescription",
      value: string | undefined,
    ) => {
      setFormData((prev) => ({ ...prev, [field]: value ?? "" }));
    },
    [setFormData],
  );

  const handleImageSelected = useCallback(
    async (
      event: React.ChangeEvent<HTMLInputElement>,
      field: "introDescription" | "fullDescription",
    ) => {
      if (event.target.files && event.target.files[0]) {
        const file = event.target.files[0];
        try {
          const imageUrl = await handleMDEditorImageUpload(file);
          const currentContent = formData[field] ?? "";
          handleRichTextChange(
            field,
            `${currentContent}\n![image](${imageUrl})\n`,
          );
          event.target.value = "";
        } catch {
          // Ошибка уже обработана
        }
      }
    },
    [handleMDEditorImageUpload, formData, handleRichTextChange],
  );

  // Обертка для handleSubmit с вызовом handleFormSubmit
  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      await handleFormSubmit(e);
    },
    [handleFormSubmit],
  );

  // Единый обработчик изменений в форме
  const handleFormChange = useCallback(
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >,
    ) => {
      handleChange(e); // Обновляем состояние поля
      const { name } = e.target;
      if (name === "title" || name === "slug") {
        handleSlugChange(
          e as React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
          generateSlug,
          baseUrl,
          "projects/",
        );
      }
    },
    [handleChange, handleSlugChange, baseUrl],
  );

  const projectIconPreviewUrl = previewUrls.projectIcon ?? formData.projectIcon;
  const openGraphImagePreviewUrl =
    previewUrls.openGraphImage ?? formData.openGraphImage;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <FormInput
        id="title"
        name="title"
        label="Название"
        value={formData.title ?? ""}
        onChange={handleFormChange}
        required
        error={validationErrors.title}
      />

      <FormInput
        id="slug"
        name="slug"
        label="ЧПУ (URL)"
        value={formData.slug ?? ""}
        onChange={handleFormChange}
        required
        error={validationErrors.slug}
      />

      <FormInput
        id="canonicalUrl"
        name="canonicalUrl"
        label="Canonical URL"
        value={formData.canonicalUrl ?? ""}
        onChange={handleFormChange}
        error={validationErrors.canonicalUrl}
      />

      {/* SchemaType Dropdown */}
      <div className="flex flex-col space-y-1">
        <label
          htmlFor="schemaType"
          className="block text-sm font-medium text-gray-700"
        >
          Тип схемы (Schema.org)
        </label>
        <select
          id="schemaType"
          name="schemaType"
          value={formData.schemaType ?? ""}
          onChange={handleFormChange}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        >
          <option value="">Не выбрано</option>
          <option value="SoftwareApplication">Software Application</option>
          <option value="Service">Service</option>
          <option value="CreativeWork">Creative Work (Общее)</option>
        </select>
        <p className="text-xs text-gray-500">
          Выберите тип разметки для поисковых систем.
        </p>
      </div>

      <FormInput
        id="sortOrder"
        name="sortOrder"
        label="Порядок сортировки"
        type="number"
        value={String(formData.sortOrder ?? 0)}
        onChange={handleFormChange}
        error={validationErrors.sortOrder}
      />

      <ImageUploadField
        id="projectIcon"
        label="Иконка проекта (путь)"
        value={formData.projectIcon ?? ""}
        onChange={handleFormChange}
        onFileChange={(e) => handleFileChange(e, "projectIcon")}
        onUpload={() => handleUpload("projectIcon")}
        onSelectFromGallery={handleSelectProjectIconFromGallery}
        previewUrl={projectIconPreviewUrl ?? null}
        uploadError={uploadError.projectIcon ?? null}
        isUploading={uploading.projectIcon}
        hasFile={!!selectedFiles.projectIcon}
        error={validationErrors.projectIcon}
        previewWidth={64}
        previewHeight={64}
        previewLabel="Предпросмотр иконки:"
      />

      <FormInput
        id="trylink"
        name="trylink"
        label="Ссылка для кнопки 'Попробовать'"
        value={formData.trylink ?? ""}
        onChange={handleFormChange}
        error={validationErrors.trylink}
      />

      <FormTextarea
        id="shortDescriptionHomepage"
        name="shortDescriptionHomepage"
        label="Краткое описание для главной страницы"
        value={formData.shortDescriptionHomepage ?? ""}
        onChange={handleFormChange}
        rows={3}
        error={validationErrors.shortDescriptionHomepage}
      />

      <FormTextarea
        id="shortDescriptionProjectsPage"
        name="shortDescriptionProjectsPage"
        label="Краткое описание для страницы проектов"
        value={formData.shortDescriptionProjectsPage ?? ""}
        onChange={handleFormChange}
        rows={3}
        error={validationErrors.shortDescriptionProjectsPage}
      />

      {/* Rich Text Editor for Intro Description */}
      <div data-color-mode="light">
        <label
          htmlFor="introDescription"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Вводный абзац для подробной страницы проекта (Markdown)
        </label>
        <MDEditor
          value={formData.introDescription ?? ""}
          onChange={(val) => handleRichTextChange("introDescription", val)}
          height={MD_EDITOR_HEIGHT.INTRO}
        />
        {validationErrors.introDescription && (
          <p className="text-red-500 text-sm mt-1">
            {validationErrors.introDescription}
          </p>
        )}
        <input
          type="file"
          accept="image/*"
          ref={fileInputIntroRef}
          style={{ display: "none" }}
          onChange={(e) => handleImageSelected(e, "introDescription")}
        />
        <button
          type="button"
          onClick={() => fileInputIntroRef.current?.click()}
          className="mt-2 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Загрузить изображение
        </button>
      </div>

      {/* Rich Text Editor for Full Description */}
      <div data-color-mode="light">
        <label
          htmlFor="fullDescription"
          className="block text-sm font-medium text-gray-700 mb-1 mt-4"
        >
          Подробное описание проекта (Markdown)
        </label>
        <MDEditor
          value={formData.fullDescription ?? ""}
          onChange={(val) => handleRichTextChange("fullDescription", val)}
          height={MD_EDITOR_HEIGHT.FULL}
        />
        {validationErrors.fullDescription && (
          <p className="text-red-500 text-sm mt-1">
            {validationErrors.fullDescription}
          </p>
        )}
        <input
          type="file"
          accept="image/*"
          ref={fileInputFullRef}
          style={{ display: "none" }}
          onChange={(e) => handleImageSelected(e, "fullDescription")}
        />
        <button
          type="button"
          onClick={() => fileInputFullRef.current?.click()}
          className="mt-2 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Загрузить изображение
        </button>
      </div>

      <SeoFields
        seoTitle={formData.seoTitle ?? ""}
        seoDescription={formData.seoDescription ?? ""}
        seoTags={formData.seoTags ?? ""}
        openGraphImage={formData.openGraphImage ?? ""}
        onFieldChange={handleFormChange}
        onOpenGraphFileChange={(e) => handleFileChange(e, "openGraphImage")}
        onOpenGraphUpload={() => handleUpload("openGraphImage")}
        onOpenGraphSelectFromGallery={handleSelectOpenGraphFromGallery}
        openGraphPreviewUrl={openGraphImagePreviewUrl ?? null}
        openGraphUploadError={uploadError.openGraphImage ?? null}
        isOpenGraphUploading={uploading.openGraphImage}
        hasOpenGraphFile={!!selectedFiles.openGraphImage}
        openGraphError={validationErrors.openGraphImage}
      />

      <SeoPreview
        title={formData.seoTitle ?? formData.title ?? ""}
        description={
          formData.seoDescription ??
          formData.shortDescriptionProjectsPage ??
          formData.introDescription ??
          ""
        }
        imageUrl={openGraphImagePreviewUrl ?? undefined}
        url={`${baseUrl}/projects/${formData.slug ?? ""}`}
        type="article"
      />

      <button
        type="submit"
        disabled={loading}
        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
      >
        {loading ? "Сохранение..." : "Сохранить проект"}
      </button>
    </form>
  );
}
