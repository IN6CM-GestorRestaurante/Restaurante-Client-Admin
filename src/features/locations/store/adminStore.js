import { create } from "zustand";
import {
	getRestaurants as getRestaurantsRequest,
	createRestaurant as createRestaurantRequest,
	updateRestaurant as updateRestaurantRequest,
	changeRestaurantStatus as changeRestaurantStatusRequest,
} from "../../../shared/api/admin";

const getErrorMessage = (error, fallback) =>
	error?.response?.data?.message || error?.message || fallback;

const normalizeList = (response) => response?.data?.data ?? response?.data ?? [];

export const useLocationsStore = create((set, get) => ({
	locations: [],
	sucursales: [],
	loading: false,
	error: null,

	getLocations: async (params) => {
		try {
			set({ loading: true, error: null });
			const response = await getRestaurantsRequest(params);
			const list = normalizeList(response);
			set({ locations: list, sucursales: list, loading: false });
		} catch (error) {
			set({
				loading: false,
				error: getErrorMessage(error, "Error al obtener sucursales"),
			});
		}
	},

	getSucursales: async (params) => {
		await get().getLocations(params);
	},

	createLocation: async (data) => {
		try {
			set({ loading: true, error: null });
			await createRestaurantRequest(data);
			await get().getLocations();
			set({ loading: false });
		} catch (error) {
			set({
				loading: false,
				error: getErrorMessage(error, "Error al crear sucursal"),
			});
			throw error;
		}
	},

	updateLocation: async (id, data) => {
		try {
			set({ loading: true, error: null });
			await updateRestaurantRequest(id, data);
			await get().getLocations();
			set({ loading: false });
		} catch (error) {
			set({
				loading: false,
				error: getErrorMessage(error, "Error al actualizar sucursal"),
			});
			throw error;
		}
	},

	deleteLocation: async (id) => {
		try {
			set({ loading: true, error: null });
			await changeRestaurantStatusRequest(id, false);
			await get().getLocations();
			set({ loading: false });
		} catch (error) {
			set({
				loading: false,
				error: getErrorMessage(error, "Error al desactivar sucursal"),
			});
			throw error;
		}
	},
}));

export const useSucursalesStore = useLocationsStore;
