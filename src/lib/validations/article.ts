import { z } from "zod";

export const articleSchema = z.object({
  title: z.string().min(5, "Le titre doit contenir au moins 5 caractères"),
  content: z.string().min(50, "Le contenu doit contenir au moins 50 caractères"),
  excerpt: z.string().optional(),
  category: z.enum(["article", "communique", "compte-rendu"]),
  isPublished: z.boolean(),
});

export type ArticleFormData = z.infer<typeof articleSchema>;
