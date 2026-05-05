import { useState } from "react";
import { ReservationModal } from "./ReservationModal";
import { Modal } from "../../../shared/ui/Modal";

export const ReservacionesSection = () => {
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);

    const reservations = [
        {
            _id: "sample-reservation",
            user: "Sin datos",
            restaurant: "Sin datos",
            type: "En mesa",
            table: "Mesa 5",
            date: "Sin datos",
            deliveryAddress: "No aplica",
            status: "Pendiente",
            notes: "Sin datos",
        },
    ];

    return (
        <>
            <header className="header">
                <div>
                    <h2>CRUD de Reservaciones</h2>
                    <p>Administra agenda, disponibilidad y confirmaciones.</p>
                </div>
                <button className="btn danger" type="button" onClick={() => setIsCreateOpen(true)}>Nueva reservacion</button>
            </header>

            <section className="section">
                <div className="top">
                    <p style={{ fontSize: "13px", color: "#6f6f78" }}>Gestion centralizada de agenda y reservaciones.</p>
                </div>

                <section className="kpis">
                    <article className="kpi"><span>Total reservaciones</span><strong>Sin datos</strong></article>
                    <article className="kpi"><span>Confirmadas</span><strong>Sin datos</strong></article>
                    <article className="kpi"><span>Pendientes</span><strong>Sin datos</strong></article>
                </section>

                <div className="crud-cards-grid crud-cards-gridCompact">
                    {reservations.map((reservation) => (
                        <article key={reservation._id} className="crud-card crud-cardCompact crud-cardPost crud-cardDense">
                            <div className="crud-cardMedia crud-cardPostMedia">
                                <div className="crud-cardMediaBox crud-cardMediaBoxIcon crud-cardMediaThemeReservations">
                                    <i className="fas fa-calendar-check crud-cardMediaIcon" aria-hidden="true"></i>
                                </div>

                                <div className="crud-cardOverlayActions">
                                    <button
                                        type="button"
                                        className="crud-cardAction crud-cardActionEdit crud-cardOverlayAction"
                                        aria-label="Editar reservación"
                                        onClick={() => setIsCreateOpen(true)}
                                    >
                                        <i className="fas fa-pen-to-square"></i>
                                    </button>
                                    <button
                                        type="button"
                                        className="crud-cardAction crud-cardActionDelete crud-cardOverlayAction"
                                        aria-label="Eliminar reservación"
                                        onClick={() => setIsDeleteOpen(true)}
                                    >
                                        <i className="fas fa-trash"></i>
                                    </button>
                                </div>
                            </div>

                            <div className="crud-cardHeader">
                                <div className="crud-cardTitleGroup">
                                    <span className="crud-cardEyebrow"><i className="fas fa-calendar-check"></i> Reservación</span>
                                    <h3 className="crud-cardTitle">{reservation.table}</h3>
                                </div>
                                <span className="crud-cardBadge">{reservation.status}</span>
                            </div>

                            <div className="crud-cardBody crud-cardPostBodyCols">
                                <div className="crud-cardField">
                                    <span className="crud-cardFieldLabel">Usuario</span>
                                    <div className="crud-cardFieldValue">{reservation.user}</div>
                                </div>
                                <div className="crud-cardField">
                                    <span className="crud-cardFieldLabel">Restaurante</span>
                                    <div className="crud-cardFieldValue">{reservation.restaurant}</div>
                                </div>
                                <div className="crud-cardField">
                                    <span className="crud-cardFieldLabel">Tipo</span>
                                    <div className="crud-cardFieldValue">{reservation.type}</div>
                                </div>
                                <div className="crud-cardField">
                                    <span className="crud-cardFieldLabel">Fecha y hora</span>
                                    <div className="crud-cardFieldValue">{reservation.date}</div>
                                </div>
                                <div className="crud-cardField">
                                    <span className="crud-cardFieldLabel">Dirección entrega</span>
                                    <div className="crud-cardFieldValue">{reservation.deliveryAddress}</div>
                                </div>
                                <div className="crud-cardField">
                                    <span className="crud-cardFieldLabel">Notas</span>
                                    <div className="crud-cardFieldValue">{reservation.notes}</div>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </section>

            <ReservationModal isOpen={isCreateOpen} onClose={() => setIsCreateOpen(false)} />

            <Modal
                isOpen={isDeleteOpen}
                onClose={() => setIsDeleteOpen(false)}
                title="Eliminar reservacion"
                subtitle="Confirma la eliminación del registro"
                compact
            >
                <p className="text-sm leading-6 text-slate-700">La reservacion seleccionada sera eliminada. ¿Deseas continuar?</p>
                <div className="app-modal-actions">
                    <button type="button" onClick={() => setIsDeleteOpen(false)} className="app-modal-btn app-modal-btnSecondary w-full sm:w-auto">Cancelar</button>
                    <button type="button" onClick={() => setIsDeleteOpen(false)} className="app-modal-btn app-modal-btnPrimary w-full sm:w-auto">Eliminar</button>
                </div>
            </Modal>

            <div className="toast-zone"></div>
        </>
    );
};
