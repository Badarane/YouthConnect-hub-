import { z } from "zod";

export const eventSchema = z.object({
  title: z.string().min(3, "Le titre doit contenir au moins 3 caractères"),
  description: z.string().min(10, "La description doit contenir au moins 10 caractères"),
  location: z.string().min(2, "Le lieu est requis"),
  startDate: z.string().min(1, "La date de début est requise"),
  endDate: z.string().min(1, "La date de fin est requise"),
  isPublic: z.boolean(),
});

export const commentSchema = z.object({
  content: z.string().min(1, "Le commentaire ne peut pas être vide"),
});

export type EventFormData = z.infer<typeof eventSchema>;
export type CommentFormData = z.infer<typeof commentSchema>;
