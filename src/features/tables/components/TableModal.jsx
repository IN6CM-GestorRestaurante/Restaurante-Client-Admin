import { useState, useEffect } from "react";
import { Modal } from "../../../shared/ui/Modal";
import { useTablesStore } from "../store/adminStore";
import { useSaveTable } from "../hooks/useSaveTable";
import { useLocationsStore } from "../../locations/store/adminStore";
import { showError, showSuccess } from "../../../shared/utils/toast";

const LOCATIONS = ["Terraza", "Sala Principal", "VIP", "Bar", "Ventana", "Balcón", "Otro"];
const STATUSES = ["Disponible", "Ocupada", "Reservada", "Mantenimiento"];
const DAYS = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];

const emptySchedule = () => ({ day: "Lunes", startTime: "08:00", endTime: "22:00" });

const defaultForm = {
    branch: "",
    number: "",
    capacity: "",
    location: "Sala Principal",
    status: "Disponible",
    description: "",
    schedules: [emptySchedule()],
};

export const TableModal = ({ isOpen, onClose, initialData }) => {
    const { saveTable } = useSaveTable();
    const loading = useTablesStore((s) => s.loading);

    // Cargar sucursales para el select
    const branches = useLocationsStore((s) => s.locations);
    const getBranches = useLocationsStore((s) => s.getLocations);

    const [form, setForm] = useState({ ...defaultForm });

    useEffect(() => {
        if (isOpen) getBranches?.();
    }, [isOpen, getBranches]);

    const [prevInitialData, setPrevInitialData] = useState(null);
    const [prevIsOpen, setPrevIsOpen] = useState(false);

    if (isOpen !== prevIsOpen || initialData !== prevInitialData) {
        setPrevIsOpen(isOpen);
        setPrevInitialData(initialData);

        if (isOpen) {
            const schedules = initialData && Array.isArray(initialData.availabilitySchedules) && initialData.availabilitySchedules.length > 0
                ? initialData.availabilitySchedules.map((s) => ({
                    day: s.day || "Lunes",
                    startTime: s.startTime || "08:00",
                    endTime: s.endTime || "22:00",
                }))
                : [emptySchedule()];

            const nextForm = initialData ? {
                branch: initialData.branch?._id || initialData.branch || "",
                number: initialData.number ?? "",
                capacity: initialData.capacity ?? "",
                location: initialData.location ?? "Sala Principal",
                status: initialData.status ?? "Disponible",
                description: initialData.description ?? "",
                schedules,
            } : { ...defaultForm, schedules: [emptySchedule()] };
            setForm(nextForm);
        }
    }

    const updateSchedule = (index, field, value) => {
        setForm((prev) => {
            const updated = [...prev.schedules];
            updated[index] = { ...updated[index], [field]: value };
            return { ...prev, schedules: updated };
        });
    };

    const addSchedule = () => {
        setForm((prev) => ({ ...prev, schedules: [...prev.schedules, emptySchedule()] }));
    };

    const removeSchedule = (index) => {
        setForm((prev) => ({
            ...prev,
            schedules: prev.schedules.filter((_, i) => i !== index),
        }));
    };

    const handleSubmit = async () => {
        try {
            await saveTable(form, initialData?._id);
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
            <div className="space-y-5">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 sm:gap-6">
                    {/* Sucursal */}
                    <div className="flex flex-col gap-2">
                        <label className="app-modal-fieldLabel">Sucursal</label>
                        <select
                            className="app-modal-select"
                            value={form.branch}
                            onChange={(e) => setForm({ ...form, branch: e.target.value })}
                        >
                            <option value="">-- Seleccionar --</option>
                            {(branches || []).map((b) => (
                                <option key={b._id} value={b._id}>{b.name}</option>
                            ))}
                        </select>
                    </div>

                    {/* Número */}
                    <div className="flex flex-col gap-2">
                        <label className="app-modal-fieldLabel">Número / Código</label>
                        <input
                            className="app-modal-input"
                            placeholder="T01"
                            value={form.number}
                            onChange={(e) => setForm({ ...form, number: e.target.value })}
                        />
                    </div>

                    {/* Capacidad */}
                    <div className="flex flex-col gap-2">
                        <label className="app-modal-fieldLabel">Capacidad</label>
                        <input
                            type="number"
                            min="1"
                            className="app-modal-input"
                            placeholder="4"
                            value={form.capacity}
                            onChange={(e) => setForm({ ...form, capacity: e.target.value })}
                        />
                    </div>

                    {/* Ubicación */}
                    <div className="flex flex-col gap-2">
                        <label className="app-modal-fieldLabel">Ubicación</label>
                        <select
                            className="app-modal-select"
                            value={form.location}
                            onChange={(e) => setForm({ ...form, location: e.target.value })}
                        >
                            {LOCATIONS.map((loc) => (
                                <option key={loc} value={loc}>{loc}</option>
                            ))}
                        </select>
                    </div>

                    {/* Estado */}
                    <div className="flex flex-col gap-2">
                        <label className="app-modal-fieldLabel">Estado</label>
                        <select
                            className="app-modal-select"
                            value={form.status}
                            onChange={(e) => setForm({ ...form, status: e.target.value })}
                        >
                            {STATUSES.map((st) => (
                                <option key={st} value={st}>{st}</option>
                            ))}
                        </select>
                    </div>

                    {/* Descripción */}
                    <div className="flex flex-col gap-2 col-span-full">
                        <label className="app-modal-fieldLabel">Descripción (opcional)</label>
                        <textarea
                            className="app-modal-textarea w-full"
                            rows="2"
                            placeholder="Mesa esquinera junto a la ventana..."
                            maxLength={200}
                            value={form.description}
                            onChange={(e) => setForm({ ...form, description: e.target.value })}
                        />
                    </div>
                </div>

                {/* Horarios de disponibilidad */}
                <div className="flex flex-col" style={{ gap: "20px", marginTop: "35px" }}>
                    <div className="flex items-center justify-between" style={{ marginBottom: "35px" }}>
                        <label className="app-modal-fieldLabel">Horarios de disponibilidad</label>
                        <button
                            type="button"
                            onClick={addSchedule}
                            className="text-xs font-semibold px-3 py-1 rounded-lg bg-orange-50 text-orange-700 border border-orange-200 hover:bg-orange-100 transition"
                        >
                            <i className="fas fa-plus mr-1"></i> Agregar horario
                        </button>
                    </div>

                    {form.schedules.map((schedule, idx) => (
                        <div key={idx} className="grid grid-cols-1 sm:grid-cols-4 gap-3 items-end p-3 rounded-lg bg-gray-50 border border-gray-100">
                            <div className="flex flex-col gap-1">
                                <label className="text-xs text-stone-500">Día</label>
                                <select
                                    className="app-modal-select"
                                    value={schedule.day}
                                    onChange={(e) => updateSchedule(idx, "day", e.target.value)}
                                >
                                    {DAYS.map((d) => (
                                        <option key={d} value={d}>{d}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex flex-col gap-1">
                                <label className="text-xs text-stone-500">Apertura</label>
                                <input
                                    type="time"
                                    className="app-modal-input"
                                    value={schedule.startTime}
                                    onChange={(e) => updateSchedule(idx, "startTime", e.target.value)}
                                />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label className="text-xs text-stone-500">Cierre</label>
                                <input
                                    type="time"
                                    className="app-modal-input"
                                    value={schedule.endTime}
                                    onChange={(e) => updateSchedule(idx, "endTime", e.target.value)}
                                />
                            </div>
                            <div className="flex items-end">
                                {form.schedules.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => removeSchedule(idx)}
                                        className="text-xs text-red-500 hover:text-red-700 font-semibold py-2"
                                    >
                                        <i className="fas fa-xmark mr-1"></i> Quitar
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Acciones */}
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
