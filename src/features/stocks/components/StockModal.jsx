import { useState, useEffect } from "react";
import { Modal } from "../../../shared/ui/Modal";
import { useStocksStore } from "../store/adminStore";
import { getRestaurants, getIngredients } from "../../../shared/api/admin";
import { showError, showSuccess } from "../../../shared/utils/toast";

export const StockModal = ({ isOpen, onClose }) => {
    const upsertStock = useStocksStore((state) => state.upsertStock);
    const loading = useStocksStore((state) => state.loading);
    const [form, setForm] = useState({
        branchId: "",
        ingredientId: "",
        quantity: "",
        minStock: "",
    });
    const [branches, setBranches] = useState([]);
    const [ingredients, setIngredients] = useState([]);
    const [fetchingDeps, setFetchingDeps] = useState(false);

    useEffect(() => {
        if (!isOpen) return;

        setForm({
            branchId: "",
            ingredientId: "",
            quantity: "",
            minStock: "",
        });

        const fetchDependencies = async () => {
            setFetchingDeps(true);
            try {
                const [branchesRes, ingredientsRes] = await Promise.all([
                    getRestaurants({ isActive: true }),
                    getIngredients({ isActive: true })
                ]);
                
                setBranches(branchesRes?.data?.data ?? branchesRes?.data ?? []);
                setIngredients(ingredientsRes?.data?.data ?? ingredientsRes?.data ?? []);
            } catch (error) {
                showError("Error al cargar sucursales e ingredientes");
            } finally {
                setFetchingDeps(false);
            }
        };

        fetchDependencies();
    }, [isOpen]);

    const handleSubmit = async () => {
        try {
            if (!form.branchId || !form.ingredientId || form.quantity === "" || form.minStock === "") {
                return showError("Todos los campos son requeridos");
            }

            await upsertStock({
                branchId: form.branchId,
                ingredientId: form.ingredientId,
                quantity: Number(form.quantity),
                minStock: Number(form.minStock)
            });
            showSuccess("Stock actualizado correctamente");
            onClose?.();
        } catch (error) {
            // Error manejado por el store, pero se captura aquí por si acaso
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Asignar / Actualizar Stock"
            subtitle="Modifica el inventario de un ingrediente en una sucursal"
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
                                className="app-modal-select"
                                value={form.branchId}
                                onChange={(e) => setForm({ ...form, branchId: e.target.value })}
                            >
                                <option value="">Seleccione Sucursal</option>
                                {branches.map(b => (
                                    <option key={b._id} value={b._id}>{b.name}</option>
                                ))}
                            </select>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="app-modal-fieldLabel">Ingrediente</label>
                            <select
                                className="app-modal-select"
                                value={form.ingredientId}
                                onChange={(e) => setForm({ ...form, ingredientId: e.target.value })}
                            >
                                <option value="">Seleccione Ingrediente</option>
                                {ingredients.map(i => (
                                    <option key={i._id} value={i._id}>{i.name} ({i.unit})</option>
                                ))}
                            </select>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="app-modal-fieldLabel">Cantidad actual</label>
                            <input
                                type="number"
                                min="0"
                                step="0.01"
                                className="app-modal-input"
                                placeholder="0.00"
                                value={form.quantity}
                                onChange={(e) => setForm({ ...form, quantity: e.target.value })}
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="app-modal-fieldLabel">Stock Mínimo</label>
                            <input
                                type="number"
                                min="0"
                                step="0.01"
                                className="app-modal-input"
                                placeholder="0.00"
                                value={form.minStock}
                                onChange={(e) => setForm({ ...form, minStock: e.target.value })}
                            />
                        </div>
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
