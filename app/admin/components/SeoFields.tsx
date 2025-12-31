import FormInput from "./FormInput";
import FormTextarea from "./FormTextarea";
import ImageUploadField from "./ImageUploadField";

interface SeoFieldsProps {
  seoTitle: string;
  seoDescription: string;
  seoTags: string;
  openGraphImage: string;
  onFieldChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  onOpenGraphFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onOpenGraphUpload: () => void;
  onOpenGraphSelectFromGallery: () => void;
  openGraphPreviewUrl: string | null;
  openGraphUploadError: string | null;
  isOpenGraphUploading: boolean;
  hasOpenGraphFile: boolean;
  openGraphError?: string;
}

export default function SeoFields({
  seoTitle,
  seoDescription,
  seoTags,
  openGraphImage,
  onFieldChange,
  onOpenGraphFileChange,
  onOpenGraphUpload,
  onOpenGraphSelectFromGallery,
  openGraphPreviewUrl,
  openGraphUploadError,
  isOpenGraphUploading,
  hasOpenGraphFile,
  openGraphError,
}: SeoFieldsProps) {
  return (
    <>
      <h2 className="text-xl font-semibold mt-8 mb-4">SEO</h2>
      <FormInput
        id="seoTitle"
        name="seoTitle"
        label="SEO Заголовок"
        value={seoTitle}
        onChange={onFieldChange}
      />
      <FormTextarea
        id="seoDescription"
        name="seoDescription"
        label="SEO Описание"
        value={seoDescription}
        onChange={onFieldChange}
        rows={3}
      />
      <FormInput
        id="seoTags"
        name="seoTags"
        label="SEO Теги (через запятую)"
        value={seoTags}
        onChange={onFieldChange}
      />
      <ImageUploadField
        id="openGraphImage"
        label="Open Graph Изображение"
        value={openGraphImage}
        onChange={onFieldChange}
        onFileChange={onOpenGraphFileChange}
        onUpload={onOpenGraphUpload}
        onSelectFromGallery={onOpenGraphSelectFromGallery}
        previewUrl={openGraphPreviewUrl}
        uploadError={openGraphUploadError}
        isUploading={isOpenGraphUploading}
        hasFile={hasOpenGraphFile}
        error={openGraphError}
        previewWidth={120}
        previewHeight={63}
        previewLabel="Предпросмотр Open Graph изображения:"
      />
    </>
  );
}
