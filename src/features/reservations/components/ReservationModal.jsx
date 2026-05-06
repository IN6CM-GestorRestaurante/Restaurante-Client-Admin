import { useState, useEffect } from "react";
import { Modal } from "../../../shared/ui/Modal";
import { useSaveReservation } from "../hooks/useSaveReservation";
import { useReservationsStore } from "../store/adminStore";
import { showError, showSuccess } from "../../../shared/utils/toast";

export const ReservationModal = ({ isOpen, initialData = null, onClose }) => {
    const { saveReservation } = useSaveReservation();
    const loading = useReservationsStore((s) => s.loading);

    const [form, setForm] = useState({
        user: "",
        restaurant: "",
        date: "",
        table: "",
        type: "En Mesa",
        deliveryAddress: "",
        items: [],
        status: "Pendiente",
        notes: "",
    });

    useEffect(() => {
        if (!isOpen) return;
        if (initialData) {
            setForm({
                user: initialData.user ?? "",
                restaurant: initialData.restaurant ?? "",
                date: initialData.date ?? "",
                table: initialData.table ?? "",
                type: initialData.type ?? "En Mesa",
                deliveryAddress: initialData.deliveryAddress ?? "",
                items: initialData.items ?? [],
                status: initialData.status ?? "Pendiente",
                notes: initialData.notes ?? "",
            });
        } else {
            setForm({
                user: "",
                restaurant: "",
                date: "",
                table: "",
                type: "En Mesa",
                deliveryAddress: "",
                items: [],
                status: "Pendiente",
                notes: "",
            });
        }
    }, [isOpen, initialData]);

    const handleSubmit = async () => {
        try {
            await saveReservation(form, initialData?._id);
            showSuccess(initialData ? "Reservación actualizada" : "Reservación creada");
            onClose?.();
        } catch (err) {
            showError(err?.response?.data?.message || err?.message || "Error al guardar reservación");
        }
    };

    return (
        <Modal 
            isOpen={isOpen} 
            onClose={onClose} 
            title={initialData ? "Editar reservación" : "Nueva reservación"} 
            subtitle="Completa la información de la reservación"
        >
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 sm:gap-6">
                <div className="flex flex-col gap-2">
                    <label className="app-modal-fieldLabel">Usuario</label>
                    <input placeholder="MongoID" className="app-modal-input" value={form.user} onChange={(e) => setForm({ ...form, user: e.target.value })} />
                </div>

                <div className="flex flex-col gap-2">
                    <label className="app-modal-fieldLabel">Restaurante</label>
                    <input placeholder="MongoID" className="app-modal-input" value={form.restaurant} onChange={(e) => setForm({ ...form, restaurant: e.target.value })} />
                </div>

                <div className="flex flex-col gap-2">
                    <label className="app-modal-fieldLabel">Fecha y hora</label>
                    <input placeholder="2026-04-26T19:30:00.000Z" className="app-modal-input" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
                </div>

                <div className="flex flex-col gap-2">
                    <label className="app-modal-fieldLabel">Mesa</label>
                    <input placeholder="Requerido para En Mesa" className="app-modal-input" value={form.table} onChange={(e) => setForm({ ...form, table: e.target.value })} />
                </div>

                <div className="flex flex-col gap-2">
                    <label className="app-modal-fieldLabel">Tipo</label>
                    <select className="app-modal-select" value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
                        <option>En Mesa</option>
                        <option>Para llevar</option>
                        <option>A domicilio</option>
                    </select>
                </div>

                <div className="flex flex-col gap-2">
                    <label className="app-modal-fieldLabel">Dirección entrega</label>
                    <input placeholder="Requerido para A domicilio" className="app-modal-input" value={form.deliveryAddress} onChange={(e) => setForm({ ...form, deliveryAddress: e.target.value })} />
                </div>

                <div className="flex flex-col gap-2">
                    <label className="app-modal-fieldLabel">Item menú (ID)</label>
                    <input placeholder="MongoID" className="app-modal-input" value={(form.items[0] && form.items[0].menu) || ""} onChange={(e) => setForm({ ...form, items: [{ ...form.items[0], menu: e.target.value }] })} />
                </div>

                <div className="flex flex-col gap-2">
                    <label className="app-modal-fieldLabel">Cantidad item</label>
                    <input type="number" min="1" className="app-modal-input" value={(form.items[0] && form.items[0].quantity) || 1} onChange={(e) => setForm({ ...form, items: [{ ...form.items[0], quantity: Number(e.target.value) }] })} />
                </div>

                <div className="flex flex-col gap-2">
                    <label className="app-modal-fieldLabel">Estado</label>
                    <select className="app-modal-select" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
                        <option>Confirmada</option>
                        <option>Pendiente</option>
                        <option>En curso</option>
                        <option>Completada</option>
                        <option>Cancelada</option>
                    </select>
                </div>

                <div className="flex flex-col gap-2 col-span-full">
                    <br />
                    <label className="app-modal-fieldLabel">Notas</label>
                    <div className="flex justify-center w-full">
                        <textarea className="app-modal-textarea w-full md:w-3/4 lg:w-2/3" placeholder="Observaciones..." value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} />
                    </div>
                </div>
            </div>

            <div className="app-modal-actions">
                <button type="button" onClick={onClose} className="app-modal-btn app-modal-btnSecondary w-full sm:w-auto">Cancelar</button>
                <button type="button" onClick={handleSubmit} className="app-modal-btn app-modal-btnPrimary w-full sm:w-auto" disabled={loading}>{loading ? "Guardando..." : "Guardar"}</button>
            </div>
        </Modal>
    );
};
