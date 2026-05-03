export const ReservacionesSection = () => {
    return (
        <>
            <header className="header">
                <div>
                    <h2>CRUD de Reservaciones</h2>
                    <p>Administra agenda, disponibilidad y confirmaciones.</p>
                </div>
                <button className="btn danger">Nueva reservacion</button>
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

                <div style={{ overflowX: "auto" }}>
                    <table>
                        <thead>
                            <tr>
                                <th>Usuario (user)</th>
                                <th>Restaurante (restaurant)</th>
                                <th>Tipo (type)</th>
                                <th>Mesa (table)</th>
                                <th>Fecha y hora (date)</th>
                                <th>Direccion entrega (deliveryAddress)</th>
                                <th>Estado (status)</th>
                                <th>Notas (notes)</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Sin datos</td>
                                <td>Sin datos</td>
                                <td>En mesa</td>
                                <td>Mesa 5</td>
                                <td>Sin datos</td>
                                <td>No aplica</td>
                                <td>Pendiente</td>
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
                    <h2 style={{ fontSize: "18px", marginBottom: "10px" }}>Nueva reservacion</h2>
                    <div className="field"><label>ID usuario (user)</label><input placeholder="MongoID" /></div>
                    <div className="field"><label>ID restaurante (restaurant)</label><input placeholder="MongoID" /></div>
                    <div className="field">
                        <label>Tipo (type)</label>
                        <select>
                            <option>En Mesa</option>
                            <option>Para llevar</option>
                            <option>A domicilio</option>
                        </select>
                    </div>
                    <div className="field"><label>Fecha y hora (date ISO8601)</label><input placeholder="2026-04-26T19:30:00.000Z" /></div>
                    <div className="field"><label>ID mesa (table)</label><input placeholder="Requerido para En Mesa" /></div>
                    <div className="field"><label>Direccion entrega (deliveryAddress)</label><input placeholder="Requerido para A domicilio" /></div>
                    <div className="field"><label>Item menu (items.menuItem)</label><input placeholder="MongoID" /></div>
                    <div className="field"><label>Cantidad item (items.quantity)</label><input type="number" min="1" /></div>
                    <div className="field">
                        <label>Estado (status)</label>
                        <select>
                            <option>Confirmada</option>
                            <option>Pendiente</option>
                            <option>En curso</option>
                            <option>Completada</option>
                            <option>Cancelada</option>
                        </select>
                    </div>
                    <div className="field"><label>Notas (notes)</label><textarea /></div>
                    <div className="row">
                        <button className="btn soft">Cancelar</button>
                        <button className="btn danger">Guardar</button>
                    </div>
                </div>
            </div>

            <div className="modal">
                <div className="modal-card">
                    <h2 style={{ fontSize: "18px", marginBottom: "10px" }}>Eliminar reservacion</h2>
                    <p className="confirm-text">La reservacion seleccionada sera eliminada. ¿Deseas continuar?</p>
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