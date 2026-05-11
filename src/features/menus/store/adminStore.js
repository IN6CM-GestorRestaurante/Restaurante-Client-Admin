import { create } from "zustand";
import {
	getMenus as getMenusRequest,
	createMenu as createMenuRequest,
	updateMenu as updateMenuRequest,
	changeMenuStatus as changeMenuStatusRequest,
    getIngredients as getIngredientsRequest,
    getRestaurants as getRestaurantsRequest
} from "../../../shared/api/admin";

const getErrorMessage = (error, fallback) =>
	error?.response?.data?.message || error?.message || fallback;

const normalizeList = (response) => response?.data?.data ?? response?.data ?? [];

export const useMenusStore = create((set, get) => ({
	menus: [],
    ingredients: [],
    branches: [],
	loading: false,
	error: null,

	getMenus: async (params) => {
		try {
			set({ loading: true, error: null });
			const response = await getMenusRequest(params);
			set({ menus: normalizeList(response), loading: false });
		} catch (error) {
			set({
				loading: false,
				error: getErrorMessage(error, "Error al obtener menu"),
			});
		}
	},

    getDependencies: async () => {
        try {
            const [ingRes, branchRes] = await Promise.all([
                getIngredientsRequest({ isActive: true }),
                getRestaurantsRequest({ isActive: true })
            ]);
            set({
                ingredients: normalizeList(ingRes),
                branches: normalizeList(branchRes)
            });
        } catch (error) {
            console.error("Error loading dependencies", error);
        }
    },

	createMenu: async (data) => {
		try {
			set({ loading: true, error: null });
			await createMenuRequest(data);
			await get().getMenus();
			set({ loading: false });
		} catch (error) {
			set({
				loading: false,
				error: getErrorMessage(error, "Error al crear producto"),
			});
			throw error;
		}
	},

	updateMenu: async (id, data) => {
		try {
			set({ loading: true, error: null });
			await updateMenuRequest(id, data);
			await get().getMenus();
			set({ loading: false });
		} catch (error) {
			set({
				loading: false,
				error: getErrorMessage(error, "Error al actualizar producto"),
			});
			throw error;
		}
	},

	deleteMenu: async (id) => {
		try {
			set({ loading: true, error: null });
			await changeMenuStatusRequest(id, false);
			await get().getMenus();
			set({ loading: false });
		} catch (error) {
			set({
				loading: false,
				error: getErrorMessage(error, "Error al desactivar producto"),
			});
			throw error;
		}
	},
}));
