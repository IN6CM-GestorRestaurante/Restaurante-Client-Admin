import { axiosAdmin } from "./api";

// ================= TOURNAMENTS =================
export const getTournaments = async () => {
    return await axiosAdmin.get("/tournaments");
};

export const createTournament = async (data) => {
    return await axiosAdmin.post("/tournaments", data);
};

export const updateTournament = async (id, data) => {
    return await axiosAdmin.put(`/tournaments/${id}`, data);
};

export const deleteTournament = async (id) => {
    return await axiosAdmin.put(`/tournaments/${id}/deactivate`);
};

// ================= TEAMS =================
export const getTeams = async () => {
    return await axiosAdmin.get("/teams");
};

export const createTeam = async (data) => {p
    return await axiosAdmin.post("/teams", data, {
        headers: { "Content-Type": "multipart/form-data" },
    });
};

export const updateTeam = async (id, data) => {
    return await axiosAdmin.put(`/teams/${id}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
    });
};

export const deleteTeam = async (id) => {
    return await axiosAdmin.put(`/teams/${id}/deactivate`);
};

// ================= RESERVATIONS =================
export const getAllReservations = async () => {
    return await axiosAdmin.get("/reservations");
};

export const confirmReservation = async (id) => {
    return await axiosAdmin.put(`/reservations/${id}/confirm`);
};

// ================= MENUS =================
export const getMenus = async (params) => {
    return await axiosAdmin.get("/menus", { params });
};

export const getMenuById = async (id) => {
    return await axiosAdmin.get(`/menus/${id}`);
};

export const createMenu = async (data) => {
    return await axiosAdmin.post("/menus", data, {
        headers: { "Content-Type": "multipart/form-data" },
    });
};

export const updateMenu = async (id, data) => {
    return await axiosAdmin.put(`/menus/${id}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
    });
};

export const changeMenuStatus = async (id, activate = true) => {
    const action = activate ? 'activate' : 'desactivate';
    return await axiosAdmin.put(`/menus/${id}/${action}`);
};

// ================= RESTAURANTS (LOCATIONS) =================
export const getRestaurants = async (params) => {
    return await axiosAdmin.get("/restaurants", { params });
};

export const getRestaurantById = async (id) => {
    return await axiosAdmin.get(`/restaurants/${id}`);
};

export const createRestaurant = async (data) => {
    return await axiosAdmin.post("/restaurants", data, {
        headers: { "Content-Type": "multipart/form-data" },
    });
};

export const updateRestaurant = async (id, data) => {
    return await axiosAdmin.put(`/restaurants/${id}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
    });
};

export const changeRestaurantStatus = async (id, activate = true) => {
    const action = activate ? 'activate' : 'desactivate';
    return await axiosAdmin.put(`/restaurants/${id}/${action}`);
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

// ================= ORDERS =================
export const getOrders = async (params) => {
    return await axiosAdmin.get("/orders", { params });
};

export const createOrder = async (data) => {
    return await axiosAdmin.post("/orders", data);
};

export const updateItemStatus = async (orderId, itemId, body) => {
    return await axiosAdmin.put(`/orders/${orderId}/items/${itemId}`, body);
};

export const updateOrderStatus = async (id, body) => {
    return await axiosAdmin.put(`/orders/${id}`, body);
};

// ================= USERS =================
export const getUsers = async (params) => {
    return await axiosAdmin.get("/users", { params });
};

export const syncUserProfile = async (data) => {
    return await axiosAdmin.post("/users/sync", data);
};