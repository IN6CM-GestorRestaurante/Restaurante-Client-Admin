import { axiosAuth, axiosAdmin } from "./api";

export const login = async (data) => {
  return await axiosAuth.post("/auth/login", data);
};

// El registro unificado va a Node.js (Saga), NO a C# directamente
export const register = async (data) => {
  return await axiosAdmin.post("/companies/register", data, {
    headers: { "Content-Type": "multipart/form-data" }
  });
};

export const forgotPassword = async (email) => {
  return await axiosAuth.post("/auth/forgot-password", { email });
};

export const resetPassword = async (token, newPassword) => {
  return await axiosAuth.post("/auth/reset-password", { token, newPassword });
};

export const verifyEmail = async (token) => {
  return await axiosAuth.post("/auth/verify-email", { token });
};

export const updateUserRole = async (userId, role) => {
  return await axiosAuth.put(`/auth/users/${userId}/role`, { role });
};

export const getAllAuthUsers = async (page = 1, limit = 20) => {
  return await axiosAuth.get(`/auth/users?page=${page}&limit=${limit}`);
};
