export const MenuSection = () => {
    return (
        <>
            <header className="header">
                <div>
                    <h2>CRUD de Menu</h2>
                    <p>Organiza categorias, productos y disponibilidad de cocina.</p>
                </div>
                <button className="btn danger">Nuevo producto</button>
            </header>

            <section className="section">
                <div className="top">
                    <p style={{ fontSize: "13px", color: "#6f6f78" }}>Gestion centralizada de productos y categorias del menu.</p>
                </div>

                <section className="kpis">
                    <article className="kpi"><span>Total productos</span><strong>Sin datos</strong></article>
                    <article className="kpi"><span>Disponibles</span><strong>Sin datos</strong></article>
                    <article className="kpi"><span>No disponibles</span><strong>Sin datos</strong></article>
                </section>

                <div style={{ overflowX: "auto" }}>
                    <table>
                        <thead>
                            <tr>
                                <th>Restaurante (restaurant)</th>
                                <th>Nombre (name)</th>
                                <th>Descripcion (description)</th>
                                <th>Ingredientes (ingredients)</th>
                                <th>Precio (price)</th>
                                <th>Categoria (category)</th>
                                <th>Imagen (image)</th>
                                <th>Activo (isActive)</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Sin datos</td>
                                <td>Sin datos</td>
                                <td>Sin datos</td>
                                <td>Sin datos</td>
                                <td>00.00</td>
                                <td>Entrada</td>
                                <td>Sin datos</td>
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
                    <h2 style={{ fontSize: "18px", marginBottom: "10px" }}>Nuevo producto</h2>
                    <div className="field"><label>ID restaurante (restaurant)</label><input placeholder="MongoID" /></div>
                    <div className="field"><label>Nombre (name)</label><input /></div>
                    <div className="field"><label>Descripcion (description)</label><textarea /></div>
                    <div className="field"><label>Ingredientes (ingredients)</label><input placeholder="tomate, queso, albahaca" /></div>
                    <div className="field"><label>Precio (price)</label><input type="number" min="0" step="0.01" placeholder="00.00" /></div>
                    <div className="field">
                        <label>Categoria (category)</label>
                        <select>
                            <option>Entrada</option>
                            <option>Plato Fuerte</option>
                            <option>Postre</option>
                            <option>Bebida</option>
                            <option>Acompañamiento</option>
                            <option>Otro</option>
                        </select>
                    </div>
                    <div className="field"><label>Imagen (image)</label><input type="file" /></div>
                    <div className="row">
                        <button className="btn soft">Cancelar</button>
                        <button className="btn danger">Guardar</button>
                    </div>
                </div>
            </div>

            <div className="modal">
                <div className="modal-card">
                    <h2 style={{ fontSize: "18px", marginBottom: "10px" }}>Eliminar producto</h2>
                    <p className="confirm-text">El producto seleccionado sera eliminado. ¿Deseas continuar?</p>
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