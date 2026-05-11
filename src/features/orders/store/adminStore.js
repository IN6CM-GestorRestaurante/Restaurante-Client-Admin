import { create } from "zustand";
import {
    getOrders as getOrdersRequest,
    createOrder as createOrderRequest,
    updateOrderStatus as updateOrderStatusRequest,
    updateItemStatus as updateItemStatusRequest,
    getOrderAudit as getOrderAuditRequest,
} from "../../../shared/api/admin";

const getErrorMessage = (error, fallback) =>
    error?.response?.data?.message || error?.message || fallback;

const normalizeList = (response) => response?.data?.data ?? response?.data ?? [];

export const useOrdersStore = create((set, get) => ({
    orders: [],
    audit: [],
    loading: false,
    error: null,
    currentBranchId: null,

    getOrders: async (params) => {
        try {
            set({ loading: true, error: null });
            if (params?.branchId) set({ currentBranchId: params.branchId });
            const response = await getOrdersRequest(params);
            set({ orders: normalizeList(response), loading: false });
        } catch (error) {
            set({ loading: false, error: getErrorMessage(error, "Error al obtener órdenes") });
        }
    },

    createOrder: async (data) => {
        try {
            set({ loading: true, error: null });
            await createOrderRequest(data);
            const branchId = get().currentBranchId;
            if (branchId) await get().getOrders({ branchId });
            set({ loading: false });
        } catch (error) {
            set({ loading: false, error: getErrorMessage(error, "Error al crear orden") });
            throw error;
        }
    },

    updateOrderStatus: async (id, body) => {
        try {
            set({ loading: true, error: null });
            await updateOrderStatusRequest(id, body);
            const branchId = get().currentBranchId;
            if (branchId) await get().getOrders({ branchId });
            set({ loading: false });
        } catch (error) {
            set({ loading: false, error: getErrorMessage(error, "Error al actualizar orden") });
            throw error;
        }
    },

    updateItemStatus: async (orderId, itemId, body) => {
        try {
            set({ loading: true, error: null });
            await updateItemStatusRequest(orderId, itemId, body);
            const branchId = get().currentBranchId;
            if (branchId) await get().getOrders({ branchId });
            set({ loading: false });
        } catch (error) {
            set({ loading: false, error: getErrorMessage(error, "Error al actualizar ítem") });
            throw error;
        }
    },

    getAudit: async (orderId) => {
        try {
            set({ loading: true, error: null });
            const response = await getOrderAuditRequest(orderId);
            set({ audit: normalizeList(response), loading: false });
        } catch (error) {
            set({ loading: false, error: getErrorMessage(error, "Error al obtener auditoría") });
        }
    },
}));
