import { useState, useEffect } from "react";
import { OrderModal } from "./OrderModal";
import { Modal } from "../../../shared/ui/Modal";
import { useOrdersStore } from "../store/adminStore";
import { showError, showSuccess } from "../../../shared/utils/toast";

export const OrdenesSection = () => {
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);

    const orders = useOrdersStore((s) => s.orders || []);
    const loading = useOrdersStore((s) => s.loading);
    const getOrders = useOrdersStore((s) => s.getOrders);
    const deleteOrder = useOrdersStore((s) => s.deleteOrder);

    const [selected, setSelected] = useState(null);

    const handleDelete = async () => {
        try {
            if (selected?._id) {
                await deleteOrder(selected._id);
                showSuccess("Orden cancelada");
            }
        } catch (err) {
            showError(err?.response?.data?.message || err?.message || "Error al eliminar orden");
        } finally {
            setIsDeleteOpen(false);
            setSelected(null);
        }
    };

    useEffect(() => {
        getOrders();
    }, []);

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

                <div className="crud-cards-grid crud-cards-gridCompact">
                    {orders.map((order) => (
                        <article key={order._id} className="crud-card crud-cardCompact crud-cardPost crud-cardDense">
                            <div className="crud-cardMedia crud-cardPostMedia">
                                <div className="crud-cardMediaBox crud-cardMediaBoxIcon crud-cardMediaThemeOrders">
                                    <i className="fas fa-receipt crud-cardMediaIcon" aria-hidden="true"></i>
                                </div>

                                <div className="crud-cardOverlayActions">
                                    <button
                                        type="button"
                                        className="crud-cardAction crud-cardActionEdit crud-cardOverlayAction"
                                        aria-label="Editar orden"
                                        onClick={() => { setSelected(order); setIsCreateOpen(true); }}
                                    >
                                        <i className="fas fa-pen-to-square"></i>
                                    </button>
                                    <button
                                        type="button"
                                        className="crud-cardAction crud-cardActionDelete crud-cardOverlayAction"
                                        aria-label="Eliminar orden"
                                        onClick={() => { setSelected(order); setIsDeleteOpen(true); }}
                                    >
                                        <i className="fas fa-trash"></i>
                                    </button>
                                </div>
                            </div>

                            <div className="crud-cardHeader">
                                <div className="crud-cardTitleGroup">
                                    <span className="crud-cardEyebrow"><i className="fas fa-receipt"></i> Orden</span>
                                    <h3 className="crud-cardTitle">{order.table}</h3>
                                </div>
                                <span className="crud-cardBadge">{order.status}</span>
                            </div>

                            <div className="crud-cardBody crud-cardPostBodyCols">
                                <div className="crud-cardField">
                                    <span className="crud-cardFieldLabel">Restaurante</span>
                                    <div className="crud-cardFieldValue">{order.restaurant}</div>
                                </div>
                                <div className="crud-cardField">
                                    <span className="crud-cardFieldLabel">Platillo</span>
                                    <div className="crud-cardFieldValue">{order.menuItem}</div>
                                </div>
                                <div className="crud-cardField">
                                    <span className="crud-cardFieldLabel">Cantidad</span>
                                    <div className="crud-cardFieldValue">{order.quantity}</div>
                                </div>
                                <div className="crud-cardField">
                                    <span className="crud-cardFieldLabel">Precio</span>
                                    <div className="crud-cardFieldValue">{order.price}</div>
                                </div>
                                <div className="crud-cardField">
                                    <span className="crud-cardFieldLabel">Modificadores</span>
                                    <div className="crud-cardFieldValue">{order.modifiers}</div>
                                </div>
                                <div className="crud-cardField">
                                    <span className="crud-cardFieldLabel">Estado item</span>
                                    <div className="crud-cardFieldValue">{order.itemStatus}</div>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </section>

            <OrderModal isOpen={isCreateOpen} initialData={selected} onClose={() => { setIsCreateOpen(false); setSelected(null); }} />

            <Modal
                isOpen={isDeleteOpen}
                onClose={() => setIsDeleteOpen(false)}
                title="Eliminar orden"
                subtitle="Confirmación de eliminación"
                compact
            >
                <p className="text-sm leading-6 text-slate-700">La orden seleccionada sera cancelada. ¿Deseas continuar?</p>
                <div className="app-modal-actions">
                    <button type="button" onClick={() => setIsDeleteOpen(false)} className="app-modal-btn app-modal-btnSecondary w-full sm:w-auto">Cancelar</button>
                    <button type="button" onClick={handleDelete} className="app-modal-btn app-modal-btnPrimary w-full sm:w-auto">Eliminar</button>
                </div>
            </Modal>

            <div className="toast-zone"></div>
        </>
    );
};
