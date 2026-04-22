export const RolesSection = () => {
    return (
        <>
            <header className="head">
                <div>
                    <h2>CRUD de Roles y Permisos</h2>
                    <p>Define y controla permisos de cada perfil administrativo.</p>
                </div>
                <button className="btn primary">Nuevo rol</button>
            </header>
            <div className="body">
                <div className="top">
                    <p style={{ fontSize: "13px", color: "#6f6f78" }}>Gestion centralizada de roles para administradores.</p>
                </div>
                <section className="kpis">
                    <article className="kpi"><span>Total roles</span><strong>3</strong></article>
                    <article className="kpi"><span>Roles criticos</span><strong>1</strong></article>
                    <article className="kpi"><span>Roles operativos</span><strong>2</strong></article>
                </section>
                <table>
                    <thead>
                        <tr><th>Rol</th><th>Descripcion</th><th>Acciones</th></tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>Super Admin</strong></td>
                            <td><small>Control total del sistema y usuarios.</small></td>
                            <td className="actions">
                                <button>Editar</button>
                                <button>Eliminar</button>
                            </td>
                        </tr>
                        <tr>
                            <td><strong>Operacion</strong></td>
                            <td><small>Gestion diaria de flujo operativo.</small></td>
                            <td className="actions">
                                <button>Editar</button>
                                <button>Eliminar</button>
                            </td>
                        </tr>
                        <tr>
                            <td><strong>Auditor</strong></td>
                            <td><small>Consulta de datos y reportes sin edicion.</small></td>
                            <td className="actions">
                                <button>Editar</button>
                                <button>Eliminar</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className="modal">
                <div className="modal-card">
                    <h2 style={{ marginBottom: "10px", fontSize: "18px" }}>Nuevo rol</h2>
                    <div className="field"><label>Nombre del rol</label><input /></div>
                    <div className="field"><label>Descripcion</label><textarea></textarea></div>
                    <div className="row">
                        <button className="btn light">Cancelar</button>
                        <button className="btn primary">Guardar</button>
                    </div>
                </div>
            </div>

            <div className="modal">
                <div className="modal-card">
                    <h2 style={{ marginBottom: "10px", fontSize: "18px" }}>Eliminar rol</h2>
                    <p className="confirm-text">Este rol se eliminara de la lista administrativa. ¿Deseas continuar?</p>
                    <div className="row">
                        <button className="btn light">Cancelar</button>
                        <button className="btn primary">Eliminar</button>
                    </div>
                </div>
            </div>

            <div className="toast-zone"></div>
        </>
    );
};