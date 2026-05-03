import { create } from "zustand";
import {
	getAllReservations as getAllReservationsRequest,
	confirmReservation as confirmReservationRequest,
} from "../../../shared/api/admin";

const getErrorMessage = (error, fallback) =>
	error?.response?.data?.message || error?.message || fallback;

const normalizeList = (response) => response?.data?.data ?? response?.data ?? [];

export const useReservationsStore = create((set, get) => ({
	reservations: [],
	loading: false,
	error: null,

	getReservations: async () => {
		try {
			set({ loading: true, error: null });
			const response = await getAllReservationsRequest();
			set({ reservations: normalizeList(response), loading: false });
		} catch (error) {
			set({
				loading: false,
				error: getErrorMessage(error, "Error al obtener reservaciones"),
			});
		}
	},

	getAllReservations: async () => {
		await get().getReservations();
	},

	confirmReservation: async (id) => {
		try {
			set({ loading: true, error: null });
			await confirmReservationRequest(id);
			await get().getReservations();
			set({ loading: false });
		} catch (error) {
			set({
				loading: false,
				error: getErrorMessage(error, "Error al confirmar reservacion"),
			});
			throw error;
		}
	},

	createReservation: async () => {
		const message = "El endpoint para crear reservacion no esta disponible en admin API";
		set({ error: message });
		throw new Error(message);
	},

	updateReservation: async () => {
		const message = "El endpoint para actualizar reservacion no esta disponible en admin API";
		set({ error: message });
		throw new Error(message);
	},
}));
