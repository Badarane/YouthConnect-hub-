import api from "@/lib/api";
import { Document, PaginatedResponse } from "@/types";

export const resourcesService = {
  getAll: async (
    visibility?: string,
    category?: string
  ): Promise<PaginatedResponse<Document>> => {
    const response = await api.get("/documents", {
      params: { visibility, category },
    });
    return response.data;
  },

  upload: async (file: File, data: Partial<Document>): Promise<Document> => {
    const formData = new FormData();
    formData.append("file", file);
    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined) {
        formData.append(key, String(value));
      }
    });
    const response = await api.post("/documents", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/documents/${id}`);
  },

  download: async (id: string): Promise<void> => {
    const response = await api.get(`/documents/${id}/download`, {
      responseType: "blob",
    });
    return response.data;
  },
};

export const mockDocuments: Document[] = [
  {
    id: "1",
    title: "Règlement intérieur",
    description: "Document officiel du règlement de l'association",
    fileUrl: "/documents/reglement.pdf",
    fileType: "application/pdf",
    fileSize: 1024000,
    category: "Administration",
    visibility: "public",
    uploadedById: "1",
    uploadedBy: {
      id: "1",
      email: "admin@example.com",
      firstName: "Admin",
      lastName: "YouthConnect",
      role: "admin",
      isActive: true,
      createdAt: "2024-01-01",
      updatedAt: "2024-01-01",
    },
    downloads: 45,
    createdAt: "2024-01-05",
  },
  {
    id: "2",
    title: "Rapport financier 2023",
    description: "Bilan financier de l'année 2023",
    fileUrl: "/documents/rapport-financier-2023.xlsx",
    fileType: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    fileSize: 512000,
    category: "Finance",
    visibility: "membres",
    uploadedById: "2",
    uploadedBy: {
      id: "2",
      email: "tresorier@example.com",
      firstName: "Marie",
      lastName: "Dupont",
      role: "responsable",
      isActive: true,
      createdAt: "2024-01-01",
      updatedAt: "2024-01-01",
    },
    downloads: 23,
    createdAt: "2024-01-10",
  },
  {
    id: "3",
    title: "Guide du nouveau membre",
    description: "Tout ce qu'il faut savoir pour bien démarrer",
    fileUrl: "/documents/guide-membre.pdf",
    fileType: "application/pdf",
    fileSize: 2048000,
    category: "Formation",
    visibility: "public",
    uploadedById: "1",
    uploadedBy: {
      id: "1",
      email: "admin@example.com",
      firstName: "Admin",
      lastName: "YouthConnect",
      role: "admin",
      isActive: true,
      createdAt: "2024-01-01",
      updatedAt: "2024-01-01",
    },
    downloads: 89,
    createdAt: "2024-01-08",
  },
  {
    id: "4",
    title: "Photos événement janvier",
    description: "Album photo du concert de louange",
    fileUrl: "/documents/photos-janvier.zip",
    fileType: "application/zip",
    fileSize: 15728640,
    category: "Média",
    visibility: "membres",
    uploadedById: "3",
    uploadedBy: {
      id: "3",
      email: "media@example.com",
      firstName: "Paul",
      lastName: "Nkoulou",
      role: "membre",
      isActive: true,
      createdAt: "2024-01-01",
      updatedAt: "2024-01-01",
    },
    downloads: 34,
    createdAt: "2024-01-26",
  },
];

export const documentCategories = [
  "Administration",
  "Finance",
  "Formation",
  "Média",
  "Projets",
  "Autres",
];
