import { z } from "zod";

export const blogPostSchema = z.object({
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
    .min(3, "Заголовок должен содержать минимум 3 символа")
    .max(300, "Заголовок не должен превышать 300 символов")
    .trim(),
  date: z
    .string()
    .regex(
      /^\d{4}-\d{2}-\d{2}$/,
      "Неверный формат даты. Используйте YYYY-MM-DD",
    ),
  description: z
    .string()
    .min(10, "Описание должно содержать минимум 10 символов")
    .max(500, "Описание не должно превышать 500 символов")
    .trim(),
  articleBody: z
    .string()
    .min(10, "Статья должна содержать минимум 10 символов")
    .trim(),
  creationDate: z.string().optional(),
  updateDate: z.string().optional(),
  seoTitle: z.string().max(300, "SEO заголовок слишком длинный").optional(),
  seoDescription: z
    .string()
    .max(500, "SEO описание слишком длинное")
    .optional(),
  seoTags: z.string().max(500, "SEO теги слишком длинные").optional(),
  canonicalUrl: z.string().optional(),
  openGraphImage: z.string().optional(),
  sortOrder: z.coerce.number().optional(),
  tags: z.string().optional(),
});

export type BlogPostData = z.infer<typeof blogPostSchema>;
