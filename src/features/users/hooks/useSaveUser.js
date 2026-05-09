import { useUsersStore } from "../../users/store/adminStore";

export const useSaveUser = () => {
  const createUser = useUsersStore((s) => s.createUser);
  const updateUser = useUsersStore((s) => s.updateUser);

  const normalizeRole = (role) => {
    const value = String(role || "").trim().toUpperCase();

    if (value === "ADMIN_ROLE") return "ADMIN";
    if (value === "USER_ROLE" || value === "CLIENT_ROLE") return "CLIENT";
    if (value === "WAITER_ROLE") return "WAITER";

    return value || "CLIENT";
  };

  const normalizeStatus = (status) => {
    if (typeof status === "boolean") return status;

    const value = String(status || "").trim().toLowerCase();
    if (value === "activo" || value === "active" || value === "true") return true;
    if (value === "inactivo" || value === "inactive" || value === "false") return false;

    return true;
  };

  const saveUser = async (data, userId = null) => {
    const payload = {
      name: data.name,
      surname: data.surname,
      username: data.username,
      email: data.email,
      phone: data.phone,
      role: normalizeRole(data.role),
      status: normalizeStatus(data.status),
    };

    if (userId) {
      await updateUser(userId, payload);
    } else {
      await createUser(payload);
    }
  };

  return { saveUser };
};
