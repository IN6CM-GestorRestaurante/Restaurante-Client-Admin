import { useEffect, useState } from "react";
import { useUsersStore } from "../store/adminStore";
import { UserModal } from "./UserModal";
import { Modal } from "../../../shared/ui/Modal";
import { showError, showSuccess } from "../../../shared/utils/toast";

export const UsuariosSection = () => {
    const { users, loading, error, getUsers, deleteUser } = useUsersStore();
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    useEffect(() => {
        getUsers();
    }, [getUsers]);

    useEffect(() => {
        if (error) showError(error);
    }, [error]);

    const handleDelete = async () => {
        if (!selectedUser?._id) {
            setIsDeleteOpen(false);
            return;
        }

        try {
            await deleteUser(selectedUser._id);
            showSuccess("Usuario desactivado correctamente");
        } catch {
            // El store ya expone el error
        } finally {
            setIsDeleteOpen(false);
            setSelectedUser(null);
        }
    };

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
                    <article className="kpi"><span>Total usuarios</span><strong>{loading ? "Cargando..." : users.length}</strong></article>
                    <article className="kpi"><span>Activos</span><strong>{users.filter((user) => user.status).length}</strong></article>
                    <article className="kpi"><span>Inactivos</span><strong>{users.filter((user) => !user.status).length}</strong></article>
                </section>

                <div className="crud-cards-grid crud-cards-gridCompact">
                    {(users.length ? users : []).map((user) => (
                        <article key={user._id} className="crud-card crud-cardCompact crud-cardPost">
                            <div className="crud-cardMedia crud-cardPostMedia">
                                <div className="crud-cardMediaBox crud-cardMediaBoxIcon crud-cardMediaThemeUsers">
                                    <i className="fas fa-user crud-cardMediaIcon" aria-hidden="true"></i>
                                </div>

                                <div className="crud-cardOverlayActions">
                                    <button
                                        type="button"
                                        className="crud-cardAction crud-cardActionEdit crud-cardOverlayAction"
                                        aria-label="Editar usuario"
                                        onClick={() => {
                                            setSelectedUser(user);
                                            setIsCreateOpen(true);
                                        }}
                                    >
                                        <i className="fas fa-pen-to-square"></i>
                                    </button>
                                    <button
                                        type="button"
                                        className="crud-cardAction crud-cardActionDelete crud-cardOverlayAction"
                                        aria-label="Eliminar usuario"
                                        onClick={() => {
                                            setSelectedUser(user);
                                            setIsDeleteOpen(true);
                                        }}
                                    >
                                        <i className="fas fa-trash"></i>
                                    </button>
                                </div>
                            </div>

                            <div className="crud-cardHeader">
                                <div className="crud-cardTitleGroup">
                                    <span className="crud-cardEyebrow"><i className="fas fa-user"></i> Usuario</span>
                                    <h3 className="crud-cardTitle">{user.name} {user.surname}</h3>
                                </div>
                                <span className="crud-cardBadge">{user.status ? "Activo" : "Inactivo"}</span>
                            </div>

                            <div className="crud-cardBody crud-cardPostBodyCols">
                                <div className="crud-cardField">
                                    <span className="crud-cardFieldLabel">Usuario</span>
                                    <div className="crud-cardFieldValue">{user.username}</div>
                                </div>
                                <div className="crud-cardField">
                                    <span className="crud-cardFieldLabel">Correo</span>
                                    <div className="crud-cardFieldValue">{user.email}</div>
                                </div>
                                <div className="crud-cardField">
                                    <span className="crud-cardFieldLabel">Teléfono</span>
                                    <div className="crud-cardFieldValue">{user.phone}</div>
                                </div>
                                <div className="crud-cardField">
                                    <span className="crud-cardFieldLabel">Rol</span>
                                    <div className="crud-cardFieldValue">{user.role}</div>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </section>

            <UserModal
                isOpen={isCreateOpen}
                initialData={selectedUser}
                onClose={() => {
                    setIsCreateOpen(false);
                    setSelectedUser(null);
                }}
            />

            <Modal
                isOpen={isDeleteOpen}
                onClose={() => setIsDeleteOpen(false)}
                title="Eliminar usuario"
                subtitle="Confirma la eliminación del registro"
                compact
            >
                <p className="text-sm leading-6 text-slate-700">El usuario seleccionado sera desactivado. ¿Deseas continuar?</p>
                <div className="app-modal-actions">
                    <button type="button" onClick={() => setIsDeleteOpen(false)} className="app-modal-btn app-modal-btnSecondary w-full sm:w-auto">Cancelar</button>
                    <button type="button" onClick={handleDelete} className="app-modal-btn app-modal-btnPrimary w-full sm:w-auto">Eliminar</button>
                </div>
            </Modal>

            <div className="toast-zone"></div>
        </>
    );
};
