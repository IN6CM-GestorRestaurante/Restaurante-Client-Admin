import { create } from "zustand";
import {
    getInvoices as getInvoicesRequest,
    getInvoiceById as getInvoiceByIdRequest,
    createInvoiceFromOrder as createInvoiceFromOrderRequest,
    commitInvoice as commitInvoiceRequest,
    voidInvoice as voidInvoiceRequest,
} from "../../../shared/api/admin";

const getErrorMessage = (error, fallback) =>
    error?.response?.data?.message || error?.message || fallback;

const normalizeList = (response) => response?.data?.data ?? response?.data ?? [];

export const useInvoicesStore = create((set, get) => ({
    invoices: [],
    loading: false,
    error: null,

    getInvoices: async (params) => {
        try {
            set({ loading: true, error: null });
            const response = await getInvoicesRequest(params);
            set({ invoices: normalizeList(response), loading: false });
        } catch (error) {
            set({ loading: false, error: getErrorMessage(error, "Error al obtener facturas") });
        }
    },

    createFromOrder: async (orderId) => {
        try {
            set({ loading: true, error: null });
            await createInvoiceFromOrderRequest(orderId);
            await get().getInvoices();
            set({ loading: false });
        } catch (error) {
            set({ loading: false, error: getErrorMessage(error, "Error al crear factura") });
            throw error;
        }
    },

    commitInvoice: async (id, paymentMethod) => {
        try {
            set({ loading: true, error: null });
            await commitInvoiceRequest(id, paymentMethod);
            await get().getInvoices();
            set({ loading: false });
        } catch (error) {
            set({ loading: false, error: getErrorMessage(error, "Error al confirmar factura") });
            throw error;
        }
    },

    voidInvoice: async (id, reason) => {
        try {
            set({ loading: true, error: null });
            await voidInvoiceRequest(id, reason);
            await get().getInvoices();
            set({ loading: false });
        } catch (error) {
            set({ loading: false, error: getErrorMessage(error, "Error al anular factura") });
            throw error;
        }
    },
}));
