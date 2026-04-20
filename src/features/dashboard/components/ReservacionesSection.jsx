export const ReservacionesSection = () => {
  return (
    <section className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-stone-900">Reservaciones</h2>
      <p className="mt-1 text-sm text-stone-600">Reservas próximas y estado general del día.</p>

      <div className="mt-5 space-y-3">
        {[
          ["12:30 - Mesa 02", "2 personas"],
          ["13:15 - Mesa 04", "4 personas"],
          ["15:00 - Terraza", "6 personas"],
        ].map(([slot, detail]) => (
          <article key={slot} className="flex items-center justify-between rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3">
            <p className="text-sm font-semibold text-stone-800">{slot}</p>
            <p className="text-xs text-stone-500">{detail}</p>
          </article>
        ))}
      </div>
    </section>
  );
};