export const MenuSection = () => {
  return (
    <section className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-stone-900">Menú</h2>
          <p className="mt-1 text-sm text-stone-600">Resumen visual de productos y categorías.</p>
        </div>

        <div className="rounded-full bg-stone-100 px-3 py-1 text-xs font-semibold text-stone-600">
          18 items
        </div>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {[
          ["Entradas", "4 platos activos"],
          ["Platos fuertes", "8 platos activos"],
          ["Bebidas", "6 bebidas activas"],
        ].map(([title, detail]) => (
          <article key={title} className="rounded-2xl border border-stone-200 bg-stone-50 p-4">
            <p className="text-sm font-semibold text-stone-800">{title}</p>
            <p className="mt-1 text-xs text-stone-500">{detail}</p>
          </article>
        ))}
      </div>
    </section>
  );
};