import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Modal } from "../../../shared/ui/Modal";
import { useSaveLocation } from "../hooks/useSaveLocation";
import { useLocationsStore } from "../store/adminStore";

const defaultValues = {
    name: "",
    descripcion: "",
    address: "",
    openingTime: "08:00",
    closingTime: "22:00",
    category: "",
    averagePrice: "",
    email: "",
    phoneNumber: "",
    state: "Operativa",
};

export const SucursalModal = ({ isOpen, initialData = null, onClose }) => {
    const { saveLocation } = useSaveLocation();
    const loading = useLocationsStore((state) => state.loading);
    const [preview, setPreview] = useState(null);

    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors },
    } = useForm({ defaultValues });

    useEffect(() => {
        if (!isOpen) {
            setPreview(null);
            reset(defaultValues);
            return;
        }

        if (initialData) {
            reset({
                name: initialData.name ?? "",
                descripcion: initialData.descripcion ?? "",
                address: initialData.address ?? "",
                openingTime: initialData.openingTime ?? "08:00",
                closingTime: initialData.closingTime ?? "22:00",
                category: initialData.category ?? "",
                averagePrice: initialData.averagePrice ?? "",
                email: initialData.email ?? "",
                phoneNumber: initialData.phoneNumber ?? "",
                state: initialData.state ?? "Operativa",
            });
            setPreview(initialData.photos?.[0] ?? null);
            return;
        }

        setPreview(null);
        reset(defaultValues);
    }, [isOpen, initialData, reset]);

    useEffect(() => {
        const subscription = watch((values, { name }) => {
            if (name === "photos" && values.photos?.length > 0) {
                setPreview(URL.createObjectURL(values.photos[0]));
            }
        });

        return () => subscription.unsubscribe();
    }, [watch]);

    const onSubmit = async (data) => {
        await saveLocation(data, initialData?._id ?? null);
        onClose();
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={initialData ? "Editar sucursal" : "Nueva sucursal"}
            subtitle="Completa la información de la sucursal"
        >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div className="flex justify-center pb-2 sm:pb-4">
                    <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-2xl border bg-gray-100 shadow-inner sm:h-28 sm:w-28 md:h-32 md:w-32">
                        {preview ? <img src={preview} alt="Vista previa" className="h-full w-full object-cover" /> : <span className="text-xs text-gray-400 sm:text-sm">Sin imagen</span>}
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 sm:gap-6">
                    <div className="flex flex-col gap-2">
                        <label className="app-modal-fieldLabel">Nombre</label>
                        <input className="app-modal-input" placeholder="Sucursal Centro" {...register("name", { required: "El nombre es obligatorio" })} />
                        {errors.name ? <span className="text-xs text-red-600">{errors.name.message}</span> : null}
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="app-modal-fieldLabel">Teléfono</label>
                        <input className="app-modal-input" placeholder="+50212345678" {...register("phoneNumber", { required: "El teléfono es obligatorio" })} />
                        {errors.phoneNumber ? <span className="text-xs text-red-600">{errors.phoneNumber.message}</span> : null}
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="app-modal-fieldLabel">Correo</label>
                        <input type="email" className="app-modal-input" {...register("email", { required: "El correo es obligatorio" })} />
                        {errors.email ? <span className="text-xs text-red-600">{errors.email.message}</span> : null}
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="app-modal-fieldLabel">Dirección</label>
                        <input className="app-modal-input" placeholder="Avenida principal 123" {...register("address", { required: "La dirección es obligatoria" })} />
                        {errors.address ? <span className="text-xs text-red-600">{errors.address.message}</span> : null}
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="app-modal-fieldLabel">Apertura</label>
                        <input type="time" className="app-modal-input" {...register("openingTime", { required: "La hora de apertura es obligatoria" })} />
                        {errors.openingTime ? <span className="text-xs text-red-600">{errors.openingTime.message}</span> : null}
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="app-modal-fieldLabel">Cierre</label>
                        <input type="time" className="app-modal-input" {...register("closingTime", { required: "La hora de cierre es obligatoria" })} />
                        {errors.closingTime ? <span className="text-xs text-red-600">{errors.closingTime.message}</span> : null}
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="app-modal-fieldLabel">Categoría</label>
                        <input className="app-modal-input" placeholder="Italiana" {...register("category", { required: "La categoría es obligatoria" })} />
                        {errors.category ? <span className="text-xs text-red-600">{errors.category.message}</span> : null}
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="app-modal-fieldLabel">Precio promedio</label>
                        <input type="number" min="0" step="0.01" className="app-modal-input" placeholder="00.00" {...register("averagePrice", { required: "El precio promedio es obligatorio" })} />
                        {errors.averagePrice ? <span className="text-xs text-red-600">{errors.averagePrice.message}</span> : null}
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="app-modal-fieldLabel">Estado</label>
                        <select className="app-modal-select" {...register("state")}> 
                            <option>Operativa</option>
                            <option>En mantenimiento</option>
                            <option>Cerrada</option>
                        </select>
                    </div>

                    <div className="flex flex-col gap-2 col-span-full">
                        <label className="app-modal-fieldLabel">Imagen</label>
                        <div className="flex justify-center w-full">
                            <input type="file" accept="image/*" className="app-modal-input cursor-pointer border-dashed w-full md:w-3/4 lg:w-2/3" {...register("photos")} />
                        </div>
                    </div>

                    <div className="flex flex-col gap-2 col-span-full">
                        <label className="app-modal-fieldLabel">Descripción</label>
                        <div className="flex justify-center w-full">
                            <textarea className="app-modal-textarea w-full md:w-3/4 lg:w-2/3" placeholder="Detalles de la sucursal..." {...register("descripcion", { required: "La descripción es obligatoria" })} />
                        </div>
                        {errors.descripcion ? <span className="text-xs text-red-600">{errors.descripcion.message}</span> : null}
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
