import api from "@/lib/api";
import { Cotisation, CotisationCategory, PaginatedResponse } from "@/types";

export const cotisationsService = {
  getAll: async (): Promise<PaginatedResponse<Cotisation>> => {
    const response = await api.get("/cotisations");
    return response.data;
  },

  getCategories: async (): Promise<CotisationCategory[]> => {
    const response = await api.get("/cotisations/categories");
    return response.data;
  },

  create: async (data: Partial<Cotisation>): Promise<Cotisation> => {
    const response = await api.post("/cotisations", data);
    return response.data;
  },

  markAsPaid: async (id: string, paymentMethod?: string): Promise<Cotisation> => {
    const response = await api.patch(`/cotisations/${id}/pay`, { paymentMethod });
    return response.data;
  },

  createCategory: async (data: Partial<CotisationCategory>): Promise<CotisationCategory> => {
    const response = await api.post("/cotisations/categories", data);
    return response.data;
  },

  exportExcel: async (): Promise<Blob> => {
    const response = await api.get("/cotisations/export", {
      responseType: "blob",
    });
    return response.data;
  },
};

export const mockCategories: CotisationCategory[] = [
  {
    id: "1",
    name: "Cotisation mensuelle",
    type: "mensuelle",
    amount: 15000,
    description: "Cotisation mensuelle standard",
    isActive: true,
  },
  {
    id: "2",
    name: "Cotisation annuelle",
    type: "annuelle",
    amount: 150000,
    description: "Cotisation annuelle avec réduction",
    isActive: true,
  },
  {
    id: "3",
    name: "Contribution spéciale",
    type: "speciale",
    amount: 50000,
    description: "Pour les projets spéciaux",
    isActive: true,
  },
];

export const mockCotisations: Cotisation[] = [
  {
    id: "1",
    memberId: "1",
    categoryId: "1",
    amount: 15000,
    dueDate: "2024-01-15",
    paidDate: "2024-01-10",
    status: "paid",
    paymentMethod: "Mobile Money",
    createdAt: "2024-01-01",
  },
  {
    id: "2",
    memberId: "2",
    categoryId: "1",
    amount: 15000,
    dueDate: "2024-01-15",
    status: "pending",
    createdAt: "2024-01-01",
  },
  {
    id: "3",
    memberId: "3",
    categoryId: "1",
    amount: 15000,
    dueDate: "2024-01-15",
    status: "overdue",
    createdAt: "2024-01-01",
  },
  {
    id: "4",
    memberId: "1",
    categoryId: "2",
    amount: 150000,
    dueDate: "2024-06-01",
    status: "pending",
    createdAt: "2024-01-05",
  },
];
