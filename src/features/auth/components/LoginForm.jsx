import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import loginImg from "../../../assets/img/login.jpg"; // <-- 1. Importar la imagen
import { useAuthStore } from "../store/authStore";

export const LoginForm = ({ onNavigate }) => {
    const navigate = useNavigate();
    const login = useAuthStore((state) => state.login);
    const loading = useAuthStore((state) => state.loading);
    const {
        register,
        handleSubmit,
    } = useForm();

    const onSubmit = async (data) => {
        const res = await login(data);
        if (res?.success) {
            navigate("/dashboard");
            toast.success("¡Inicio de sesión exitoso!");
        }else {
            toast.error(res.error);
        }
    };

    return (
        <div className="login-card">
            <div className="login-left">
                <span className="welcome-text">Bienvenido al</span>
                <div className="logo-container">
                    <i className="fas fa-utensils"></i>
                    <span>GESTOR RESTAURANTE</span>
                </div>

                <p className="subtitle">Inicia sesión para administrar reservas, pedidos, inventario y personal de tu restaurante desde un solo panel.</p>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="input-group">
                        <i className="far fa-user"></i>
                        <input
                            type="text"
                            placeholder="Usuario o correo"
                            required
                            {...register("emailOrUsername", { required: "El email o usuario es requerido" })}
                        />
                    </div>

                    <div className="input-group">
                        <i className="fas fa-lock"></i>
                        <input
                            type="password"
                            placeholder="Contraseña"
                            required
                            {...register("password", { required: "La contraseña es requerida" })}
                        />
                    </div>

                    <div className="forgot-pass">
                        <button type="button" onClick={() => onNavigate("recover")}>¿Olvidaste tu contraseña?</button>
                    </div>

                    <button type="submit" className="sign-in-btn" disabled={loading}>
                        {loading ? "Cargando..." : "Iniciar Sesión"}
                    </button>
                </form>

                <p className="signup-link">
                    ¿No tienes acceso? <button type="button" onClick={() => onNavigate("register")}>Registrarme</button>
                </p>
            </div>

            {/* 2. Agregar el backgroundImage por estilo en línea */}
            <div 
                className="login-right"
                style={{ backgroundImage: `linear-gradient(rgba(244, 48, 29, 0.55), rgba(180, 10, 10, 0.7)), url(${loginImg})` }}
            >
                <div className="right-content">
                    <div className="right-logo">
                        <i className="fas fa-utensils"></i>
                        <span>GESTOR RESTAURANTE</span>
                    </div>
                    <p>Controla en tiempo real las mesas, turnos, comandas, costos e inventario. Toma decisiones mas rapidas con reportes claros y mantén tu operación siempre en marcha.</p>
                </div>
            </div>
        </div>
    );
};
