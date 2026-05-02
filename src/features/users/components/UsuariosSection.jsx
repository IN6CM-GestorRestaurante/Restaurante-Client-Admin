import { useState } from "react";
import { UserModal } from "./UserModal";

export const UsuariosSection = () => {
    const [openModal, setOpenModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);

    return (
        <>
            <header className="header">
                <div>
                    <h2>CRUD de Usuarios</h2>
                    <p>Controla perfiles, accesos y estado de cuenta.</p>
                </div>
                <button className="btn danger" type="button" onClick={() => setOpenModal(true)}>Nuevo usuario</button>
            </header>

            <section className="section">
                <div className="top">
                    <p style={{ fontSize: "13px", color: "#6f6f78" }}>Gestion centralizada de usuarios y accesos.</p>
                </div>

                <section className="kpis">
                    <article className="kpi"><span>Total usuarios</span><strong>Sin datos</strong></article>
                    <article className="kpi"><span>Activos</span><strong>Sin datos</strong></article>
                    <article className="kpi"><span>Inactivos</span><strong>Sin datos</strong></article>
                </section>

                <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
                    {[
                        { name: "Carlos López", username: "carlos.lopez", email: "carlos@restaurante.com", phone: "+502 1234 5678", role: "Administrador", status: "Activo", icon: "fa-user-tie" },
                        { name: "María Pérez", username: "maria.perez", email: "maria@restaurante.com", phone: "+502 2234 5678", role: "Cajero", status: "Activo", icon: "fa-user" },
                        { name: "Luis Gómez", username: "luis.gomez", email: "luis@restaurante.com", phone: "+502 3234 5678", role: "Soporte", status: "Inactivo", icon: "fa-user-gear" },
                    ].map((user) => (
                        <article key={user.username} className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:scale-[1.02]">
                            <div className="w-full h-52 bg-gray-100 flex items-center justify-center">
                                <i className={`fa-solid ${user.icon} text-5xl text-main-blue`}></i>
                            </div>
                            <div className="p-5">
                                <h2 className="text-xl font-bold text-main-blue">{user.name}</h2>
                                <div className="flex gap-2 mt-2 flex-wrap">
                                    <span className="px-3 py-1 text-xs rounded-full bg-blue-100 text-blue-700 font-medium">{user.username}</span>
                                    <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-700 font-medium">{user.role}</span>
                                </div>
                                <p className="text-sm text-gray-400 mt-2 truncate">{user.email}</p>
                                <p className="text-sm text-gray-400 mt-1 truncate">{user.phone}</p>
                                <div className="flex gap-2 mt-2 flex-wrap">
                                    <span className="px-3 py-1 text-xs rounded-full bg-gray-100 text-gray-700 font-medium">{user.status}</span>
                                </div>
                                <div className="flex gap-3 mt-5">
                                    <button className="flex-1 py-2 rounded-lg bg-main-blue text-white font-medium hover:opacity-90 transition" onClick={() => { setSelectedUser(user); setOpenModal(true); }}>
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
                <UserModal 
                    initialData={selectedUser}
                    onClose={() => {
                        setOpenModal(false);
                        setSelectedUser(null);
                    }}
                />
            ) : null}

            {isDeleteOpen ? (
                <div className="modal">
                    <div className="modal-card">
                        <h2 style={{ fontSize: "18px", marginBottom: "10px" }}>Eliminar usuario</h2>
                        <p className="confirm-text">El usuario seleccionado sera eliminado. ¿Deseas continuar?</p>
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