import { axiosAdmin } from "./api";

// ================= COMPANIES =================
export const getCompanies = async () => {
    return await axiosAdmin.get("/companies");
};

export const getCompanyById = async (id) => {
    return await axiosAdmin.get(`/companies/${id}`);
};

// ================= BRANCHES (Sucursales) =================
export const getRestaurants = async (params) => {
    return await axiosAdmin.get("/branches", { params });
};

export const getRestaurantById = async (id) => {
    return await axiosAdmin.get(`/branches/${id}`);
};

export const createRestaurant = async (data) => {
    return await axiosAdmin.post("/branches", data);
};

export const updateRestaurant = async (id, data) => {
    return await axiosAdmin.put(`/branches/${id}`, data);
};

export const changeRestaurantStatus = async (id, activate = true) => {
    const action = activate ? 'activate' : 'desactivate';
    return await axiosAdmin.put(`/branches/${id}/${action}`);
};

// ================= USERS (Empleados) =================
export const getUsers = async (params) => {
    return await axiosAdmin.get("/users", { params });
};

export const getUserProfile = async () => {
    return await axiosAdmin.get("/users/profile");
};

export const getUserById = async (id) => {
    return await axiosAdmin.get(`/users/${id}`);
};

export const createUser = async (data) => {
    return await axiosAdmin.post("/users", data);
};

export const updateUser = async (id, data) => {
    return await axiosAdmin.put(`/users/${id}`, data);
};

export const changeUserStatus = async (id, activate = true) => {
    const action = activate ? 'activate' : 'desactivate';
    return await axiosAdmin.put(`/users/${id}/${action}`);
};

export const deleteUser = async (id) => {
    return await changeUserStatus(id, false);
};

export const syncUserProfile = async (data) => {
    return await axiosAdmin.post("/users/sync", data);
};

// ================= INGREDIENTS =================
export const getIngredients = async (params) => {
    return await axiosAdmin.get("/ingredients", { params });
};

export const getIngredientById = async (id) => {
    return await axiosAdmin.get(`/ingredients/${id}`);
};

export const createIngredient = async (data) => {
    return await axiosAdmin.post("/ingredients", data);
};

export const updateIngredient = async (id, data) => {
    return await axiosAdmin.put(`/ingredients/${id}`, data);
};

export const changeIngredientStatus = async (id, activate = true) => {
    const action = activate ? 'activate' : 'desactivate';
    return await axiosAdmin.put(`/ingredients/${id}/${action}`);
};

// ================= STOCKS =================
export const getStocks = async (params) => {
    return await axiosAdmin.get("/stocks", { params });
};

export const upsertStock = async (data) => {
    return await axiosAdmin.post("/stocks", data);
};

// ================= MENUS =================
export const getMenus = async (params) => {
    return await axiosAdmin.get("/menus", { params });
};

export const getMenuById = async (id) => {
    return await axiosAdmin.get(`/menus/${id}`);
};

export const createMenu = async (data) => {
    return await axiosAdmin.post("/menus", data);
};

export const updateMenu = async (id, data) => {
    return await axiosAdmin.put(`/menus/${id}`, data);
};

export const changeMenuStatus = async (id, activate = true) => {
    const action = activate ? 'activate' : 'desactivate';
    return await axiosAdmin.put(`/menus/${id}/${action}`);
};

// ================= TABLES =================
export const getTables = async (params) => {
    return await axiosAdmin.get("/tables", { params });
};

export const getTableById = async (id) => {
    return await axiosAdmin.get(`/tables/${id}`);
};

export const createTable = async (data) => {
    return await axiosAdmin.post("/tables", data);
};

export const updateTable = async (id, data) => {
    return await axiosAdmin.put(`/tables/${id}`, data);
};

export const changeTableStatus = async (id, activate = true) => {
    const action = activate ? 'activate' : 'desactivate';
    return await axiosAdmin.put(`/tables/${id}/${action}`);
};

// ================= RESERVATIONS =================
export const getAllReservations = async (params) => {
    return await axiosAdmin.get("/reservations", { params });
};

export const getReservationById = async (id) => {
    return await axiosAdmin.get(`/reservations/${id}`);
};

export const createReservation = async (data) => {
    return await axiosAdmin.post("/reservations", data);
};

export const updateReservation = async (id, data) => {
    return await axiosAdmin.put(`/reservations/${id}`, data);
};

export const changeReservationStatus = async (id, activate = true) => {
    const action = activate ? 'activate' : 'desactivate';
    return await axiosAdmin.put(`/reservations/${id}/${action}`);
};

export const confirmReservation = async (id) => {
    return await axiosAdmin.put(`/reservations/${id}`, { status: "Confirmada" });
};

export const deleteReservation = async (id) => {
    return await changeReservationStatus(id, false);
};

// ================= ORDERS =================
export const getOrders = async (params) => {
    const { branchId, ...otherParams } = params || {};
    if (branchId) {
        return await axiosAdmin.get(`/orders/branch/${branchId}`, { params: otherParams });
    }
    return await axiosAdmin.get("/orders", { params: otherParams });
};

export const createOrder = async (data) => {
    return await axiosAdmin.post("/orders", data);
};

export const updateItemStatus = async (orderId, itemId, body) => {
    return await axiosAdmin.patch(`/orders/${orderId}/item/${itemId}/status`, body);
};

export const updateOrderStatus = async (id, body) => {
    return await axiosAdmin.patch(`/orders/${id}/status`, body);
};

export const getOrderAudit = async (orderId) => {
    return await axiosAdmin.get(`/orders/${orderId}/audit`);
};

// ================= INVOICES =================
export const getInvoices = async (params) => {
    return await axiosAdmin.get("/invoices", { params });
};

export const getInvoiceById = async (id) => {
    return await axiosAdmin.get(`/invoices/${id}`);
};

export const createInvoiceFromOrder = async (orderId) => {
    return await axiosAdmin.post(`/invoices/from-order/${orderId}`);
};

export const commitInvoice = async (id, paymentMethod) => {
    return await axiosAdmin.put(`/invoices/${id}/commit`, { paymentMethod });
};

export const voidInvoice = async (id, reason) => {
    return await axiosAdmin.put(`/invoices/${id}/void`, { reason });
};