import { useLocation, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../../features/auth/store/authStore";
import { useUIStore } from "../../../features/auth/store/uiStore";

// Mapa de visibilidad del sidebar por rol
const ROLE_NAV_MAP = {
    SUPER_ADMIN:    ["summaries", "companies", "users"],
    ADMIN_ROLE:     ["summaries", "companies", "users"],
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
    { key: "companies",    label: "Compañías",     to: "/dashboard/companies",    icon: "fas fa-building" },
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
    const setMobileSidebar = useUIStore((s) => s.setMobileSidebar);

    const allowedKeys = ROLE_NAV_MAP[role] || ["summaries"];
    const visibleItems = ALL_ITEMS.filter((item) => allowedKeys.includes(item.key));

    const handleLogout = () => {
        logout();
        setMobileSidebar(false);
        navigate("/");
    };

    return (
        <aside
            className="sidebar w-full h-full lg:h-auto lg:w-72 lg:shrink-0 lg:sticky lg:top-16 lg:min-h-[calc(100dvh-4rem)] lg:self-stretch overflow-y-auto"
        >
            <div className="brand flex justify-between items-center w-full">
                <div className="flex items-center gap-3">
                    <i className="fas fa-store text-xl"></i>
                    <h1 className="font-bold text-sm tracking-wide">Restaurante Admin</h1>
                </div>
                <button
                    type="button"
                    onClick={() => setMobileSidebar(false)}
                    className="text-white/60 hover:text-white lg:hidden cursor-pointer p-1 rounded-lg hover:bg-white/10 transition-colors flex items-center justify-center h-8 w-8"
                    aria-label="Cerrar panel lateral"
                >
                    <i className="fas fa-times text-lg"></i>
                </button>
            </div>

            <p className="menu-title">Menú Principal</p>

            <nav className="nav-links flex-1 min-h-0">
                <div className="flex flex-col gap-2.5">
                    {visibleItems.map((item) => {
                        const active = location.pathname.startsWith(item.to);
                        return (
                            <button
                                type="button"
                                key={item.key}
                                className={active ? "active" : ""}
                                onClick={() => {
                                    navigate(item.to);
                                    setMobileSidebar(false);
                                }}
                            >
                                <i className={item.icon}></i>
                                {item.label}
                            </button>
                        );
                    })}
                </div>

                <button type="button" onClick={handleLogout} className="logout mt-auto">
                    <i className="fas fa-right-from-bracket"></i>
                    Cerrar sesión
                </button>
            </nav>
        </aside>
    );
};
