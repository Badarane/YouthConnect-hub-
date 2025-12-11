import api from "@/lib/api";
import { Member, PaginatedResponse } from "@/types";

export interface MemberFilters {
  search?: string;
  role?: string;
  groupId?: string;
  status?: string;
  page?: number;
  limit?: number;
}

export const membersService = {
  getAll: async (filters: MemberFilters = {}): Promise<PaginatedResponse<Member>> => {
    const response = await api.get("/members", { params: filters });
    return response.data;
  },

  getById: async (id: string): Promise<Member> => {
    const response = await api.get(`/members/${id}`);
    return response.data;
  },

  create: async (data: Partial<Member>): Promise<Member> => {
    const response = await api.post("/members", data);
    return response.data;
  },

  update: async (id: string, data: Partial<Member>): Promise<Member> => {
    const response = await api.patch(`/members/${id}`, data);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/members/${id}`);
  },

  uploadAvatar: async (id: string, file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("avatar", file);
    const response = await api.post(`/members/${id}/avatar`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data.url;
  },
};

export const mockMembers: Member[] = [
  {
    id: "1",
    email: "marie.dupont@email.com",
    firstName: "Marie",
    lastName: "Dupont",
    phone: "+237 699 123 456",
    role: "membre",
    isActive: true,
    joinDate: "2023-06-15",
    address: "Yaoundé, Cameroun",
    birthDate: "1995-03-20",
    profession: "Enseignante",
    cotisations: [],
    createdAt: "2023-06-15",
    updatedAt: "2024-01-10",
  },
  {
    id: "2",
    email: "jean.kamga@email.com",
    firstName: "Jean",
    lastName: "Kamga",
    phone: "+237 677 456 789",
    role: "responsable",
    isActive: true,
    joinDate: "2022-01-10",
    address: "Douala, Cameroun",
    birthDate: "1990-07-12",
    profession: "Ingénieur",
    cotisations: [],
    createdAt: "2022-01-10",
    updatedAt: "2024-01-08",
  },
  {
    id: "3",
    email: "paul.nkoulou@email.com",
    firstName: "Paul",
    lastName: "Nkoulou",
    phone: "+237 655 789 012",
    role: "admin",
    isActive: true,
    joinDate: "2021-03-05",
    address: "Bafoussam, Cameroun",
    birthDate: "1988-11-30",
    profession: "Pasteur",
    cotisations: [],
    createdAt: "2021-03-05",
    updatedAt: "2024-01-12",
  },
  {
    id: "4",
    email: "sarah.ngono@email.com",
    firstName: "Sarah",
    lastName: "Ngono",
    phone: "+237 690 234 567",
    role: "membre",
    isActive: false,
    joinDate: "2023-09-20",
    address: "Kribi, Cameroun",
    birthDate: "1998-05-15",
    profession: "Étudiante",
    cotisations: [],
    createdAt: "2023-09-20",
    updatedAt: "2024-01-05",
  },
];
