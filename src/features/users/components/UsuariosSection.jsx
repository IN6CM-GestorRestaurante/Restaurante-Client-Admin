import { useState } from "react";
import { UserModal } from "./UserModal";
import { Modal } from "../../../shared/ui/Modal";

export const UsuariosSection = () => {
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);

    return (
        <>
            <header className="header">
                <div>
                    <h2>CRUD de Usuarios</h2>
                    <p>Controla perfiles, accesos y estado de cuenta.</p>
                </div>
                <button className="btn danger" type="button" onClick={() => setIsCreateOpen(true)}>Nuevo usuario</button>
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

                <div style={{ overflowX: "auto" }}>
                    <table>
                        <thead>
                            <tr>
                                <th>Nombre (name)</th>
                                <th>Apellido (surname)</th>
                                <th>Usuario (username)</th>
                                <th>Correo (email)</th>
                                <th>Telefono (phone)</th>
                                <th>Rol (role)</th>
                                <th>Estado (status)</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Carlos</td>
                                <td>López</td>
                                <td>carlos.lopez</td>
                                <td>carlos@restaurante.com</td>
                                <td>+50212345678</td>
                                <td>Administrador</td>
                                <td>Activo</td>
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

            <UserModal isOpen={isCreateOpen} onClose={() => setIsCreateOpen(false)} />

            <Modal
                isOpen={isDeleteOpen}
                onClose={() => setIsDeleteOpen(false)}
                title="Eliminar usuario"
                subtitle="Confirma la eliminación del registro"
            >
                <p className="text-sm leading-6 text-slate-700">El usuario seleccionado sera eliminado. ¿Deseas continuar?</p>
                <div className="app-modal-actions">
                    <button type="button" onClick={() => setIsDeleteOpen(false)} className="app-modal-btn app-modal-btnSecondary w-full sm:w-auto">Cancelar</button>
                    <button type="button" onClick={() => setIsDeleteOpen(false)} className="app-modal-btn app-modal-btnPrimary w-full sm:w-auto">Eliminar</button>
                </div>
            </Modal>

            <div className="toast-zone"></div>
        </>
    );
};
