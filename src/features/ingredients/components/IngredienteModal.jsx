import { useState, useEffect } from "react";
import { Modal } from "../../../shared/ui/Modal";
import { useSaveIngredient } from "../hooks/useSaveIngredient";
import { useIngredientsStore } from "../store/adminStore";
import { showError, showSuccess } from "../../../shared/utils/toast";

export const IngredienteModal = ({ isOpen, initialData = null, onClose }) => {
    const { saveIngredient } = useSaveIngredient();
    const loading = useIngredientsStore((state) => state.loading);
    const [form, setForm] = useState({
        name: "",
        unit: "kg",
        costPrice: "",
    });

    useEffect(() => {
        if (!isOpen) return;

        if (initialData) {
            setForm({
                name: initialData.name ?? "",
                unit: initialData.unit ?? "kg",
                costPrice: initialData.costPrice ?? "",
            });
        } else {
            setForm({
                name: "",
                unit: "kg",
                costPrice: "",
            });
        }
    }, [initialData, isOpen]);

    const handleSubmit = async () => {
        try {
            await saveIngredient(form, initialData?._id);
            showSuccess(initialData ? "Ingrediente actualizado correctamente" : "Ingrediente creado correctamente");
            onClose?.();
        } catch (error) {
            showError(error?.response?.data?.message || error?.message || "Error al guardar ingrediente");
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={initialData ? "Editar ingrediente" : "Nuevo ingrediente"}
            subtitle="Completa la información del ingrediente"
            compact
        >
            <div className="space-y-5">
                <div className="grid grid-cols-1 gap-5">
                    <div className="flex flex-col gap-2">
                        <label className="app-modal-fieldLabel">Nombre</label>
                        <input
                            className="app-modal-input"
                            placeholder="Ej. Tomate"
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="app-modal-fieldLabel">Unidad de Medida</label>
                        <select
                            className="app-modal-select"
                            value={form.unit}
                            onChange={(e) => setForm({ ...form, unit: e.target.value })}
                        >
                            <option value="kg">kg</option>
                            <option value="lb">lb</option>
                            <option value="unidad">unidad</option>
                            <option value="litro">litro</option>
                        </select>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="app-modal-fieldLabel">Costo Unitario</label>
                        <input
                            type="number"
                            min="0"
                            step="0.01"
                            className="app-modal-input"
                            placeholder="0.00"
                            value={form.costPrice}
                            onChange={(e) => setForm({ ...form, costPrice: e.target.value })}
                        />
                    </div>
                </div>

                <div className="app-modal-actions">
                    <button
                        type="button"
                        onClick={() => onClose?.()}
                        className="app-modal-btn app-modal-btnSecondary w-full sm:w-auto"
                    >
                        Cancelar
                    </button>
                    <button
                        type="button"
                        onClick={handleSubmit}
                        className="app-modal-btn app-modal-btnPrimary w-full sm:w-auto"
                        disabled={loading}
                    >
                        {loading ? "Guardando..." : "Guardar"}
                    </button>
                </div>
            </div>
        </Modal>
    );
};
