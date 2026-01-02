"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import BentoButton from "../../components/BentoButton";
import { API_ROUTES } from "@/lib/routes";
import Image from "next/image"; // Добавлен импорт Image

// --- Helper: Icon Components ---
const DownloadIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 mr-2"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
    />
  </svg>
);

const CloseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-4 w-4"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);

const EyeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 mr-2"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
    />
  </svg>
);

const PptxInstruction = () => (
  <div className="prose prose-sm max-w-none text-gray-600 bg-gray-50 p-4 rounded-lg border border-gray-200">
    <h4 className="text-gray-800 !mt-0">Ожидаемый формат HTML для PPTX</h4>
    <p>
      Конвертер ищет в коде блоки <code>&lt;div class="slide"&gt;</code>. Каждый
      такой блок будет преобразован в отдельный слайд-картинку в презентации.
    </p>
    <p>
      Все стили, необходимые для отображения слайдов, должны быть определены
      внутри тега <code>&lt;head&gt;</code> вашего HTML.
    </p>
    <pre>
      <code className="text-xs bg-gray-100 p-2 rounded-md block">
        {`<!DOCTYPE html>
<html>
<head>
  <style>
    .slide { background: #fff; }
    h1 { color: #333; }
  </style>
</head>
<body>
  <div class="slide"><h1>Слайд 1</h1></div>
  <div class="slide"><h1>Слайд 2</h1></div>
</body>
</html>`}
      </code>
    </pre>
  </div>
);

function DocumentConverter() {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState<"pdf" | "pptx">("pdf");
  const [htmlInput, setHtmlInput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // PDF specific state
  const [margins, setMargins] = useState({
    top: "10",
    right: "10",
    bottom: "10",
    left: "10",
  });
  const [marginUnit, setMarginUnit] = useState("mm");
  const [pdfPreviewUrl, setPdfPreviewUrl] = useState<string | null>(null);

  // PPTX specific state
  const [pptxPreviewImages, setPptxPreviewImages] = useState<string[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const tab = searchParams?.get("tab");
    if (tab === "pptx" || tab === "pdf") {
      setActiveTab(tab);
    }
  }, [searchParams]);

  const handleHtmlInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setHtmlInput(e.target.value);
  const handleMarginChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setMargins((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  const handleUnitChange = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setMarginUnit(e.target.value);

  // Общая функция для получения PDF
  const fetchPdf = async () => {
    if (!htmlInput.trim()) {
      setError("Пожалуйста, введите HTML-код для конвертации.");
      return null;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(API_ROUTES.CONVERT_HTML_TO_PDF, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          htmlContent: htmlInput,
          options: {
            margin: {
              top: `${margins.top}${marginUnit}`,
              right: `${margins.right}${marginUnit}`,
              bottom: `${margins.bottom}${marginUnit}`,
              left: `${margins.left}${marginUnit}`,
            },
          },
        }),
      });

      if (!res.ok)
        throw new Error((await res.json()).error ?? "Ошибка сервера");

      const blob = await res.blob();
      if (blob.size === 0) throw new Error("Сервер вернул пустой PDF.");

      return blob;
    } catch (err) {
      const error = err instanceof Error ? err.message : "Неизвестная ошибка";
      setError(error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const handlePdfPreview = async () => {
    // Очистка предыдущего preview
    if (pdfPreviewUrl) {
      URL.revokeObjectURL(pdfPreviewUrl);
      setPdfPreviewUrl(null);
    }

    const blob = await fetchPdf();
    if (blob) {
      setPdfPreviewUrl(URL.createObjectURL(blob) + "#navpanes=1&view=FitH");
    }
  };

  const handlePdfDownloadDirectly = async () => {
    const blob = await fetchPdf();
    if (blob) {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "converted.pdf";
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    }
  };

  const handleHtmlToPptxConvert = async () => {
    if (!htmlInput.trim())
      return setError("Пожалуйста, введите HTML-код для конвертации.");
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(API_ROUTES.CONVERT_TO_PPTX, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ htmlContent: htmlInput }),
      });
      if (!res.ok)
        throw new Error(
          (await res.json()).error ?? "Ошибка конвертации в PPTX.",
        );
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "converted.pptx";
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      const error = err instanceof Error ? err.message : "Неизвестная ошибка";
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const handlePptxPreview = async () => {
    if (!htmlInput.trim())
      return setError("Пожалуйста, введите HTML-код для конвертации.");
    setLoading(true);
    setError(null);
    setPptxPreviewImages([]);
    try {
      const res = await fetch(API_ROUTES.PREVIEW_PPTX, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ htmlContent: htmlInput }),
      });
      const data = await res.json();
      if (!res.ok)
        throw new Error(data.error ?? "Ошибка генерации предпросмотра PPTX.");
      if (!data.images || data.images.length === 0)
        throw new Error("Не найдено слайдов для предпросмотра.");
      setPptxPreviewImages(data.images);
      setCurrentSlide(0);
    } catch (err) {
      const error = err instanceof Error ? err.message : "Неизвестная ошибка";
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    return () => {
      if (pdfPreviewUrl) URL.revokeObjectURL(pdfPreviewUrl);
    };
  }, [pdfPreviewUrl]);

  const TabButton = ({
    tab,
    label,
  }: {
    tab: "pdf" | "pptx";
    label: string;
  }) => (
    <button
      onClick={() => {
        setActiveTab(tab);
        setError(null);
        setPptxPreviewImages([]);
        if (pdfPreviewUrl) URL.revokeObjectURL(pdfPreviewUrl);
        setPdfPreviewUrl(null);
      }}
      className={`relative px-4 py-2 text-base font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-color focus:ring-offset-2 focus:ring-offset-white ${
        activeTab === tab
          ? "text-primary-color font-semibold border-b-2 border-primary-color -mb-[2px]"
          : "text-gray-500 hover:text-gray-800"
      }`}
    >
      {label}
    </button>
  );

  const Input = (props: React.ComponentProps<"input">) => (
    <input
      {...props}
      className="w-full p-2 border border-gray-300 rounded-md bg-white text-gray-900 focus:ring-2 focus:ring-primary-color focus:border-primary-color outline-none transition-all duration-200"
    />
  );

  const Select = (props: React.ComponentProps<"select">) => (
    <select
      {...props}
      className="w-full p-2 border border-gray-300 rounded-md bg-white text-gray-900 focus:ring-2 focus:ring-primary-color focus:border-primary-color outline-none transition-all duration-200 h-[42px]"
    />
  );

  const Title = ({ children }: { children: React.ReactNode }) => (
    <h2 className="text-lg font-semibold text-gray-800 mb-3">{children}</h2>
  );

  return (
    <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex space-x-2 border-b border-gray-200 mb-8">
        <TabButton tab="pdf" label="PDF Конвертер" />
        <TabButton tab="pptx" label="PPTX Конвертер" />
      </div>

      {activeTab === "pdf" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full animate-fade-in">
          <div className="flex flex-col gap-6 col-span-1">
            <section>
              <Title>Вставьте HTML</Title>
              <textarea
                className="w-full p-3 border border-gray-300 rounded-md bg-white text-sm focus:ring-2 focus:ring-primary-color focus:border-primary-color outline-none transition-all duration-200 shadow-sm"
                rows={12}
                placeholder="Вставьте ваш HTML-код здесь..."
                value={htmlInput}
                onChange={handleHtmlInputChange}
                disabled={loading}
              />
            </section>
            <section>
              <Title>Отступы</Title>
              <div className="grid grid-cols-5 gap-3">
                <div className="flex flex-col gap-1">
                  <label
                    htmlFor="top"
                    className="text-xs font-medium text-gray-600"
                  >
                    Верх
                  </label>
                  <Input
                    type="number"
                    name="top"
                    value={margins.top}
                    onChange={handleMarginChange}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label
                    htmlFor="right"
                    className="text-xs font-medium text-gray-600"
                  >
                    Право
                  </label>
                  <Input
                    type="number"
                    name="right"
                    value={margins.right}
                    onChange={handleMarginChange}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label
                    htmlFor="bottom"
                    className="text-xs font-medium text-gray-600"
                  >
                    Низ
                  </label>
                  <Input
                    type="number"
                    name="bottom"
                    value={margins.bottom}
                    onChange={handleMarginChange}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label
                    htmlFor="left"
                    className="text-xs font-medium text-gray-600"
                  >
                    Лево
                  </label>
                  <Input
                    type="number"
                    name="left"
                    value={margins.left}
                    onChange={handleMarginChange}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label
                    htmlFor="unit"
                    className="text-xs font-medium text-gray-600"
                  >
                    Ед.
                  </label>
                  <Select
                    name="unit"
                    value={marginUnit}
                    onChange={handleUnitChange}
                  >
                    <option value="mm">mm</option>
                    <option value="cm">cm</option>
                    <option value="in">in</option>
                    <option value="px">px</option>
                  </Select>
                </div>
              </div>
            </section>
            <section className="flex items-center gap-4">
              <BentoButton
                onClick={handlePdfPreview}
                variant="outline"
                size="small"
                className="min-w-[180px] w-full"
              >
                <EyeIcon />
                {loading ? "Обработка..." : "Предпросмотр"}
              </BentoButton>
              <BentoButton
                onClick={handlePdfDownloadDirectly}
                variant="primary"
                size="small"
                className="min-w-[180px] w-full"
              >
                <DownloadIcon />
                {loading ? "Обработка..." : "Скачать"}
              </BentoButton>
            </section>
          </div>
          <div className="flex flex-col gap-4 w-full col-span-1 lg:col-span-2">
            <Title>Предпросмотр</Title>
            <div className="w-full h-[60vh] min-h-[500px] lg:h-[80vh] border border-gray-200 rounded-lg flex items-center justify-center bg-gray-50 shadow-inner overflow-hidden">
              {loading && (
                <div className="text-gray-500">Загрузка предпросмотра...</div>
              )}
              {error && !pdfPreviewUrl && (
                <div className="text-red-500 text-sm p-4">{error}</div>
              )}
              {pdfPreviewUrl && !error && (
                <iframe
                  src={pdfPreviewUrl}
                  className="w-full h-full"
                  title="PDF Preview"
                />
              )}
              {!loading && !error && !pdfPreviewUrl && (
                <div className="text-gray-400">
                  Здесь появится предпросмотр PDF
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {activeTab === "pptx" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full animate-fade-in">
          <div className="flex flex-col gap-6">
            <section>
              <Title>Вставьте HTML</Title>
              <textarea
                className="w-full p-3 border border-gray-300 rounded-md bg-white text-sm focus:ring-2 focus:ring-primary-color focus:border-primary-color outline-none transition-all duration-200 shadow-sm"
                rows={8}
                placeholder="Вставьте ваш HTML-код здесь..."
                value={htmlInput}
                onChange={handleHtmlInputChange}
                disabled={loading}
              />
            </section>
            <section className="flex items-center gap-4">
              <BentoButton
                onClick={handlePptxPreview}
                variant="outline"
                size="small"
                className="min-w-[180px] w-full"
              >
                <EyeIcon />
                {loading ? "Обработка..." : "Предпросмотр"}
              </BentoButton>
              <BentoButton
                onClick={handleHtmlToPptxConvert}
                variant="primary"
                size="small"
                className="min-w-[180px] w-full"
              >
                <DownloadIcon />
                {loading ? "Обработка..." : "Скачать"}
              </BentoButton>
            </section>
            <section>
              <Title>Инструкция</Title>
              <PptxInstruction />
            </section>
          </div>
          <div className="flex flex-col gap-4 w-full">
            <Title>Предпросмотр PPTX</Title>
            <div className="w-full min-h-[400px] lg:h-full border border-gray-200 rounded-lg flex items-center justify-center bg-gray-50 shadow-inner overflow-hidden relative">
              {loading && (
                <div className="text-gray-500">Загрузка предпросмотра...</div>
              )}
              {error && pptxPreviewImages.length === 0 && (
                <div className="text-red-500 text-sm p-4">{error}</div>
              )}
              {pptxPreviewImages.length > 0 && !error && (
                <div className="w-full h-full flex flex-col items-center justify-center p-4 relative">
                  <div className="relative w-full h-full flex items-center justify-center">
                    <Image
                      src={pptxPreviewImages[currentSlide]}
                      alt={`Slide ${currentSlide + 1}`}
                      fill
                      sizes="100vw"
                      style={{ objectFit: "contain" }}
                      className="rounded-md shadow-md"
                    />
                  </div>
                  <div className="absolute top-2 right-2 flex items-center gap-2">
                    <span className="text-xs font-semibold text-gray-700 bg-white/70 backdrop-blur-sm rounded-full px-2 py-1">
                      {currentSlide + 1} / {pptxPreviewImages.length}
                    </span>
                    <button
                      onClick={() => setPptxPreviewImages([])}
                      className="p-1.5 rounded-full bg-black/40 hover:bg-black/60 text-white transition-colors"
                    >
                      <CloseIcon />
                    </button>
                  </div>
                  {currentSlide > 0 && (
                    <button
                      onClick={() => setCurrentSlide((s) => s - 1)}
                      className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/30 hover:bg-black/50 text-white transition-colors"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 19l-7-7 7-7"
                        />
                      </svg>
                    </button>
                  )}
                  {currentSlide < pptxPreviewImages.length - 1 && (
                    <button
                      onClick={() => setCurrentSlide((s) => s + 1)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/30 hover:bg-black/50 text-white transition-colors"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </button>
                  )}
                </div>
              )}
              {!loading && !error && pptxPreviewImages.length === 0 && (
                <div className="text-gray-400">
                  Здесь появится предпросмотр PPTX
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div>Загрузка...</div>}>
      <DocumentConverter />
    </Suspense>
  );
}
