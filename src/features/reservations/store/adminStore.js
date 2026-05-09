import { create } from "zustand";
import {
	getAllReservations as getAllReservationsRequest,
	createReservation as createReservationRequest,
	updateReservation as updateReservationRequest,
	confirmReservation as confirmReservationRequest,
	createReservation as createReservationRequest,
	updateReservation as updateReservationRequest,
	deleteReservation as deleteReservationRequest,
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

	createReservation: async (data) => {
		try {
			set({ loading: true, error: null });
			await createReservationRequest(data);
			await get().getReservations();
			set({ loading: false });
		} catch (error) {
			set({ loading: false, error: getErrorMessage(error, "Error al crear reservacion") });
			throw error;
		}
	},

	updateReservation: async (id, data) => {
		try {
			set({ loading: true, error: null });
			await updateReservationRequest(id, data);
			await get().getReservations();
			set({ loading: false });
		} catch (error) {
			set({ loading: false, error: getErrorMessage(error, "Error al actualizar reservacion") });
			throw error;
		}
	},

	deleteReservation: async (id) => {
		try {
			set({ loading: true, error: null });
			await deleteReservationRequest(id);
			await get().getReservations();
			set({ loading: false });
		} catch (error) {
			set({ loading: false, error: getErrorMessage(error, "Error al eliminar reservacion") });
			throw error;
		}
	},
}));
