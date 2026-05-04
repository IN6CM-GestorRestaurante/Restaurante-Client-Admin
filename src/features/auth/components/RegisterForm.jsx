import loginImg from "../../../assets/img/login.jpg"; // <-- Importar la imagen

export const RegisterForm = ({ onNavigate }) => {
    return (
        <div className="register-card">
            <div className="register-left p-8 bg-white rounded-l-xl">
                <span className="welcome-text">Crear cuenta</span>
                <div className="logo-container">
                    <i className="fas fa-utensils"></i>
                    <span>GESTOR RESTAURANTE</span>
                </div>

                <p className="subtitle">Registra tu restaurante para gestionar reservas, mesas, inventario y personal en un solo lugar.</p>

                <form className="mt-6 space-y-3">
                    <div className="input-group flex items-center gap-3 bg-gray-50 border border-gray-100 rounded-lg px-3 py-2">
                        <i className="far fa-building text-gray-500"></i>
                        <input className="w-full bg-transparent outline-none text-sm" type="text" placeholder="Nombre del restaurante" required />
                    </div>
                    <div className="input-group flex items-center gap-3 bg-gray-50 border border-gray-100 rounded-lg px-3 py-2">
                        <i className="far fa-user text-gray-500"></i>
                        <input className="w-full bg-transparent outline-none text-sm" type="text" placeholder="Nombre del administrador" required />
                    </div>
                    <div className="input-group flex items-center gap-3 bg-gray-50 border border-gray-100 rounded-lg px-3 py-2">
                        <i className="far fa-envelope text-gray-500"></i>
                        <input className="w-full bg-transparent outline-none text-sm" type="email" placeholder="Correo electronico" required />
                    </div>
                    <div className="input-group flex items-center gap-3 bg-gray-50 border border-gray-100 rounded-lg px-3 py-2">
                        <i className="fas fa-phone text-gray-500"></i>
                        <input className="w-full bg-transparent outline-none text-sm" type="tel" placeholder="Telefono" required />
                    </div>
                    <div className="input-group flex items-center gap-3 bg-gray-50 border border-gray-100 rounded-lg px-3 py-2">
                        <i className="fas fa-lock text-gray-500"></i>
                        <input className="w-full bg-transparent outline-none text-sm" type="password" placeholder="Crear contrasena" required />
                    </div>

                    <button type="submit" className="auth-btn action-btn" style={{ marginTop: "8px" }}>
                        Registrarme
                    </button>
                </form>

                <p className="signin-link">
                    ¿Ya tienes una cuenta? <button type="button" onClick={() => onNavigate("login")}>Iniciar Sesion</button>
                </p>
            </div>

            {/* Agregar estilo en línea aquí */}
            <div
                className="panel-right register-right w-1/3 hidden md:flex items-center justify-center"
                style={{ backgroundImage: `linear-gradient(rgba(244, 48, 29, 0.55), rgba(180, 10, 10, 0.7)), url(${loginImg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
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
