import { useUsersStore } from "../../users/store/adminStore";

export const useSaveUser = () => {
  const createUser = useUsersStore((s) => s.createUser);
  const updateUser = useUsersStore((s) => s.updateUser);

  const saveUser = async (data, userId = null) => {
    const payload = {
      name: data.name,
      surname: data.surname,
      username: data.username,
      email: data.email,
      phone: data.phone,
      role: data.role,
      status: data.status === true || data.status === "true",
    };

    if (userId) {
      await updateUser(userId, payload);
    } else {
      await createUser(payload);
    }
  };

  return { saveUser };
};
