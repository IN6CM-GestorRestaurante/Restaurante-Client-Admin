import loginImg from "../../../assets/img/login.jpg"; // <-- Importar la imagen

export const RegisterForm = ({ onNavigate }) => {
    return (
        <div className="register-card">
            <div className="register-left">
                <span className="welcome-text">Crear cuenta</span>
                <div className="logo-container">
                    <i className="fas fa-utensils"></i>
                    <span>GESTOR RESTAURANTE</span>
                </div>

                <p className="subtitle">Registra tu restaurante para gestionar reservas, mesas, inventario y personal en un solo lugar.</p>

                <form>
                    {/* inputs ... (se mantienen igual) */}
                    <div className="input-group">
                        <i className="far fa-building"></i>
                        <input type="text" placeholder="Nombre del restaurante" required />
                    </div>
                    <div className="input-group">
                        <i className="far fa-user"></i>
                        <input type="text" placeholder="Nombre del administrador" required />
                    </div>
                    <div className="input-group">
                        <i className="far fa-envelope"></i>
                        <input type="email" placeholder="Correo electronico" required />
                    </div>
                    <div className="input-group">
                        <i className="fas fa-phone"></i>
                        <input type="tel" placeholder="Telefono" required />
                    </div>
                    <div className="input-group">
                        <i className="fas fa-lock"></i>
                        <input type="password" placeholder="Crear contrasena" required />
                    </div>

                    <button type="button" className="auth-btn register-btn">Registrarme</button>
                </form>

                <p className="signin-link">
                    ¿Ya tienes una cuenta? <button type="button" onClick={() => onNavigate("login")}>Iniciar Sesion</button>
                </p>
            </div>

            {/* Agregar estilo en línea aquí */}
            <div 
                className="panel-right register-right"
                style={{ backgroundImage: `linear-gradient(rgba(244, 48, 29, 0.55), rgba(180, 10, 10, 0.7)), url(${loginImg})` }}
            >
                <div className="right-content">
                    <div className="right-logo">
                        <i className="fas fa-utensils"></i>
                        <span>GESTOR RESTAURANTE</span>
                    </div>
                    <p>Centraliza operaciones, mejora la experiencia de tus clientes y toma mejores decisiones con datos claros de tu restaurante.</p>
                </div>
            </div>
        </div>
    );
};