import { useState, useEffect } from "react";
import { Modal } from "../../../shared/ui/Modal";
import { useStocksStore } from "../store/adminStore";
import { getRestaurants, getIngredients } from "../../../shared/api/admin";
import { showError, showSuccess } from "../../../shared/utils/toast";

export const StockModal = ({ isOpen, onClose, editingStock }) => {
    const upsertStock = useStocksStore((state) => state.upsertStock);
    const updateStock = useStocksStore((state) => state.updateStock);
    const loading = useStocksStore((state) => state.loading);
    const [form, setForm] = useState({
        branchId: "",
        ingredientId: "",
        quantity: "",
        minStock: "",
        reason: "",
    });
    const [branches, setBranches] = useState([]);
    const [ingredients, setIngredients] = useState([]);
    const [fetchingDeps, setFetchingDeps] = useState(false);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (!isOpen) return;

        setErrors({});
        
        if (editingStock) {
            setForm({
                branchId: editingStock.branchId?._id || editingStock.branchId || "",
                ingredientId: editingStock.ingredientId?._id || editingStock.ingredientId || "",
                quantity: editingStock.quantity ?? "",
                minStock: editingStock.minStock ?? "",
                reason: "",
            });
        } else {
            setForm({
                branchId: "",
                ingredientId: "",
                quantity: "",
                minStock: "",
                reason: "",
            });
        }

        const fetchDependencies = async () => {
            setFetchingDeps(true);
            try {
                const [branchesRes, ingredientsRes] = await Promise.all([
                    getRestaurants({ isActive: true }),
                    getIngredients({ isActive: true })
                ]);
                
                setBranches(branchesRes?.data?.data ?? branchesRes?.data ?? []);
                setIngredients(ingredientsRes?.data?.data ?? ingredientsRes?.data ?? []);
            } catch {
                showError("Error al cargar sucursales e ingredientes");
            } finally {
                setFetchingDeps(false);
            }
        };

        fetchDependencies();
    }, [isOpen, editingStock]);

    const validate = () => {
        const newErrors = {};
        if (!form.branchId) newErrors.branchId = "Obligatorio";
        if (!form.ingredientId) newErrors.ingredientId = "Obligatorio";
        if (form.quantity === "") newErrors.quantity = "Obligatorio";
        if (form.minStock === "") newErrors.minStock = "Obligatorio";
        if (editingStock && !form.reason.trim()) {
            newErrors.reason = "Obligatorio para auditar el cambio";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async () => {
        if (!validate()) return;
        try {
            if (editingStock) {
                await updateStock(editingStock._id, {
                    quantity: Number(form.quantity),
                    minStock: Number(form.minStock),
                    reason: form.reason.trim()
                });
                showSuccess("Stock editado y auditado exitosamente");
            } else {
                await upsertStock({
                    branchId: form.branchId,
                    ingredientId: form.ingredientId,
                    quantity: Number(form.quantity),
                    minStock: Number(form.minStock)
                });
                showSuccess("Stock asignado exitosamente");
            }
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
            } else {
                showError(error?.response?.data?.message || "Error al guardar stock");
            }
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={editingStock ? "Editar Registro de Stock" : "Asignar / Crear Stock"}
            subtitle={editingStock ? "Modifica y audita los valores del inventario de este ingrediente" : "Modifica el inventario de un ingrediente en una sucursal"}
            compact
        >
            <div className="space-y-5">
                {fetchingDeps ? (
                    <div className="flex justify-center p-4"><p className="text-sm text-gray-500">Cargando dependencias...</p></div>
                ) : (
                    <div className="grid grid-cols-1 gap-5">
                        <div className="flex flex-col gap-2">
                            <label className="app-modal-fieldLabel">Sucursal</label>
                            <select
                                disabled={!!editingStock}
                                className={`app-modal-select ${errors.branchId ? 'border-red-500' : ''} ${editingStock ? 'bg-stone-100 cursor-not-allowed opacity-80' : ''}`}
                                value={form.branchId}
                                onChange={(e) => setForm({ ...form, branchId: e.target.value })}
                            >
                                <option value="">Seleccione Sucursal</option>
                                {branches.map(b => (
                                    <option key={b._id} value={b._id}>{b.name}</option>
                                ))}
                            </select>
                            {errors.branchId && <span className="text-[10px] text-red-500 font-semibold mt-[-4px] ml-1">{errors.branchId}</span>}
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="app-modal-fieldLabel">Ingrediente</label>
                            <select
                                disabled={!!editingStock}
                                className={`app-modal-select ${errors.ingredientId ? 'border-red-500' : ''} ${editingStock ? 'bg-stone-100 cursor-not-allowed opacity-80' : ''}`}
                                value={form.ingredientId}
                                onChange={(e) => setForm({ ...form, ingredientId: e.target.value })}
                            >
                                <option value="">Seleccione Ingrediente</option>
                                {ingredients.map(i => (
                                    <option key={i._id} value={i._id}>{i.name} ({i.unit})</option>
                                ))}
                            </select>
                            {errors.ingredientId && <span className="text-[10px] text-red-500 font-semibold mt-[-4px] ml-1">{errors.ingredientId}</span>}
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="app-modal-fieldLabel">Cantidad actual</label>
                            <input
                                type="number"
                                min="0"
                                step="0.01"
                                className={`app-modal-input ${errors.quantity ? 'border-red-500' : ''}`}
                                placeholder="0.00"
                                value={form.quantity}
                                onChange={(e) => setForm({ ...form, quantity: e.target.value })}
                            />
                            {errors.quantity && <span className="text-[10px] text-red-500 font-semibold mt-[-4px] ml-1">{errors.quantity}</span>}
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="app-modal-fieldLabel">Stock Mínimo</label>
                            <input
                                type="number"
                                min="0"
                                step="0.01"
                                className={`app-modal-input ${errors.minStock ? 'border-red-500' : ''}`}
                                placeholder="0.00"
                                value={form.minStock}
                                onChange={(e) => setForm({ ...form, minStock: e.target.value })}
                            />
                            {errors.minStock && <span className="text-[10px] text-red-500 font-semibold mt-[-4px] ml-1">{errors.minStock}</span>}
                        </div>

                        {!!editingStock && (
                            <div className="flex flex-col gap-2">
                                <label className="app-modal-fieldLabel">Motivo del Cambio</label>
                                <input
                                    type="text"
                                    className={`app-modal-input ${errors.reason ? 'border-red-500' : ''}`}
                                    placeholder="Ej. Conteo físico semanal, merma, error de registro..."
                                    value={form.reason}
                                    onChange={(e) => setForm({ ...form, reason: e.target.value })}
                                />
                                {errors.reason && <span className="text-[10px] text-red-500 font-semibold mt-[-4px] ml-1">{errors.reason}</span>}
                            </div>
                        )}
                    </div>
                )}

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
                        disabled={loading || fetchingDeps}
                    >
                        {loading ? "Guardando..." : "Guardar"}
                    </button>
                </div>
            </div>
        </Modal>
    );
};
