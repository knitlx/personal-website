import { ReactNode } from "react";

// Common component props
export interface BaseComponentProps {
  className?: string;
  children?: ReactNode;
}

// Form field props
export interface FieldProps {
  id: string;
  name: string;
  label?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
}

// API response types
export interface ApiResponse<T = unknown> {
  message: string;
  data?: T;
  errors?: Array<{
    field: string;
    message: string;
  }>;
}

export interface ApiError {
  message: string;
  errors?: Array<{
    field: string;
    message: string;
  }>;
}

// Image types
export interface ImageData {
  url: string;
  alt?: string;
  width?: number;
  height?: number;
}

// SEO types
export interface SeoData {
  title?: string;
  description?: string;
  tags?: string;
  canonicalUrl?: string;
  openGraphImage?: string;
}
