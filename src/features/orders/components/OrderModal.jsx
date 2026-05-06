import { useState, useEffect } from "react";
import { Modal } from "../../../shared/ui/Modal";
import { useSaveOrder } from "../hooks/useSaveOrder";
import { useOrdersStore } from "../store/adminStore";
import { showError, showSuccess } from "../../../shared/utils/toast";

export const OrderModal = ({ isOpen, initialData = null, onClose }) => {
    const { saveOrder } = useSaveOrder();
    const loading = useOrdersStore((s) => s.loading);

    const [form, setForm] = useState({
        restaurant: "",
        table: "",
        status: "Abierta",
        menuItem: "",
        quantity: 1,
        price: "0.00",
        modifiers: "",
    });

    useEffect(() => {
        if (!isOpen) return;
        if (initialData) {
            setForm({
                restaurant: initialData.restaurant?.name ?? initialData.restaurant ?? "",
                table: initialData.table?.name ?? initialData.table ?? "",
                status: initialData.status ?? "Abierta",
                menuItem: initialData.items?.[0]?.name ?? "",
                quantity: initialData.items?.[0]?.quantity ?? 1,
                price: initialData.items?.[0]?.price ?? "0.00",
                modifiers: initialData.items?.[0]?.modifiers ?? "",
            });
        } else {
            setForm({
                restaurant: "",
                table: "",
                status: "Abierta",
                menuItem: "",
                quantity: 1,
                price: "0.00",
                modifiers: "",
            });
        }
    }, [isOpen, initialData]);

    const handleSubmit = async () => {
        try {
            const payload = {
                restaurant: form.restaurant,
                table: form.table,
                items: [
                    { name: form.menuItem, quantity: Number(form.quantity) || 1, price: Number(form.price) || 0, modifiers: form.modifiers },
                ],
                status: form.status,
            };

            await saveOrder(payload, initialData?._id);
            showSuccess(initialData ? "Orden actualizada correctamente" : "Orden creada correctamente");
            onClose?.();
        } catch (err) {
            showError(err?.response?.data?.message || err?.message || "Error al guardar orden");
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={initialData ? "Editar orden" : "Nueva orden"}
            subtitle="Completa la información de la orden"
        >
            <div className="grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-6">
                <div className="flex flex-col gap-2">
                    <label className="app-modal-fieldLabel">Restaurante</label>
                    <input placeholder="Restaurant" className="app-modal-input" value={form.restaurant} onChange={(e) => setForm({ ...form, restaurant: e.target.value })} />
                </div>

                <div className="flex flex-col gap-2">
                    <label className="app-modal-fieldLabel">Mesa</label>
                    <input placeholder="Mesa" className="app-modal-input" value={form.table} onChange={(e) => setForm({ ...form, table: e.target.value })} />
                </div>

                <div className="flex flex-col gap-2">
                    <label className="app-modal-fieldLabel">Estado orden</label>
                    <select className="app-modal-select" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
                        <option>Abierta</option>
                        <option>Cerrada</option>
                        <option>Cancelada</option>
                    </select>
                </div>

                <div className="flex flex-col gap-2">
                    <label className="app-modal-fieldLabel">Platillo</label>
                    <input className="app-modal-input" value={form.menuItem} onChange={(e) => setForm({ ...form, menuItem: e.target.value })} />
                </div>

                <div className="flex flex-col gap-2">
                    <label className="app-modal-fieldLabel">Cantidad</label>
                    <input type="number" min="1" className="app-modal-input" value={form.quantity} onChange={(e) => setForm({ ...form, quantity: e.target.value })} />
                </div>

                <div className="flex flex-col gap-2">
                    <label className="app-modal-fieldLabel">Precio</label>
                    <input type="number" min="0" step="0.01" className="app-modal-input" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
                </div>

                <div className="flex flex-col gap-2 md:col-span-3">
                    <label className="app-modal-fieldLabel">Modificadores</label>
                    <input placeholder="Sin cebolla, extra queso" className="app-modal-input" value={form.modifiers} onChange={(e) => setForm({ ...form, modifiers: e.target.value })} />
                </div>
            </div>

            <div className="app-modal-actions">
                <button type="button" onClick={() => onClose?.()} className="app-modal-btn app-modal-btnSecondary w-full sm:w-auto">Cancelar</button>
                <button type="button" onClick={handleSubmit} className="app-modal-btn app-modal-btnPrimary w-full sm:w-auto" disabled={loading}>{loading ? "Guardando..." : "Guardar"}</button>
            </div>
        </Modal>
    );
};
