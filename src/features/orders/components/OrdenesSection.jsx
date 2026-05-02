import { useState } from "react";
import { OrderModal } from "./OrderModal";

export const OrdenesSection = () => {
    const [openModal, setOpenModal] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
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

                <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
                    {[
                        { table: "Mesa 1", item: "Pasta Alfredo", quantity: "2", price: "$25.98", itemStatus: "En espera", orderStatus: "Abierta", icon: "fa-concierge-bell" },
                        { table: "Mesa 4", item: "Pizza BBQ", quantity: "1", price: "$18.50", itemStatus: "Preparando", orderStatus: "Abierta", icon: "fa-utensils" },
                        { table: "Mesa 8", item: "Tiramisú", quantity: "3", price: "$20.25", itemStatus: "Listo", orderStatus: "Cerrada", icon: "fa-plate-wheat" },
                    ].map((order) => (
                        <article key={order.table} className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:scale-[1.02]">
                            <div className="w-full h-52 bg-gray-100 flex items-center justify-center">
                                <i className={`fa-solid ${order.icon} text-5xl text-main-blue`}></i>
                            </div>
                            <div className="p-5">
                                <h2 className="text-xl font-bold text-main-blue">{order.table}</h2>
                                <div className="flex gap-2 mt-2 flex-wrap">
                                    <span className="px-3 py-1 text-xs rounded-full bg-blue-100 text-blue-700 font-medium">{order.item}</span>
                                    <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-700 font-medium">{order.price}</span>
                                </div>
                                <p className="text-sm text-gray-400 mt-2 truncate">Cantidad: {order.quantity}</p>
                                <div className="flex gap-2 mt-2 flex-wrap">
                                    <span className="px-3 py-1 text-xs rounded-full bg-yellow-100 text-yellow-700 font-medium">{order.itemStatus}</span>
                                    <span className="px-3 py-1 text-xs rounded-full bg-indigo-100 text-indigo-700 font-medium">{order.orderStatus}</span>
                                </div>
                                <div className="flex gap-3 mt-5">
                                    <button className="flex-1 py-2 rounded-lg bg-main-blue text-white font-medium hover:opacity-90 transition" onClick={() => { setSelectedOrder(order); setOpenModal(true); }}>
                                        ✏️ Editar
                                    </button>
                                    <button className="flex-1 py-2 rounded-lg bg-red-600 text-white font-medium hover:bg-red-700 transition" onClick={() => setIsDeleteOpen(true)}>
                                        🗑️ Eliminar
                                    </button>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </section>

            {openModal ? (
                <OrderModal
                    initialData={selectedOrder}
                    onClose={() => {
                        setOpenModal(false);
                        setSelectedOrder(null);
                    }}
                />
            ) : null}

            {isDeleteOpen ? (
                <div className="modal">
                    <div className="modal-card">
                        <h2 style={{ fontSize: "18px", marginBottom: "10px" }}>Eliminar orden</h2>
                        <p className="confirm-text">La orden seleccionada sera eliminada. ¿Deseas continuar?</p>
                        <div className="row">
                            <button className="btn soft" type="button" onClick={() => setIsDeleteOpen(false)}>Cancelar</button>
                            <button className="btn danger" type="button" onClick={() => setIsDeleteOpen(false)}>Eliminar</button>
                        </div>
                    </div>
                </div>
            ) : null}

            <div className="toast-zone"></div>
        </>
    );
};