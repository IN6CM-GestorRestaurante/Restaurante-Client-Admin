import { useNavigate, Link } from "react-router-dom";
import { useEffect } from "react";
import { useAuthStore } from "../../auth/store/authStore";
import { useLocationsStore } from "../../locations/store/adminStore";
import { useUsersStore } from "../../users/store/adminStore";
import { useOrdersStore } from "../../orders/store/adminStore";
import { useTablesStore } from "../../tables/store/adminStore";
import { useCompaniesStore } from "../../companies/store/adminStore";

const QUICK_ACCESS = [
    { key: "companies",    label: "Compañías",      icon: "fas fa-building",           color: "#a855f7", bg: "#faf5ff", desc: "Empresas registradas",    roles: ["SUPER_ADMIN", "ADMIN_ROLE"] },
    { key: "locations",    label: "Sucursales",     icon: "fas fa-store",              color: "#dc2626", bg: "#fef2f2", desc: "Sedes y datos operativos",roles: ["COMPANY_ADMIN"] },
    { key: "users",        label: "Usuarios",       icon: "fas fa-users",              color: "#0d9488", bg: "#f0fdfa", desc: "Personal y accesos",      roles: ["SUPER_ADMIN", "ADMIN_ROLE", "COMPANY_ADMIN", "BRANCH_MANAGER"] },
    { key: "tables",       label: "Mesas",          icon: "fas fa-chair",              color: "#ea580c", bg: "#fff7ed", desc: "Disponibilidad y zonas", roles: ["COMPANY_ADMIN", "BRANCH_MANAGER", "WAITER", "WAITRESS", "RECEPTIONIST"] },
    { key: "orders",       label: "Órdenes",        icon: "fas fa-receipt",            color: "#0284c7", bg: "#f0f9ff", desc: "Comandas y cocina",       roles: ["COMPANY_ADMIN", "BRANCH_MANAGER", "WAITER", "WAITRESS", "CHEF"] },
    { key: "reservations", label: "Reservaciones",  icon: "fas fa-calendar-check",     color: "#be185d", bg: "#fdf2f8", desc: "Turnos y atención",       roles: ["COMPANY_ADMIN", "BRANCH_MANAGER", "WAITER", "WAITRESS", "RECEPTIONIST"] },
    { key: "menus",        label: "Menú",           icon: "fas fa-utensils",           color: "#16a34a", bg: "#f0fdf4", desc: "Platillos y combos",      roles: ["COMPANY_ADMIN", "BRANCH_MANAGER", "CHEF"] },
    { key: "ingredients",  label: "Ingredientes",   icon: "fas fa-carrot",             color: "#ca8a04", bg: "#fefce8", desc: "Materia prima",           roles: ["COMPANY_ADMIN", "BRANCH_MANAGER", "CHEF"] },
    { key: "stocks",       label: "Inventario",     icon: "fas fa-cubes",              color: "#f59e0b", bg: "#fffbeb", desc: "Stock de ingredientes",   roles: ["COMPANY_ADMIN", "BRANCH_MANAGER"] },
    { key: "invoices",     label: "Facturas",       icon: "fas fa-file-invoice-dollar",color: "#7c3aed", bg: "#f5f3ff", desc: "Facturación y pagos",     roles: ["COMPANY_ADMIN", "BRANCH_MANAGER", "CASHIER"] },
];

const GROUPS = [
  {
    title: "Gestión y Control",
    desc: "Administración global, sedes y accesos del personal",
    keys: ["companies", "locations", "users"],
    accentColor: "from-purple-500 to-indigo-600",
  },
  {
    title: "Operaciones de Salón",
    desc: "Servicio al cliente, control de mesas y comandas activas",
    keys: ["tables", "orders", "reservations"],
    accentColor: "from-blue-500 to-sky-600",
  },
  {
    title: "Cocina y Finanzas",
    desc: "Recetas, inventario de almacén y cobros de caja",
    keys: ["menus", "ingredients", "stocks", "invoices"],
    accentColor: "from-emerald-500 to-amber-600",
  }
];

export const ResumenSection = () => {
    const navigate = useNavigate();
    const user = useAuthStore((s) => s.user);
    const role = user?.role;

    const locations = useLocationsStore((s) => s.locations || []);
    const users = useUsersStore((s) => s.users || []);
    const orders = useOrdersStore((s) => s.orders || []);
    const tables = useTablesStore((s) => s.tables || []);
    const companies = useCompaniesStore((s) => s.companies || []);

    const getLocations = useLocationsStore((s) => s.getLocations);
    const getUsers = useUsersStore((s) => s.getUsers);
    const getTables = useTablesStore((s) => s.getTables);
    const getCompanies = useCompaniesStore((s) => s.getCompanies);

    useEffect(() => {
        if (role === "SUPER_ADMIN" || role === "ADMIN_ROLE") {
            getCompanies?.();
            getUsers?.();
        } else {
            getLocations?.();
            getUsers?.();
            getTables?.();
        }
    }, [role, getCompanies, getLocations, getUsers, getTables]);

    const totalRevenue = orders.reduce((acc, o) => acc + (o.total || 0), 0);
    const availableTables = tables.filter((t) => t.status === "Disponible").length;
    const occupiedTables = tables.filter((t) => t.status === "Ocupada").length;
    const activeOrders = orders.filter((o) => !["paid", "cancelled"].includes(o.status)).length;

    const visibleCards = QUICK_ACCESS.filter((c) => c.roles.includes(role));

    const formatQ = (n) => `Q ${n.toFixed(2)}`;

    return (
        <div className="mx-auto w-full max-w-none space-y-8 px-4 pt-4 pb-12 sm:px-6 sm:pt-5 sm:pb-14 lg:px-8 lg:pt-6 lg:pb-16 xl:px-10">
            {/* KPIs */}
            <section className="section rounded-3xl bg-white/70 p-4 shadow-sm sm:p-6 lg:p-8" style={{ display: "flex", flexDirection: "column", gap: "40px" }}>
                <div className="space-y-1 px-1 pb-4 sm:px-0 sm:pb-8">
                    <div className="flex items-center gap-3">
                        <span className="h-6 w-1 rounded-full bg-linear-to-b from-orange-500 to-amber-500" />
                        <h3 className="text-2xl font-bold text-stone-900 tracking-tight sm:text-3xl">Gestor de Restaurante</h3>
                    </div>
                    <p className="text-sm font-semibold text-stone-500 leading-relaxed mb-4 sm:mb-6 sm:text-base">
                        {role === "SUPER_ADMIN" || role === "ADMIN_ROLE" 
                            ? `Panel de administración global — Bienvenido, ${user?.name || user?.email || "Administrador Global"}.`
                            : `Panel de administración — Bienvenido, ${user?.name || user?.email || "Administrador"}.`}
                    </p>
                </div>

                <section className="kpis">
                    {role === "SUPER_ADMIN" || role === "ADMIN_ROLE" ? (
                        <>
                            <article className="kpi">
                                <span><i className="fas fa-building" style={{ color: "#a855f7", marginRight: 6 }}></i>Compañías</span>
                                <strong>{companies.length}</strong>
                            </article>
                            <article className="kpi">
                                <span><i className="fas fa-users" style={{ color: "#0d9488", marginRight: 6 }}></i>Usuarios</span>
                                <strong>{users.length}</strong>
                            </article>
                        </>
                    ) : (
                        <>
                            <article className="kpi">
                                <span><i className="fas fa-store" style={{ color: "#ea580c", marginRight: 6 }}></i>Sucursales</span>
                                <strong>{locations.length}</strong>
                            </article>
                            <article className="kpi">
                                <span><i className="fas fa-users" style={{ color: "#0d9488", marginRight: 6 }}></i>Empleados</span>
                                <strong>{users.length}</strong>
                            </article>
                            <article className="kpi">
                                <span><i className="fas fa-receipt" style={{ color: "#0284c7", marginRight: 6 }}></i>Órdenes activas</span>
                                <strong>{activeOrders}</strong>
                            </article>
                            <article className="kpi">
                                <span><i className="fas fa-coins" style={{ color: "#ca8a04", marginRight: 6 }}></i>Ingresos</span>
                                <strong>{formatQ(totalRevenue)}</strong>
                            </article>
                        </>
                    )}
                </section>

                {/* Resumen de mesas */}
                {role !== "SUPER_ADMIN" && role !== "ADMIN_ROLE" && (
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 24, marginBottom: 40 }}>
                        <div style={{ padding: 20, borderRadius: 18, backgroundColor: "#dcfce7", border: "1px solid #bbf7d0" }}>
                            <span style={{ fontSize: 12, color: "#166534", fontWeight: 600 }}>Mesas disponibles</span>
                            <strong style={{ display: "block", fontSize: 28, color: "#166534", marginTop: 4 }}>{availableTables}</strong>
                        </div>
                        <div style={{ padding: 20, borderRadius: 18, backgroundColor: "#fee2e2", border: "1px solid #fecaca" }}>
                            <span style={{ fontSize: 12, color: "#991b1b", fontWeight: 600 }}>Mesas ocupadas</span>
                            <strong style={{ display: "block", fontSize: 28, color: "#991b1b", marginTop: 4 }}>{occupiedTables}</strong>
                        </div>
                        <div style={{ padding: 20, borderRadius: 18, backgroundColor: "#f0f9ff", border: "1px solid #bae6fd" }}>
                            <span style={{ fontSize: 12, color: "#0369a1", fontWeight: 600 }}>Total mesas</span>
                            <strong style={{ display: "block", fontSize: 28, color: "#0369a1", marginTop: 4 }}>{tables.length}</strong>
                        </div>
                    </div>
                )}

                {/* Últimas órdenes */}
                {role !== "SUPER_ADMIN" && role !== "ADMIN_ROLE" && orders.length > 0 && (
                    <div style={{ marginBottom: 40 }}>
                        <h3 style={{ fontSize: 14, fontWeight: 700, color: "#292524", marginBottom: 12 }}>
                            <i className="fas fa-clock-rotate-left" style={{ color: "#ea580c", marginRight: 6 }}></i>
                            Últimas órdenes
                        </h3>
                        <div style={{ overflowX: "auto" }}>
                            <table style={{ width: "100%", fontSize: 13, borderCollapse: "collapse" }}>
                                <thead>
                                    <tr style={{ textAlign: "left", color: "#78716c", borderBottom: "1px solid #e7e5e4" }}>
                                        <th style={{ padding: "8px 12px", fontWeight: 600 }}>Mesa</th>
                                        <th style={{ padding: "8px 12px", fontWeight: 600 }}>Mesero</th>
                                        <th style={{ padding: "8px 12px", fontWeight: 600 }}>Items</th>
                                        <th style={{ padding: "8px 12px", fontWeight: 600 }}>Total</th>
                                        <th style={{ padding: "8px 12px", fontWeight: 600 }}>Estado</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.slice(0, 5).map((o) => {
                                        const tNames = Array.isArray(o.tables) ? o.tables.map((t) => t.number || t).join(", ") : "—";
                                        const waiter = o.waiter ? `${o.waiter.name || ""} ${o.waiter.surname || ""}`.trim() : "—";
                                        const st = o.status || "pending";
                                        return (
                                            <tr key={o._id} style={{ borderBottom: "1px solid #f5f5f4" }}>
                                                <td style={{ padding: "8px 12px", fontWeight: 600 }}>{tNames}</td>
                                                <td style={{ padding: "8px 12px" }}>{waiter}</td>
                                                <td style={{ padding: "8px 12px" }}>{(o.items || []).length}</td>
                                                <td style={{ padding: "8px 12px", fontWeight: 600 }}>{formatQ(o.total || 0)}</td>
                                                <td style={{ padding: "8px 12px" }}>
                                                    <span style={{ fontSize: 11, fontWeight: 700, padding: "2px 8px", borderRadius: 6, backgroundColor: st === "pending" ? "#fef9c3" : st === "in-kitchen" ? "#ffedd5" : st === "ready" ? "#dcfce7" : "#dbeafe", color: st === "pending" ? "#854d0e" : st === "in-kitchen" ? "#9a3412" : st === "ready" ? "#166534" : "#1e40af" }}>
                                                        {st}
                                                    </span>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* Acceso rápido — clickable cards grouped beautifully */}
                <div className="rounded-3xl bg-transparent p-0 sm:p-1 lg:p-2" style={{ marginTop: "60px", marginBottom: "40px", display: "flex", flexDirection: "column", gap: "40px" }}>
                    
                    {GROUPS.map((group) => {
                        const groupCards = visibleCards.filter((card) => group.keys.includes(card.key));
                        if (groupCards.length === 0) return null;
                        
                        return (
                            <div key={group.title} className="space-y-8 rounded-2xl bg-white/60 p-5 sm:p-6 lg:p-7">
                                <div className="space-y-4 px-1 sm:px-0 pt-2 pb-1">
                                    <div className="flex items-center gap-3 justify-center sm:justify-start">
                                        <span className={`h-6 w-1 rounded-full bg-linear-to-b ${group.accentColor}`} />
                                        <h4 className="text-sm font-semibold text-stone-900 tracking-tight">{group.title}</h4>
                                    </div>
                                    <p className="text-xs font-semibold text-stone-500 leading-relaxed max-w-3xl text-center sm:text-left mx-auto sm:mx-0">{group.desc}</p>
                                </div>
                                
                                <div className="grid grid-cols-1 gap-5 justify-items-center md:grid-cols-2">
                                    {groupCards.map((card) => (
                                        <Link 
                                            to={`/dashboard/${card.key}`}
                                            key={card.key}
                                            className="group flex min-h-26 w-full max-w-2xl flex-col items-center rounded-2xl border border-stone-200 bg-white p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md cursor-pointer text-stone-900 no-underline sm:flex-row sm:items-center sm:p-5"
                                            style={{ textDecoration: 'none' }}
                                        >
                                            <div className="flex w-full items-center justify-center gap-4 text-center sm:justify-start sm:text-left">
                                                <div
                                                    className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-white mx-auto sm:mx-0"
                                                    style={{
                                                        color: card.color,
                                                    }}
                                                >
                                                    <i className={`${card.icon} text-xl`} />
                                                </div>

                                                <div className="min-w-0 max-w-md space-y-1 text-center sm:text-left">
                                                    <h3 className="text-lg font-extrabold text-stone-800 leading-tight group-hover:text-orange-500 transition-colors duration-200 wrap-break-word">
                                                        {card.label}
                                                    </h3>
                                                    <p className="text-sm font-medium text-stone-500 leading-relaxed wrap-break-word max-w-sm mx-auto sm:mx-0">
                                                        {card.desc}
                                                    </p>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>
        </div>
    );
};
