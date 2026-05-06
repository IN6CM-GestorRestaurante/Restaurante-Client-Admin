import { useEffect, useState } from "react";

import { Modal } from "../../../shared/ui/Modal";
import { useMenusStore } from "../store/adminStore";
import { useSaveMenu } from "../hooks/useSaveMenu";
import { showError, showSuccess } from "../../../shared/utils/toast";

export const MenuModal = ({ isOpen, initialData = null, onClose }) => {
    const { saveMenu } = useSaveMenu();
    const loading = useMenusStore((state) => state.loading);
    const [form, setForm] = useState({
        restaurant: "",
        name: "",
        description: "",
        ingredients: "",
        price: "",
        category: "Entrada",
        isActive: true,
        image: [],
    });
    const [preview, setPreview] = useState(null);

    useEffect(() => {
        if (!isOpen) return;

        if (initialData) {
            setForm({
                restaurant: initialData.restaurant ?? "",
                name: initialData.name ?? "",
                description: initialData.description ?? "",
                ingredients: initialData.ingredients ?? "",
                price: initialData.price ?? "",
                category: initialData.category ?? "Entrada",
                isActive: Boolean(initialData.isActive ?? true),
                image: [],
            });
            setPreview(initialData.image ?? null);
        } else {
            setForm({
                restaurant: "",
                name: "",
                description: "",
                ingredients: "",
                price: "",
                category: "Entrada",
                isActive: true,
                image: [],
            });
            setPreview(null);
        }
    }, [initialData, isOpen]);

    const handleFileChange = (event) => {
        const files = event.target.files;
        const file = files?.[0];

        setForm((current) => ({ ...current, image: files ? Array.from(files) : [] }));

        if (file) {
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async () => {
        try {
            await saveMenu(form, initialData?._id);
            showSuccess(initialData ? "Producto actualizado correctamente" : "Producto creado correctamente");
            onClose?.();
        } catch (error) {
            showError(error?.response?.data?.message || error?.message || "Error al guardar producto");
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={initialData ? "Editar producto" : "Nuevo producto"}
            subtitle="Completa la información del producto"
        >
            <div className="flex justify-center pb-2 sm:pb-4">
                <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-2xl border bg-gray-100 shadow-inner sm:h-28 sm:w-28 md:h-32 md:w-32">
                    {preview ? (
                        <img className="h-full w-full object-cover" src={preview} alt="Vista previa de producto" />
                    ) : (
                        <span className="text-xs text-gray-400 sm:text-sm">Sin imagen</span>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 sm:gap-6">
                <div className="flex flex-col gap-2">
                    <label className="app-modal-fieldLabel">Restaurante</label>
                    <input className="app-modal-input" placeholder="MongoID" value={form.restaurant} onChange={(e) => setForm({ ...form, restaurant: e.target.value })} />
                </div>

                <div className="flex flex-col gap-2">
                    <label className="app-modal-fieldLabel">Nombre</label>
                    <input className="app-modal-input" placeholder="Ej. Pasta Alfredo" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                </div>

                <div className="flex flex-col gap-2">
                    <label className="app-modal-fieldLabel">Categoría</label>
                    <select className="app-modal-select" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
                        <option>Entrada</option>
                        <option>Plato Fuerte</option>
                        <option>Postre</option>
                        <option>Bebida</option>
                        <option>Acompañamiento</option>
                        <option>Otro</option>
                    </select>
                </div>

                <div className="flex flex-col gap-2">
                    <label className="app-modal-fieldLabel">Precio</label>
                    <input type="number" min="0" step="0.01" className="app-modal-input" placeholder="00.00" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
                </div>

                <div className="flex flex-col gap-2">
                    <label className="app-modal-fieldLabel">Ingredientes</label>
                    <input className="app-modal-input" placeholder="tomate, queso, albahaca" value={form.ingredients} onChange={(e) => setForm({ ...form, ingredients: e.target.value })} />
                </div>

                <div className="flex flex-col gap-2">
                    <label className="app-modal-fieldLabel">Activo</label>
                    <select className="app-modal-select" value={form.isActive ? "Activo" : "Inactivo"} onChange={(e) => setForm({ ...form, isActive: e.target.value === "Activo" })}>
                        <option>Activo</option>
                        <option>Inactivo</option>
                    </select>
                </div>

                <div className="flex flex-col gap-2 col-span-full">
                    <br />
                    <label className="app-modal-fieldLabel">Descripción</label>
                    <div className="flex justify-center w-full">
                        <textarea className="app-modal-textarea w-full md:w-3/4 lg:w-2/3" placeholder="Detalles del producto..." value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
                    </div>
                </div>

                <div className="flex flex-col gap-2 col-span-full">
                    <label className="app-modal-fieldLabel">Imagen</label>
                    <div className="flex justify-center w-full">
                        <input type="file" accept="image/*" className="app-modal-input cursor-pointer border-dashed w-full md:w-3/4 lg:w-2/3" onChange={handleFileChange} />
                    </div>
                </div>
            </div>

            <div className="app-modal-actions">
                <button type="button" onClick={() => onClose?.()} className="app-modal-btn app-modal-btnSecondary w-full sm:w-auto">Cancelar</button>
                <button type="button" onClick={handleSubmit} className="app-modal-btn app-modal-btnPrimary w-full sm:w-auto" disabled={loading}>{loading ? "Guardando..." : "Guardar"}</button>
            </div>
        </Modal>
    );
};