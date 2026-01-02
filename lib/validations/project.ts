import { z } from "zod";

export const projectSchema = z.object({
  slug: z
    .string()
    .min(1, "Slug обязателен")
    .max(200, "Slug слишком длинный")
    .regex(
      /^[a-z0-9-]+$/,
      "Slug может содержать только строчные буквы, цифры и дефисы",
    )
    .trim(),
  title: z
    .string()
    .min(3, "Название должно содержать минимум 3 символа")
    .max(300, "Название не должно превышать 300 символов")
    .trim(),
  shortDescriptionHomepage: z
    .string()
    .min(10, "Описание должно содержать минимум 10 символов")
    .max(300, "Описание не должно превышать 300 символов")
    .trim(),
  shortDescriptionProjectsPage: z
    .string()
    .min(10, "Описание должно содержать минимум 10 символов")
    .max(300, "Описание не должно превышать 300 символов")
    .trim(),
  projectIcon: z
    .string()
    .optional()
    .refine((value) => {
      if (!value) return true; // Разрешить пустые строки
      return value.startsWith("/") || z.string().url().safeParse(value).success;
    }, "Неверный формат URL для иконки проекта. Используйте полный URL (http/https) или относительный путь (начинающийся с /)."),
  trylink: z
    .string()
    .optional()
    .refine((value) => {
      if (!value) return true; // Разрешить пустые строки
      return value.startsWith("/") || z.string().url().safeParse(value).success;
    }, "Неверный формат ссылки для кнопки 'Попробовать'. Используйте полный URL (http/https) или относительный путь (начинающийся с /)."),
  introDescription: z.string().trim(),
  fullDescription: z.string().trim(),
  creationDate: z.string().optional(),
  updateDate: z.string().optional(),
  seoTitle: z.string().max(300, "SEO заголовок слишком длинный").optional(),
  seoDescription: z
    .string()
    .max(500, "SEO описание слишком длинное")
    .optional(),
  seoTags: z.string().max(500, "SEO теги слишком длинные").optional(),
  canonicalUrl: z.string().optional(),
  openGraphImage: z
    .string()
    .optional()
    .refine((value) => {
      if (!value) return true; // Разрешить пустые строки
      return value.startsWith("/") || z.string().url().safeParse(value).success;
    }, "Неверный формат URL для Open Graph изображения. Используйте полный URL (http/https) или относительный путь (начинающийся с /)."),
  schemaType: z.string().optional(),
  sortOrder: z.coerce.number().optional(),
});

export type ProjectData = z.infer<typeof projectSchema>;
