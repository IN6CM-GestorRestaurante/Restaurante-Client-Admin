import { create } from "zustand";
import {
	getIngredients as getIngredientsRequest,
	createIngredient as createIngredientRequest,
	updateIngredient as updateIngredientRequest,
	changeIngredientStatus as changeIngredientStatusRequest,
} from "../../../shared/api/admin";

const getErrorMessage = (error, fallback) =>
	error?.response?.data?.message || error?.message || fallback;

const normalizeList = (response) => response?.data?.data ?? response?.data ?? [];

export const useIngredientsStore = create((set, get) => ({
	ingredients: [],
	loading: false,
	error: null,

	getIngredients: async (params) => {
		try {
			set({ loading: true, error: null });
			const response = await getIngredientsRequest(params);
			const list = normalizeList(response);
			set({ ingredients: list, loading: false });
		} catch (error) {
			set({
				loading: false,
				error: getErrorMessage(error, "Error al obtener ingredientes"),
			});
		}
	},

	createIngredient: async (data) => {
		try {
			set({ loading: true, error: null });
			await createIngredientRequest(data);
			await get().getIngredients();
			set({ loading: false });
		} catch (error) {
			set({
				loading: false,
				error: getErrorMessage(error, "Error al crear ingrediente"),
			});
			throw error;
		}
	},

	updateIngredient: async (id, data) => {
		try {
			set({ loading: true, error: null });
			await updateIngredientRequest(id, data);
			await get().getIngredients();
			set({ loading: false });
		} catch (error) {
			set({
				loading: false,
				error: getErrorMessage(error, "Error al actualizar ingrediente"),
			});
			throw error;
		}
	},

	deleteIngredient: async (id) => {
		try {
			set({ loading: true, error: null });
			await changeIngredientStatusRequest(id, false);
			// update local lists without refetching
			set({
				ingredients: get().ingredients.filter((item) => item._id !== id),
				loading: false,
			});
		} catch (error) {
			set({
				loading: false,
				error: getErrorMessage(error, "Error al desactivar ingrediente"),
			});
			throw error;
		}
	},
}));

export const useAdminStore = useIngredientsStore;
