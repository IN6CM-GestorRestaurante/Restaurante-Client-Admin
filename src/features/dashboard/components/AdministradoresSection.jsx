export const AdministradoresSection = () => {
    return (
        <>
            <header className="top">
                <div className="title">
                    <h2>CRUD de Administradores</h2>
                    <p>Crea, edita, busca y elimina cuentas administrativas.</p>
                </div>
                <button className="btn btn-danger"><i className="fas fa-plus"></i> Nuevo admin</button>
            </header>
            <section className="body">
                <div className="toolbar">
                    <input className="search" placeholder="Buscar por nombre o correo" />
                </div>
                <section className="kpis">
                    <article className="kpi"><span>Total admins</span><strong>12</strong></article>
                    <article className="kpi"><span>Activos</span><strong>9</strong></article>
                    <article className="kpi"><span>Inactivos</span><strong>3</strong></article>
                </section>
                <table>
                    <thead>
                        <tr><th>Nombre</th><th>Correo</th><th>Rol</th><th>Estado</th><th>Acciones</th></tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Carla Ruiz</td>
                            <td>carla@resto.com</td>
                            <td>Super Admin</td>
                            <td><span className="status on">Activo</span></td>
                            <td>
                                <div className="row-actions">
                                    <button><i className="fas fa-pen"></i></button>
                                    <button><i className="fas fa-trash"></i></button>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>Miguel Soto</td>
                            <td>miguel@resto.com</td>
                            <td>Operacion</td>
                            <td><span className="status on">Activo</span></td>
                            <td>
                                <div className="row-actions">
                                    <button><i className="fas fa-pen"></i></button>
                                    <button><i className="fas fa-trash"></i></button>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>Ana Perez</td>
                            <td>ana@resto.com</td>
                            <td>Auditor</td>
                            <td><span className="status off">Inactivo</span></td>
                            <td>
                                <div className="row-actions">
                                    <button><i className="fas fa-pen"></i></button>
                                    <button><i className="fas fa-trash"></i></button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </section>
        </>
    );
};