import { Link, useLocation } from "react-router-dom";

export const Sidebar = () => {
    const location = useLocation();

    const items = [
        { label: "Resumen", to: "/dashboard/summaries", icon: "fas fa-chart-pie" },
        { label: "Mesas", to: "/dashboard/tables", icon: "fas fa-chair" },
        { label: "Ordenes", to: "/dashboard/orders", icon: "fas fa-receipt" },
        { label: "Menu", to: "/dashboard/menus", icon: "fas fa-utensils" },
        { label: "Reservaciones", to: "/dashboard/reservations", icon: "fas fa-calendar-check" },
        { label: "Sucursales", to: "/dashboard/locations", icon: "fas fa-store" },
        { label: "Usuarios", to: "/dashboard/users", icon: "fas fa-users" },
    ];

    return (
        <aside className="w-60 bg-white min-h-[calc(100vh-4rem)] p-4 shadow-sm">
            <ul className="space-y-1">
                {items.map((item) => {
                    const active = location.pathname === item.to;
                    return (
                        <li key={item.label}>
                            <Link 
                                to={item.to} 
                                className={`flex items-center gap-3 px-4 py-2 rounded-lg font-medium transition-colors sidebar-underline${active ? " active text-main-blue" : " text-gray-700 hover:bg-gray-100"}`}
                                style={active ? { fontWeight: 700 } : {}}
                            >
                                <i className={item.icon}></i>
                                {item.label}
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </aside>
    );
};