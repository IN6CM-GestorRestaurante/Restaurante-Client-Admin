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
                    <article className="kpi"><span>Total sucursales</span><strong>3</strong></article>
                    <article className="kpi"><span>Operativas</span><strong>2</strong></article>
                    <article className="kpi"><span>En mantenimiento</span><strong>1</strong></article>
                </section>
                <div className="grid">
                    <article className="card">
                        <h3>Centro</h3>
                        <p>Bogota</p>
                        <span className="badge ok">Operativa</span>
                        <div className="actions">
                            <button>Editar</button>
                            <button>Eliminar</button>
                        </div>
                    </article>
                    <article className="card">
                        <h3>Norte</h3>
                        <p>Medellin</p>
                        <span className="badge ok">Operativa</span>
                        <div className="actions">
                            <button>Editar</button>
                            <button>Eliminar</button>
                        </div>
                    </article>
                    <article className="card">
                        <h3>Sur</h3>
                        <p>Cali</p>
                        <span className="badge ko">En mantenimiento</span>
                        <div className="actions">
                            <button>Editar</button>
                            <button>Eliminar</button>
                        </div>
                    </article>
                </div>
            </section>

            <div className="modal">
                <div className="modal-card">
                    <h2 style={{ fontSize: "18px", marginBottom: "10px" }}>Nueva sucursal</h2>
                    <div className="field"><label>Nombre</label><input /></div>
                    <div className="field"><label>Ciudad</label><input /></div>
                    <div className="field">
                        <label>Estado</label>
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