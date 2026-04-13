import { useNavigate } from "react-router-dom";

export const Sidebar = ({ activeItem, onSelect }) => {
  const navigate = useNavigate();

  const items = [
    { id: "principal", label: "Principal" },
    { id: "menu", label: "Menú" },
    { id: "mesas", label: "Mesas" },
    { id: "reservaciones", label: "Reservaciones" },
    { id: "ordenes", label: "Órdenes" },
    { id: "restaurantes", label: "Restaurantes" },
    { id: "usuarios", label: "Usuarios" },
  ];

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <aside className="w-full border-b border-stone-200/70 bg-white/60 p-4 backdrop-blur-sm md:min-h-[calc(100vh-4rem)] md:w-64 md:border-b-0 md:border-r flex flex-col">
      <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-1 md:space-y-1 md:gap-1">
        {items.map((item) => (
          <li key={item.id}>
            <button
              type="button"
              onClick={() => onSelect(item.id)}
              className={`pressable w-full rounded-xl border px-4 py-2.5 text-left text-sm font-semibold transition md:text-base ${
                activeItem === item.id
                  ? "border-stone-300 bg-stone-200/80 text-stone-900"
                  : "border-transparent bg-stone-100/65 text-stone-700 hover:border-stone-300 hover:bg-stone-100"
              }`}
            >
              {item.label}
            </button>
          </li>
        ))}
      </ul>
      <button
        type="button"
        onClick={handleLogout}
        className="mt-auto pressable w-full rounded-xl border border-rose-200 bg-rose-50 px-4 py-2.5 text-left text-sm font-semibold text-rose-700 transition hover:bg-rose-100 md:text-base"
      >
        Cerrar Sesión
      </button>
    </aside>
  );
};
 