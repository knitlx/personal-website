// Allowed file extensions for uploads
export const ALLOWED_EXTENSIONS = [
  // Images
  ".jpg",
  ".jpeg",
  ".png",
  ".gif",
  ".webp",
  ".svg",
  ".heic",
  ".bmp",
  // Documents
  ".pdf",
  ".doc",
  ".docx",
  ".xls",
  ".xlsx",
  ".ppt",
  ".pptx",
  ".txt",
  ".rtf",
  ".pages",
  ".numbers",
  ".key",
  // Archives
  ".zip",
  ".rar",
  ".7z",
];

export const ALLOWED_IMAGE_EXTENSIONS = [
  ".jpg",
  ".jpeg",
  ".png",
  ".gif",
  ".webp",
  ".svg",
  ".heic",
  ".bmp",
];

export const ALLOWED_DOCUMENT_EXTENSIONS = [
  ".pdf",
  ".doc",
  ".docx",
  ".xls",
  ".xlsx",
  ".ppt",
  ".pptx",
  ".txt",
  ".rtf",
];

// File size limits (in bytes)
export const FILE_SIZE_LIMITS = {
  MAX_IMAGE_SIZE: 5 * 1024 * 1024, // 5MB
  MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
};

/**
 * Check if file extension is allowed
 */
export function isAllowedExtension(filename: string): boolean {
  const ext = filename.substring(filename.lastIndexOf(".")).toLowerCase();
  return ALLOWED_EXTENSIONS.includes(ext);
}

/**
 * Check if file size is within limits
 */
export function isValidFileSize(size: number, maxSize?: number): boolean {
  const limit = maxSize || FILE_SIZE_LIMITS.MAX_FILE_SIZE;
  return size <= limit;
}
