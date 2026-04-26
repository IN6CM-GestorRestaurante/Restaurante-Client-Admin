import { create } from "zustand";
import { persist } from "zustand/middleware";
import { toast } from "react-hot-toast";

import { login as loginRequest } from "../../../shared/api/auth.js";

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
        const isAdmin = role === "ADMIN_ROLE";

        if (token && !isAdmin) {
          set({
            user: null,
            token: null,
            refreshToken: null,
            expiresAt: null,
            isAuthenticated: false,
            isLoadingAuth: false,
            error: "No tienes permiso para acceder como administrador",
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
          if (role !== "ADMIN_ROLE") {
            const message = "No tienes permisos para acceder como administrador";
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
