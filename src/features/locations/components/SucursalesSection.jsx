export const SucursalesSection = () => {
    return (
        <>
            <header className="header">
                <div>
                    <h2>CRUD de Sucursales</h2>
                    <p>Administra sedes, responsable y estado operativo.</p>
                </div>
                <button className="btn danger">Nueva sucursal</button>
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
                                <td>Sin datos</td>
                                <td>Sin datos</td>
                                <td>Sin datos</td>
                                <td>08:00</td>
                                <td>22:00</td>
                                <td>Casera</td>
                                <td>00.00</td>
                                <td>Sin datos</td>
                                <td>Sin datos</td>
                                <td>Sin datos</td>
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
                    <h2 style={{ fontSize: "18px", marginBottom: "10px" }}>Nueva sucursal</h2>
                    <div className="field"><label>Nombre (name)</label><input /></div>
                    <div className="field"><label>Descripcion (descripcion)</label><textarea /></div>
                    <div className="field"><label>Direccion (address)</label><input /></div>
                    <div className="field"><label>Apertura (openingTime)</label><input placeholder="08:00" /></div>
                    <div className="field"><label>Cierre (closingTime)</label><input placeholder="22:00" /></div>
                    <div className="field"><label>Categoria (category)</label><input placeholder="Italiana" /></div>
                    <div className="field"><label>Precio promedio (averagePrice)</label><input type="number" min="0" step="0.01" placeholder="00.00" /></div>
                    <div className="field"><label>Email (email)</label><input type="email" /></div>
                    <div className="field"><label>Telefono (phoneNumber)</label><input placeholder="+50212345678" /></div>
                    <div className="field"><label>Imagen (photos)</label><input type="file" /></div>
                    <div className="field">
                        <label>Estado visual</label>
                        <select>
                            <option>Operativa</option>
                            <option>En mantenimiento</option>
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
                    <h2 style={{ fontSize: "18px", marginBottom: "10px" }}>Eliminar sucursal</h2>
                    <p className="confirm-text">La sucursal seleccionada sera eliminada. ¿Deseas continuar?</p>
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