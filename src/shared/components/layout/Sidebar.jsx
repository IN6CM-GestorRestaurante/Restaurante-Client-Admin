import { useLocation, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../../features/auth/store/authStore";

// Mapa de visibilidad del sidebar por rol
const ROLE_NAV_MAP = {
    SUPER_ADMIN:    ["summaries", "locations", "users"],
    ADMIN_ROLE:     ["summaries", "locations", "users"],
    COMPANY_ADMIN:  ["summaries", "locations", "users", "ingredients", "stocks", "menus", "tables", "orders", "reservations", "invoices"],
    BRANCH_MANAGER: ["summaries", "users", "ingredients", "stocks", "menus", "tables", "orders", "reservations", "invoices"],
    CHEF:           ["summaries", "ingredients", "menus", "orders"],
    WAITER:         ["summaries", "tables", "orders", "reservations"],
    WAITRESS:       ["summaries", "tables", "orders", "reservations"],
    CASHIER:        ["summaries", "orders", "invoices"],
    RECEPTIONIST:   ["summaries", "tables", "reservations"],
};

const ALL_ITEMS = [
    { key: "summaries",    label: "Resumen",       to: "/dashboard/summaries",    icon: "fas fa-chart-pie" },
    { key: "locations",    label: "Sucursales",     to: "/dashboard/locations",    icon: "fas fa-store" },
    { key: "users",        label: "Usuarios",       to: "/dashboard/users",        icon: "fas fa-users" },
    { key: "ingredients",  label: "Ingredientes",   to: "/dashboard/ingredients",  icon: "fas fa-carrot" },
    { key: "stocks",       label: "Inventario",     to: "/dashboard/stocks",       icon: "fas fa-boxes-stacked" },
    { key: "menus",        label: "Menú",           to: "/dashboard/menus",        icon: "fas fa-utensils" },
    { key: "tables",       label: "Mesas",          to: "/dashboard/tables",       icon: "fas fa-chair" },
    { key: "orders",       label: "Órdenes",        to: "/dashboard/orders",       icon: "fas fa-receipt" },
    { key: "reservations", label: "Reservaciones",  to: "/dashboard/reservations", icon: "fas fa-calendar-check" },
    { key: "invoices",     label: "Facturas",       to: "/dashboard/invoices",     icon: "fas fa-file-invoice-dollar" },
];

export const Sidebar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const logout = useAuthStore((s) => s.logout);
    const role = useAuthStore((s) => s.user?.role);

    const allowedKeys = ROLE_NAV_MAP[role] || ["summaries"];
    const visibleItems = ALL_ITEMS.filter((item) => allowedKeys.includes(item.key));

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    return (
        <aside className="sidebar w-full md:w-72 md:shrink-0 md:sticky md:top-16 md:h-[calc(100dvh-4rem)] overflow-y-auto">
            <div className="brand">
                <i className="fas fa-store"></i>
                <h1>Restaurante Admin</h1>
            </div>

            <p className="menu-title">Menú Principal</p>

            <nav className="nav-links">
                {visibleItems.map((item) => {
                    const active = location.pathname.startsWith(item.to);
                    return (
                        <button
                            type="button"
                            key={item.key}
                            className={active ? "active" : ""}
                            onClick={() => navigate(item.to)}
                        >
                            <i className={item.icon}></i>
                            {item.label}
                        </button>
                    );
                })}

                <button type="button" onClick={handleLogout} style={{ marginTop: "auto" }}>
                    <i className="fas fa-right-from-bracket"></i>
                    Cerrar sesión
                </button>
            </nav>
        </aside>
    );
};
