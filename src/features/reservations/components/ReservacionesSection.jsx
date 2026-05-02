import { useState } from "react";
import { ReservationModal } from "./ReservationModal";

export const ReservacionesSection = () => {
    const [openModal, setOpenModal] = useState(false);
    const [selectedReservation, setSelectedReservation] = useState(null);
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

                <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
                    {[
                        { user: "Juan García", type: "En mesa", table: "Mesa 5", date: "2024-05-02 19:00", status: "Pendiente", notes: "Preferencia de ubicación", icon: "fa-calendar-check" },
                        { user: "María López", type: "Delivery", table: "No aplica", date: "2024-05-02 20:30", status: "Confirmada", notes: "Pedir sin picante", icon: "fa-truck" },
                        { user: "Carlos Pérez", type: "En mesa", table: "Mesa 2", date: "2024-05-03 14:00", status: "Cancelada", notes: "Llega con niños", icon: "fa-clock" },
                    ].map((reservation) => (
                        <article key={reservation.user} className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:scale-[1.02]">
                            <div className="w-full h-52 bg-gray-100 flex items-center justify-center">
                                <i className={`fa-solid ${reservation.icon} text-5xl text-main-blue`}></i>
                            </div>
                            <div className="p-5">
                                <h2 className="text-xl font-bold text-main-blue">{reservation.user}</h2>
                                <div className="flex gap-2 mt-2 flex-wrap">
                                    <span className="px-3 py-1 text-xs rounded-full bg-indigo-100 text-indigo-700 font-medium">{reservation.type}</span>
                                    <span className="px-3 py-1 text-xs rounded-full bg-blue-100 text-blue-700 font-medium">{reservation.table}</span>
                                </div>
                                <p className="text-sm text-gray-400 mt-2 truncate">{reservation.date}</p>
                                <div className="flex gap-2 mt-2 flex-wrap">
                                    <span className="px-3 py-1 text-xs rounded-full bg-orange-100 text-orange-700 font-medium">{reservation.status}</span>
                                    <span className="px-3 py-1 text-xs rounded-full bg-gray-100 text-gray-700 font-medium">{reservation.notes}</span>
                                </div>
                                <div className="flex gap-3 mt-5">
                                    <button className="flex-1 py-2 rounded-lg bg-main-blue text-white font-medium hover:opacity-90 transition" onClick={() => { setSelectedReservation(reservation); setOpenModal(true); }}>
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
                <ReservationModal
                    initialData={selectedReservation}
                    onClose={() => {
                        setOpenModal(false);
                        setSelectedReservation(null);
                    }}
                />
            ) : null}

            {isDeleteOpen ? (
                <div className="modal">
                    <div className="modal-card">
                        <h2 style={{ fontSize: "18px", marginBottom: "10px" }}>Eliminar reservacion</h2>
                        <p className="confirm-text">La reservacion seleccionada sera eliminada. ¿Deseas continuar?</p>
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