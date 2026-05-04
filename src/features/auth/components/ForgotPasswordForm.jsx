import loginImg from "../../../assets/img/login.jpg"; // <-- Importar la imagen

export const ForgotPasswordForm = ({ onNavigate }) => {
    return (
        <div className="recover-card">
            <section className="panel panel-white">
                <div className="white-content">
                    <span className="welcome-text">Recuperar acceso</span>
                    <div className="logo-container">
                        <i className="fas fa-utensils"></i>
                        <span>GESTOR RESTAURANTE</span>
                    </div>

                    <p className="subtitle">Ingresa tu correo y te enviaremos un enlace para restablecer tu contrasena.</p>

                    <form>
                        <div className="input-group">
                            <i className="far fa-envelope"></i>
                            <input type="email" placeholder="Correo electronico" required />
                        </div>

                        <button type="button" className="auth-btn action-btn">Enviar enlace</button>
                    </form>

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
