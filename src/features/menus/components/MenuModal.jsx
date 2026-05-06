import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Modal } from "../../../shared/ui/Modal";
import { useSaveMenu } from "../hooks/useSaveMenu";
import { useMenusStore } from "../store/adminStore";

const defaultValues = {
    restaurant: "",
    name: "",
    description: "",
    ingredients: "",
    price: "",
    category: "Entrada",
    isActive: true,
};

export const MenuModal = ({ isOpen, initialData = null, onClose }) => {
    const { saveMenu } = useSaveMenu();
    const loading = useMenusStore((state) => state.loading);
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
                restaurant: initialData.restaurant?._id ?? initialData.restaurant ?? "",
                name: initialData.name ?? "",
                description: initialData.description ?? "",
                ingredients: Array.isArray(initialData.ingredients) ? initialData.ingredients.join(", ") : initialData.ingredients ?? "",
                price: initialData.price ?? "",
                category: initialData.category ?? "Entrada",
                isActive: initialData.isActive ?? true,
            });
            setPreview(initialData.image ?? null);
            return;
        }

        setPreview(null);
        reset(defaultValues);
    }, [isOpen, initialData, reset]);

    useEffect(() => {
        const subscription = watch((values, { name }) => {
            if (name === "image" && values.image?.length > 0) {
                setPreview(URL.createObjectURL(values.image[0]));
            }
        });

        return () => subscription.unsubscribe();
    }, [watch]);

    const onSubmit = async (data) => {
        await saveMenu(data, initialData?._id ?? null);
        onClose();
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={initialData ? "Editar producto" : "Nuevo producto"}
            subtitle="Completa la información del producto"
        >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div className="flex justify-center pb-2 sm:pb-4">
                    <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-2xl border bg-gray-100 shadow-inner sm:h-28 sm:w-28 md:h-32 md:w-32">
                        {preview ? <img src={preview} alt="Vista previa" className="h-full w-full object-cover" /> : <span className="text-xs text-gray-400 sm:text-sm">Sin imagen</span>}
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 sm:gap-6">
                    <div className="flex flex-col gap-2">
                        <label className="app-modal-fieldLabel">Restaurante</label>
                        <input className="app-modal-input" placeholder="MongoID" {...register("restaurant", { required: "El restaurante es obligatorio" })} />
                        {errors.restaurant ? <span className="text-xs text-red-600">{errors.restaurant.message}</span> : null}
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="app-modal-fieldLabel">Nombre</label>
                        <input className="app-modal-input" placeholder="Ej. Pasta Alfredo" {...register("name", { required: "El nombre es obligatorio" })} />
                        {errors.name ? <span className="text-xs text-red-600">{errors.name.message}</span> : null}
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="app-modal-fieldLabel">Categoría</label>
                        <select className="app-modal-select" {...register("category", { required: "La categoría es obligatoria" })}>
                            <option>Entrada</option>
                            <option>Plato Fuerte</option>
                            <option>Postre</option>
                            <option>Bebida</option>
                            <option>Acompañamiento</option>
                            <option>Otro</option>
                        </select>
                        {errors.category ? <span className="text-xs text-red-600">{errors.category.message}</span> : null}
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="app-modal-fieldLabel">Precio</label>
                        <input type="number" min="0" step="0.01" className="app-modal-input" placeholder="00.00" {...register("price", { required: "El precio es obligatorio" })} />
                        {errors.price ? <span className="text-xs text-red-600">{errors.price.message}</span> : null}
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="app-modal-fieldLabel">Ingredientes</label>
                        <input className="app-modal-input" placeholder="tomate, queso, albahaca" {...register("ingredients", { required: "Los ingredientes son obligatorios" })} />
                        {errors.ingredients ? <span className="text-xs text-red-600">{errors.ingredients.message}</span> : null}
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="app-modal-fieldLabel">Activo</label>
                        <select className="app-modal-select" {...register("isActive") }>
                            <option value={true}>Activo</option>
                            <option value={false}>Inactivo</option>
                        </select>
                    </div>

                    <div className="flex flex-col gap-2 col-span-full">
                        <label className="app-modal-fieldLabel">Descripción</label>
                        <div className="flex justify-center w-full">
                            <textarea className="app-modal-textarea w-full md:w-3/4 lg:w-2/3" placeholder="Detalles del producto..." {...register("description", { required: "La descripción es obligatoria" })} />
                        </div>
                        {errors.description ? <span className="text-xs text-red-600">{errors.description.message}</span> : null}
                    </div>

                    <div className="flex flex-col gap-2 col-span-full">
                        <label className="app-modal-fieldLabel">Imagen</label>
                        <div className="flex justify-center w-full">
                            <input type="file" accept="image/*" className="app-modal-input cursor-pointer border-dashed w-full md:w-3/4 lg:w-2/3" {...register("image")} />
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
