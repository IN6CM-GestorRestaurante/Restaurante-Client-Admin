export const UsuariosSection = () => {
  return (
    <section className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-stone-900">Usuarios</h2>
      <p className="mt-1 text-sm text-stone-600">Resumen visual de accesos y roles.</p>

      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {[
          ["Administradores", "3 activos"],
          ["Cajeros", "5 activos"],
          ["Cocina", "4 activos"],
        ].map(([role, detail]) => (
          <article key={role} className="rounded-2xl border border-stone-200 bg-stone-50 p-4">
            <p className="text-sm font-semibold text-stone-800">{role}</p>
            <p className="mt-1 text-xs text-stone-500">{detail}</p>
          </article>
        ))}
      </div>
    </section>
  );
};