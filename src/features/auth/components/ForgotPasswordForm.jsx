import { useForm } from "react-hook-form";
import { useState } from "react";
import loginImg from "../../../assets/img/login.jpg"; // <-- Importar la imagen
import { forgotPassword } from "../../../shared/api/auth";

export const ForgotPasswordForm = ({ onNavigate }) => {
    const [sent, setSent] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({ mode: "onTouched" });

    const onSubmit = async ({ email }) => {
        try {
            await forgotPassword(email);
        } catch {
            // El backend responde 200 incluso si el correo no existe (no revela cuentas),
            // asi que cualquier error aqui es de red/servidor, no de "correo no encontrado".
        } finally {
            setSent(true);
        }
    };

    return (
        <div className="recover-card">
            <section className="panel panel-white">
                <div className="white-content">
                    <span className="welcome-text">Recuperar acceso</span>
                    <div className="logo-container">
                        <i className="fas fa-utensils"></i>
                        <span>GESTOR RESTAURANTE</span>
                    </div>

                    {sent ? (
                        <p className="subtitle">
                            Si el correo existe en el sistema, te enviamos un enlace para restablecer tu contraseña. Revisa tu bandeja de entrada.
                        </p>
                    ) : (
                        <>
                            <p className="subtitle">Ingresa tu correo y te enviaremos un enlace para restablecer tu contrasena.</p>

                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="input-group">
                                    <i className="far fa-envelope"></i>
                                    <input
                                        type="email"
                                        placeholder="Correo electronico"
                                        {...register("email", {
                                            required: "El correo es obligatorio",
                                            pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: "Correo inválido" },
                                        })}
                                    />
                                </div>
                                {errors.email && <p className="field-error">{errors.email.message}</p>}

                                <button type="submit" className="auth-btn action-btn" disabled={isSubmitting}>
                                    {isSubmitting ? "Enviando..." : "Enviar enlace"}
                                </button>
                            </form>
                        </>
                    )}

                    <p className="back-link">Volver al inicio de sesion <button type="button" onClick={() => onNavigate("login")}>Iniciar Sesion</button></p>
                </div>
            </section>

            {/* Agregar estilo en línea aquí */}
            <section 
                className="panel panel-orange" 
                aria-hidden="true"
                style={{ backgroundImage: `linear-gradient(rgba(244, 48, 29, 0.55), rgba(180, 10, 10, 0.7)), url(${loginImg})` }}
            >
                <div className="orange-content">
                    <i className="fas fa-key"></i>
                    <h2>RECUPERAR</h2>
                    <p>Tu operacion no se detiene. Recupera acceso rapido y continua gestionando reservas, inventario y equipos sin perder tiempo.</p>
                </div>
            </section>
        </div>
    );
};
