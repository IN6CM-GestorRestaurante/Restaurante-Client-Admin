export const UsuariosSection = () => {
    return (
        <>
            <header className="header">
                <div>
                    <h2>CRUD de Usuarios</h2>
                    <p>Controla perfiles, accesos y estado de cuenta.</p>
                </div>
                <button className="btn danger">Nuevo usuario</button>
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
                                        <button>Editar</button>
                                        <button>Eliminar</button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>

            <div className="modal">
                <div className="modal-card">
                    <h2 style={{ fontSize: "18px", marginBottom: "10px" }}>Nuevo usuario</h2>
                    <div className="field"><label>Nombre (name)</label><input /></div>
                    <div className="field"><label>Apellido (surname)</label><input /></div>
                    <div className="field"><label>Usuario (username)</label><input /></div>
                    <div className="field"><label>Correo (email)</label><input type="email" /></div>
                    <div className="field"><label>Contraseña (password)</label><input type="password" /></div>
                    <div className="field"><label>Telefono (phone)</label><input maxLength="8" /></div>
                    <div className="field"><label>Rol (role)</label><input placeholder="ADMIN_ROLE" /></div>
                    <div className="field">
                        <label>Estado (status)</label>
                        <select>
                            <option>Activo</option>
                            <option>Inactivo</option>
                        </select>
                    </div>
                    <div className="row">
                        <button className="btn soft">Cancelar</button>
                        <button className="btn danger">Guardar</button>
                    </div>
                </div>
            </div>

            <div className="modal">
                <div className="modal-card">
                    <h2 style={{ fontSize: "18px", marginBottom: "10px" }}>Eliminar usuario</h2>
                    <p className="confirm-text">El usuario seleccionado sera eliminado. ¿Deseas continuar?</p>
                    <div className="row">
                        <button className="btn soft">Cancelar</button>
                        <button className="btn danger">Eliminar</button>
                    </div>
                </div>
            </div>

            <div className="toast-zone"></div>
        </>
    );
};