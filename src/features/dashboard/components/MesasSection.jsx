export const MesasSection = () => {
    return (
        <>
            <header className="header">
                <div>
                    <h2>CRUD de Mesas</h2>
                    <p>Configura zonas, estado y disponibilidad de mesas.</p>
                </div>
                <button className="btn danger">Nueva mesa</button>
            </header>

            <section className="section">
                <div className="top">
                    <p style={{ fontSize: "13px", color: "#6f6f78" }}>Gestion centralizada de mesas y zonas del restaurante.</p>
                </div>

                <section className="kpis">
                    <article className="kpi"><span>Total mesas</span><strong>Sin datos</strong></article>
                    <article className="kpi"><span>Disponibles</span><strong>Sin datos</strong></article>
                    <article className="kpi"><span>Fuera de servicio</span><strong>Sin datos</strong></article>
                </section>

                <div style={{ overflowX: "auto" }}>
                    <table>
                        <thead>
                            <tr>
                                <th>Restaurante (restaurant)</th>
                                <th>Numero (number)</th>
                                <th>Capacidad (capacity)</th>
                                <th>Ubicacion (location)</th>
                                <th>Estado (status)</th>
                                <th>Horarios (availabilitySchedules)</th>
                                <th>Descripcion (description)</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Sin datos</td>
                                <td>Sin datos</td>
                                <td>Sin datos</td>
                                <td>Sala Principal</td>
                                <td>Disponible</td>
                                <td>Lunes 08:00-22:00</td>
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
                    <h2 style={{ fontSize: "18px", marginBottom: "10px" }}>Nueva mesa</h2>
                    <div className="field"><label>ID restaurante (restaurant)</label><input placeholder="MongoID" /></div>
                    <div className="field"><label>Numero de mesa (number)</label><input /></div>
                    <div className="field"><label>Capacidad (capacity)</label><input type="number" min="1" /></div>
                    <div className="field">
                        <label>Ubicacion (location)</label>
                        <select>
                            <option>Terraza</option>
                            <option>Sala Principal</option>
                            <option>VIP</option>
                            <option>Bar</option>
                            <option>Ventana</option>
                            <option>Balcón</option>
                            <option>Otro</option>
                        </select>
                    </div>
                    <div className="field">
                        <label>Estado (status)</label>
                        <select>
                            <option>Disponible</option>
                            <option>Ocupada</option>
                            <option>Reservada</option>
                            <option>Mantenimiento</option>
                        </select>
                    </div>
                    <div className="field"><label>Dia horario (availabilitySchedules.day)</label><input placeholder="Lunes" /></div>
                    <div className="field"><label>Inicio horario (startTime)</label><input placeholder="08:00" /></div>
                    <div className="field"><label>Fin horario (endTime)</label><input placeholder="22:00" /></div>
                    <div className="field"><label>Descripcion (description)</label><textarea /></div>
                    <div className="row">
                        <button className="btn soft">Cancelar</button>
                        <button className="btn danger">Guardar</button>
                    </div>
                </div>
            </div>

            <div className="modal">
                <div className="modal-card">
                    <h2 style={{ fontSize: "18px", marginBottom: "10px" }}>Eliminar mesa</h2>
                    <p className="confirm-text">La mesa seleccionada sera eliminada. ¿Deseas continuar?</p>
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