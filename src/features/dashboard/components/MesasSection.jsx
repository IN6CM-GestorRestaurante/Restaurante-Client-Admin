export const MesasSection = () => {
  return (
    <section className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-stone-900">Mesas</h2>
      <p className="mt-1 text-sm text-stone-600">Estado rápido de ocupación y disponibilidad.</p>

      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {[
          ["Mesa 01", "Disponible"],
          ["Mesa 02", "Ocupada"],
          ["Mesa 03", "Reservada"],
          ["Mesa 04", "Disponible"],
        ].map(([table, status]) => (
          <article key={table} className="rounded-2xl border border-stone-200 bg-stone-50 p-4">
            <p className="text-sm font-semibold text-stone-800">{table}</p>
            <p className="mt-1 text-xs text-stone-500">{status}</p>
          </article>
        ))}
      </div>
    </section>
  );
};