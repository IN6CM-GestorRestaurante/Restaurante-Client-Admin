export const ConfiguracionSection = () => {
    return (
        <>
            <header className="head">
                <div>
                    <h2>Configuracion General</h2>
                    <p>Control de parametros administrativos del sistema.</p>
                </div>
                <button className="btn danger">Guardar cambios</button>
            </header>
            <div className="config-grid">
                <section className="card">
                    <h3>Politica de seguridad</h3>
                    <p>Ajusta reglas de acceso para todos los administradores.</p>
                    <div className="field"><label>Intentos maximos</label><input type="number" defaultValue="5" /></div>
                    <div className="field">
                        <label>Sesion expira en</label>
                        <select defaultValue="60 minutos">
                            <option>30 minutos</option>
                            <option>60 minutos</option>
                            <option>120 minutos</option>
                        </select>
                    </div>
                </section>
                <section className="card">
                    <h3>Notificaciones</h3>
                    <p>Controla avisos por actividad administrativa critica.</p>
                    <div className="field"><label>Correo de alertas</label><input defaultValue="admin@resto.com" /></div>
                    <div className="field">
                        <label>Canal principal</label>
                        <select defaultValue="Email">
                            <option>Email</option>
                            <option>SMS</option>
                            <option>Ambos</option>
                        </select>
                    </div>
                </section>
                <section className="card">
                    <h3>Respaldo de datos</h3>
                    <p>Frecuencia de backup para la plataforma administrativa.</p>
                    <div className="field">
                        <label>Frecuencia</label>
                        <select defaultValue="Semanal">
                            <option>Diaria</option>
                            <option>Semanal</option>
                            <option>Mensual</option>
                        </select>
                    </div>
                    <div className="field">
                        <label>Retencion</label>
                        <select defaultValue="90 dias">
                            <option>30 dias</option>
                            <option>90 dias</option>
                            <option>180 dias</option>
                        </select>
                    </div>
                </section>
                <section className="card">
                    <h3>Ambiente</h3>
                    <p>Define parametros de ejecucion del panel administrativo.</p>
                    <div className="field">
                        <label>Zona horaria</label>
                        <select defaultValue="America/Bogota">
                            <option>America/Bogota</option>
                            <option>America/Lima</option>
                            <option>America/Santiago</option>
                        </select>
                    </div>
                    <div className="field">
                        <label>Idioma</label>
                        <select defaultValue="Espanol">
                            <option>Espanol</option>
                            <option>English</option>
                        </select>
                    </div>
                </section>
            </div>
            <div className="footer"></div>
        </>
    );
};