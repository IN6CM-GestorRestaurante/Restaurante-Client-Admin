export const OrdenesSection = () => {
  return (
    <section className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-stone-900">Órdenes</h2>
      <p className="mt-1 text-sm text-stone-600">Listado visual de órdenes recientes.</p>

      <div className="mt-5 grid gap-3">
        {[
          ["Orden #1204", "En preparación"],
          ["Orden #1205", "Lista para servir"],
          ["Orden #1206", "Entregada"],
        ].map(([order, status]) => (
          <article key={order} className="flex items-center justify-between rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3">
            <p className="text-sm font-semibold text-stone-800">{order}</p>
            <p className="text-xs text-stone-500">{status}</p>
          </article>
        ))}
      </div>
    </section>
  );
};