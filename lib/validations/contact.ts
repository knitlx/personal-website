import { z } from "zod";

export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, "Имя должно содержать минимум 2 символа")
    .max(100, "Имя не должно превышать 100 символов")
    .trim(),
  contact: z
    .string()
    .min(3, "Контактная информация должна содержать минимум 3 символа")
    .max(200, "Контактная информация не должна превышать 200 символов")
    .trim()
    .refine((val) => {
      // Проверка на telegram username или номер телефона
      const telegramRegex = /^@?[a-zA-Z0-9_]{5,32}$/;
      const phoneRegex =
        /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
      return telegramRegex.test(val) || phoneRegex.test(val);
    }, "Укажите корректный Telegram (@username) или номер телефона (+79991234567)"),
  message: z
    .string()
    .min(10, "Сообщение должно содержать минимум 10 символов")
    .max(5000, "Сообщение не должно превышать 5000 символов")
    .trim(),
  projectTitle: z.string().optional(),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
