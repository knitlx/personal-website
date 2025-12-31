// Image sizes
export const IMAGE_SIZES = {
  SMALL: 40,
  MEDIUM: 50,
  LARGE: 64,
  EXTRA_LARGE: 70,
  ICON: 42,
} as const;

// Editor heights
export const EDITOR_HEIGHTS = {
  SHORT: 200,
  TALL: 400,
} as const;

// Pagination
export const PAGINATION = {
  PROJECTS_PER_PAGE: 3,
  BLOG_POSTS_PER_PAGE: 5,
  PROJECTS_GRID_PER_PAGE: 6,
} as const;

// File size limits (in bytes)
export const FILE_SIZE_LIMITS = {
  MAX_IMAGE_SIZE: 5 * 1024 * 1024, // 5MB
  MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
} as const;

// Text limits
export const TEXT_LIMITS = {
  MIN_NAME_LENGTH: 2,
  MAX_NAME_LENGTH: 100,
  MIN_MESSAGE_LENGTH: 10,
  MAX_MESSAGE_LENGTH: 5000,
  MIN_SHORT_DESCRIPTION_LENGTH: 10,
} as const;

// Intersection Observer options
export const INTERSECTION_OBSERVER = {
  ROOT_MARGIN: "200px",
  THRESHOLD: 0.1,
} as const;

// MDEditor heights
export const MD_EDITOR_HEIGHT = {
  INTRO: EDITOR_HEIGHTS.SHORT,
  FULL: EDITOR_HEIGHTS.TALL,
} as const;

// Image preview sizes
export const PREVIEW_SIZES = {
  PROJECT_ICON: { width: 64, height: 64 },
  SMALL_ICON: { width: 40, height: 40 },
  FEATURE_ICON: { width: 50, height: 50 },
  WHAT_I_DO_ICON: { width: 42, height: 42 },
  AI_FEATURE_ICON: { width: 70, height: 70 },
} as const;
