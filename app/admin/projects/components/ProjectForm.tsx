"use client"

import { useState, useEffect, useRef } from "react"
import dynamic from "next/dynamic"
import { useRouter } from "next/navigation"

// Dynamically import MDEditor to ensure it's client-side rendered
const MDEditor = dynamic(
  () => import("@uiw/react-md-editor"),
  { ssr: false }
);

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
}

interface ProjectFormProps {
  initialData?: Partial<ProjectFormData> & { content?: string };
  baseUrl: string; // Add baseUrl prop
}

// Function-helper for slug generation (remains unchanged)
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
    .replace(/[\\s]+/g, "-") // Replaces spaces with hyphens
    .replace(/[^\\w\-]+/g, ""); // Removes non-word characters
};

export default function ProjectForm({ initialData, baseUrl }: ProjectFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState<ProjectFormData>({
    slug: initialData?.slug || "",
    title: initialData?.title || "",
    shortDescriptionHomepage: initialData?.shortDescriptionHomepage || "",
    shortDescriptionProjectsPage: initialData?.shortDescriptionProjectsPage || "",
    projectIcon: initialData?.projectIcon || "",
    trylink: initialData?.trylink || "",
    introDescription: "", // Will be parsed from content
    fullDescription: "", // Will be parsed from content
    creationDate: initialData?.creationDate || "",
    updateDate: initialData?.updateDate || "",
    seoTitle: initialData?.seoTitle || "",
    seoDescription: initialData?.seoDescription || "",
    seoTags: initialData?.seoTags || "",
    canonicalUrl: initialData?.canonicalUrl || "",
    openGraphImage: initialData?.openGraphImage || "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSlugTouched, setIsSlugTouched] = useState(false); // New state

  // Separate state for rich-text content to handle its parsing from initialData.content
  const [richTextContent, setRichTextContent] = useState({
    introDescription: initialData?.introDescription || "",
    fullDescription: initialData?.fullDescription || ""
  });

  // States for image upload
  const [selectedFiles, setSelectedFiles] = useState<{ projectIcon: File | null; openGraphImage: File | null }>({
    projectIcon: null,
    openGraphImage: null,
  });
  const [uploading, setUploading] = useState<{ projectIcon: boolean; openGraphImage: boolean }> ({
    projectIcon: false,
    openGraphImage: false,
  });
  const [uploadError, setUploadError] = useState<{ projectIcon: string | null; openGraphImage: string | null }> ({
    projectIcon: null,
    openGraphImage: null,
  });

  // Рефы для скрытых инпутов файлов для MDEditor
  const fileInputIntroRef = useRef<HTMLInputElement>(null);
  const fileInputFullRef = useRef<HTMLInputElement>(null);


  useEffect(() => {
    if (initialData) {
        setFormData(prev => ({
            ...prev,
            slug: initialData.slug || "",
            title: initialData.title || "",
            shortDescriptionHomepage: initialData.shortDescriptionHomepage || "",
            shortDescriptionProjectsPage: initialData.shortDescriptionProjectsPage || "",
            projectIcon: initialData.projectIcon || "",
            trylink: initialData.trylink || "",
            creationDate: initialData.creationDate || "",
            updateDate: initialData.updateDate || "",
            seoTitle: initialData.seoTitle || "",
            seoDescription: initialData.seoDescription || "",
            seoTags: initialData.seoTags || "",
            canonicalUrl: initialData.canonicalUrl || "",
            openGraphImage: initialData.openGraphImage || "",
        }));
        setRichTextContent({
            introDescription: initialData.introDescription || "",
            fullDescription: initialData.fullDescription || ""
        });
    }
    // Initialize isSlugTouched if a slug already exists (meaning it's an existing project)
    if (initialData?.slug) {
        setIsSlugTouched(true);
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    if (name === "slug") {
      setIsSlugTouched(true); // User manually edited the slug
      setFormData((prev) => ({ ...prev, [name]: value, canonicalUrl: `/projects/${value}` }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    // Auto-generate slug and canonicalUrl if title changes AND slug hasn't been touched manually
    if (name === "title" && !isSlugTouched) {
      const generatedSlug = generateSlug(value);
      setFormData((prev) => ({
        ...prev,
        slug: generatedSlug,
        canonicalUrl: `${baseUrl}/projects/${generatedSlug}`,
      }));
    }
  };

  const handleRichTextChange = (field: "introDescription" | "fullDescription", value: string | undefined) => {
    setRichTextContent(prev => ({ ...prev, [field]: value || "" }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: 'projectIcon' | 'openGraphImage') => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFiles(prev => ({ ...prev, [field]: e.target.files![0] }));
      setUploadError(prev => ({ ...prev, [field]: null }));
    } else {
      setSelectedFiles(prev => ({ ...prev, [field]: null }));
    }
  };

  const handleUpload = async (field: 'projectIcon' | 'openGraphImage') => {
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
  const handleImageSelected = async (event: React.ChangeEvent<HTMLInputElement>, field: "introDescription" | "fullDescription") => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      try {
        const imageUrl = await handleMDEditorImageUpload(file);
        // Вставляем Markdown-синтаксис в текущее значение MDEditor
        setRichTextContent(prev => ({
          ...prev,
          [field]: `${prev[field]}\n![image](${imageUrl})\n`
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

    // Combine richTextContent back into formData for submission
    const dataToSubmit = {
        ...formData,
        introDescription: richTextContent.introDescription,
        fullDescription: richTextContent.fullDescription,
        // Update updateDate on submission
        updateDate: new Date().toISOString(),
    };

    try {
      const response = await fetch("/api/admin/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSubmit),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to save project.");
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
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">Название</label>
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
        <label htmlFor="projectIcon" className="block text-sm font-medium text-gray-700">Иконка проекта (путь)</label>
                  <input
                    type="text"
                    id="projectIcon"
                    name="projectIcon"
                    value={formData.projectIcon}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                  <input
                    type="file"
                    id="uploadProjectIcon"
                    name="uploadProjectIcon"
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, 'projectIcon')}
                    className="mt-2 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                  />
                  <button
                    type="button"
                    onClick={() => handleUpload('projectIcon')}
                    disabled={uploading.projectIcon || !selectedFiles.projectIcon}
                    className="mt-2 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
                  >
                    {uploading.projectIcon ? "Загрузка..." : "Загрузить иконку"}
                  </button>
                  {uploadError.projectIcon && <p className="text-red-500 text-sm mt-1">{uploadError.projectIcon}</p>}
                </div>
        
                <div>
                  <label htmlFor="trylink" className="block text-sm font-medium text-gray-700">Ссылка для кнопки 'Попробовать'</label>
                  <input
                    type="text"
                    id="trylink"
                    name="trylink"
                    value={formData.trylink}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
        
                <div>
                  <label htmlFor="shortDescriptionHomepage" className="block text-sm font-medium text-gray-700">Краткое описание для главной страницы</label>
                  <textarea
                    id="shortDescriptionHomepage"
                    name="shortDescriptionHomepage"
                    value={formData.shortDescriptionHomepage}
                    onChange={handleChange}
                    rows={3}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
        
                <div>
                  <label htmlFor="shortDescriptionProjectsPage" className="block text-sm font-medium text-gray-700">Краткое описание для страницы проектов</label>
                  <textarea
                    id="shortDescriptionProjectsPage"
                    name="shortDescriptionProjectsPage"
                    value={formData.shortDescriptionProjectsPage}
                    onChange={handleChange}
                    rows={3}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
        
                {/* Rich Text Editor for Intro Description */}
                <div data-color-mode="light"> {/* MDEditor requires a color mode context */}
                  <label htmlFor="introDescription" className="block text-sm font-medium text-gray-700 mb-1">Вводный абзац для подробной страницы проекта (Markdown)</label>
                  <MDEditor
                    value={richTextContent.introDescription}
                    onChange={(val) => handleRichTextChange("introDescription", val)}
                    height={200}
                  />
                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputIntroRef}
                    style={{ display: 'none' }}
                    onChange={(e) => handleImageSelected(e, "introDescription")}
                  />
                  <button
                    type="button"
                    onClick={() => fileInputIntroRef.current?.click()}
                    className="mt-2 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Загрузить изображение в описание
                  </button>
                </div>
        
                {/* Rich Text Editor for Full Description */}
                <div data-color-mode="light"> {/* MDEditor requires a color mode context */}
                  <label htmlFor="fullDescription" className="block text-sm font-medium text-gray-700 mb-1 mt-4">Подробное описание проекта (Markdown)</label>
                  <MDEditor
                    value={richTextContent.fullDescription}
                    onChange={(val) => handleRichTextChange("fullDescription", val)}
                    height={400}
                  />
                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputFullRef}
                    style={{ display: 'none' }}
                    onChange={(e) => handleImageSelected(e, "fullDescription")}
                  />
                  <button
                    type="button"
                    onClick={() => fileInputFullRef.current?.click()}
                    className="mt-2 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Загрузить изображение в полное описание
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
                  {loading ? "Сохранение..." : "Сохранить проект"}
                </button>
              </form>
            );
          }
          