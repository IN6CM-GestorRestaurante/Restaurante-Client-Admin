import { useState } from "react";
import { ReservationModal } from "./ReservationModal";
import { Modal } from "../../../shared/ui/Modal";

export const ReservacionesSection = () => {
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);

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

                <div style={{ overflowX: "auto" }}>
                    <table>
                        <thead>
                            <tr>
                                <th>Usuario (user)</th>
                                <th>Restaurante (restaurant)</th>
                                <th>Tipo (type)</th>
                                <th>Mesa (table)</th>
                                <th>Fecha y hora (date)</th>
                                <th>Direccion entrega (deliveryAddress)</th>
                                <th>Estado (status)</th>
                                <th>Notas (notes)</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Sin datos</td>
                                <td>Sin datos</td>
                                <td>En mesa</td>
                                <td>Mesa 5</td>
                                <td>Sin datos</td>
                                <td>No aplica</td>
                                <td>Pendiente</td>
                                <td>Sin datos</td>
                                <td>
                                    <div className="row-actions">
                                        <button type="button" onClick={() => setIsCreateOpen(true)}>Editar</button>
                                        <button type="button" onClick={() => setIsDeleteOpen(true)}>Eliminar</button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>

            <ReservationModal isOpen={isCreateOpen} onClose={() => setIsCreateOpen(false)} />

            <Modal
                isOpen={isDeleteOpen}
                onClose={() => setIsDeleteOpen(false)}
                title="Eliminar reservacion"
                subtitle="Confirma la eliminación del registro"
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
