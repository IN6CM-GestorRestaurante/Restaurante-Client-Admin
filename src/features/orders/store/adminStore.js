import { create } from "zustand";
import {
	getOrders as getOrdersRequest,
	createOrder as createOrderRequest,
	updateOrderStatus as updateOrderStatusRequest,
	updateItemStatus as updateItemStatusRequest,
} from "../../../shared/api/admin";

const getErrorMessage = (error, fallback) =>
	error?.response?.data?.message || error?.message || fallback;

const normalizeList = (response) => response?.data?.data ?? response?.data ?? [];

export const useOrdersStore = create((set, get) => ({
	orders: [],
	loading: false,
	error: null,

	getOrders: async (params) => {
		try {
			set({ loading: true, error: null });
			const response = await getOrdersRequest(params);
			set({ orders: normalizeList(response), loading: false });
		} catch (error) {
			set({
				loading: false,
				error: getErrorMessage(error, "Error al obtener ordenes"),
			});
		}
	},

	createOrder: async (data) => {
		try {
			set({ loading: true, error: null });
			await createOrderRequest(data);
			await get().getOrders();
			set({ loading: false });
		} catch (error) {
			set({
				loading: false,
				error: getErrorMessage(error, "Error al crear orden"),
			});
			throw error;
		}
	},

	updateOrder: async (id, data) => {
		try {
			set({ loading: true, error: null });
			await updateOrderStatusRequest(id, data);
			await get().getOrders();
			set({ loading: false });
		} catch (error) {
			set({
				loading: false,
				error: getErrorMessage(error, "Error al actualizar orden"),
			});
			throw error;
		}
	},

	updateItemStatus: async (orderId, itemId, body) => {
		try {
			set({ loading: true, error: null });
			await updateItemStatusRequest(orderId, itemId, body);
			await get().getOrders();
			set({ loading: false });
		} catch (error) {
			set({
				loading: false,
				error: getErrorMessage(error, "Error al actualizar item de la orden"),
			});
			throw error;
		}
	},
}));
