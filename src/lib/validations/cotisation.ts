import { z } from "zod";

export const cotisationSchema = z.object({
  memberId: z.string().min(1, "Le membre est requis"),
  categoryId: z.string().min(1, "La catégorie est requise"),
  amount: z.number().min(1, "Le montant doit être supérieur à 0"),
  dueDate: z.string().min(1, "La date d'échéance est requise"),
});

export const categorySchema = z.object({
  name: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  type: z.enum(["mensuelle", "annuelle", "speciale"]),
  amount: z.number().min(1, "Le montant doit être supérieur à 0"),
  description: z.string().optional(),
});

export const paymentSchema = z.object({
  paymentMethod: z.string().optional(),
});

export type CotisationFormData = z.infer<typeof cotisationSchema>;
export type CategoryFormData = z.infer<typeof categorySchema>;
export type PaymentFormData = z.infer<typeof paymentSchema>;
