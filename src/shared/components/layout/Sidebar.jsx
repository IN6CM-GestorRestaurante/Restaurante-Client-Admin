import { useNavigate } from "react-router-dom";

export const Sidebar = ({ activeItem, onSelect }) => {
    const navigate = useNavigate();

    const items =[
        { id: "resumen", label: "Resumen", icon: "fas fa-chart-pie" },
        { id: "mesas", label: "Mesas", icon: "fas fa-chair" },
        { id: "ordenes", label: "Ordenes", icon: "fas fa-receipt" },
        { id: "menu", label: "Menu", icon: "fas fa-utensils" },
        { id: "reservaciones", label: "Reservaciones", icon: "fas fa-calendar-check" },
        { id: "sucursales", label: "Sucursales", icon: "fas fa-store" },
        { id: "usuarios", label: "Usuarios", icon: "fas fa-users" },
    ];

    const handleLogout = () => {
        navigate("/");
    };

    return (
        <aside className="sidebar">
            <div className="brand">
                <i className="fas fa-utensils"></i>
                <h1>GESTOR RESTAURANTE<br />ADMIN</h1>
            </div>

            <p className="menu-title">Panel</p>
            <nav className="nav-links">
                {items.map((item) => (
                    <button
                        key={item.id}
                        type="button"
                        onClick={() => onSelect(item.id)}
                        className={activeItem === item.id ? "active" : ""}
                    >
                        <i className={item.icon}></i> {item.label}
                    </button>
                ))}
            </nav>

            <button type="button" onClick={handleLogout} className="logout">
                <i className="fas fa-right-from-bracket"></i> Cerrar sesion
            </button>
        </aside>
    );
};