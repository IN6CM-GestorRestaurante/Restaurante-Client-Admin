import { useState } from "react";
import { TableModal } from "./TableModal";

export const MesasSection = () => {
    const [openModal, setOpenModal] = useState(false);
    const [selectedTable, setSelectedTable] = useState(null);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);

    return (
        <>
            <header className="header">
                <div>
                    <h2>CRUD de Mesas</h2>
                    <p>Configura zonas, estado y disponibilidad de mesas.</p>
                </div>
                <button className="btn danger" type="button" onClick={() => setOpenModal(true)}>Nueva mesa</button>
            </header>

            <section className="section">
                <div className="top">
                    <p style={{ fontSize: "13px", color: "#6f6f78" }}>Gestion centralizada de mesas y zonas del restaurante.</p>
                </div>

                <section className="kpis">
                    <article className="kpi"><span>Total mesas</span><strong>Sin datos</strong></article>
                    <article className="kpi"><span>Disponibles</span><strong>Sin datos</strong></article>
                    <article className="kpi"><span>Fuera de servicio</span><strong>Sin datos</strong></article>
                </section>

                <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
                    {[
                        { number: "5", capacity: "4 personas", location: "Sala Principal", schedules: "Lunes - Dom 08:00-22:00", description: "Junto a ventana", status: "Disponible", icon: "fa-table" },
                        { number: "8", capacity: "2 personas", location: "Terraza", schedules: "Lunes - Dom 09:00-21:00", description: "Vista al jardín", status: "Reservada", icon: "fa-chair" },
                        { number: "12", capacity: "6 personas", location: "Privado", schedules: "Lunes - Dom 10:00-23:00", description: "Ideal para grupos", status: "Mantenimiento", icon: "fa-door-closed" },
                    ].map((table) => (
                        <article key={table.number} className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:scale-[1.02]">
                            <div className="w-full h-52 bg-gray-100 flex items-center justify-center">
                                <i className={`fa-solid ${table.icon} text-5xl text-main-blue`}></i>
                            </div>
                            <div className="p-5">
                                <h2 className="text-xl font-bold text-main-blue">Mesa {table.number}</h2>
                                <div className="flex gap-2 mt-2 flex-wrap">
                                    <span className="px-3 py-1 text-xs rounded-full bg-blue-100 text-blue-700 font-medium">{table.capacity}</span>
                                    <span className="px-3 py-1 text-xs rounded-full bg-indigo-100 text-indigo-700 font-medium">{table.location}</span>
                                </div>
                                <p className="text-sm text-gray-400 mt-2 truncate">{table.schedules}</p>
                                <div className="flex gap-2 mt-2 flex-wrap">
                                    <span className="px-3 py-1 text-xs rounded-full bg-gray-100 text-gray-700 font-medium">{table.description}</span>
                                    <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-700 font-medium">{table.status}</span>
                                </div>
                                <div className="flex gap-3 mt-5">
                                    <button className="flex-1 py-2 rounded-lg bg-main-blue text-white font-medium hover:opacity-90 transition" onClick={() => { setSelectedTable(table); setOpenModal(true); }}>
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
                <TableModal 
                    initialData={selectedTable}
                    onClose={() => {
                        setOpenModal(false);
                        setSelectedTable(null);
                    }}
                />
            ) : null}

            {isDeleteOpen ? (
                <div className="modal">
                    <div className="modal-card">
                        <h2 style={{ fontSize: "18px", marginBottom: "10px" }}>Eliminar mesa</h2>
                        <p className="confirm-text">La mesa seleccionada sera eliminada. ¿Deseas continuar?</p>
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