import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../../features/auth/store/authStore";

export const Sidebar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const logout = useAuthStore(state => state.logout);

    const items = [
        { label: "Resumen", to: "/dashboard/summaries", icon: "fas fa-chart-pie" },
        { label: "Mesas", to: "/dashboard/tables", icon: "fas fa-chair" },
        { label: "Ordenes", to: "/dashboard/orders", icon: "fas fa-receipt" },
        { label: "Menu", to: "/dashboard/menus", icon: "fas fa-utensils" },
        { label: "Reservaciones", to: "/dashboard/reservations", icon: "fas fa-calendar-check" },
        { label: "Sucursales", to: "/dashboard/locations", icon: "fas fa-store" },
        { label: "Usuarios", to: "/dashboard/users", icon: "fas fa-users" },
    ];

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    return (
        <aside className="sidebar w-[290px] shrink-0 sticky top-[4rem] h-[calc(100vh-4rem)] overflow-y-auto">
            <div className="brand">
                <i className="fas fa-store"></i>
                <h1>Restaurante Admin</h1>
            </div>
            
            <p className="menu-title">Menu Principal</p>

            <nav className="nav-links">
                {items.map((item) => {
                    const active = location.pathname.startsWith(item.to);
                    return (
                        <button 
                            type="button" 
                            key={item.label}
                            className={active ? "active" : ""}
                            onClick={() => navigate(item.to)}
                        >
                            <i className={item.icon}></i>
                            {item.label}
                        </button>
                    );
                })}
            </nav>

            <button type="button" className="logout" onClick={handleLogout}>
                <i className="fas fa-sign-out-alt"></i>
                Cerrar Sesión
            </button>
        </aside>
    );
};
