import api from "@/lib/api";
import { Event, PaginatedResponse } from "@/types";

export interface EventFilters {
  search?: string;
  startDate?: string;
  endDate?: string;
  page?: number;
  limit?: number;
}

export const eventsService = {
  getAll: async (filters: EventFilters = {}): Promise<PaginatedResponse<Event>> => {
    const response = await api.get("/events", { params: filters });
    return response.data;
  },

  getById: async (id: string): Promise<Event> => {
    const response = await api.get(`/events/${id}`);
    return response.data;
  },

  create: async (data: Partial<Event>): Promise<Event> => {
    const response = await api.post("/events", data);
    return response.data;
  },

  update: async (id: string, data: Partial<Event>): Promise<Event> => {
    const response = await api.patch(`/events/${id}`, data);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/events/${id}`);
  },

  confirmParticipation: async (eventId: string): Promise<void> => {
    await api.post(`/events/${eventId}/participate`);
  },

  addComment: async (eventId: string, content: string): Promise<void> => {
    await api.post(`/events/${eventId}/comments`, { content });
  },
};

export const mockEvents: Event[] = [
  {
    id: "1",
    title: "Réunion de prière",
    description: "Moment de prière et d'intercession pour notre communauté et notre nation. Venez nombreux pour ce temps fort de communion avec Dieu.",
    location: "Salle principale",
    startDate: "2024-01-20T18:00:00",
    endDate: "2024-01-20T20:00:00",
    image: "https://images.unsplash.com/photo-1507692049790-de58290a4334?w=800",
    createdById: "1",
    participants: [],
    comments: [],
    isPublic: true,
    createdAt: "2024-01-01",
    updatedAt: "2024-01-01",
  },
  {
    id: "2",
    title: "Concert de louange",
    description: "Grande soirée de louange et d'adoration avec des artistes invités. Une occasion unique de célébrer ensemble dans la joie.",
    location: "Auditorium",
    startDate: "2024-01-25T16:00:00",
    endDate: "2024-01-25T21:00:00",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800",
    createdById: "1",
    participants: [],
    comments: [],
    isPublic: true,
    createdAt: "2024-01-02",
    updatedAt: "2024-01-02",
  },
  {
    id: "3",
    title: "Formation leadership",
    description: "Session de formation intensive pour les leaders actuels et futurs. Thème: Développer son potentiel de leadership serviteur.",
    location: "Salle de conférence",
    startDate: "2024-02-01T09:00:00",
    endDate: "2024-02-01T17:00:00",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800",
    createdById: "2",
    participants: [],
    comments: [],
    isPublic: false,
    createdAt: "2024-01-05",
    updatedAt: "2024-01-05",
  },
];
