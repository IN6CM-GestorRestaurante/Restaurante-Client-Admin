import { useState, useEffect } from "react";
import { ReservationModal } from "./ReservationModal";
import { Modal } from "../../../shared/ui/Modal";
import { useReservationsStore } from "../store/adminStore";
import { showError, showSuccess } from "../../../shared/utils/toast";

export const ReservacionesSection = () => {
    const { reservations, loading, error, getReservations, deleteReservation } = useReservationsStore();
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [selectedReservation, setSelectedReservation] = useState(null);

    const confirmReservation = useReservationsStore((s) => s.confirmReservation);

    useEffect(() => {
        getReservations();
    }, []);


    const handleConfirm = async (id) => {
        try {
            await confirmReservation(id);
            showSuccess("Reservación confirmada");
        } catch (err) {
            showError(err?.response?.data?.message || err?.message || "Error al confirmar reservación");
        }
    };

    const handleDelete = async () => {
        try {
            if (selectedReservation?._id) {
                await deleteReservation(selectedReservation._id);
                showSuccess("Reservación eliminada");
            }
        } catch (err) {
            showError(err?.response?.data?.message || err?.message || "Error al eliminar reservación");
        } finally {
            setIsDeleteOpen(false);
            setSelectedReservation(null);
        }
    };

    return (
        <>
            <header className="header">
                <div>
                    <h2>CRUD de Reservaciones</h2>
                    <p>Administra agenda, disponibilidad y confirmaciones.</p>
                </div>
                <button className="btn danger" type="button" onClick={() => { setSelectedReservation(null); setIsCreateOpen(true); }}>Nueva reservacion</button>
            </header>

            <section className="section">
                <div className="top">
                    <p style={{ fontSize: "13px", color: "#6f6f78" }}>Gestion centralizada de agenda y reservaciones.</p>
                </div>

                <section className="kpis">
                    <article className="kpi"><span>Total reservaciones</span><strong>{loading ? "Cargando..." : reservations.length}</strong></article>
                    <article className="kpi"><span>Confirmadas</span><strong>{reservations.filter((reservation) => reservation.status === "Confirmada").length}</strong></article>
                    <article className="kpi"><span>Pendientes</span><strong>{reservations.filter((reservation) => reservation.status === "Pendiente").length}</strong></article>
                </section>

                <div className="crud-cards-grid crud-cards-gridCompact">
                    {(reservations.length ? reservations : []).map((reservation) => (
                        <article key={reservation._id} className="crud-card crud-cardCompact crud-cardPost crud-cardDense">
                            <div className="crud-cardMedia crud-cardPostMedia">
                                <div className="crud-cardMediaBox crud-cardMediaBoxIcon crud-cardMediaThemeReservations">
                                    <i className="fas fa-calendar-check crud-cardMediaIcon" aria-hidden="true"></i>
                                </div>

                                <div className="crud-cardOverlayActions">
                                    {/* Create/update endpoints not available in admin API - only confirm/list */}
                                        {reservation.status !== "confirmada" && (
                                            <button
                                                type="button"
                                                className="crud-cardAction crud-cardActionEdit crud-cardOverlayAction"
                                                aria-label="Confirmar reservación"
                                                onClick={() => handleConfirm(reservation._id)}
                                            >
                                                <i className="fas fa-check"></i>
                                            </button>
                                        )}
                                        <button
                                            type="button"
                                            className="crud-cardAction crud-cardActionDelete crud-cardOverlayAction"
                                            aria-label="Eliminar reservación"
                                            onClick={() => { setSelectedReservation(reservation); setIsDeleteOpen(true); }}
                                        >
                                            <i className="fas fa-trash"></i>
                                        </button>
                                </div>
                            </div>

                            <div className="crud-cardHeader">
                                <div className="crud-cardTitleGroup">
                                    <span className="crud-cardEyebrow"><i className="fas fa-calendar-check"></i> Reservación</span>
                                    <h3 className="crud-cardTitle">{reservation.table?._id ? reservation.table._id : reservation.table || "Sin mesa"}</h3>
                                </div>
                                <span className="crud-cardBadge">{reservation.status || "Sin datos"}</span>
                            </div>

                            <div className="crud-cardBody crud-cardPostBodyCols">
                                <div className="crud-cardField">
                                    <span className="crud-cardFieldLabel">Usuario</span>
                                    <div className="crud-cardFieldValue">{reservation.user?._id ? reservation.user._id : reservation.user || "Sin datos"}</div>
                                </div>
                                <div className="crud-cardField">
                                    <span className="crud-cardFieldLabel">Restaurante</span>
                                    <div className="crud-cardFieldValue">{reservation.restaurant?._id ? reservation.restaurant._id : reservation.restaurant || "Sin datos"}</div>
                                </div>
                                <div className="crud-cardField">
                                    <span className="crud-cardFieldLabel">Tipo</span>
                                    <div className="crud-cardFieldValue">{reservation.type}</div>
                                </div>
                                <div className="crud-cardField">
                                    <span className="crud-cardFieldLabel">Fecha y hora</span>
                                    <div className="crud-cardFieldValue">{reservation.date ? new Date(reservation.date).toLocaleString() : "Sin datos"}</div>
                                </div>
                                <div className="crud-cardField">
                                    <span className="crud-cardFieldLabel">Dirección entrega</span>
                                    <div className="crud-cardFieldValue">{reservation.deliveryAddress}</div>
                                </div>
                                <div className="crud-cardField">
                                    <span className="crud-cardFieldLabel">Notas</span>
                                    <div className="crud-cardFieldValue">{reservation.notes || "Sin datos"}</div>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
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
                title="Eliminar reservacion"
                subtitle="Confirma la eliminación del registro"
                compact
            >
                <p className="text-sm leading-6 text-slate-700">La reservación seleccionada sera desactivada. ¿Deseas continuar?</p>
                <div className="app-modal-actions">
                    <button type="button" onClick={() => setIsDeleteOpen(false)} className="app-modal-btn app-modal-btnSecondary w-full sm:w-auto">Cancelar</button>
                    <button type="button" onClick={handleDelete} className="app-modal-btn app-modal-btnPrimary w-full sm:w-auto">Eliminar</button>
                </div>
            </Modal>

            <div className="toast-zone"></div>
        </>
    );
};
