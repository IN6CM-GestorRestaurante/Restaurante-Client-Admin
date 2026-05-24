import { useNavigate, Link } from "react-router-dom";
import { useEffect } from "react";
import { useAuthStore } from "../../auth/store/authStore";
import { useLocationsStore } from "../../locations/store/adminStore";
import { useUsersStore } from "../../users/store/adminStore";
import { useOrdersStore } from "../../orders/store/adminStore";
import { useTablesStore } from "../../tables/store/adminStore";

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

    const getLocations = useLocationsStore((s) => s.getLocations);
    const getUsers = useUsersStore((s) => s.getUsers);
    const getTables = useTablesStore((s) => s.getTables);

    useEffect(() => {
        getLocations?.();
        getUsers?.();
        getTables?.();
    }, [getLocations, getUsers, getTables]);

    const totalRevenue = orders.reduce((acc, o) => acc + (o.total || 0), 0);
    const availableTables = tables.filter((t) => t.status === "Disponible").length;
    const occupiedTables = tables.filter((t) => t.status === "Ocupada").length;
    const activeOrders = orders.filter((o) => !["paid", "cancelled"].includes(o.status)).length;

    const visibleCards = QUICK_ACCESS.filter((c) => c.roles.includes(role));

    const formatQ = (n) => `Q ${n.toFixed(2)}`;

    return (
        <>
            <header className="header">
                <div>
                    <h2>Gestor de Restaurante</h2>
                    <p>Panel de administración — Bienvenido, {user?.name || user?.email || "Administrador"}.</p>
                </div>
                <div className="chips" style={{ display: "flex", gap: 8 }}>
                    <span className="chip" style={{ fontSize: 12, padding: "4px 12px", borderRadius: 8, backgroundColor: "#f5f5f4", color: "#57534e", border: "1px solid #e7e5e4" }}>
                        <i className="fas fa-user-shield mr-1"></i>{role?.replace(/_/g, " ")}
                    </span>
                </div>
            </header>

            {/* KPIs */}
            <section className="section">
                <section className="kpis">
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
                </section>

                {/* Resumen de mesas */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 12, marginBottom: 24 }}>
                    <div style={{ padding: 16, borderRadius: 12, backgroundColor: "#dcfce7", border: "1px solid #bbf7d0" }}>
                        <span style={{ fontSize: 12, color: "#166534", fontWeight: 600 }}>Mesas disponibles</span>
                        <strong style={{ display: "block", fontSize: 28, color: "#166534", marginTop: 4 }}>{availableTables}</strong>
                    </div>
                    <div style={{ padding: 16, borderRadius: 12, backgroundColor: "#fee2e2", border: "1px solid #fecaca" }}>
                        <span style={{ fontSize: 12, color: "#991b1b", fontWeight: 600 }}>Mesas ocupadas</span>
                        <strong style={{ display: "block", fontSize: 28, color: "#991b1b", marginTop: 4 }}>{occupiedTables}</strong>
                    </div>
                    <div style={{ padding: 16, borderRadius: 12, backgroundColor: "#f0f9ff", border: "1px solid #bae6fd" }}>
                        <span style={{ fontSize: 12, color: "#0369a1", fontWeight: 600 }}>Total mesas</span>
                        <strong style={{ display: "block", fontSize: 28, color: "#0369a1", marginTop: 4 }}>{tables.length}</strong>
                    </div>
                </div>

                {/* Últimas órdenes */}
                {orders.length > 0 && (
                    <div style={{ marginBottom: 24 }}>
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
                <div className="mt-8 space-y-8">
                    <h3 className="text-lg font-extrabold text-stone-800 flex items-center gap-2 border-b border-stone-200 pb-3">
                        <i className="fas fa-grip-horizontal text-orange-500"></i>
                        Módulos de Acceso Rápido
                    </h3>
                    
                    {GROUPS.map((group) => {
                        const groupCards = visibleCards.filter((card) => group.keys.includes(card.key));
                        if (groupCards.length === 0) return null;
                        
                        return (
                            <div key={group.title} className="space-y-4">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                                    <div className="flex items-center gap-2.5">
                                        <span className={`w-1 h-6 rounded-full bg-gradient-to-b ${group.accentColor}`} />
                                        <h4 className="text-base font-extrabold text-stone-900 tracking-tight">{group.title}</h4>
                                    </div>
                                    <span className="text-xs font-semibold text-stone-500 pl-3 sm:pl-0">{group.desc}</span>
                                </div>
                                
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                                    {groupCards.map((card) => (
                                        <Link 
                                            to={`/dashboard/${card.key}`}
                                            key={card.key}
                                            className="group relative flex flex-col justify-between p-5 rounded-2xl bg-white/70 backdrop-blur-md border border-stone-200/50 hover:border-orange-500/20 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 cursor-pointer text-stone-900 no-underline"
                                            style={{ textDecoration: 'none' }}
                                        >
                                            <div className="flex items-start justify-between">
                                                <div 
                                                    className="w-12 h-12 rounded-2xl flex items-center justify-center border transition-all duration-300 shadow-inner group-hover:scale-110"
                                                    style={{ 
                                                        backgroundColor: card.bg, 
                                                        borderColor: `${card.color}20`,
                                                        color: card.color 
                                                    }}
                                                >
                                                    <i className={`${card.icon} text-lg`} />
                                                </div>
                                                <span className="opacity-0 group-hover:opacity-100 text-orange-500 transition-opacity duration-300">
                                                    <i className="fas fa-arrow-right text-xs" />
                                                </span>
                                            </div>
                                            <div className="mt-5">
                                                <h3 className="text-base font-bold text-stone-800 tracking-tight group-hover:text-orange-500 transition-colors duration-200">
                                                    {card.label}
                                                </h3>
                                                <p className="text-xs font-medium text-stone-500 mt-1 leading-normal">
                                                    {card.desc}
                                                </p>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>
        </>
    );
};
