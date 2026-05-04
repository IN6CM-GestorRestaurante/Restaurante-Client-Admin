import { useState } from "react";
import { OrderModal } from "./OrderModal";
import { Modal } from "../../../shared/ui/Modal";

export const OrdenesSection = () => {
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);

    return (
        <>
            <header className="header">
                <div>
                    <h2>CRUD de Ordenes</h2>
                    <p>Gestiona flujo de cocina, entrega y atencion en salon.</p>
                </div>
                <button className="btn danger" type="button" onClick={() => setIsCreateOpen(true)}>Nueva orden</button>
            </header>

            <section className="section">
                <div className="top">
                    <p style={{ fontSize: "13px", color: "#6f6f78" }}>Gestion centralizada de ordenes en cocina y salon.</p>
                </div>

                <section className="kpis">
                    <article className="kpi"><span>Total ordenes</span><strong>Sin datos</strong></article>
                    <article className="kpi"><span>En proceso</span><strong>Sin datos</strong></article>
                    <article className="kpi"><span>Completadas</span><strong>Sin datos</strong></article>
                </section>

                <div style={{ overflowX: "auto" }}>
                    <table>
                        <thead>
                            <tr>
                                <th>Mesa (table)</th>
                                <th>Restaurante (restaurant)</th>
                                <th>Platillo (items.menuItem)</th>
                                <th>Cantidad (items.quantity)</th>
                                <th>Precio (items.price)</th>
                                <th>Modificadores (items.modifiers)</th>
                                <th>Estado item (items.status)</th>
                                <th>Estado orden (status)</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Mesa 5</td>
                                <td>Sin datos</td>
                                <td>Sin datos</td>
                                <td>2</td>
                                <td>00.00</td>
                                <td>Sin datos</td>
                                <td>En espera</td>
                                <td>Abierta</td>
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

            <OrderModal isOpen={isCreateOpen} onClose={() => setIsCreateOpen(false)} />

            <Modal
                isOpen={isDeleteOpen}
                onClose={() => setIsDeleteOpen(false)}
                title="Eliminar orden"
                subtitle="Confirma la eliminación del registro"
            >
                <p className="text-sm leading-6 text-slate-700">La orden seleccionada sera eliminada. ¿Deseas continuar?</p>
                <div className="app-modal-actions">
                    <button type="button" onClick={() => setIsDeleteOpen(false)} className="app-modal-btn app-modal-btnSecondary w-full sm:w-auto">Cancelar</button>
                    <button type="button" onClick={() => setIsDeleteOpen(false)} className="app-modal-btn app-modal-btnPrimary w-full sm:w-auto">Eliminar</button>
                </div>
            </Modal>

            <div className="toast-zone"></div>
        </>
    );
};
