export const OrdenesSection = () => {
    return (
        <>
            <header className="header">
                <div>
                    <h2>CRUD de Ordenes</h2>
                    <p>Gestiona flujo de cocina, entrega y atencion en salon.</p>
                </div>
                <button className="btn danger">Nueva orden</button>
            </header>

            <section className="section">
                <div className="top">
                    <p style={{ fontSize: "13px", color: "#6f6f78" }}>Gestion centralizada de ordenes en cocina y salon.</p>
                </div>

                <section className="kpis">
                    <article className="kpi"><span>Total ordenes</span><strong>Sin datos</strong></article>
                    <article className="kpi"><span>En proceso</span><strong>Sin datos</strong></article>
                    <article className="kpi"><span>Completadas</span><strong>Sin datos</strong></article>
                </section>

                <div style={{ overflowX: "auto" }}>
                    <table>
                        <thead>
                            <tr>
                                <th>Mesa (table)</th>
                                <th>Restaurante (restaurant)</th>
                                <th>Platillo (items.menuItem)</th>
                                <th>Cantidad (items.quantity)</th>
                                <th>Precio (items.price)</th>
                                <th>Modificadores (items.modifiers)</th>
                                <th>Estado item (items.status)</th>
                                <th>Estado orden (status)</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Sin datos</td>
                                <td>Sin datos</td>
                                <td>Sin datos</td>
                                <td>Sin datos</td>
                                <td>Sin datos</td>
                                <td>Sin datos</td>
                                <td>En espera</td>
                                <td>Abierta</td>
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
                    <h2 style={{ fontSize: "18px", marginBottom: "10px" }}>Nueva orden</h2>
                    <div className="field"><label>ID mesa (table)</label><input placeholder="MongoID" /></div>
                    <div className="field"><label>ID restaurante (restaurant)</label><input placeholder="MongoID" /></div>
                    <div className="field"><label>ID platillo (items.menuItem)</label><input placeholder="MongoID" /></div>
                    <div className="field"><label>Cantidad (items.quantity)</label><input type="number" min="1" /></div>
                    <div className="field"><label>Precio (items.price)</label><input type="number" min="0" step="0.01" /></div>
                    <div className="field"><label>Modificadores (items.modifiers)</label><input placeholder="Sin cebolla, extra queso" /></div>
                    <div className="field">
                        <label>Estado item</label>
                        <select>
                            <option>En espera</option>
                            <option>En cocina</option>
                            <option>Listo</option>
                            <option>Servido</option>
                        </select>
                    </div>
                    <div className="field">
                        <label>Estado orden</label>
                        <select>
                            <option>Abierta</option>
                            <option>Cerrada</option>
                            <option>Cancelada</option>
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
                    <h2 style={{ fontSize: "18px", marginBottom: "10px" }}>Eliminar orden</h2>
                    <p className="confirm-text">La orden seleccionada sera eliminada. ¿Deseas continuar?</p>
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