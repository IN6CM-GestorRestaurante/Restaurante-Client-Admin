import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Modal } from "../../../shared/ui/Modal";
import { useSaveTable } from "../hooks/useSaveTable";
import { useTablesStore } from "../store/adminStore";

const defaultValues = {
    restaurant: "",
    number: "",
    capacity: "",
    location: "Terraza",
    status: "Disponible",
    day: "",
    startTime: "08:00",
    endTime: "22:00",
    description: "",
};

export const TableModal = ({ isOpen, onClose, initialData = null }) => {
    const { saveTable } = useSaveTable();
    const loading = useTablesStore((state) => state.loading);
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
                restaurant: initialData.restaurant?._id ?? initialData.restaurant ?? "",
                number: initialData.number ?? "",
                capacity: initialData.capacity ?? "",
                location: initialData.location ?? "Terraza",
                status: initialData.status ?? "Disponible",
                day: initialData.availabilitySchedules?.[0]?.day ?? "",
                startTime: initialData.availabilitySchedules?.[0]?.startTime ?? "08:00",
                endTime: initialData.availabilitySchedules?.[0]?.endTime ?? "22:00",
                description: initialData.description ?? "",
            });
            return;
        }

        reset(defaultValues);
    }, [isOpen, initialData, reset]);

    const onSubmit = async (data) => {
        await saveTable(
            {
                ...data,
                availabilitySchedules: data.day
                    ? [{ day: data.day, startTime: data.startTime, endTime: data.endTime }]
                    : [],
            },
            initialData?._id ?? null,
        );
        onClose();
    };

    return (
        <Modal 
            isOpen={isOpen} 
            onClose={onClose} 
            title={initialData ? "Editar mesa" : "Nueva mesa"} 
            subtitle="Completa la información de la mesa"
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 sm:gap-6">
                    <div className="flex flex-col gap-2">
                        <label className="app-modal-fieldLabel">Restaurante</label>
                        <input placeholder="MongoID" className="app-modal-input" {...register("restaurant", { required: "El restaurante es obligatorio" })} />
                        {errors.restaurant ? <span className="text-xs text-red-600">{errors.restaurant.message}</span> : null}
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="app-modal-fieldLabel">Número</label>
                        <input placeholder="Mesa 12" className="app-modal-input" {...register("number", { required: "El número es obligatorio" })} />
                        {errors.number ? <span className="text-xs text-red-600">{errors.number.message}</span> : null}
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="app-modal-fieldLabel">Capacidad</label>
                        <input type="number" min="1" placeholder="4" className="app-modal-input" {...register("capacity", { required: "La capacidad es obligatoria" })} />
                        {errors.capacity ? <span className="text-xs text-red-600">{errors.capacity.message}</span> : null}
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="app-modal-fieldLabel">Ubicación</label>
                        <select className="app-modal-select" {...register("location", { required: "La ubicación es obligatoria" })}>
                            <option>Terraza</option>
                            <option>Sala Principal</option>
                            <option>VIP</option>
                            <option>Bar</option>
                            <option>Ventana</option>
                            <option>Balcón</option>
                            <option>Otro</option>
                        </select>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="app-modal-fieldLabel">Estado</label>
                        <select className="app-modal-select" {...register("status") }>
                            <option>Disponible</option>
                            <option>Ocupada</option>
                            <option>Reservada</option>
                            <option>Mantenimiento</option>
                        </select>
                    </div>

                    <div className="flex flex-col gap-2 sm:col-span-1">
                        <label className="app-modal-fieldLabel">Día horario</label>
                        <input placeholder="Lunes" className="app-modal-input" {...register("day")} />
                    </div>

                    <div className="flex flex-col gap-2 col-span-full">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                            <div className="flex flex-col">
                                <label className="app-modal-fieldLabel">Inicio horario</label>
                                <input placeholder="08:00" className="app-modal-input" {...register("startTime")} />
                            </div>

                            <div className="flex flex-col">
                                <label className="app-modal-fieldLabel">Fin horario</label>
                                <input placeholder="22:00" className="app-modal-input" {...register("endTime")} />
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-2 col-span-full items-center">
                        <br />
                        <label className="app-modal-fieldLabel">Descripción</label>
                        <div className="flex justify-center w-full">
                            <textarea rows="4" className="app-modal-textarea w-full md:w-3/4 lg:w-2/3" placeholder="Detalles de la mesa..." {...register("description")} />
                        </div>
                    </div>
                </div>

                <div className="app-modal-actions">
                    <button type="button" onClick={onClose} className="app-modal-btn app-modal-btnSecondary w-full sm:w-auto">Cancelar</button>
                    <button type="submit" className="app-modal-btn app-modal-btnPrimary w-full sm:w-auto">{loading ? "Guardando..." : initialData ? "Guardar cambios" : "Guardar"}</button>
                </div>
            </form>
        </Modal>
    );
};
