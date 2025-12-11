import { z } from "zod";

export const memberSchema = z.object({
  firstName: z.string().min(2, "Le prénom doit contenir au moins 2 caractères"),
  lastName: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  email: z.string().email("Email invalide"),
  phone: z.string().optional(),
  role: z.enum(["admin", "responsable", "membre"]),
  address: z.string().optional(),
  birthDate: z.string().optional(),
  profession: z.string().optional(),
  groupId: z.string().optional(),
});

export type MemberFormData = z.infer<typeof memberSchema>;
