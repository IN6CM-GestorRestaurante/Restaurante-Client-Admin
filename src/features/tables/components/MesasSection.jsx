import { useEffect, useState } from "react";
import { useEffect as useToastEffect } from "react";
import { useTablesStore } from "../../tables/store/adminStore";
import { showError } from "../../../shared/utils/toast";
import { TableModal } from "./TableModal";
import { useModal } from "../../../shared/ui/hooks/useModal";
import { Modal } from "../../../shared/ui/Modal";

export const MesasSection = () => {
    const { tables, loading, error, getTables, deleteTable } = useTablesStore();
    const { isOpen: openModal, openModal: setOpenModalTrue, closeModal: setOpenModalFalse } = useModal(false);
    const [selectedTable, setSelectedTable] = useState(null);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);

    const handleDelete = async () => {
        try {
            if (selectedTable?._id) {
                await deleteTable?.(selectedTable._id);
            }
        } catch {
            // store handles error
        } finally {
            setIsDeleteOpen(false);
            setSelectedTable(null);
        }
    };

    useEffect(() => {
        getTables?.();
    }, [getTables]);

    useToastEffect(() => {
        if (error) showError(error);
    }, [error]);

    // delete action disabled (admin API not exposing delete endpoint)

    const tableRows = tables?.length
        ? tables
        : [{
            _id: "sample-table",
            restaurant: "Sin datos",
            number: "Sin datos",
            capacity: "Sin datos",
            location: "Sala Principal",
            status: "Disponible",
            availabilitySchedules: "Lunes 08:00-22:00",
            description: "Sin datos",
        }];

    return (
        <>
            <header className="header">
                <div>
                    <h2>CRUD de Mesas</h2>
                    <p>Configura zonas, estado y disponibilidad de mesas.</p>
                </div>
                <button className="btn danger" type="button" onClick={() => { setSelectedTable(null); setOpenModalTrue(); }}>Nueva mesa</button>
            </header>

            <section className="section">
                <div className="top">
                    <p style={{ fontSize: "13px", color: "#6f6f78" }}>Gestion centralizada de mesas y zonas del restaurante.</p>
                </div>

                <section className="kpis">
                    <article className="kpi"><span>Total mesas</span><strong>{loading ? "Cargando..." : (tables?.length ?? "Sin datos")}</strong></article>
                    <article className="kpi"><span>Disponibles</span><strong>Sin datos</strong></article>
                    <article className="kpi"><span>Fuera de servicio</span><strong>Sin datos</strong></article>
                </section>

                <div className="crud-cards-grid crud-cards-gridCompact">
                    {tableRows.map((table) => (
                        <article key={table._id || table.number} className="crud-card crud-cardCompact crud-cardPost crud-cardDense">
                            <div className="crud-cardMedia crud-cardPostMedia">
                                <div className="crud-cardMediaBox crud-cardMediaBoxIcon crud-cardMediaThemeTables">
                                    <i className="fas fa-chair crud-cardMediaIcon" aria-hidden="true"></i>
                                </div>

                                <div className="crud-cardOverlayActions">
                                    <button
                                        type="button"
                                        className="crud-cardAction crud-cardActionEdit crud-cardOverlayAction"
                                        aria-label="Editar mesa"
                                        onClick={() => { setSelectedTable(table); setOpenModalTrue(); }}
                                    >
                                        <i className="fas fa-pen-to-square"></i>
                                    </button>
                                    <button
                                        type="button"
                                        className="crud-cardAction crud-cardActionDelete crud-cardOverlayAction"
                                        aria-label="Eliminar mesa"
                                        onClick={() => { setSelectedTable(table); setIsDeleteOpen(true); }}
                                    >
                                        <i className="fas fa-trash"></i>
                                    </button>
                                </div>
                            </div>

                            <div className="crud-cardHeader">
                                <div className="crud-cardTitleGroup">
                                    <span className="crud-cardEyebrow"><i className="fas fa-chair"></i> Mesa</span>
                                    <h3 className="crud-cardTitle">{table.number || "Sin datos"}</h3>
                                </div>
                                <span className="crud-cardBadge">{table.status || "Sin datos"}</span>
                            </div>

                            <div className="crud-cardBody crud-cardPostBodyCols">
                                <div className="crud-cardField">
                                    <span className="crud-cardFieldLabel">Restaurante</span>
                                    <div className="crud-cardFieldValue">{table.restaurant || "Sin datos"}</div>
                                </div>
                                <div className="crud-cardField">
                                    <span className="crud-cardFieldLabel">Capacidad</span>
                                    <div className="crud-cardFieldValue">{table.capacity || "Sin datos"}</div>
                                </div>
                                <div className="crud-cardField">
                                    <span className="crud-cardFieldLabel">Ubicación</span>
                                    <div className="crud-cardFieldValue">{table.location || "Sin datos"}</div>
                                </div>
                                <div className="crud-cardField">
                                    <span className="crud-cardFieldLabel">Horarios</span>
                                    <div className="crud-cardFieldValue">{table.availabilitySchedules || "Sin datos"}</div>
                                </div>
                                <div className="crud-cardField">
                                    <span className="crud-cardFieldLabel">Descripción</span>
                                    <div className="crud-cardFieldValue">{table.description || "Sin datos"}</div>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </section>

            <TableModal
                isOpen={openModal}
                initialData={selectedTable}
                onClose={() => {
                    setOpenModalFalse();
                    setSelectedTable(null);
                }}
            />

            <Modal
                isOpen={isDeleteOpen}
                onClose={() => setIsDeleteOpen(false)}
                title="Eliminar mesa"
                subtitle="Confirmación de eliminación"
                compact
            >
                <p className="text-sm leading-6 text-slate-700">La mesa seleccionada sera eliminada. ¿Deseas continuar?</p>
                <div className="app-modal-actions">
                    <button type="button" onClick={() => setIsDeleteOpen(false)} className="app-modal-btn app-modal-btnSecondary w-full sm:w-auto">Cancelar</button>
                    <button type="button" onClick={handleDelete} className="app-modal-btn app-modal-btnPrimary w-full sm:w-auto">Eliminar</button>
                </div>
            </Modal>

            <div className="toast-zone"></div>
        </>
    );
};
