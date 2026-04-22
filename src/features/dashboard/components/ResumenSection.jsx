export const ResumenSection = ({ onNavigate }) => {
    return (
        <>
            <header className="topbar">
                <div>
                    <h2>Dashboard de Administrador</h2>
                    <p>Gestiona usuarios, permisos y estructura operativa del restaurante.</p>
                </div>
                <div className="chips">
                    <span className="chip">Ambiente: Produccion</span>
                    <span className="chip">Ultima actividad: Hoy 10:40</span>
                </div>
            </header>

            <section className="stats">
                <article className="stat-card">
                    <span>Admins activos</span>
                    <strong>12</strong>
                </article>
                <article className="stat-card">
                    <span>Roles creados</span>
                    <strong>6</strong>
                </article>
                <article className="stat-card">
                    <span>Sucursales</span>
                    <strong>4</strong>
                </article>
                <article className="stat-card">
                    <span>Alertas abiertas</span>
                    <strong>3</strong>
                </article>
            </section>

            <section className="views">
                <article className="view-card">
                    <i className="fas fa-user-shield"></i>
                    <h3>CRUD de Administradores</h3>
                    <p>Crea, edita, activa o elimina cuentas administrativas con control por estado y rol.</p>
                    <button type="button" onClick={() => onNavigate("administradores")}>
                        Ir a la vista <i className="fas fa-arrow-right"></i>
                    </button>
                </article>

                <article className="view-card">
                    <i className="fas fa-key"></i>
                    <h3>CRUD de Roles y Permisos</h3>
                    <p>Define niveles de acceso para cada administrador y controla permisos criticos.</p>
                    <button type="button" onClick={() => onNavigate("roles")}>
                        Ir a la vista <i className="fas fa-arrow-right"></i>
                    </button>
                </article>

                <article className="view-card">
                    <i className="fas fa-store"></i>
                    <h3>CRUD de Sucursales</h3>
                    <p>Administra sedes, encargado principal y estado operativo de cada restaurante.</p>
                    <button type="button" onClick={() => onNavigate("sucursales")}>
                        Ir a la vista <i className="fas fa-arrow-right"></i>
                    </button>
                </article>

                <article className="view-card">
                    <i className="fas fa-sliders-h"></i>
                    <h3>Configuracion General</h3>
                    <p>Actualiza parametros administrativos: politicas, respaldo y notificaciones del sistema.</p>
                    <button type="button" onClick={() => onNavigate("configuracion")}>
                        Ir a la vista <i className="fas fa-arrow-right"></i>
                    </button>
                </article>
            </section>
        </>
    );
};