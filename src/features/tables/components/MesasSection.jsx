import { useEffect, useState } from "react";
import { useTablesStore } from "../store/adminStore";
import { TableModal } from "./TableModal";
import { Modal } from "../../../shared/ui/Modal";
import { showError, showSuccess } from "../../../shared/utils/toast";

const STATUS_COLORS = {
    Disponible: { bg: "#dcfce7", color: "#166534" },
    Ocupada: { bg: "#fee2e2", color: "#991b1b" },
    Reservada: { bg: "#fef9c3", color: "#854d0e" },
    Mantenimiento: { bg: "#e0e7ff", color: "#3730a3" },
};

export const MesasSection = () => {
    const { tables, loading, error, getTables, deleteTable } = useTablesStore();
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [selectedTable, setSelectedTable] = useState(null);

    useEffect(() => {
        getTables?.();
    }, [getTables]);

    useEffect(() => {
        if (error) showError(error);
    }, [error]);

    const handleCreate = () => {
        setSelectedTable(null);
        setIsCreateOpen(true);
    };

    const handleEdit = (table) => {
        setSelectedTable(table);
        setIsCreateOpen(true);
    };

    const handleDelete = async () => {
        try {
            if (selectedTable?._id) {
                await deleteTable?.(selectedTable._id);
                showSuccess("Mesa desactivada");
            }
        } catch {
            showError("Error al desactivar mesa");
        } finally {
            setIsDeleteOpen(false);
            setSelectedTable(null);
        }
    };

    const tableRows = (tables || []).filter((t) => t?.isActive !== false);
    const available = tableRows.filter((t) => t.status === "Disponible").length;
    const occupied = tableRows.filter((t) => t.status === "Ocupada").length;
    const reserved = tableRows.filter((t) => t.status === "Reservada").length;

    const formatSchedules = (schedules) => {
        if (!Array.isArray(schedules) || schedules.length === 0) return "Sin horario";
        return schedules.map((s) => `${s.day} ${s.startTime}-${s.endTime}`).join(", ");
    };

    return (
        <>
            <header className="header">
                <div className="space-y-1 px-1 pb-4 sm:px-0 sm:pb-5">
                    <div className="flex items-center gap-3">
                        <span className="h-6 w-1 rounded-full bg-linear-to-b from-orange-500 to-amber-500" />
                        <h2 className="text-2xl font-bold text-stone-900 tracking-tight sm:text-3xl">Gestor de Mesas</h2>
                    </div>
                    <p className="text-stone-500 text-sm leading-relaxed mb-4 sm:mb-6 sm:text-base">Configura zonas, estado y disponibilidad de mesas.</p>
                </div>
                <button className="btn danger" type="button" onClick={handleCreate}>Nueva mesa</button>
            </header>

            <section className="section space-y-8">
                <div className="top mb-4 sm:mb-6">
                    <p style={{ fontSize: "13px", color: "#6f6f78" }}>Gestión centralizada de mesas y zonas del restaurante.</p>
                </div>

                <section className="kpis">
                    <article className="kpi"><span>Total mesas</span><strong>{loading ? "Cargando..." : tableRows.length}</strong></article>
                    <article className="kpi"><span>Disponibles</span><strong style={{ color: "#166534" }}>{available}</strong></article>
                    <article className="kpi"><span>Ocupadas</span><strong style={{ color: "#991b1b" }}>{occupied}</strong></article>
                    <article className="kpi"><span>Reservadas</span><strong style={{ color: "#854d0e" }}>{reserved}</strong></article>
                </section>

                <div className="crud-cards-grid crud-cards-gridCompact">
                    {tableRows.map((table) => {
                        const statusStyle = STATUS_COLORS[table.status] || {};
                        return (
                            <article key={table._id} className="crud-card crud-cardCompact crud-cardPost crud-cardDense">
                                <div className="crud-cardMedia crud-cardPostMedia">
                                    <div className="crud-cardMediaBox crud-cardMediaBoxIcon crud-cardMediaThemeTables">
                                        <i className="fas fa-chair crud-cardMediaIcon" aria-hidden="true"></i>
                                    </div>

                                    <div className="crud-cardOverlayActions">
                                        <button
                                            type="button"
                                            className="crud-cardAction crud-cardActionEdit crud-cardOverlayAction"
                                            aria-label="Editar mesa"
                                            onClick={() => handleEdit(table)}
                                        >
                                            <i className="fas fa-pen-to-square"></i>
                                        </button>
                                        <button
                                            type="button"
                                            className="crud-cardAction crud-cardActionDelete crud-cardOverlayAction"
                                            aria-label="Desactivar mesa"
                                            onClick={() => { setSelectedTable(table); setIsDeleteOpen(true); }}
                                        >
                                            <i className="fas fa-trash"></i>
                                        </button>
                                    </div>
                                </div>

                                <div className="crud-cardHeader">
                                    <div className="crud-cardTitleGroup">
                                        <span className="crud-cardEyebrow"><i className="fas fa-chair"></i> Mesa</span>
                                        <h3 className="crud-cardTitle">{table.number || "Sin número"}</h3>
                                    </div>
                                    <span
                                        className="crud-cardBadge"
                                        style={{
                                            backgroundColor: statusStyle.bg,
                                            color: statusStyle.color,
                                            border: `1px solid ${statusStyle.color}22`,
                                        }}
                                    >
                                        {table.status || "Sin estado"}
                                    </span>
                                </div>

                                <div className="crud-cardBody crud-cardPostBodyCols">
                                    <div className="crud-cardField">
                                        <span className="crud-cardFieldLabel">Capacidad</span>
                                        <div className="crud-cardFieldValue">{table.capacity ? `${table.capacity} personas` : "—"}</div>
                                    </div>
                                    <div className="crud-cardField">
                                        <span className="crud-cardFieldLabel">Ubicación</span>
                                        <div className="crud-cardFieldValue">{table.location || "—"}</div>
                                    </div>
                                    <div className="crud-cardField">
                                        <span className="crud-cardFieldLabel">Horario</span>
                                        <div className="crud-cardFieldValue">{formatSchedules(table.availabilitySchedules)}</div>
                                    </div>
                                    {table.description && (
                                        <div className="crud-cardField">
                                            <span className="crud-cardFieldLabel">Descripción</span>
                                            <div className="crud-cardFieldValue">{table.description}</div>
                                        </div>
                                    )}
                                </div>
                            </article>
                        );
                    })}
                </div>
            </section>

            <TableModal
                isOpen={isCreateOpen}
                initialData={selectedTable}
                onClose={() => {
                    setIsCreateOpen(false);
                    setSelectedTable(null);
                }}
            />

            <Modal
                isOpen={isDeleteOpen}
                onClose={() => setIsDeleteOpen(false)}
                title="Desactivar mesa"
                subtitle="Confirma la desactivación del registro"
                compact
            >
                <p className="text-sm leading-6 text-slate-700">La mesa seleccionada será desactivada. ¿Deseas continuar?</p>
                <div className="app-modal-actions">
                    <button type="button" onClick={() => setIsDeleteOpen(false)} className="app-modal-btn app-modal-btnSecondary w-full sm:w-auto">Cancelar</button>
                    <button type="button" onClick={handleDelete} className="app-modal-btn app-modal-btnPrimary w-full sm:w-auto">Desactivar</button>
                </div>
            </Modal>

            <div className="toast-zone"></div>
        </>
    );
};
