import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";
import loginImg from "../../../assets/img/login.jpg";
import { useAuthStore } from "../store/authStore";
import { Spinner } from "../../../shared/components/ui/Spinner";

export const LoginForm = ({ onNavigate }) => {
    const navigate = useNavigate();
    const login = useAuthStore((state) => state.login);
    const storeError = useAuthStore((state) => state.error);
    const loading = useAuthStore((state) => state.loading);
    const [showPassword, setShowPassword] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        mode: "onTouched"
    });

    const onSubmit = async (data) => {
        const res = await login(data);
        if (res?.success) {
            navigate("/dashboard");
        }
    };

    return (
        <div className="login-card shadow-2xl relative">
            <div className="login-left flex flex-col justify-center items-center px-8 sm:px-12 md:px-16">
                <span className="welcome-text tracking-widest text-xs font-semibold text-stone-400 uppercase">
                    Bienvenido al
                </span>
                <div className="logo-container flex items-center gap-2 mt-1 mb-4">
                    <i className="fas fa-utensils text-2xl text-orange-500"></i>
                    <span className="text-xl font-extrabold text-orange-500 uppercase tracking-wider">
                        GESTOR RESTAURANTE
                    </span>
                </div>

                <p className="subtitle text-stone-500 text-xs sm:text-sm max-w-sm text-center mb-6 leading-relaxed">
                    Inicia sesión para administrar reservas, pedidos, inventario y personal de tu restaurante desde un solo panel.
                </p>

                {storeError && (
                    <div className="login-error-banner flex items-center gap-2 bg-red-50 text-red-700 text-xs font-semibold p-3.5 rounded-xl border border-red-100 mb-5 w-full max-w-[330px] animate-shake">
                        <i className="fas fa-exclamation-circle text-sm" />
                        <span>{storeError}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-[330px] space-y-4">
                    <div className="relative w-full">
                        <div className="input-group relative">
                            <i className="far fa-user text-stone-400 absolute left-5 top-1/2 -translate-y-1/2" />
                            <input
                                type="text"
                                placeholder="Usuario o correo"
                                className={`w-full pl-12 pr-5 py-3.5 text-sm bg-stone-50 border rounded-full outline-none transition-all ${
                                    errors.emailOrUsername ? 'border-red-400 focus:border-red-500' : 'border-stone-200 focus:border-orange-500'
                                }`}
                                {...register("emailOrUsername", { 
                                    required: "El correo o nombre de usuario es obligatorio" 
                                })}
                            />
                        </div>
                        {errors.emailOrUsername && (
                            <p className="field-error text-red-500 text-xs font-semibold mt-1.5 pl-4 text-left">
                                {errors.emailOrUsername.message}
                            </p>
                        )}
                    </div>

                    <div className="relative w-full">
                        <div className="input-group relative">
                            <i className="fas fa-lock text-stone-400 absolute left-5 top-1/2 -translate-y-1/2" />
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Contraseña"
                                className={`w-full pl-12 pr-12 py-3.5 text-sm bg-stone-50 border rounded-full outline-none transition-all ${
                                    errors.password ? 'border-red-400 focus:border-red-500' : 'border-stone-200 focus:border-orange-500'
                                }`}
                                {...register("password", { 
                                    required: "La contraseña es obligatoria" 
                                })}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="password-toggle-btn absolute right-5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 focus:outline-none cursor-pointer"
                            >
                                <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`} />
                            </button>
                        </div>
                        {errors.password && (
                            <p className="field-error text-red-500 text-xs font-semibold mt-1.5 pl-4 text-left">
                                {errors.password.message}
                            </p>
                        )}
                    </div>

                    <div className="forgot-pass text-right w-full">
                        <button 
                            type="button" 
                            onClick={() => onNavigate("recover")}
                            className="text-stone-400 hover:text-orange-500 text-xs transition-colors cursor-pointer"
                        >
                            ¿Olvidaste tu contraseña?
                        </button>
                    </div>

                    <button 
                        type="submit" 
                        className="sign-in-btn w-full py-4 rounded-full text-white font-bold tracking-wider text-sm shadow-lg shadow-orange-500/20 hover:shadow-orange-500/35 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] transition-all cursor-pointer bg-gradient-to-r from-red-500 to-orange-500 uppercase flex items-center justify-center gap-2" 
                        disabled={loading}
                    >
                        {loading ? <Spinner size="sm" /> : "Iniciar Sesión"}
                    </button>
                </form>

                <p className="signup-link text-stone-500 text-xs sm:text-sm mt-6">
                    ¿No tienes acceso? <button type="button" onClick={() => onNavigate("register")} className="text-orange-500 font-bold hover:underline cursor-pointer ml-1">Registrarme</button>
                </p>
            </div>

            <div 
                className="login-right hidden lg:flex flex-1 items-center justify-center p-12 text-white text-center bg-cover bg-center"
                style={{ backgroundImage: `linear-gradient(rgba(244, 48, 29, 0.55), rgba(180, 10, 10, 0.7)), url(${loginImg})` }}
            >
                <div className="right-content max-w-sm">
                    <div className="right-logo flex flex-col items-center gap-1.5 mb-4">
                        <i className="fas fa-utensils text-5xl drop-shadow-md"></i>
                        <span className="text-3xl font-black tracking-widest drop-shadow-md">GESTOR RESTAURANTE</span>
                    </div>
                    <p className="text-sm font-light leading-relaxed opacity-90">
                        Controla en tiempo real las mesas, turnos, comandas, costos e inventario. Toma decisiones mas rapidas con reportes claros y mantén tu operación siempre en marcha.
                    </p>
                </div>
            </div>
        </div>
    );
};
