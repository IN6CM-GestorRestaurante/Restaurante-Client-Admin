export const UsuariosSection = ({ showCrud = true }) => {
  return (
    <section className="marble-surface rounded-3xl border border-stone-200/70 p-6 shadow-[0_18px_45px_-30px_rgba(80,62,43,0.45)] backdrop-blur-sm">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-stone-500">Módulo</p>
      <h3 className="mt-2 text-2xl font-bold text-stone-900">Usuarios</h3>
      <p className="mt-2 text-sm text-stone-600">Vista general de perfiles de administración y roles del sistema.</p>
      {showCrud && (
        <div className="mt-4 flex flex-wrap gap-2">
          <button type="button" className="pressable rounded-xl bg-stone-800 px-3 py-2 text-xs font-semibold text-white">Agregar</button>
          <button type="button" className="pressable rounded-xl border border-stone-300 bg-white/80 px-3 py-2 text-xs font-semibold text-stone-700">Editar</button>
          <button type="button" className="pressable rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-xs font-semibold text-rose-700">Eliminar</button>
        </div>
      )}
      <div className="mt-5 grid grid-cols-2 gap-3">
        <article className="rounded-2xl border border-stone-200 bg-white/75 p-3">
          <p className="text-xs text-stone-500">Administradores</p>
          <p className="mt-1 text-lg font-bold text-stone-800">0</p>
        </article>
        <article className="rounded-2xl border border-stone-200 bg-white/75 p-3">
          <p className="text-xs text-stone-500">Staff</p>
          <p className="mt-1 text-lg font-bold text-stone-800">0</p>
        </article>
      </div>
    </section>
  );
};
