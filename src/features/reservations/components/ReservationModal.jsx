import { useState, useEffect } from "react";
import { Modal } from "../../../shared/ui/Modal";
import { useSaveReservation } from "../hooks/useSaveReservation";
import { useReservationsStore } from "../store/adminStore";
import { getRestaurants, getSmartTableAllocation } from "../../../shared/api/admin";
import { showError, showSuccess } from "../../../shared/utils/toast";

const TABLE_LOCATIONS = ["Todos", "Terraza", "Sala Principal", "VIP", "Bar", "Ventana", "Balcón", "Otro"];

export const ReservationModal = ({ isOpen, initialData = null, onClose }) => {
    const { saveReservation } = useSaveReservation();
    const loading = useReservationsStore((s) => s.loading);

    const [form, setForm] = useState({
        guestName: "",
        branch: "",
        guestsCount: 1,
        location: "Todos",
        date: "",
        tables: [],
        status: "Pendiente",
        notes: "",
    });

    const [branches, setBranches] = useState([]);
    const [smartTables, setSmartTables] = useState([]);
    const [allocationStrategy, setAllocationStrategy] = useState("");
    const [smartLoading, setSmartLoading] = useState(false);

    const [prevInitialData, setPrevInitialData] = useState(null);
    const [prevIsOpen, setPrevIsOpen] = useState(false);

    // Initialize/Reset form on modal open or initialData change
    if (isOpen !== prevIsOpen || initialData !== prevInitialData) {
        setPrevIsOpen(isOpen);
        setPrevInitialData(initialData);

        if (isOpen) {
            const nextForm = initialData ? {
                guestName: initialData.guestName ?? "",
                branch: initialData.branch?._id ?? initialData.branch ?? "",
                guestsCount: initialData.guestsCount ?? 1,
                location: initialData.location ?? "Todos",
                date: initialData.date ? new Date(initialData.date).toISOString().slice(0, 16) : "",
                tables: initialData.tables?.map((t) => t._id ?? t) ?? [],
                status: initialData.status ?? "Pendiente",
                notes: initialData.notes ?? "",
            } : {
                guestName: "",
                branch: "",
                guestsCount: 1,
                location: "Todos",
                date: "",
                tables: [],
                status: "Pendiente",
                notes: "",
            };
            setForm(nextForm);
            setSmartTables([]);
            setAllocationStrategy("");
        }
    }

    // Load active sucursales/branches on mount
    useEffect(() => {
        const fetchBranches = async () => {
            try {
                const res = await getRestaurants({ isActive: true });
                setBranches(res.data?.data || res.data || res || []);
            } catch (err) {
                console.error("Error al cargar sucursales:", err);
            }
        };
        fetchBranches();
    }, []);

    // Trigger Smart Table Allocation whenever branch, guestsCount, location, or date changes
    useEffect(() => {
        if (!isOpen) return;
        const { branch, guestsCount, location, date } = form;
        if (!branch || !guestsCount || !date) {
            setSmartTables([]);
            setAllocationStrategy("");
            return;
        }

        const fetchSmartAllocation = async () => {
            setSmartLoading(true);
            try {
                const res = await getSmartTableAllocation({
                    branchId: branch,
                    guestsCount: Number(guestsCount),
                    location: location || "Todos",
                    date: new Date(date).toISOString()
                });

                const data = res.data || res || {};
                const available = data.availableTables || [];
                const allocated = data.allocatedTables || [];
                
                setSmartTables(available);
                setAllocationStrategy(data.strategy || "Combinación recomendada");

                // Auto pre-select allocated tables for new reservations
                if (!initialData) {
                    setForm(prev => ({
                        ...prev,
                        tables: allocated.map(t => t._id || t)
                    }));
                }
            } catch (err) {
                console.error("Error en Smart Table Allocation:", err);
                setSmartTables([]);
                setAllocationStrategy("");
            } finally {
                setSmartLoading(false);
            }
        };

        // Debounce allocation requests slightly to avoid spamming the backend
        const timer = setTimeout(fetchSmartAllocation, 400);
        return () => clearTimeout(timer);
    }, [form.branch, form.guestsCount, form.location, form.date, isOpen, initialData]);

    const handleTableToggle = (tableId) => {
        setForm(prev => {
            const isSelected = prev.tables.includes(tableId);
            const nextTables = isSelected
                ? prev.tables.filter(id => id !== tableId)
                : [...prev.tables, tableId];
            return { ...prev, tables: nextTables };
        });
    };

    const handleSubmit = async () => {
        if (!form.guestName?.trim()) {
            showError("El nombre del cliente es obligatorio");
            return;
        }
        if (!form.branch) {
            showError("Debe seleccionar una sucursal");
            return;
        }
        if (!form.date) {
            showError("Debe seleccionar la fecha y hora de la reservación");
            return;
        }
        if (form.tables.length === 0) {
            showError("Debe asignar al menos una mesa para la reservación");
            return;
        }

        try {
            await saveReservation(form, initialData?._id);
            showSuccess(initialData ? "Reservación actualizada con éxito" : "Reservación registrada con éxito");
            onClose?.();
        } catch (err) {
            showError(err?.response?.data?.message || err?.message || "Error al guardar reservación");
        }
    };

    return (
        <Modal 
            isOpen={isOpen} 
            onClose={onClose} 
            title={initialData ? "Editar Reservación" : "Nueva Reservación"} 
            subtitle="Asignación inteligente de salones y optimización de mesas."
        >
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">
                
                {/* Cliente */}
                <div className="flex flex-col gap-2">
                    <label className="app-modal-fieldLabel font-semibold text-stone-700 text-sm">Cliente Legal (Nombre)</label>
                    <input 
                        type="text"
                        placeholder="Ej: Oliver Mérida" 
                        className="app-modal-input" 
                        value={form.guestName} 
                        onChange={(e) => setForm({ ...form, guestName: e.target.value })} 
                    />
                </div>

                {/* Sucursal */}
                <div className="flex flex-col gap-2">
                    <label className="app-modal-fieldLabel font-semibold text-stone-700 text-sm">Sucursal</label>
                    <select 
                        className="app-modal-select" 
                        value={form.branch} 
                        onChange={(e) => setForm({ ...form, branch: e.target.value, tables: [] })}
                    >
                        <option value="">Seleccione Sucursal...</option>
                        {branches.map(b => (
                            <option key={b._id} value={b._id}>{b.alias || b.name}</option>
                        ))}
                    </select>
                </div>

                {/* Personas / Comensales */}
                <div className="flex flex-col gap-2">
                    <label className="app-modal-fieldLabel font-semibold text-stone-700 text-sm">Número de Comensales</label>
                    <input 
                        type="number" 
                        min="1" 
                        max="50"
                        className="app-modal-input" 
                        value={form.guestsCount} 
                        onChange={(e) => setForm({ ...form, guestsCount: Math.max(1, Number(e.target.value)) })} 
                    />
                </div>

                {/* Tipo de Mesa / Ubicación */}
                <div className="flex flex-col gap-2">
                    <label className="app-modal-fieldLabel font-semibold text-stone-700 text-sm">Tipo de Mesa</label>
                    <select 
                        className="app-modal-select" 
                        value={form.location} 
                        onChange={(e) => setForm({ ...form, location: e.target.value })}
                    >
                        {TABLE_LOCATIONS.map(loc => (
                            <option key={loc} value={loc}>{loc === "Todos" ? "Todos los tipos" : loc}</option>
                        ))}
                    </select>
                </div>

                {/* Fecha y Hora */}
                <div className="flex flex-col gap-2">
                    <label className="app-modal-fieldLabel font-semibold text-stone-700 text-sm">Fecha y Hora</label>
                    <div className="flex gap-3">
                        <input 
                            type="date" 
                            className="app-modal-input flex-1" 
                            value={form.date ? form.date.split("T")[0] : ""} 
                            onChange={(e) => {
                                const newDate = e.target.value;
                                const currentTime = (form.date && form.date.includes("T")) ? form.date.split("T")[1] : "12:00";
                                setForm({ ...form, date: `${newDate}T${currentTime}` });
                            }} 
                        />
                        <input 
                            type="time" 
                            className="app-modal-input flex-1" 
                            value={form.date && form.date.includes("T") ? form.date.split("T")[1] : ""} 
                            onChange={(e) => {
                                const newTime = e.target.value;
                                const currentDate = form.date ? form.date.split("T")[0] : new Date().toISOString().split("T")[0];
                                setForm({ ...form, date: `${currentDate}T${newTime}` });
                            }} 
                        />
                    </div>
                </div>

                {/* Asignador de Mesas (Smart Table) */}
                <div className="flex flex-col gap-2 col-span-full border-t border-stone-100 pt-4">
                    <div className="flex items-center justify-between gap-4 mb-2">
                        <label className="app-modal-fieldLabel font-bold text-stone-800 text-sm">
                            Asignación de Mesas
                        </label>
                        {allocationStrategy && (
                            <span className="px-2.5 py-0.5 text-[10px] font-bold text-orange-700 bg-orange-50 border border-orange-100 rounded-md uppercase tracking-wider">
                                <i className="fas fa-magic mr-1" /> {allocationStrategy}
                            </span>
                        )}
                    </div>

                    {smartLoading ? (
                        <div className="flex flex-col items-center justify-center p-6 bg-stone-50 border border-stone-100 rounded-xl gap-2">
                            <i className="fas fa-circle-notch fa-spin text-orange-500 text-lg" />
                            <span className="text-xs text-stone-500 font-medium">Buscando combinación óptima...</span>
                        </div>
                    ) : smartTables.length === 0 ? (
                        <div className="p-5 text-center text-stone-400 bg-stone-50 border border-stone-200/60 rounded-2xl text-xs font-semibold">
                            {form.branch && form.date 
                                ? "No hay mesas disponibles en esta sucursal y horario para el número de personas indicado." 
                                : "Seleccione sucursal, comensales y horario para cargar la disponibilidad inteligente."
                            }
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 bg-stone-50/50 p-4 border border-stone-200/80 rounded-2xl">
                            {smartTables.map((table) => {
                                const isChecked = form.tables.includes(table._id);
                                return (
                                    <label 
                                        key={table._id}
                                        className={`flex items-center gap-3 p-3 rounded-xl border transition-all cursor-pointer select-none ${
                                            isChecked 
                                                ? "bg-orange-500/10 border-orange-500/30 shadow-xs" 
                                                : "bg-white border-stone-200 hover:border-stone-300"
                                        }`}
                                    >
                                        <input 
                                            type="checkbox"
                                            checked={isChecked}
                                            onChange={() => handleTableToggle(table._id)}
                                            className="accent-orange-500 h-4 w-4 rounded-md shrink-0 cursor-pointer"
                                        />
                                        <div className="min-w-0">
                                            <span className="block text-xs font-bold text-stone-800 truncate">
                                                Mesa {table.number || table.name}
                                            </span>
                                            <span className="block text-[10px] text-stone-500 font-medium leading-none mt-0.5">
                                                Cap: {table.capacity} p.
                                            </span>
                                        </div>
                                    </label>
                                );
                            })}
                        </div>
                    )}
                </div>

                {/* Estado */}
                <div className="flex flex-col gap-2">
                    <label className="app-modal-fieldLabel font-semibold text-stone-700 text-sm">Estado</label>
                    <select 
                        className="app-modal-select" 
                        value={form.status} 
                        onChange={(e) => setForm({ ...form, status: e.target.value })}
                    >
                        <option value="Pendiente">Pendiente</option>
                        <option value="Confirmada">Confirmada</option>
                        <option value="En curso">En curso</option>
                        <option value="Completada">Completada</option>
                        <option value="Cancelada">Cancelada</option>
                    </select>
                </div>

                {/* Notas */}
                <div className="flex flex-col gap-2 col-span-full">
                    <label className="app-modal-fieldLabel font-semibold text-stone-700 text-sm">Notas u Observaciones</label>
                    <textarea 
                        className="app-modal-textarea" 
                        placeholder="Ej: Cliente prefiere mesa cerca de la ventana o solicita silla para bebé..." 
                        rows={2}
                        value={form.notes} 
                        onChange={(e) => setForm({ ...form, notes: e.target.value })} 
                    />
                </div>
            </div>

            <div className="app-modal-actions border-t border-stone-100 pt-4 mt-6">
                <button 
                    type="button" 
                    onClick={onClose} 
                    className="app-modal-btn app-modal-btnSecondary w-full sm:w-auto"
                >
                    Cancelar
                </button>
                
                <button 
                    type="button" 
                    onClick={handleSubmit} 
                    className="app-modal-btn app-modal-btnPrimary w-full sm:w-auto bg-linear-to-r from-red-500 to-orange-500 border-none font-bold uppercase shadow-md shadow-orange-500/10 hover:shadow-orange-500/25 active:scale-[0.98] transition-all" 
                    disabled={loading}
                >
                    {loading ? "Guardando..." : "Guardar"}
                </button>
            </div>
        </Modal>
    );
};
