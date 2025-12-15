import api from "@/lib/api";
import {
  AdminDashboardStats,
  OrganizerDashboardStats,
  VisitorDashboardStats,
} from "@/types";

const USE_MOCK_API = process.env.NEXT_PUBLIC_USE_MOCK_API === "true";

export const analyticsService = {
  getAdminDashboard: async (): Promise<AdminDashboardStats> => {
    if (USE_MOCK_API) {
      return emptyAdminStats;
    }
    try {
      const response = await api.get("/analytics/admin/dashboard");
      return response.data;
    } catch {
      return emptyAdminStats;
    }
  },

  getOrganizerDashboard: async (): Promise<OrganizerDashboardStats> => {
    if (USE_MOCK_API) {
      return emptyOrganizerStats;
    }
    try {
      const response = await api.get("/analytics/organizer/dashboard");
      return response.data;
    } catch {
      return emptyOrganizerStats;
    }
  },

  getVisitorDashboard: async (): Promise<VisitorDashboardStats> => {
    if (USE_MOCK_API) {
      return emptyVisitorStats;
    }
    try {
      const response = await api.get("/analytics/visitor/dashboard");
      return response.data;
    } catch {
      return emptyVisitorStats;
    }
  },
};

export const emptyAdminStats: AdminDashboardStats = {
  totalUsers: 0,
  totalOrganizers: 0,
  totalVisitors: 0,
  totalEvents: 0,
  upcomingEvents: 0,
  completedEvents: 0,
  totalRevenue: 0,
  revenueThisMonth: 0,
  totalPayments: 0,
  pendingPayments: 0,
  recentRegistrations: [],
  recentPayments: [],
  usersByRole: [],
  eventsByStatus: [],
  revenueByMonth: [],
};

export const emptyOrganizerStats: OrganizerDashboardStats = {
  myEvents: 0,
  myUpcomingEvents: 0,
  myCompletedEvents: 0,
  totalParticipants: 0,
  totalRevenue: 0,
  revenueThisMonth: 0,
  avgParticipantsPerEvent: 0,
  myRecentEvents: [],
  participantsByEvent: [],
  revenueByEvent: [],
};

export const emptyVisitorStats: VisitorDashboardStats = {
  registeredEvents: 0,
  upcomingRegisteredEvents: 0,
  pastAttendedEvents: 0,
  totalPayments: 0,
  pendingPayments: 0,
  myUpcomingEvents: [],
  myRecentPayments: [],
};
