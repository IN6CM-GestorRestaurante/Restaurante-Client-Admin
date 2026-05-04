import { useNavigate } from "react-router-dom";

export const ResumenSection = () => {
    const navigate = useNavigate();

    return (
        <>
            <header className="topbar">
                <div>
                    <h2>Dashboard de Administrador</h2>
                    <p>Panel general de operacion administrativa del restaurante.</p>
                </div>
                <div className="chips">
                    <span className="chip">Ambiente: Produccion</span>
                    <span className="chip">Ultima actividad: Sin datos</span>
                </div>
            </header>

            <section className="stats">
                <article className="stat-card">
                    <span>Total modulos</span>
                    <strong>Sin datos</strong>
                </article>
                <article className="stat-card">
                    <span>Registros del dia</span>
                    <strong>Sin datos</strong>
                </article>
                <article className="stat-card">
                    <span>Alertas abiertas</span>
                    <strong>Sin datos</strong>
                </article>
                <article className="stat-card">
                    <span>Monto estimado</span>
                    <strong>00.00</strong>
                </article>
            </section>

            <section className="views">
                <article className="view-card">
                    <i className="fas fa-chair"></i>
                    <h3>Gestion de Mesas</h3>
                    <p>Administra mesas, disponibilidad y ubicacion.</p>
                    <button type="button" onClick={() => navigate("/dashboard/tables")}>
                        Ir a la vista <i className="fas fa-arrow-right"></i>
                    </button>
                </article>

                <article className="view-card">
                    <i className="fas fa-receipt"></i>
                    <h3>Gestion de Ordenes</h3>
                    <p>Supervisa el flujo de ordenes desde cocina hasta entrega.</p>
                    <button type="button" onClick={() => navigate("/dashboard/orders")}>
                        Ir a la vista <i className="fas fa-arrow-right"></i>
                    </button>
                </article>

                <article className="view-card">
                    <i className="fas fa-utensils"></i>
                    <h3>Gestion de Menu</h3>
                    <p>Controla categorias, platos y disponibilidad del menu.</p>
                    <button type="button" onClick={() => navigate("/dashboard/menus")}>
                        Ir a la vista <i className="fas fa-arrow-right"></i>
                    </button>
                </article>

                <article className="view-card">
                    <i className="fas fa-calendar-check"></i>
                    <h3>Gestion de Reservaciones</h3>
                    <p>Organiza reservas, turnos y estados de atencion.</p>
                    <button type="button" onClick={() => navigate("/dashboard/reservations")}>
                        Ir a la vista <i className="fas fa-arrow-right"></i>
                    </button>
                </article>

                <article className="view-card">
                    <i className="fas fa-store"></i>
                    <h3>Gestion de Sucursales</h3>
                    <p>Administra sedes y datos operativos por restaurante.</p>
                    <button type="button" onClick={() => navigate("/dashboard/locations")}>
                        Ir a la vista <i className="fas fa-arrow-right"></i>
                    </button>
                </article>

                <article className="view-card">
                    <i className="fas fa-users"></i>
                    <h3>Gestion de Usuarios</h3>
                    <p>Gestiona perfiles, roles y estado de cuenta de usuarios.</p>
                    <button type="button" onClick={() => navigate("/dashboard/users")}>
                        Ir a la vista <i className="fas fa-arrow-right"></i>
                    </button>
                </article>
            </section>
        </>
    );
};
