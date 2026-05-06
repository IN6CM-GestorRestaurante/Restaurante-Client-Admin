import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Modal } from "../../../shared/ui/Modal";
import { useSaveReservation } from "../hooks/useSaveReservation";
import { useReservationsStore } from "../store/adminStore";

const defaultValues = {
  user: "",
  restaurant: "",
  type: "En Mesa",
  table: "",
  date: "",
  deliveryAddress: "",
  items: "",
  status: "Pendiente",
  notes: "",
};

export const ReservationModal = ({ isOpen, onClose, initialData = null }) => {
  const { saveReservation } = useSaveReservation();
  const loading = useReservationsStore((state) => state.loading);
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({ defaultValues });

  const reservationType = watch("type");

  useEffect(() => {
    if (!isOpen) {
      reset(defaultValues);
      return;
    }

    if (initialData) {
      reset({
        user: initialData.user?._id ?? initialData.user ?? "",
        restaurant: initialData.restaurant?._id ?? initialData.restaurant ?? "",
        type: initialData.type ?? "En Mesa",
        table: initialData.table?._id ?? initialData.table ?? "",
        date: initialData.date ? new Date(initialData.date).toISOString().slice(0, 16) : "",
        deliveryAddress: initialData.deliveryAddress ?? "",
        items: Array.isArray(initialData.items)
          ? initialData.items
              .map((item) => `${item.menuItem?._id ?? item.menuItem ?? ""}:${item.quantity ?? 1}`)
              .join(",")
          : "",
        status: initialData.status ?? "Pendiente",
        notes: initialData.notes ?? "",
      });
      return;
    }

    reset(defaultValues);
  }, [isOpen, initialData, reset]);

  const onSubmit = async (data) => {
    const items = data.items
      ? data.items
          .split(",")
          .map((entry) => entry.trim())
          .filter(Boolean)
          .map((entry) => {
            const [menuItem, quantity] = entry.split(":").map((value) => value.trim());
            return {
              menuItem,
              quantity: Number(quantity || 1),
            };
          })
      : [];

    await saveReservation(
      {
        ...data,
        items,
      },
      initialData?._id ?? null,
    );
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={initialData ? "Editar reservación" : "Nueva reservacion"}
      subtitle="Completa la información de la reservación"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 sm:gap-6">
        <div className="flex flex-col gap-2">
          <label className="app-modal-fieldLabel">Usuario</label>
          <input placeholder="MongoID" className="app-modal-input" {...register("user", { required: "El usuario es obligatorio" })} />
          {errors.user ? <span className="text-xs text-red-600">{errors.user.message}</span> : null}
        </div>

        <div className="flex flex-col gap-2">
          <label className="app-modal-fieldLabel">Restaurante</label>
          <input placeholder="MongoID" className="app-modal-input" {...register("restaurant", { required: "El restaurante es obligatorio" })} />
          {errors.restaurant ? <span className="text-xs text-red-600">{errors.restaurant.message}</span> : null}
        </div>

        <div className="flex flex-col gap-2">
          <label className="app-modal-fieldLabel">Fecha y hora</label>
          <input type="datetime-local" className="app-modal-input" {...register("date", { required: "La fecha es obligatoria" })} />
          {errors.date ? <span className="text-xs text-red-600">{errors.date.message}</span> : null}
        </div>

        <div className="flex flex-col gap-2">
          <label className="app-modal-fieldLabel">Mesa</label>
          <input placeholder="Requerido para En Mesa" className="app-modal-input" {...register("table")} disabled={reservationType !== "En Mesa"} />
        </div>

        <div className="flex flex-col gap-2">
          <label className="app-modal-fieldLabel">Tipo</label>
          <select className="app-modal-select" {...register("type", { required: "El tipo es obligatorio" })}>
            <option>En Mesa</option>
            <option>Para llevar</option>
            <option>A domicilio</option>
          </select>
          {errors.type ? <span className="text-xs text-red-600">{errors.type.message}</span> : null}
        </div>

        <div className="flex flex-col gap-2">
          <label className="app-modal-fieldLabel">Dirección entrega</label>
          <input placeholder="Requerido para A domicilio" className="app-modal-input" {...register("deliveryAddress")} disabled={reservationType !== "A domicilio"} />
        </div>

        <div className="flex flex-col gap-2">
          <label className="app-modal-fieldLabel">Items menú</label>
          <input placeholder="menuId:2,menuId2:1" className="app-modal-input" {...register("items")} />
        </div>

        <div className="flex flex-col gap-2">
          <label className="app-modal-fieldLabel">Estado</label>
          <select className="app-modal-select" {...register("status") }>
            <option>Pendiente</option>
            <option>Confirmada</option>
            <option>En curso</option>
            <option>Completada</option>
            <option>Cancelada</option>
          </select>
        </div>

        <div className="flex flex-col gap-2 col-span-full">
          <br />
          <label className="app-modal-fieldLabel">Notas</label>
          <div className="flex justify-center w-full">
            <textarea className="app-modal-textarea w-full md:w-3/4 lg:w-2/3" placeholder="Observaciones..." {...register("notes")} />
          </div>
        </div>

        <div className="app-modal-actions col-span-full">
          <button type="button" onClick={onClose} className="app-modal-btn app-modal-btnSecondary w-full sm:w-auto">Cancelar</button>
          <button type="submit" className="app-modal-btn app-modal-btnPrimary w-full sm:w-auto">{loading ? "Guardando..." : initialData ? "Guardar cambios" : "Guardar"}</button>
        </div>
      </form>
    </Modal>
  );
};
