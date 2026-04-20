export const RestaurantesSection = () => {
  return (
    <section className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-stone-900">Restaurantes</h2>
      <p className="mt-1 text-sm text-stone-600">Resumen de sedes y estado operativo.</p>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {[
          ["Sucursal centro", "Abierta"],
          ["Sucursal norte", "Abierta"],
        ].map(([branch, status]) => (
          <article key={branch} className="rounded-2xl border border-stone-200 bg-stone-50 p-4">
            <p className="text-sm font-semibold text-stone-800">{branch}</p>
            <p className="mt-1 text-xs text-stone-500">{status}</p>
          </article>
        ))}
      </div>
    </section>
  );
};