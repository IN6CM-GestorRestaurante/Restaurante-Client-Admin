import { useState } from "react";
import { LoginForm } from "../components/LoginForm";
import { ForgotPasswordForm } from "../components/ForgotPasswordForm";
import cafeteriaImg from "../../../assets/img/Cafeteria.png";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isForgot, setIsForgot] = useState(false);

  const handleBackToLogin = () => {
    setIsForgot(false);
    setIsLogin(true);
  };

  return (
    <div className="relative min-h-screen overflow-hidden px-4 py-8 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute -top-24 -left-12 h-72 w-72 rounded-full bg-stone-300/35 blur-3xl animate-orb-float" />
      <div className="pointer-events-none absolute top-20 -right-16 h-80 w-80 rounded-full bg-stone-200/45 blur-3xl animate-orb-float-delayed" />

      <div className="relative mx-auto grid w-full max-w-5xl overflow-hidden rounded-3xl border border-stone-200/80 bg-white/90 shadow-[0_30px_90px_-30px_rgba(80,62,43,0.38)] backdrop-blur md:grid-cols-2 animate-premium-rise">
        <div className="hidden min-h-[560px] items-center bg-gradient-to-b from-stone-100/60 via-stone-50 to-white p-6 md:flex lg:p-8">
          <div className="relative h-full w-full rounded-3xl border border-white/60 bg-white p-3 shadow-[0_24px_50px_-30px_rgba(124,45,18,0.6)]">
            <div className="relative h-full w-full overflow-hidden rounded-2xl">
            <img
              src={cafeteriaImg}
              alt="Ambiente de cafetería"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-5">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-200">Restaurante</p>
              <p className="mt-1 text-2xl font-bold text-white">Panel Administrativo</p>
            </div>
            </div>
          </div>
        </div>

        <div className="p-4 sm:p-6 lg:p-8">
          <div className="marble-surface h-full rounded-3xl border border-stone-200/70 p-6 shadow-[0_18px_45px_-30px_rgba(80,62,43,0.45)] backdrop-blur-sm sm:p-8 lg:p-10">
            <div className="marble-surface mb-6 rounded-2xl border border-stone-200/70 p-2 shadow-sm md:hidden">
              <img
                src={cafeteriaImg}
                alt="Ambiente de cafetería"
                className="h-36 w-full rounded-xl object-cover"
              />
            </div>

            <div className="mb-6 flex items-center gap-3">
              <img
                src={cafeteriaImg}
                alt="Logo restaurante"
                className="h-12 w-12 rounded-xl border border-orange-200 object-cover shadow-sm md:hidden"
              />
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-stone-700">
                Restaurante Admin
              </p>
            </div>

            <div className="mb-7">
              <h1 className="font-editorial mb-2 text-4xl font-semibold leading-[1.05] text-stone-900 sm:text-5xl">
                {isForgot
                  ? "Recuperar contraseña"
                  : isLogin
                    ? "Bienvenido"
                    : "Crear cuenta"}
              </h1>

              <p className="max-w-md text-sm text-stone-600 sm:text-base">
                {isForgot
                  ? "Ingresa tu correo y enviaremos las instrucciones para recuperar tu acceso."
                  : isLogin
                    ? "Accede al panel administrativo general de tu restaurante."
                    : "Registra una cuenta para gestionar operaciones del restaurante."}
              </p>
            </div>

            {isForgot ? <ForgotPasswordForm onSwitch={handleBackToLogin} /> : <LoginForm />}

            <div className="mt-7 border-t border-stone-200/70 pt-5 text-center">
              {!isForgot && (
                <button
                  onClick={() => setIsForgot(true)}
                  className="pressable text-sm font-medium text-stone-500 transition hover:text-stone-800"
                >
                  ¿Olvidaste tu contraseña?
                </button>
              )}

              <p className="mt-3 text-sm text-stone-600">
                {isLogin ? "¿No tienes cuenta?" : "¿Ya tienes cuenta?"}{" "}
                <button
                  onClick={() => {
                    setIsForgot(false);
                    setIsLogin(!isLogin);
                  }}
                  className="pressable font-semibold text-stone-800 hover:underline"
                >
                  {isLogin ? "Regístrate" : "Iniciar sesión"}
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { AuthPage };
