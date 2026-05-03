import { create } from "zustand";
import {
  getUsers as getUsersRequest,
  syncUserProfile as syncUserProfileRequest,
} from "../../../shared/api/admin";

const getErrorMessage = (error, fallback) =>
  error?.response?.data?.message || error?.message || fallback;

const normalizeList = (response) => response?.data?.data ?? response?.data ?? [];

export const useUsersStore = create((set, get) => ({
  users: [],
  loading: false,
  error: null,

  getUsers: async (params) => {
    try {
      set({ loading: true, error: null });
      const response = await getUsersRequest(params);
      set({ users: normalizeList(response), loading: false });
    } catch (error) {
      set({
        loading: false,
        error: getErrorMessage(error, "Error al obtener usuarios"),
      });
    }
  },

  createUser: async (data) => {
    try {
      set({ loading: true, error: null });
      await syncUserProfileRequest(data);
      await get().getUsers();
      set({ loading: false });
    } catch (error) {
      set({
        loading: false,
        error: getErrorMessage(error, "Error al crear usuario"),
      });
      throw error;
    }
  },

  updateUser: async (id, data) => {
    try {
      set({ loading: true, error: null });
      await syncUserProfileRequest({ id, ...data });
      await get().getUsers();
      set({ loading: false });
    } catch (error) {
      set({
        loading: false,
        error: getErrorMessage(error, "Error al actualizar usuario"),
      });
      throw error;
    }
  },
}));
