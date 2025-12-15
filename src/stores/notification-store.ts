import { create } from "zustand";
import { Notification } from "@/types";
import api from "@/lib/api";

const USE_MOCK_API = process.env.NEXT_PUBLIC_USE_MOCK_API === "true";

interface NotificationState {
  notifications: Notification[];
  unreadCount: number;
  isLoading: boolean;
  fetchNotifications: () => Promise<void>;
  markAsRead: (id: string) => Promise<void>;
  markAllAsRead: () => Promise<void>;
  deleteNotification: (id: string) => Promise<void>;
}

export const useNotificationStore = create<NotificationState>((set) => ({
  notifications: [],
  unreadCount: 0,
  isLoading: false,

  fetchNotifications: async () => {
    if (USE_MOCK_API) {
      set({ notifications: [], unreadCount: 0, isLoading: false });
      return;
    }
    
    set({ isLoading: true });
    try {
      const response = await api.get("/notifications");
      const notifications = response.data;
      const unreadCount = notifications.filter(
        (n: Notification) => !n.isRead
      ).length;
      set({ notifications, unreadCount, isLoading: false });
    } catch {
      set({ notifications: [], unreadCount: 0, isLoading: false });
    }
  },

  markAsRead: async (id: string) => {
    if (USE_MOCK_API) {
      set((state) => ({
        notifications: state.notifications.map((n) =>
          n.id === id ? { ...n, isRead: true } : n
        ),
        unreadCount: Math.max(0, state.unreadCount - 1),
      }));
      return;
    }
    
    try {
      await api.patch(`/notifications/${id}/read`);
      set((state) => ({
        notifications: state.notifications.map((n) =>
          n.id === id ? { ...n, isRead: true } : n
        ),
        unreadCount: Math.max(0, state.unreadCount - 1),
      }));
    } catch {
      // Silent fail
    }
  },

  markAllAsRead: async () => {
    if (USE_MOCK_API) {
      set((state) => ({
        notifications: state.notifications.map((n) => ({ ...n, isRead: true })),
        unreadCount: 0,
      }));
      return;
    }
    
    try {
      await api.patch("/notifications/read-all");
      set((state) => ({
        notifications: state.notifications.map((n) => ({ ...n, isRead: true })),
        unreadCount: 0,
      }));
    } catch {
      // Silent fail
    }
  },

  deleteNotification: async (id: string) => {
    if (USE_MOCK_API) {
      set((state) => ({
        notifications: state.notifications.filter((n) => n.id !== id),
        unreadCount: state.notifications.find((n) => n.id === id && !n.isRead)
          ? state.unreadCount - 1
          : state.unreadCount,
      }));
      return;
    }
    
    try {
      await api.delete(`/notifications/${id}`);
      set((state) => ({
        notifications: state.notifications.filter((n) => n.id !== id),
        unreadCount: state.notifications.find((n) => n.id === id && !n.isRead)
          ? state.unreadCount - 1
          : state.unreadCount,
      }));
    } catch {
      // Silent fail
    }
  },
}));
