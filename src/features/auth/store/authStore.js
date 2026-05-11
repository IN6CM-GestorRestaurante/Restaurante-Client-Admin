import { create } from "zustand";
import { persist } from "zustand/middleware";
import { toast } from "react-hot-toast";

import { login as loginRequest } from "../../../shared/api/auth.js";

// Roles válidos del ERP
const VALID_ROLES = [
  "SUPER_ADMIN",
  "ADMIN_ROLE",
  "COMPANY_ADMIN",
  "BRANCH_MANAGER",
  "WAITER",
  "WAITRESS",
  "CHEF",
  "CASHIER",
  "RECEPTIONIST",
];

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      refreshToken: null,
      expiresAt: null,
      loading: false,
      error: null,
      isLoading: true,
      isAuthenticated: false,

      checkAuth: () => {
        const token = get().token;
        const role = get().user?.role;

        if (!token || !VALID_ROLES.includes(role)) {
          set({
            user: null,
            token: null,
            refreshToken: null,
            expiresAt: null,
            isAuthenticated: false,
            isLoading: false,
            error: !token ? null : "No tienes permiso para acceder",
          });
        }
      },

      logout: () => {
        set({
          user: null,
          token: null,
          refreshToken: null,
          expiresAt: null,
          isAuthenticated: false,
        });
      },

      login: async ({ emailOrUsername, password }) => {
        try {
          set({ loading: true, error: null });

          const { data } = await loginRequest({ emailOrUsername, password });

          const role = data?.userDetails?.role;
          if (!VALID_ROLES.includes(role)) {
            const message = "Rol no reconocido. Contacta al administrador.";
            set({
              user: null,
              token: null,
              refreshToken: null,
              expiresAt: null,
              isAuthenticated: false,
              loading: false,
              error: message,
            });
            toast.error(message);
            return { success: false, error: message };
          }

          set({
            user: data.userDetails,
            token: data.accessToken || data.token,
            refreshToken: data.refreshToken,
            expiresAt: data.expiresIn || data.expiresAt,
            isAuthenticated: true,
            loading: false,
            error: null,
          });

          return { success: true };
        } catch (error) {
          const errorMessage =
            error.response?.data?.message || error.message || "Error al iniciar sesión";
          set({
            user: null,
            token: null,
            refreshToken: null,
            expiresAt: null,
            isAuthenticated: false,
            loading: false,
            error: errorMessage,
          });
          toast.error(errorMessage);
          return { success: false, error: errorMessage };
        }
      },
    }),
    { name: "auth-store" },
  ),
);
