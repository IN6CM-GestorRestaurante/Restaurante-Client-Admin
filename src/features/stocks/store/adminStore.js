import { create } from "zustand";
import {
	getStocks as getStocksRequest,
	upsertStock as upsertStockRequest,
} from "../../../shared/api/admin";

const getErrorMessage = (error, fallback) =>
	error?.response?.data?.message || error?.message || fallback;

const normalizeList = (response) => response?.data?.data ?? response?.data ?? [];

export const useStocksStore = create((set, get) => ({
	stocks: [],
	loading: false,
	error: null,

	getStocks: async (params) => {
		try {
			set({ loading: true, error: null });
			const response = await getStocksRequest(params);
			const list = normalizeList(response);
			set({ stocks: list, loading: false });
		} catch (error) {
			set({
				loading: false,
				error: getErrorMessage(error, "Error al obtener stock"),
			});
		}
	},

	upsertStock: async (data) => {
		try {
			set({ loading: true, error: null });
			await upsertStockRequest(data);
			await get().getStocks();
			set({ loading: false });
		} catch (error) {
			set({
				loading: false,
				error: getErrorMessage(error, "Error al actualizar stock"),
			});
			throw error;
		}
	},
}));

export const useAdminStore = useStocksStore;
