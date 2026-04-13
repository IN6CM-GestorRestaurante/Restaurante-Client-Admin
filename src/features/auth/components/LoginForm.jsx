export const LoginForm = () => {
    return (
        <form className="marble-surface space-y-5 rounded-3xl border border-stone-200/70 p-5 shadow-[0_18px_45px_-30px_rgba(80,62,43,0.45)] backdrop-blur-sm sm:p-6">
            <div>
                <label
                    htmlFor="emailOrUser"
                    className="mb-1.5 block text-sm font-semibold text-stone-800"
                >
                    Email o usuario
                </label>

                <input
                    id="emailOrUser"
                    className="w-full rounded-xl border border-stone-300 bg-white/75 px-4 py-2.5 text-sm text-stone-800 outline-none transition focus:border-stone-500 focus:ring-2 focus:ring-stone-300"
                    placeholder="correo@restaurante.com"
                />
            </div>

            <div>
                <label htmlFor="password" className="mb-1.5 block text-sm font-semibold text-stone-800">
                    Contraseña
                </label>

                <input
                    id="password"
                    type="password"
                    className="w-full rounded-xl border border-stone-300 bg-white/75 px-4 py-2.5 text-sm text-stone-800 outline-none transition focus:border-stone-500 focus:ring-2 focus:ring-stone-300"
                    placeholder="Ingresa tu contraseña"
                />
            </div>

            <button
                className="pressable w-full rounded-xl bg-gradient-to-r from-stone-800 to-stone-700 px-4 py-3 text-sm font-semibold text-stone-100 shadow-lg shadow-stone-900/25 transition duration-200 hover:translate-y-[-1px] hover:opacity-95"
            >
                Iniciar sesión
            </button>
        </form>
    );
};

