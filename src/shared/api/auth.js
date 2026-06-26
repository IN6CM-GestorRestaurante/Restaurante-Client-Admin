import { axiosAuth, axiosAdmin } from "./api";

export const login = async (data) => {
  return await axiosAuth.post("/auth/login", data);
};

// El registro unificado va a Node.js (Saga), NO a C# directamente
export const register = async (data) => {
  // When sending FormData (including file uploads) we must not send the default
  // 'application/json' header. Let the browser set the multipart boundary.
  return await axiosAdmin.post("/companies/register", data);
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

export const resendVerification = async (email) => {
  return await axiosAuth.post("/auth/resend-verification", { email });
};

// The AuthService exposes email verification via /auth/verify-email
// Use `verifyEmail(token)` below. No generic resend endpoint exists in the C# service.

export const updateUserRole = async (userId, role) => {
  return await axiosAuth.put(`/auth/users/${userId}/role`, { role });
};

export const getAllAuthUsers = async (page = 1, limit = 20) => {
  return await axiosAuth.get(`/auth/users?page=${page}&limit=${limit}`);
};
