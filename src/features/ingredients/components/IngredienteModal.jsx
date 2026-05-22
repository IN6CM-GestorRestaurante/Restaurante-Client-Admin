import { useState } from "react";
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
    const [errors, setErrors] = useState({});

    const [prevInitialData, setPrevInitialData] = useState(null);
    const [prevIsOpen, setPrevIsOpen] = useState(false);

    if (isOpen !== prevIsOpen || initialData !== prevInitialData) {
        setPrevIsOpen(isOpen);
        setPrevInitialData(initialData);

        if (isOpen) {
            setErrors({});
            const nextForm = initialData ? {
// ...
            } : {
// ...
            };
            setForm(nextForm);
        }
    }

    const validate = () => {
        const newErrors = {};
        if (!form.name) newErrors.name = "Obligatorio";
        else if (form.name.length > 25) newErrors.name = "Máx 25 carac.";
        if (!form.costPrice) newErrors.costPrice = "Obligatorio";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async () => {
        if (!validate()) return;
        try {
            await saveIngredient(form, initialData?._id);
            showSuccess(initialData ? "Ingrediente actualizado correctamente" : "Ingrediente creado correctamente");
            onClose?.();
        } catch (error) {
            const serverErrors = error?.response?.data?.errors;
            if (serverErrors && Array.isArray(serverErrors)) {
                const newErrors = {};
                serverErrors.forEach(e => {
                    const field = e.path || e.param;
                    if (field) newErrors[field] = e.msg;
                });
                setErrors(newErrors);
            }
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
                            className={`app-modal-input ${errors.name ? 'border-red-500' : ''}`}
                            placeholder="Ej. Tomate"
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                        />
                        {errors.name && <span className="text-[10px] text-red-500 font-semibold mt-[-4px] ml-1">{errors.name}</span>}
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
                            className={`app-modal-input ${errors.costPrice ? 'border-red-500' : ''}`}
                            placeholder="0.00"
                            value={form.costPrice}
                            onChange={(e) => setForm({ ...form, costPrice: e.target.value })}
                        />
                        {errors.costPrice && <span className="text-[10px] text-red-500 font-semibold mt-[-4px] ml-1">{errors.costPrice}</span>}
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
