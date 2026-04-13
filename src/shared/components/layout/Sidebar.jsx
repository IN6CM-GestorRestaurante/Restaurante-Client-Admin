export const Sidebar = () => {
  const items = [
    { label: "Menú" },
    { label: "Mesas" },
    { label: "Reservaciones" },
    { label: "Órdenes" },
    { label: "Restaurantes" },
    { label: "Usuarios" },
  ];

  return (
    <aside className="w-full border-b border-stone-200/70 bg-white/60 p-4 backdrop-blur-sm md:min-h-[calc(100vh-4rem)] md:w-64 md:border-b-0 md:border-r">
      <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-1 md:space-y-1 md:gap-1">
        {items.map((item) => (
          <li key={item.label}>
            <div className="pressable cursor-pointer rounded-xl border border-transparent bg-stone-100/65 px-4 py-2.5 text-sm font-semibold text-stone-700 transition hover:border-stone-300 hover:bg-stone-100 md:text-base">
              {item.label}
            </div>
          </li>
        ))}
      </ul>
    </aside>
  );
};
 