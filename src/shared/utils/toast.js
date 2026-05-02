import { toast } from "react-hot-toast";

const baseStyle = {
  borderRadius: "14px",
  fontWeight: 600,
  fontFamily: "inherit",
  fontSize: "0.95rem",
  padding: "12px 18px",
  boxShadow: "0 18px 40px -30px rgba(68, 54, 38, 0.9)",
};

export const showSuccess = (message) =>
  toast.success(message, {
    style: {
      ...baseStyle,
      background: "linear-gradient(90deg, #16a34a 0%, #15803d 100%)",
      color: "#fff",
      border: "1px solid rgba(16, 185, 129, 0.12)",
    },
    iconTheme: {
      primary: "#16a34a",
      secondary: "#fff",
    },
  });

export const showError = (message) =>
  toast.error(message, {
    style: {
      ...baseStyle,
      background: "linear-gradient(90deg, #dc2626 0%, #991b1b 100%)",
      color: "#fff",
      border: "1px solid rgba(239, 68, 68, 0.12)",
    },
    iconTheme: {
      primary: "#ef4444",
      secondary: "#fff",
    },
  });

export const showInfo = (message) =>
  toast(message, {
    style: {
      ...baseStyle,
      background: "linear-gradient(90deg, #0ea5e9 0%, #0369a1 100%)",
      color: "#fff",
      border: "1px solid rgba(14, 165, 233, 0.12)",
    },
    iconTheme: {
      primary: "#0ea5e9",
      secondary: "#fff",
    },
  });