import { useState, useEffect } from "react";
import { ReservationModal } from "./ReservationModal";
import { Modal } from "../../../shared/ui/Modal";
import { useReservationsStore } from "../store/adminStore";
import { showError, showSuccess } from "../../../shared/utils/toast";

const STATUS_THEMES = {
    Pendiente:   { label: "Pendiente",  bg: "#fffbeb", color: "#b45309", border: "#fef3c7" },
    Confirmada:  { label: "Confirmada", bg: "#ecfdf5", color: "#047857", border: "#d1fae5" },
    "En curso":  { label: "En curso",   bg: "#eff6ff", color: "#1d4ed8", border: "#dbeafe" },
    Completada:  { label: "Completada", bg: "#f0fdf4", color: "#15803d", border: "#dcfce7" },
    Cancelada:   { label: "Cancelada",  bg: "#fef2f2", color: "#b91c1c", border: "#fee2e2" },
};

export const ReservacionesSection = () => {
    const { reservations, loading, getReservations, deleteReservation } = useReservationsStore();
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [selectedReservation, setSelectedReservation] = useState(null);
    const safeReservations = Array.isArray(reservations) ? reservations : [];

    const confirmReservation = useReservationsStore((s) => s.confirmReservation);

    useEffect(() => {
        getReservations();
    }, [getReservations]);

    const handleConfirm = async (id) => {
        try {
            await confirmReservation(id);
            showSuccess("Reservación confirmada correctamente");
        } catch (err) {
            showError(err?.response?.data?.message || err?.message || "Error al confirmar reservación");
        }
    };

    const handleDelete = async () => {
        try {
            if (selectedReservation?._id) {
                await deleteReservation(selectedReservation._id);
                showSuccess("Reservación eliminada correctamente");
            }
        } catch (err) {
            showError(err?.response?.data?.message || err?.message || "Error al eliminar reservación");
        } finally {
            setIsDeleteOpen(false);
            setSelectedReservation(null);
        }
    };

    return (
        <div className="space-y-8 rounded-3xl bg-white/70 p-4 shadow-sm sm:p-6 lg:p-8">
            <header className="header flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1 px-1 pb-4 sm:px-0 sm:pb-5">
                    <div className="flex items-center gap-3">
                        <span className="h-6 w-1 rounded-full bg-linear-to-b from-orange-500 to-amber-500" />
                        <h2 className="text-2xl font-bold text-stone-900 tracking-tight sm:text-3xl">Gestión de Reservaciones</h2>
                    </div>
                    <p className="text-stone-500 text-sm leading-relaxed mb-4 sm:mb-6 sm:text-base">Control inteligente de salones, comensales y asignación óptima de mesas.</p>
                </div>
                <button 
                    className="btn primary bg-linear-to-r from-red-500 to-orange-500 border-none font-bold shadow-md shadow-orange-500/10 hover:shadow-orange-500/25 active:scale-[0.98] transition-all cursor-pointer" 
                    type="button" 
                    onClick={() => { setSelectedReservation(null); setIsCreateOpen(true); }}
                >
                    <i className="fas fa-plus mr-1" /> Nueva Reservación
                </button>
            </header>

            {/* KPIs */}
            <section className="kpis grid grid-cols-1 gap-5 sm:grid-cols-3">
                <article className="kpi bg-white p-5 rounded-2xl border border-stone-200 shadow-sm flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-orange-50 flex items-center justify-center border border-orange-100 text-orange-600">
                        <i className="fas fa-calendar-alt text-lg" />
                    </div>
                    <div>
                        <span className="text-stone-500 text-xs font-semibold block">Total de Reservas</span>
                        <strong className="text-2xl font-black text-stone-800">{loading ? "..." : safeReservations.length}</strong>
                    </div>
                </article>

                <article className="kpi bg-white p-5 rounded-2xl border border-stone-200 shadow-sm flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center border border-emerald-100 text-emerald-600">
                        <i className="fas fa-calendar-check text-lg" />
                    </div>
                    <div>
                        <span className="text-stone-500 text-xs font-semibold block">Confirmadas</span>
                        <strong className="text-2xl font-black text-emerald-700">
                            {safeReservations.filter((r) => r.status === "Confirmada").length}
                        </strong>
                    </div>
                </article>

                <article className="kpi bg-white p-5 rounded-2xl border border-stone-200 shadow-sm flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center border border-amber-100 text-amber-600">
                        <i className="fas fa-clock text-lg" />
                    </div>
                    <div>
                        <span className="text-stone-500 text-xs font-semibold block">Pendientes</span>
                        <strong className="text-2xl font-black text-amber-700">
                            {safeReservations.filter((r) => r.status === "Pendiente").length}
                        </strong>
                    </div>
                </article>
            </section>

            {/* Reservations Cards Grid */}
            <section className="section bg-white p-6 rounded-2xl border border-stone-200 shadow-sm">
                <div className="top border-b border-stone-100 pb-4 mb-8">
                    <h3 className="text-base font-bold text-stone-800">Listado de Reservaciones Activas</h3>
                </div>

                {loading && safeReservations.length === 0 ? (
                    <div className="flex min-h-56 flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-stone-200 bg-stone-50 py-12 text-stone-400">
                        <i className="fas fa-spinner fa-spin text-2xl text-orange-500" />
                        <span className="text-xs font-semibold">Cargando reservaciones del sistema...</span>
                    </div>
                ) : safeReservations.length === 0 ? (
                    <div className="text-center py-16 text-stone-400 font-semibold text-xs border border-dashed border-stone-200 rounded-2xl bg-stone-50">
                        <i className="fas fa-calendar-times text-3xl text-stone-300 block mb-3" />
                        No se encontraron reservaciones registradas en el sistema.
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {safeReservations.map((reservation) => {
                            const theme = STATUS_THEMES[reservation.status] || STATUS_THEMES.Pendiente;
                            const tablesStr = reservation.tables?.map(t => t.number || t.name || t).join(', ') || "Ninguna";
                            const branchName = reservation.branch?.alias || reservation.branch?.name || "Sucursal";

                            return (
                                <article 
                                    key={reservation._id} 
                                    className="bg-white rounded-2xl border border-stone-200 shadow-sm hover:shadow-md transition-all flex flex-col overflow-hidden relative group hover:border-orange-500/20"
                                >
                                    {/* Action Hover Panel */}
                                    <div className="absolute right-4 top-4 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity z-10 bg-white/95 p-1 rounded-lg shadow-sm border border-stone-100">
                                        {reservation.status === "Pendiente" && (
                                            <button
                                                type="button"
                                                onClick={() => handleConfirm(reservation._id)}
                                                className="flex h-7 w-7 items-center justify-center rounded-md bg-emerald-50 hover:bg-emerald-100 text-emerald-600 border-none cursor-pointer transition-colors"
                                                title="Confirmar Reservación"
                                            >
                                                <i className="fas fa-check text-xs" />
                                            </button>
                                        )}
                                        
                                        <button
                                            type="button"
                                            onClick={() => { setSelectedReservation(reservation); setIsCreateOpen(true); }}
                                            className="flex h-7 w-7 items-center justify-center rounded-md bg-stone-50 hover:bg-stone-100 text-stone-600 border-none cursor-pointer transition-colors"
                                            title="Editar Reservación"
                                        >
                                            <i className="fas fa-pen text-xs" />
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() => { setSelectedReservation(reservation); setIsDeleteOpen(true); }}
                                            className="flex h-7 w-7 items-center justify-center rounded-md bg-red-50 hover:bg-red-100 text-red-600 border-none cursor-pointer transition-colors"
                                            title="Eliminar Reservación"
                                        >
                                            <i className="fas fa-trash text-xs" />
                                        </button>
                                    </div>

                                    {/* Top decoration gradient */}
                                    <div className="h-1.5 bg-linear-to-r from-orange-500 to-red-500" />

                                    {/* Card Header */}
                                    <div className="p-5 border-b border-stone-100 flex items-start justify-between gap-4">
                                        <div className="min-w-0">
                                            <span className="inline-flex items-center gap-1 text-[10px] font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded-md uppercase tracking-wider mb-2">
                                                <i className="fas fa-calendar-day" /> Mesa(s) {tablesStr}
                                            </span>
                                            <h3 className="text-base font-bold text-stone-800 leading-snug truncate">
                                                {reservation.guestName || "Cliente Desconocido"}
                                            </h3>
                                            <span className="text-xs text-stone-500 font-semibold block mt-0.5">
                                                <i className="fas fa-store mr-1 text-stone-400" /> {branchName}
                                            </span>
                                        </div>

                                        <span 
                                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold border shrink-0"
                                            style={{ 
                                                backgroundColor: theme.bg, 
                                                color: theme.color,
                                                borderColor: theme.border
                                            }}
                                        >
                                            {theme.label}
                                        </span>
                                    </div>

                                    {/* Card Body */}
                                    <div className="p-5 flex-1 grid grid-cols-2 gap-4 text-xs font-semibold">
                                        <div className="space-y-0.5">
                                            <span className="text-[10px] text-stone-400 block font-bold uppercase tracking-wider">Fecha / Hora</span>
                                            <span className="text-stone-700">
                                                {reservation.date ? new Date(reservation.date).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' }) : "Sin fecha"}
                                            </span>
                                        </div>

                                        <div className="space-y-0.5">
                                            <span className="text-[10px] text-stone-400 block font-bold uppercase tracking-wider">Comensales</span>
                                            <span className="text-stone-700 flex items-center gap-1">
                                                <i className="fas fa-users text-stone-400" /> {reservation.guestsCount || 1} personas
                                            </span>
                                        </div>

                                        {reservation.notes && (
                                            <div className="col-span-2 space-y-0.5 border-t border-stone-100 pt-3 mt-1">
                                                <span className="text-[10px] text-stone-400 block font-bold uppercase tracking-wider">Observaciones</span>
                                                <p className="text-stone-600 font-medium leading-relaxed italic">
                                                    "{reservation.notes}"
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </article>
                            );
                        })}
                    </div>
                )}
            </section>

            <ReservationModal
                isOpen={isCreateOpen}
                initialData={selectedReservation}
                onClose={() => {
                    setIsCreateOpen(false);
                    setSelectedReservation(null);
                }}
            />

            <Modal
                isOpen={isDeleteOpen}
                onClose={() => setIsDeleteOpen(false)}
                title="Eliminar Reservación"
                subtitle="Operación destructiva irreversible"
                compact
            >
                <p className="text-sm leading-relaxed text-stone-600">
                    ¿Estás seguro de que deseas eliminar permanentemente la reservación para <strong className="text-stone-800">{selectedReservation?.guestName}</strong>? Esta acción liberará las mesas reservadas y no se podrá deshacer.
                </p>
                
                <div className="app-modal-actions border-t border-stone-100 pt-4 mt-6">
                    <button type="button" onClick={() => setIsDeleteOpen(false)} className="app-modal-btn app-modal-btnSecondary w-full sm:w-auto">
                        Cancelar
                    </button>
                    <button type="button" onClick={handleDelete} className="app-modal-btn app-modal-btnPrimary w-full sm:w-auto bg-red-600 border-none hover:bg-red-700">
                        Confirmar y Eliminar
                    </button>
                </div>
            </Modal>
        </div>
    );
};
