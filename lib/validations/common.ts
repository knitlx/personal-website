import { z } from "zod";

// Common schema for DELETE operations (only requires slug)
export const deleteSchema = z.object({
  slug: z.string().min(1, "Slug обязателен").trim(),
});
