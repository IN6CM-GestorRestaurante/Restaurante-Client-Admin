import { useState } from "react";
import { SucursalModal } from "./SucursalModal";
import { Modal } from "../../../shared/ui/Modal";

export const SucursalesSection = () => {
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);

    return (
        <>
            <header className="header">
                <div>
                    <h2>CRUD de Sucursales</h2>
                    <p>Administra sedes, responsable y estado operativo.</p>
                </div>
                <button className="btn danger" type="button" onClick={() => setIsCreateOpen(true)}>Nueva sucursal</button>
            </header>
            <section className="section">
                <div className="top">
                    <p style={{ fontSize: "13px", color: "#6f6f78" }}>Gestion centralizada de sedes del restaurante.</p>
                </div>
                <section className="kpis">
                    <article className="kpi"><span>Total sucursales</span><strong>Sin datos</strong></article>
                    <article className="kpi"><span>Operativas</span><strong>Sin datos</strong></article>
                    <article className="kpi"><span>En mantenimiento</span><strong>Sin datos</strong></article>
                </section>
                <div style={{ overflowX: "auto" }}>
                    <table>
                        <thead>
                            <tr>
                                <th>Nombre (name)</th>
                                <th>Descripcion (descripcion)</th>
                                <th>Direccion (address)</th>
                                <th>Apertura (openingTime)</th>
                                <th>Cierre (closingTime)</th>
                                <th>Categoria (category)</th>
                                <th>Precio promedio (averagePrice)</th>
                                <th>Correo (email)</th>
                                <th>Telefono (phoneNumber)</th>
                                <th>Imagen (photos)</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Sucursal Centro</td>
                                <td>Sin datos</td>
                                <td>Avenida principal 123</td>
                                <td>08:00</td>
                                <td>22:00</td>
                                <td>Casera</td>
                                <td>00.00</td>
                                <td>info@restaurante.com</td>
                                <td>+50212345678</td>
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

            <SucursalModal isOpen={isCreateOpen} onClose={() => setIsCreateOpen(false)} />

            <Modal
                isOpen={isDeleteOpen}
                onClose={() => setIsDeleteOpen(false)}
                title="Eliminar sucursal"
                subtitle="Confirma la eliminación del registro"
            >
                <p className="text-sm leading-6 text-slate-700">La sucursal seleccionada sera eliminada. ¿Deseas continuar?</p>
                <div className="app-modal-actions">
                    <button type="button" onClick={() => setIsDeleteOpen(false)} className="app-modal-btn app-modal-btnSecondary w-full sm:w-auto">Cancelar</button>
                    <button type="button" onClick={() => setIsDeleteOpen(false)} className="app-modal-btn app-modal-btnPrimary w-full sm:w-auto">Eliminar</button>
                </div>
            </Modal>

            <div className="toast-zone"></div>
        </>
    );
};
