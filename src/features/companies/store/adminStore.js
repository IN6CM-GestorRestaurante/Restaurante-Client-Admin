import { create } from "zustand";
import { getCompanies, getCompanyById } from "../../../shared/api/admin";

export const useCompaniesStore = create((set, get) => ({
    companies: [],
    loading: false,
    error: null,

    getCompanies: async () => {
        // Prevent duplicate fetches
        if (get().loading) return;
        try {
            set({ loading: true, error: null });
            const { data } = await getCompanies();
            set({ companies: data?.data || data || [], loading: false });
        } catch (error) {
            set({ 
                error: error?.response?.data?.message || error?.message || "Error al cargar compañías",
                loading: false 
            });
        }
    },

    getCompanyById: async (id) => {
        try {
            const { data } = await getCompanyById(id);
            return data?.data || data;
        } catch (error) {
            console.error("[CompaniesStore] getCompanyById error:", error);
            return null;
        }
    },
}));
