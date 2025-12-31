interface ImageUploadFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onUpload: () => void;
  onSelectFromGallery: () => void;
  previewUrl: string | null;
  error?: string;
  uploadError?: string | null;
  isUploading: boolean;
  hasFile: boolean;
  previewWidth?: number;
  previewHeight?: number;
  previewLabel?: string;
}

export default function ImageUploadField({
  id,
  label,
  value,
  onChange,
  onFileChange,
  onUpload,
  onSelectFromGallery,
  previewUrl,
  error,
  uploadError,
  isUploading,
  hasFile,
  previewWidth = 120,
  previewHeight = 63,
  previewLabel,
}: ImageUploadFieldProps) {
  const uploadInputId = `upload${id.charAt(0).toUpperCase() + id.slice(1)}`;

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        type="text"
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
      />
      <div className="flex flex-col space-y-2 mt-2 w-fit">
        <div className="flex items-center space-x-2">
          <label
            htmlFor={uploadInputId}
            className="inline-flex justify-start py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer w-auto"
          >
            Выбрать файл
            <input
              type="file"
              id={uploadInputId}
              name={uploadInputId}
              accept="image/*"
              onChange={onFileChange}
              className="hidden"
            />
          </label>
          <button
            type="button"
            onClick={onUpload}
            disabled={isUploading || !hasFile}
            className={`inline-flex justify-start py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 ${
              isUploading || !hasFile
                ? "cursor-pointer"
                : "disabled:cursor-not-allowed"
            }`}
          >
            {isUploading ? "Загрузка..." : "Загрузить"}
          </button>
        </div>
        <button
          type="button"
          onClick={onSelectFromGallery}
          className="inline-flex justify-start py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 w-auto cursor-pointer"
        >
          Выбрать из галереи
        </button>
      </div>
      {uploadError && (
        <p className="text-red-500 text-sm mt-1">{uploadError}</p>
      )}
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      {previewUrl && (
        <div className="mt-2">
          <p className="text-sm font-medium text-gray-700">
            {previewLabel || "Предпросмотр:"}
          </p>
          <img
            src={previewUrl}
            alt="Preview"
            width={previewWidth}
            height={previewHeight}
            className="rounded-md object-cover border border-gray-200"
          />
        </div>
      )}
    </div>
  );
}
