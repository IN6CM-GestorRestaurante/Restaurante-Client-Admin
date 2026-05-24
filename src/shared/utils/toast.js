import { toast } from "react-hot-toast";

const baseStyle = {
  borderRadius: "14px",
  fontWeight: 600,
  fontFamily: "inherit",
  fontSize: "0.95rem",
  padding: "12px 18px",
  boxShadow: "0 18px 40px -30px rgba(68, 54, 38, 0.9)",
};

const makeFriendlyMessage = (msg) => {
  if (!msg || typeof msg !== "string") return "Ha ocurrido un error inesperado. Por favor, intenta de nuevo.";

  // Normalize message
  const msgLower = msg.toLowerCase();

  // CastError for images or values
  if (msgLower.includes("cast to [string] failed") || msgLower.includes("photos.0") || msgLower.includes("casterror")) {
    return "Error al procesar la imagen. Por favor, intenta eliminarla y subir un archivo válido en formato PNG o JPG.";
  }

  if (msgLower.includes("validation failed")) {
    // Look for specific validation fields
    if (msgLower.includes("name:")) return "El nombre ingresado no cumple con los requisitos o ya está registrado.";
    if (msgLower.includes("phonenumber:")) return "El número de teléfono debe ser válido y contener al menos 8 dígitos.";
    if (msgLower.includes("email:")) return "Por favor, ingresa un correo electrónico válido.";
    if (msgLower.includes("unit:")) return "La unidad de medida es obligatoria. Por favor, selecciona una de la lista.";
    if (msgLower.includes("address:")) return "La dirección ingresada es obligatoria.";
    
    return "Algunos datos del formulario no son válidos. Por favor, revísalos e intenta de nuevo.";
  }

  if (msgLower.includes("duplicate key") || msgLower.includes("e11000")) {
    if (msgLower.includes("email")) return "El correo electrónico ingresado ya se encuentra registrado.";
    if (msgLower.includes("username")) return "El nombre de usuario ya está en uso por otra cuenta.";
    if (msgLower.includes("name")) return "El nombre ingresado ya está registrado en el sistema.";
    return "Este registro ya existe en el sistema. Por favor, verifica la información.";
  }

  if (msgLower.includes("forbidden") || msgLower.includes("acceso denegado") || msgLower.includes("403")) {
    return "No tienes los permisos necesarios para realizar esta acción.";
  }

  if (msgLower.includes("unauthorized") || msgLower.includes("no válido o expirado") || msgLower.includes("401")) {
    return "Tu sesión ha expirado o no es válida. Por favor, inicia sesión de nuevo.";
  }

  if (msgLower.includes("network error") || msgLower.includes("failed to fetch")) {
    return "Error de conexión con el servidor. Por favor, verifica tu internet.";
  }

  // Fallback but remove raw technical tags
  return msg
    .replace(/Cast to ObjectId failed.*/i, "El identificador del recurso no es válido.")
    .replace(/.*validation failed:?/i, "Error de validación:")
    .trim();
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
  toast.error(makeFriendlyMessage(message), {
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