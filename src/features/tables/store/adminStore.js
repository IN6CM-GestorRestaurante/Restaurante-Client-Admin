import { create } from "zustand";
import {
	getTables as getTablesRequest,
	createTable as createTableRequest,
	updateTable as updateTableRequest,
	changeTableStatus as changeTableStatusRequest,
} from "../../../shared/api/admin";

const getErrorMessage = (error, fallback) =>
	error?.response?.data?.message || error?.message || fallback;

const normalizeList = (response) => response?.data?.data ?? response?.data ?? [];

export const useTablesStore = create((set, get) => ({
	tables: [],
	loading: false,
	error: null,

	getTables: async (params) => {
		try {
			set({ loading: true, error: null });
			const response = await getTablesRequest(params);
			set({ tables: normalizeList(response), loading: false });
		} catch (error) {
			set({
				loading: false,
				error: getErrorMessage(error, "Error al obtener mesas"),
			});
		}
	},

	createTable: async (data) => {
		try {
			set({ loading: true, error: null });
			await createTableRequest(data);
			await get().getTables();
			set({ loading: false });
		} catch (error) {
			set({
				loading: false,
				error: getErrorMessage(error, "Error al crear mesa"),
			});
			throw error;
		}
	},

	updateTable: async (id, data) => {
		try {
			set({ loading: true, error: null });
			await updateTableRequest(id, data);
			await get().getTables();
			set({ loading: false });
		} catch (error) {
			set({
				loading: false,
				error: getErrorMessage(error, "Error al actualizar mesa"),
			});
			throw error;
		}
	},

	deleteTable: async (id) => {
		try {
			set({ loading: true, error: null });
			await changeTableStatusRequest(id, false);
			await get().getTables();
			set({ loading: false });
		} catch (error) {
			set({
				loading: false,
				error: getErrorMessage(error, "Error al desactivar mesa"),
			});
			throw error;
		}
	},
}));
