"use client"

import { useState, useEffect, useRef } from "react"
import dynamic from "next/dynamic"
import { useRouter } from "next/navigation"

// Dynamically import MDEditor to ensure it's client-side rendered
const MDEditor = dynamic(
  () => import("@uiw/react-md-editor"),
  { ssr: false }
);

interface BlogFormData {
  slug: string;
  title: string;
  date: string; // The original date from blogData.ts, will be initialData.date
  description: string; // Mapped from blogData.ts description
  articleBody: string; // Mapped from blogData.ts content
  creationDate: string;
  updateDate: string;
  seoTitle: string;
  seoDescription: string;
  seoTags: string;
  canonicalUrl: string;
  openGraphImage: string;
}

interface BlogFormProps {
  initialData?: Partial<BlogFormData>;
  baseUrl: string;
}

// Function-helper for slug generation (reused from ProjectForm)
const generateSlug = (title: string) => {
  const cyrillicToLatinMap: { [key: string]: string } = {
    'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e', 'ё': 'yo', 'ж': 'zh', 'з': 'z', 'и': 'i',
    'й': 'y', 'к': 'k', 'л': 'l', 'м': 'm', 'н': 'n', 'о': 'o', 'п': 'p', 'р': 'r', 'с': 's', 'т': 't',
    'у': 'u', 'ф': 'f', 'х': 'h', 'ц': 'ts', 'ч': 'ch', 'ш': 'sh', 'щ': 'sch', 'Ъ': '', 'ы': 'y', 'ь': '',
    'э': 'e', 'ю': 'yu', 'я': 'ya',
    'А': 'A', 'Б': 'B', 'В': 'V', 'Г': 'G', 'Д': 'D', 'Е': 'E', 'Ё': 'Yo', 'Ж': 'Zh', 'З': 'Z', 'И': 'I',
    'Й': 'Y', 'К': 'K', 'Л': 'L', 'М': 'M', 'Н': 'Н', 'О': 'О', 'П': 'П', 'Р': 'Р', 'С': 'С', 'Т': 'Т',
    'У': 'У', 'Ф': 'Ф', 'Х': 'Х', 'Ц': 'Ц', 'Ч': 'Ч', 'Ш': 'Ш', 'Щ': 'Щ', 'Ъ': '', 'Ы': 'Ы', 'Ь': '',
    'Э': 'Э', 'Ю': 'Ю', 'Я': 'Я',
  };

  let processedTitle = title.toLowerCase();

  // Transliterate Cyrillic
  processedTitle = Array.from(processedTitle).map(char => cyrillicToLatinMap[char] || char).join('');

  return processedTitle
    .trim()
    .replace(/[\\s\\W_]+/g, "-") // Replace spaces, non-word chars (except -) with a single hyphen
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
};

export default function BlogForm({ initialData, baseUrl }: BlogFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState<BlogFormData>({
    slug: initialData?.slug || "",
    title: initialData?.title || "",
    date: initialData?.date || new Date().toISOString().split('T')[0], // Default to current date
    description: initialData?.description || "",
    articleBody: initialData?.articleBody || "",
    creationDate: initialData?.creationDate || new Date().toISOString(),
    updateDate: initialData?.updateDate || new Date().toISOString(),
    seoTitle: initialData?.seoTitle || "",
    seoDescription: initialData?.seoDescription || "",
    seoTags: initialData?.seoTags || "",
    canonicalUrl: initialData?.canonicalUrl || "",
    openGraphImage: initialData?.openGraphImage || "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSlugTouched, setIsSlugTouched] = useState(false);

  // States for image upload
  const [selectedFiles, setSelectedFiles] = useState<{ openGraphImage: File | null }>({ openGraphImage: null });
  const [uploading, setUploading] = useState<{ openGraphImage: boolean }>({ openGraphImage: false });
  const [uploadError, setUploadError] = useState<{ openGraphImage: string | null }>({ openGraphImage: null });

  // Реф для скрытого инпута файла для MDEditor
  const fileInputArticleBodyRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (initialData) {
        setFormData(prev => ({
            ...prev,
            slug: initialData.slug || "",
            title: initialData.title || "",
            date: initialData.date || new Date().toISOString().split('T')[0],
            description: initialData.description || "",
            articleBody: initialData.articleBody || "",
            creationDate: initialData.creationDate || new Date().toISOString(),
            updateDate: initialData.updateDate || new Date().toISOString(),
            seoTitle: initialData.seoTitle || "",
            seoDescription: initialData.seoDescription || "",
            seoTags: initialData.seoTags || "",
            canonicalUrl: initialData.canonicalUrl || "",
            openGraphImage: initialData.openGraphImage || "",
        }));
    }
    // Initialize isSlugTouched if a slug already exists (meaning it's an existing post)
    if (initialData?.slug) {
        setIsSlugTouched(true);
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    setFormData((prevFormData) => {
      let newFormData = { ...prevFormData, [name]: value };

      if (name === "slug") {
        setIsSlugTouched(true);
        newFormData.canonicalUrl = `${baseUrl}/blog/${value}`;
      } else if (name === "title" && !isSlugTouched) {
        const generatedSlug = generateSlug(value);
        newFormData.slug = generatedSlug;
        newFormData.canonicalUrl = `${baseUrl}/blog/${generatedSlug}`;
      }
      return newFormData;
    });
  };

  const handleRichTextChange = (field: "articleBody", value: string | undefined) => {
    setFormData(prev => ({ ...prev, [field]: value || "" }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: 'openGraphImage') => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFiles(prev => ({ ...prev, [field]: e.target.files![0] }));
      setUploadError(prev => ({ ...prev, [field]: null }));
    } else {
      setSelectedFiles(prev => ({ ...prev, [field]: null }));
    }
  };

  const handleUpload = async (field: 'openGraphImage') => {
    if (!selectedFiles[field]) {
      setUploadError(prev => ({ ...prev, [field]: "Пожалуйста, выберите файл для загрузки." }));
      return;
    }

    setUploading(prev => ({ ...prev, [field]: true }));
    setUploadError(prev => ({ ...prev, [field]: null }));

    const formDataToUpload = new FormData();
    formDataToUpload.append("file", selectedFiles[field]!);

    try {
      const response = await fetch("/api/admin/upload-image", {
        method: "POST",
        body: formDataToUpload,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Ошибка загрузки файла.");
      }

      const result = await response.json();
      setFormData(prev => ({ ...prev, [field]: result.url }));
      setSelectedFiles(prev => ({ ...prev, [field]: null })); // Clear selected file after successful upload
    } catch (err: any) {
      setUploadError(prev => ({ ...prev, [field]: err.message }));
    } finally {
      setUploading(prev => ({ ...prev, [field]: false }));
    }
  };

  const handleMDEditorImageUpload = async (file: File): Promise<string> => {
    const formDataToUpload = new FormData();
    formDataToUpload.append("file", file);

    try {
      const response = await fetch("/api/admin/upload-image", {
        method: "POST",
        body: formDataToUpload,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Ошибка загрузки файла.");
      }

      const result = await response.json();
      return result.url; // MDEditor expects the URL back
    } catch (err: any) {
      console.error("MDEditor image upload error:", err);
      alert(`Ошибка загрузки изображения: ${err.message}`);
      throw err; // Re-throw to indicate upload failure to MDEditor
    }
  };

  // Обработчик для выбора файла из скрытого инпута и вставки в MDEditor
  const handleArticleBodyImageSelected = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      try {
        const imageUrl = await handleMDEditorImageUpload(file);
        // Вставляем Markdown-синтаксис в текущее значение MDEditor
        setFormData(prev => ({
          ...prev,
          articleBody: `${prev.articleBody}\n![image](${imageUrl})\n`
        }));
        event.target.value = ''; // Очищаем input, чтобы можно было загрузить тот же файл снова
      } catch (uploadErr) {
        // Ошибка уже обработана в handleMDEditorImageUpload
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const dataToSubmit = {
        ...formData,
        updateDate: new Date().toISOString(), // Update updateDate on submission
    };

    try {
      const response = await fetch("/api/admin/blog", { // Target /api/admin/blog API route
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSubmit),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to save blog post.");
      }

      router.push("/admin/dashboard");
      router.refresh(); // Refresh the dashboard to show updated list
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && <div className="p-4 bg-red-100 text-red-700 rounded-md">{error}</div>}

      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">Заголовок</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>

      <div>
        <label htmlFor="slug" className="block text-sm font-medium text-gray-700">ЧПУ (URL)</label>
        <input
          type="text"
          id="slug"
          name="slug"
          value={formData.slug}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>

      <div>
        <label htmlFor="canonicalUrl" className="block text-sm font-medium text-gray-700">Canonical URL</label>
        <input
          type="text"
          id="canonicalUrl"
          name="canonicalUrl"
          value={formData.canonicalUrl}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>

      <div>
        <label htmlFor="date" className="block text-sm font-medium text-gray-700">Дата публикации</label>
        <input
          type="date"
          id="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Краткое описание</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>

      {/* Rich Text Editor for Article Body */}
      <div data-color-mode="light"> {/* MDEditor requires a color mode context */}
        <label htmlFor="articleBody" className="block text-sm font-medium text-gray-700 mb-1 mt-4">Тело статьи (Markdown)</label>
        <MDEditor
          value={formData.articleBody}
          onChange={(val) => handleRichTextChange("articleBody", val)}
          height={400}
        />
        <input
          type="file"
          accept="image/*"
          ref={fileInputArticleBodyRef}
          style={{ display: 'none' }}
          onChange={handleArticleBodyImageSelected}
        />
        <button
          type="button"
          onClick={() => fileInputArticleBodyRef.current?.click()}
          className="mt-2 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Загрузить изображение в статью
        </button>
      </div>
      
      {/* SEO Fields */}
      <h2 className="text-xl font-semibold mt-8 mb-4">SEO</h2>
      <div>
        <label htmlFor="seoTitle" className="block text-sm font-medium text-gray-700">SEO Заголовок</label>
        <input
          type="text"
          id="seoTitle"
          name="seoTitle"
          value={formData.seoTitle}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label htmlFor="seoDescription" className="block text-sm font-medium text-gray-700">SEO Описание</label>
        <textarea
          id="seoDescription"
          name="seoDescription"
          value={formData.seoDescription}
          onChange={handleChange}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label htmlFor="seoTags" className="block text-sm font-medium text-gray-700">SEO Теги (через запятую)</label>
        <input
          type="text"
          id="seoTags"
          name="seoTags"
          value={formData.seoTags}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label htmlFor="openGraphImage" className="block text-sm font-medium text-gray-700">Open Graph Изображение</label>
                  <input
                    type="text"
                    id="openGraphImage"
                    name="openGraphImage"
                    value={formData.openGraphImage}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                  <input
                    type="file"
                    id="uploadOpenGraphImage"
                    name="uploadOpenGraphImage"
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, 'openGraphImage')}
                    className="mt-2 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                  />
                  <button
                    type="button"
                    onClick={() => handleUpload('openGraphImage')}
                    disabled={uploading.openGraphImage || !selectedFiles.openGraphImage}
                    className="mt-2 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
                  >
                    {uploading.openGraphImage ? "Загрузка..." : "Загрузить Open Graph изображение"}
                  </button>
                  {uploadError.openGraphImage && <p className="text-red-500 text-sm mt-1">{uploadError.openGraphImage}</p>}
                </div>
        
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
