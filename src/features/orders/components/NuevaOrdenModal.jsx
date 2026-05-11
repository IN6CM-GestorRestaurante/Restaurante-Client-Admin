import { useState, useEffect } from "react";
import { Modal } from "../../../shared/ui/Modal";
import { useOrdersStore } from "../store/adminStore";
import { useAuthStore } from "../../auth/store/authStore";
import { getTables, getMenus } from "../../../shared/api/admin";
import { showError, showSuccess } from "../../../shared/utils/toast";

export const NuevaOrdenModal = ({ isOpen, branchId, onClose }) => {
    const createOrder = useOrdersStore((s) => s.createOrder);
    const loading = useOrdersStore((s) => s.loading);
    const user = useAuthStore((s) => s.user);
    const role = user?.role;

    const [tables, setTables] = useState([]);
    const [menus, setMenus] = useState([]);
    const [selectedTables, setSelectedTables] = useState([]);
    const [items, setItems] = useState([{ menuItem: "", quantity: 1 }]);

    useEffect(() => {
        if (!isOpen || !branchId) return;
        const load = async () => {
            try {
                const [tRes, mRes] = await Promise.all([
                    getTables({ branch: branchId }),
                    getMenus({ branch: branchId }),
                ]);
                setTables((tRes?.data?.data ?? tRes?.data ?? []).filter((t) => t.status === "Disponible"));
                setMenus(mRes?.data?.data ?? mRes?.data ?? []);
            } catch { /* ignore */ }
        };
        load();
        setSelectedTables([]);
        setItems([{ menuItem: "", quantity: 1 }]);
    }, [isOpen, branchId]);

    const toggleTable = (id) => {
        setSelectedTables((prev) =>
            prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
        );
    };

    const updateItem = (idx, field, value) => {
        setItems((prev) => {
            const copy = [...prev];
            copy[idx] = { ...copy[idx], [field]: value };
            return copy;
        });
    };

    const addItem = () => setItems((prev) => [...prev, { menuItem: "", quantity: 1 }]);
    const removeItem = (idx) => setItems((prev) => prev.filter((_, i) => i !== idx));

    const handleSubmit = async () => {
        if (selectedTables.length === 0) return showError("Selecciona al menos una mesa");
        const validItems = items.filter((i) => i.menuItem);
        if (validItems.length === 0) return showError("Agrega al menos un platillo");

        const payload = {
            tables: selectedTables,
            items: validItems.map((i) => ({ menuItem: i.menuItem, quantity: Number(i.quantity) })),
        };

        // Solo admins necesitan enviar branch explícitamente
        if (["COMPANY_ADMIN", "BRANCH_MANAGER", "SUPER_ADMIN", "ADMIN_ROLE"].includes(role)) {
            payload.branch = branchId;
        }

        try {
            await createOrder(payload);
            showSuccess("Orden creada exitosamente");
            onClose?.();
        } catch (err) {
            showError(err?.response?.data?.message || err?.message || "Error al crear orden");
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Nueva Orden" subtitle="Selecciona mesas y platillos">
            <div className="space-y-5">
                {/* Mesas */}
                <div>
                    <label className="app-modal-fieldLabel mb-2 block">Mesas disponibles</label>
                    <div className="flex flex-wrap gap-2">
                        {tables.length === 0 && <span className="text-xs text-stone-400">No hay mesas disponibles</span>}
                        {tables.map((t) => (
                            <button
                                key={t._id}
                                type="button"
                                onClick={() => toggleTable(t._id)}
                                className="px-3 py-2 rounded-lg text-sm font-semibold border transition"
                                style={{
                                    backgroundColor: selectedTables.includes(t._id) ? "#fed7aa" : "#f5f5f4",
                                    borderColor: selectedTables.includes(t._id) ? "#ea580c" : "#d6d3d1",
                                    color: selectedTables.includes(t._id) ? "#9a3412" : "#57534e",
                                }}
                            >
                                <i className="fas fa-chair mr-1"></i>
                                {t.number} ({t.capacity}p)
                            </button>
                        ))}
                    </div>
                </div>

                {/* Items */}
                <div>
                    <div className="flex items-center justify-between mb-2">
                        <label className="app-modal-fieldLabel">Platillos</label>
                        <button
                            type="button"
                            onClick={addItem}
                            className="text-xs font-semibold px-3 py-1 rounded-lg bg-orange-50 text-orange-700 border border-orange-200 hover:bg-orange-100 transition"
                        >
                            <i className="fas fa-plus mr-1"></i> Agregar
                        </button>
                    </div>
                    <div className="flex flex-col gap-3">
                        {items.map((item, idx) => (
                            <div key={idx} className="grid grid-cols-1 sm:grid-cols-[1fr_80px_40px] gap-2 items-end p-3 rounded-lg bg-gray-50 border border-gray-100">
                                <div className="flex flex-col gap-1">
                                    <label className="text-xs text-stone-500">Platillo</label>
                                    <select
                                        className="app-modal-select"
                                        value={item.menuItem}
                                        onChange={(e) => updateItem(idx, "menuItem", e.target.value)}
                                    >
                                        <option value="">-- Seleccionar --</option>
                                        {menus.map((m) => (
                                            <option key={m._id} value={m._id}>
                                                {m.name} — Q{m.price}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label className="text-xs text-stone-500">Cant.</label>
                                    <input
                                        type="number"
                                        min="1"
                                        className="app-modal-input"
                                        value={item.quantity}
                                        onChange={(e) => updateItem(idx, "quantity", e.target.value)}
                                    />
                                </div>
                                <div className="flex items-end">
                                    {items.length > 1 && (
                                        <button type="button" onClick={() => removeItem(idx)} className="text-red-500 hover:text-red-700 text-sm py-2">
                                            <i className="fas fa-xmark"></i>
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="app-modal-actions">
                    <button type="button" onClick={onClose} className="app-modal-btn app-modal-btnSecondary w-full sm:w-auto">Cancelar</button>
                    <button type="button" onClick={handleSubmit} disabled={loading} className="app-modal-btn app-modal-btnPrimary w-full sm:w-auto">
                        {loading ? "Creando..." : "Crear Orden"}
                    </button>
                </div>
            </div>
        </Modal>
    );
};
