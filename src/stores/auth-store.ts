import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User, UserRole } from "@/types";
import api from "@/lib/api";
import { mockLogin, mockRegister } from "@/lib/mock-auth";

const USE_MOCK_API = process.env.NEXT_PUBLIC_USE_MOCK_API === "true";

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (token: string, password: string) => Promise<void>;
  verifyOtp: (email: string, otp: string) => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<void>;
  setUser: (user: User) => void;
}

interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
  role: UserRole;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isLoading: false,
      isAuthenticated: false,

      login: async (email: string, password: string) => {
        set({ isLoading: true });
        try {
          let user, token;

          if (USE_MOCK_API) {
            const result = await mockLogin(email, password);
            user = result.user;
            token = result.token;
          } else {
            const response = await api.post("/auth/login", { email, password });
            user = response.data.user;
            token = response.data.accessToken;
          }

          localStorage.setItem("token", token);
          set({ user: user as User, token, isAuthenticated: true, isLoading: false });
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      register: async (data: RegisterData) => {
        set({ isLoading: true });
        try {
          if (USE_MOCK_API) {
            await mockRegister(data);
          } else {
            await api.post("/auth/register", data);
          }
          set({ isLoading: false });
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      logout: () => {
        localStorage.removeItem("token");
        set({ user: null, token: null, isAuthenticated: false });
      },

      forgotPassword: async (email: string) => {
        set({ isLoading: true });
        try {
          if (!USE_MOCK_API) {
            await api.post("/auth/forgot-password", { email });
          }
          set({ isLoading: false });
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      resetPassword: async (token: string, password: string) => {
        set({ isLoading: true });
        try {
          if (!USE_MOCK_API) {
            await api.post("/auth/reset-password", { token, password });
          }
          set({ isLoading: false });
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      verifyOtp: async (email: string, otp: string) => {
        set({ isLoading: true });
        try {
          if (USE_MOCK_API) {
            set({ isLoading: false });
            return;
          }
          const response = await api.post("/auth/verify-otp", { email, otp });
          const { user, token } = response.data;
          localStorage.setItem("token", token);
          set({ user, token, isAuthenticated: true, isLoading: false });
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      updateProfile: async (data: Partial<User>) => {
        set({ isLoading: true });
        try {
          if (USE_MOCK_API) {
            set((state) => ({
              user: state.user ? { ...state.user, ...data } : null,
              isLoading: false,
            }));
            return;
          }
          const response = await api.patch("/auth/profile", data);
          set({ user: response.data, isLoading: false });
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      setUser: (user: User) => {
        set({ user, isAuthenticated: true });
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
      skipHydration: true,
    }
  )
);
