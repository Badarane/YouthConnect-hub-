import api from "@/lib/api";
import { DashboardStats } from "@/types";

export const dashboardService = {
  getStats: async (): Promise<DashboardStats> => {
    const response = await api.get("/dashboard/stats");
    return response.data;
  },
};

export const mockDashboardStats: DashboardStats = {
  totalMembers: 156,
  activeMembers: 142,
  totalCotisations: 2850000,
  pendingCotisations: 450000,
  upcomingEvents: 5,
  totalGroups: 8,
  recentPayments: [
    {
      id: "1",
      memberId: "1",
      categoryId: "1",
      amount: 15000,
      dueDate: "2024-01-15",
      paidDate: "2024-01-10",
      status: "paid",
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
  ],
  membersByGroup: [
    { group: "Chorale", count: 35 },
    { group: "Jeunesse", count: 45 },
    { group: "Évangélisation", count: 28 },
    { group: "Prière", count: 22 },
    { group: "Accueil", count: 26 },
  ],
  cotisationsByMonth: [
    { month: "Jan", amount: 450000 },
    { month: "Fév", amount: 520000 },
    { month: "Mar", amount: 380000 },
    { month: "Avr", amount: 490000 },
    { month: "Mai", amount: 560000 },
    { month: "Jun", amount: 450000 },
  ],
};
