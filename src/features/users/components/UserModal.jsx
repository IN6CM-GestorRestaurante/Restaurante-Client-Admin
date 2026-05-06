import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Modal } from "../../../shared/ui/Modal";
import { useSaveUser } from "../hooks/useSaveUser";
import { useUsersStore } from "../store/adminStore";

const defaultValues = {
  name: "",
  surname: "",
  username: "",
  email: "",
  phone: "",
  role: "CLIENT",
  status: true,
};

export const UserModal = ({ isOpen, onClose, initialData = null }) => {
  const { saveUser } = useSaveUser();
  const loading = useUsersStore((state) => state.loading);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues });

  useEffect(() => {
    if (!isOpen) {
      reset(defaultValues);
      return;
    }

    if (initialData) {
      reset({
        name: initialData.name ?? "",
        surname: initialData.surname ?? "",
        username: initialData.username ?? "",
        email: initialData.email ?? "",
        phone: initialData.phone ?? "",
        role: initialData.role ?? "CLIENT",
        status: initialData.status ?? true,
      });
      return;
    }

    reset(defaultValues);
  }, [isOpen, initialData, reset]);

  const onSubmit = async (data) => {
    await saveUser(data, initialData?._id ?? null);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={initialData ? "Editar usuario" : "Nuevo usuario"}
      subtitle="Completa la información del usuario"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 sm:gap-6">
        <div className="flex flex-col gap-2">
          <label className="app-modal-fieldLabel">Nombre</label>
          <input className="app-modal-input" {...register("name", { required: "El nombre es obligatorio" })} />
          {errors.name ? <span className="text-xs text-red-600">{errors.name.message}</span> : null}
        </div>

        <div className="flex flex-col gap-2">
          <label className="app-modal-fieldLabel">Apellido</label>
          <input className="app-modal-input" {...register("surname", { required: "El apellido es obligatorio" })} />
          {errors.surname ? <span className="text-xs text-red-600">{errors.surname.message}</span> : null}
        </div>

        <div className="flex flex-col gap-2">
          <label className="app-modal-fieldLabel">Teléfono</label>
          <input className="app-modal-input" maxLength="8" {...register("phone", { required: "El teléfono es obligatorio", minLength: { value: 8, message: "Debe tener 8 dígitos" }, maxLength: { value: 8, message: "Debe tener 8 dígitos" } })} />
          {errors.phone ? <span className="text-xs text-red-600">{errors.phone.message}</span> : null}
        </div>

        <div className="flex flex-col gap-2">
          <label className="app-modal-fieldLabel">Usuario</label>
          <input className="app-modal-input" {...register("username", { required: "El usuario es obligatorio" })} />
          {errors.username ? <span className="text-xs text-red-600">{errors.username.message}</span> : null}
        </div>

        <div className="flex flex-col gap-2">
          <label className="app-modal-fieldLabel">Correo</label>
          <input type="email" className="app-modal-input" {...register("email", { required: "El correo es obligatorio" })} />
          {errors.email ? <span className="text-xs text-red-600">{errors.email.message}</span> : null}
        </div>

        <div className="flex flex-col gap-2">
          <label className="app-modal-fieldLabel">Rol</label>
          <select className="app-modal-select" {...register("role", { required: "El rol es obligatorio" })}>
            <option value="ADMIN">ADMIN</option>
            <option value="CLIENT">CLIENT</option>
            <option value="WAITER">WAITER</option>
          </select>
          {errors.role ? <span className="text-xs text-red-600">{errors.role.message}</span> : null}
        </div>

        <div className="flex flex-col gap-2">
          <label className="app-modal-fieldLabel">Estado</label>
          <select className="app-modal-select" {...register("status") }>
            <option value={true}>Activo</option>
            <option value={false}>Inactivo</option>
          </select>
        </div>

        <div className="flex flex-col gap-2 col-span-full">
          <p className="text-xs text-slate-500">El usuario se guarda directamente en el admin backend. No se solicita contraseña porque ese dato no forma parte del modelo Mongo actual.</p>
        </div>

        <div className="app-modal-actions col-span-full">
          <button type="button" onClick={onClose} className="app-modal-btn app-modal-btnSecondary w-full sm:w-auto">Cancelar</button>
          <button type="submit" className="app-modal-btn app-modal-btnPrimary w-full sm:w-auto">{loading ? "Guardando..." : initialData ? "Guardar cambios" : "Guardar"}</button>
        </div>
      </form>
    </Modal>
  );
};
