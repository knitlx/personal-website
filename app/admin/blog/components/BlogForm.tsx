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
import SeoFields from "../../components/SeoFields";
import SeoPreview from "../../../components/SeoPreview";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

interface BlogFormData {
  slug: string;
  title: string;
  date: string;
  description: string;
  articleBody: string;
  creationDate: string;
  updateDate: string;
  seoTitle: string;
  seoDescription: string;
  seoTags: string;
  canonicalUrl: string;
  openGraphImage: string;
  sortOrder: number;
  tags: string;
}

interface BlogFormProps {
  initialData?: Partial<BlogFormData> & { tags?: string[] | string }; // Allow tags to be array or string
  baseUrl: string;
}

interface ValidationError {
  field: string;
  message: string;
}

export default function BlogForm({ initialData, baseUrl }: BlogFormProps) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { openGalleryModal } = useGalleryModal();

  const {
    formData,
    setFormData,
    handleSlugChange,
    validationErrors,
    setFieldError,
    loading,
    handleSubmit: handleFormSubmit,
  } = useFormState<BlogFormData>({
    initialValues: {
      slug: initialData?.slug ?? "",
      title: initialData?.title ?? "",
      date: initialData?.date ?? new Date().toISOString().split("T")[0],
      description: initialData?.description ?? "",
      articleBody: initialData?.articleBody ?? "",
      creationDate: initialData?.creationDate ?? new Date().toISOString(),
      updateDate: initialData?.updateDate ?? new Date().toISOString(),
      seoTitle: initialData?.seoTitle ?? "",
      seoDescription: initialData?.seoDescription ?? "",
      seoTags: initialData?.seoTags ?? "",
      canonicalUrl: initialData?.canonicalUrl ?? "",
      openGraphImage: initialData?.openGraphImage ?? "",
      sortOrder: initialData?.sortOrder ?? 0,
      // Convert array to comma-separated string for display
      tags: Array.isArray(initialData?.tags)
        ? initialData.tags.join(", ")
        : (initialData?.tags ?? ""),
    },
    validate: (data) => {
      const errors: Record<string, string> = {};

      if (!data.title.trim()) errors.title = "Заголовок обязателен.";
      if (!data.slug.trim()) errors.slug = "ЧПУ обязательно.";
      if (!data.date.trim()) errors.date = "Дата публикации обязательна.";
      if (!data.description.trim())
        errors.description = "Краткое описание обязательно.";
      if (!data.articleBody.trim())
        errors.articleBody = "Тело статьи обязательно.";
      if (data.description.length > 0 && data.description.length < 10) {
        errors.description = "Описание должно быть не менее 10 символов.";
      }

      return errors;
    },
    onSubmit: async (data) => {
      const dataToSubmit = {
        ...data,
        updateDate: new Date().toISOString(),
      };

      const response = await fetch(API_ROUTES.ADMIN_BLOG, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSubmit),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({
          message: "Failed to save blog post.",
        }));

        if (errorData.errors && Array.isArray(errorData.errors)) {
          const errorMessages = errorData.errors
            .map((e: ValidationError) => `${e.field}: ${e.message}`)
            .join(", ");
          toast.error(`Ошибки валидации: ${errorMessages}`);
          throw new Error(errorMessages);
        }

        toast.error(errorData.message ?? "Failed to save blog post.");
        throw new Error(errorData.message ?? "Failed to save blog post.");
      }

      toast.success("Статья успешно сохранена!");
      router.push("/admin/dashboard");
      router.refresh();
    },
  });

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

  const handleSelectFromGallery = useCallback(() => {
    openGalleryModal((url: string) => {
      setImageValue("openGraphImage");
      setFormData((prev) => ({ ...prev, openGraphImage: url }));
      setFieldError("openGraphImage", "");
    });
  }, [openGalleryModal, setImageValue, setFormData, setFieldError]);

  const handleMDEditorImageUpload = useCallback(
    async (file: File): Promise<string> => {
      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await fetch(API_ROUTES.ADMIN_UPLOAD_IMAGE, {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({
            message: "Ошибка загрузки файла.",
          }));
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

  const handleArticleBodyImageSelected = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.files && event.target.files[0]) {
        const file = event.target.files[0];
        try {
          const imageUrl = await handleMDEditorImageUpload(file);
          setFormData((prev) => ({
            ...prev,
            articleBody: `${prev.articleBody}\n![image](${imageUrl})\n`,
          }));
          event.target.value = "";
        } catch {
          // Ошибка уже обработана
        }
      }
    },
    [handleMDEditorImageUpload, setFormData],
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      await handleFormSubmit(e);
    },
    [handleFormSubmit],
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      handleSlugChange(e, generateSlug, baseUrl, "blog/");
    },
    [handleSlugChange, baseUrl],
  );

  const handleRichTextChange = useCallback(
    (field: "articleBody", value: string | undefined) => {
      setFormData((prev) => ({ ...prev, [field]: value ?? "" }));
    },
    [setFormData],
  );

  const openGraphImagePreviewUrl =
    previewUrls.openGraphImage ?? formData.openGraphImage;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <FormInput
        id="title"
        name="title"
        label="Заголовок"
        value={formData.title ?? ""}
        onChange={handleChange}
        required
        error={validationErrors.title}
      />

      <FormInput
        id="slug"
        name="slug"
        label="ЧПУ (URL)"
        value={formData.slug ?? ""}
        onChange={handleChange}
        required
        error={validationErrors.slug}
      />

      <FormInput
        id="canonicalUrl"
        name="canonicalUrl"
        label="Canonical URL"
        value={formData.canonicalUrl ?? ""}
        onChange={handleChange}
        error={validationErrors.canonicalUrl}
      />

      <FormInput
        id="date"
        name="date"
        label="Дата публикации"
        value={formData.date ?? ""}
        onChange={handleChange}
        required
        type="date"
        error={validationErrors.date}
      />

      <FormInput
        id="sortOrder"
        name="sortOrder"
        label="Порядок сортировки"
        type="number"
        value={String(formData.sortOrder ?? 0)}
        onChange={handleChange}
        error={validationErrors.sortOrder}
      />

      <FormInput
        id="tags"
        name="tags"
        label="Теги (через запятую)"
        value={formData.tags ?? ""}
        onChange={handleChange}
        error={validationErrors.tags}
      />

      <FormTextarea
        id="description"
        name="description"
        label="Краткое описание"
        value={formData.description ?? ""}
        onChange={handleChange}
        rows={3}
        error={validationErrors.description}
      />

      <div data-color-mode="light">
        <label
          htmlFor="articleBody"
          className="block text-sm font-medium text-gray-700 mb-1 mt-4"
        >
          Тело статьи (Markdown)
        </label>
        <MDEditor
          value={formData.articleBody ?? ""}
          onChange={(val) => handleRichTextChange("articleBody", val)}
          height={MD_EDITOR_HEIGHT.FULL}
        />
        {validationErrors.articleBody && (
          <p className="text-red-500 text-sm mt-1">
            {validationErrors.articleBody}
          </p>
        )}
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleArticleBodyImageSelected}
        />
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="mt-2 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Загрузить изображение в статью
        </button>
      </div>

      <SeoFields
        seoTitle={formData.seoTitle ?? ""}
        seoDescription={formData.seoDescription ?? ""}
        seoTags={formData.seoTags ?? ""}
        openGraphImage={formData.openGraphImage ?? ""}
        onFieldChange={handleChange}
        onOpenGraphFileChange={(e) => handleFileChange(e, "openGraphImage")}
        onOpenGraphUpload={() => handleUpload("openGraphImage")}
        onOpenGraphSelectFromGallery={handleSelectFromGallery}
        openGraphPreviewUrl={openGraphImagePreviewUrl ?? null}
        openGraphUploadError={uploadError.openGraphImage ?? null}
        isOpenGraphUploading={uploading.openGraphImage}
        hasOpenGraphFile={!!selectedFiles.openGraphImage}
        openGraphError={validationErrors.openGraphImage}
      />

      <SeoPreview
        title={formData.seoTitle ?? formData.title ?? ""}
        description={formData.seoDescription ?? formData.description ?? ""}
        imageUrl={openGraphImagePreviewUrl ?? undefined}
        url={`${baseUrl}/blog/${formData.slug ?? ""}`}
        type="article"
      />

      <button
        type="submit"
        disabled={loading}
        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
      >
        {loading ? "Сохранение..." : "Сохранить статью"}
      </button>
    </form>
  );
}
