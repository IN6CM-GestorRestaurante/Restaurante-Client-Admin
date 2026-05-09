import { useEffect, useState } from "react";

import { Modal } from "../../../shared/ui/Modal";
import { useTablesStore } from "../store/adminStore";
import { useSaveTable } from "../hooks/useSaveTable";
import { showError, showSuccess } from "../../../shared/utils/toast";

export const TableModal = ({ isOpen, onClose, initialData }) => {
    const { saveTable } = useSaveTable();
    const loading = useTablesStore((state) => state.loading);
    const [form, setForm] = useState({
        restaurant: "",
        number: "",
        capacity: "",
        location: "",
        status: "Disponible",
        day: "Lunes",
        startTime: "08:00",
        endTime: "22:00",
        description: "",
    });

    useEffect(() => {
        if (!isOpen) return;

        if (initialData) {
            const scheduleText = String(initialData.availabilitySchedules || "").trim();
            const [parsedDay = "Lunes", parsedTimeRange = "08:00-22:00"] = scheduleText.split(" ");
            const [parsedStart = "08:00", parsedEnd = "22:00"] = parsedTimeRange.split("-");
            setForm({
                restaurant: initialData.restaurant ?? "",
                number: initialData.number ?? "",
                capacity: initialData.capacity ?? "",
                location: initialData.location ?? "",
                status: initialData.status ?? "Disponible",
                day: parsedDay,
                startTime: parsedStart,
                endTime: parsedEnd,
                description: initialData.description ?? "",
            });
        } else {
            setForm({
                restaurant: "",
                number: "",
                capacity: "",
                location: "",
                status: "Disponible",
                day: "Lunes",
                startTime: "08:00",
                endTime: "22:00",
                description: "",
            });
        }
    }, [initialData, isOpen]);

    const handleSubmit = async () => {
        try {
            const payload = {
                restaurant: form.restaurant,
                number: form.number,
                capacity: form.capacity,
                location: form.location,
                status: form.status,
                availabilitySchedules: `${form.day} ${form.startTime}-${form.endTime}`,
                description: form.description,
            };

            await saveTable(payload, initialData?._id);
            showSuccess(initialData ? "Mesa actualizada correctamente" : "Mesa creada correctamente");
            onClose?.();
        } catch (error) {
            showError(error?.response?.data?.message || error?.message || "Error al guardar mesa");
        }
    };

    return (
        <Modal 
            isOpen={isOpen} 
            onClose={onClose} 
            title={initialData ? "Editar mesa" : "Nueva mesa"} 
            subtitle="Completa la información de la mesa"
        >
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 sm:gap-6">
                <div className="flex flex-col gap-2">
                    <label className="app-modal-fieldLabel">Restaurante</label>
                    <input placeholder="MongoID" className="app-modal-input" value={form.restaurant} onChange={(e) => setForm({ ...form, restaurant: e.target.value })} />
                </div>

                <div className="flex flex-col gap-2">
                    <label className="app-modal-fieldLabel">Número</label>
                    <input placeholder="Mesa 12" className="app-modal-input" value={form.number} onChange={(e) => setForm({ ...form, number: e.target.value })} />
                </div>

                <div className="flex flex-col gap-2">
                    <label className="app-modal-fieldLabel">Capacidad</label>
                    <input type="number" min="1" placeholder="4" className="app-modal-input" value={form.capacity} onChange={(e) => setForm({ ...form, capacity: e.target.value })} />
                </div>

                <div className="flex flex-col gap-2">
                    <label className="app-modal-fieldLabel">Ubicación</label>
                    <select className="app-modal-select" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })}>
                        <option>Terraza</option>
                        <option>Sala Principal</option>
                        <option>VIP</option>
                        <option>Bar</option>
                        <option>Ventana</option>
                        <option>Balcón</option>
                        <option>Otro</option>
                    </select>
                </div>

                <div className="flex flex-col gap-2">
                    <label className="app-modal-fieldLabel">Estado</label>
                    <select className="app-modal-select" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
                        <option>Disponible</option>
                        <option>Ocupada</option>
                        <option>Reservada</option>
                        <option>Mantenimiento</option>
                    </select>
                </div>

                <div className="flex flex-col gap-2 sm:col-span-1">
                    <label className="app-modal-fieldLabel">Día horario</label>
                    <input placeholder="Lunes" className="app-modal-input" value={form.day} onChange={(e) => setForm({ ...form, day: e.target.value })} />
                </div>

                <div className="flex flex-col gap-2 col-span-full">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                        <div className="flex flex-col">
                            <label className="app-modal-fieldLabel">Inicio horario</label>
                            <input placeholder="08:00" className="app-modal-input" value={form.startTime} onChange={(e) => setForm({ ...form, startTime: e.target.value })} />
                        </div>
                    </div>

                        <div className="flex flex-col">
                            <label className="app-modal-fieldLabel">Fin horario</label>
                            <input placeholder="22:00" className="app-modal-input" value={form.endTime} onChange={(e) => setForm({ ...form, endTime: e.target.value })} />
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-2 col-span-full items-center">
                        <br />
                        <label className="app-modal-fieldLabel">Descripción</label>
                            <div className="flex justify-center w-full">
                                <textarea rows="4" className="app-modal-textarea w-full md:w-3/4 lg:w-2/3" placeholder="Detalles de la mesa..." value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
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
