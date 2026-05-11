import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { register as registerAPI } from "../../../shared/api/auth";
import loginImg from "../../../assets/img/login.jpg";

export const RegisterForm = ({ onNavigate }) => {
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();

    const onSubmit = async (data) => {
        try {
            const formData = new FormData();
            
            // Datos del Administrador
            formData.append("name", data.name);
            formData.append("surname", data.surname);
            formData.append("email", data.email);
            formData.append("password", data.password);
            formData.append("phone", data.phone);
            if (data.username) formData.append("username", data.username);
            
            // Datos de la Empresa
            formData.append("legalName", data.legalName);
            formData.append("alias", data.alias);
            formData.append("taxId", data.taxId);
            formData.append("sector", data.sector);
            formData.append("companySize", data.companySize);
            formData.append("country", data.country);
            formData.append("timezone", data.timezone);
            formData.append("currency", data.currency);
            formData.append("subdomain", data.subdomain);
            
            // Archivo de Logo
            if (data.logo && data.logo[0]) {
                formData.append("logo", data.logo[0]);
            }

            await registerAPI(formData);
            toast.success("Registro exitoso. Revisa tu correo electrónico para verificar tu cuenta.");
            onNavigate("login");
        } catch (error) {
            toast.error(error.response?.data?.message || "Error al registrar la empresa");
        }
    };

    return (
        <div className="w-full max-w-4xl mx-auto p-8 md:p-10 bg-white rounded-2xl shadow-xl overflow-y-auto my-8" style={{ maxHeight: "90vh" }}>
            <div className="w-full">
                <span className="welcome-text block mb-1">Crear cuenta</span>
                <div className="logo-container mb-2 flex items-center">
                    <i className="fas fa-utensils text-orange-500 text-2xl mr-2"></i>
                    <span className="text-xl font-bold text-gray-800" style={{ fontSize: '24px', letterSpacing: '1px', color: '#ff3c24' }}>GESTOR RESTAURANTE</span>
                </div>

                <p className="subtitle mb-6 text-gray-500">Registra tu restaurante para gestionar reservas, mesas, inventario y personal en un solo lugar.</p>

                <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%', maxWidth: '100%' }}>
                    {/* Sección: Datos del Administrador */}
                    <div style={{ display: 'flex', alignItems: 'center', margin: '32px 0 24px 0' }}>
                        <div style={{ flexGrow: 1, borderTop: '1px solid #d1d5db' }}></div>
                        <h2 style={{ padding: '0 16px', fontSize: '18px', fontWeight: 'bold', color: '#374151' }}>Datos del Administrador</h2>
                        <div style={{ flexGrow: 1, borderTop: '1px solid #d1d5db' }}></div>
                    </div>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
                        <div className="input-group" style={{ marginBottom: 0 }}>
                            <i className="far fa-user"></i>
                            <input {...register("name", { required: true })} type="text" placeholder="Nombre" />
                        </div>
                        <div className="input-group" style={{ marginBottom: 0 }}>
                            <i className="far fa-user"></i>
                            <input {...register("surname", { required: true })} type="text" placeholder="Apellidos" />
                        </div>
                        <div className="input-group" style={{ marginBottom: 0 }}>
                            <i className="far fa-envelope"></i>
                            <input {...register("email", { required: true })} type="email" placeholder="Correo electrónico" />
                        </div>
                        <div className="input-group" style={{ marginBottom: 0 }}>
                            <i className="fas fa-phone"></i>
                            <input {...register("phone", { required: true })} type="tel" placeholder="Teléfono" />
                        </div>
                        <div className="input-group" style={{ marginBottom: 0 }}>
                            <i className="fas fa-at"></i>
                            <input {...register("username")} type="text" placeholder="Usuario (opcional)" />
                        </div>
                        <div className="input-group" style={{ marginBottom: 0 }}>
                            <i className="fas fa-lock"></i>
                            <input {...register("password", { required: true })} type="password" placeholder="Contraseña" />
                        </div>
                    </div>

                    {/* Sección: Datos de la Empresa */}
                    <div style={{ display: 'flex', alignItems: 'center', margin: '40px 0 24px 0' }}>
                        <div style={{ flexGrow: 1, borderTop: '1px solid #d1d5db' }}></div>
                        <h2 style={{ padding: '0 16px', fontSize: '18px', fontWeight: 'bold', color: '#374151' }}>Datos de la Empresa</h2>
                        <div style={{ flexGrow: 1, borderTop: '1px solid #d1d5db' }}></div>
                    </div>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
                        <div className="input-group" style={{ marginBottom: 0 }}>
                            <i className="far fa-building"></i>
                            <input {...register("legalName", { required: true })} type="text" placeholder="Razón Social (Legal)" />
                        </div>
                        <div className="input-group" style={{ marginBottom: 0 }}>
                            <i className="fas fa-store"></i>
                            <input {...register("alias", { required: true })} type="text" placeholder="Nombre Comercial" />
                        </div>
                        <div className="input-group" style={{ marginBottom: 0 }}>
                            <i className="fas fa-id-card"></i>
                            <input {...register("taxId", { required: true })} type="text" placeholder="NIT / VAT / RFC" />
                        </div>
                        <div className="input-group" style={{ marginBottom: 0 }}>
                            <i className="fas fa-globe"></i>
                            <input {...register("subdomain", { required: true })} type="text" placeholder="Subdominio (ej: elsabor)" />
                        </div>
                        <div className="input-group" style={{ marginBottom: 0 }}>
                            <i className="fas fa-utensils"></i>
                            <select {...register("sector", { required: true })} defaultValue="">
                                <option value="" disabled>Seleccione Sector</option>
                                <option value="Restaurante">Restaurante</option>
                                <option value="Cafetería">Cafetería</option>
                                <option value="Bar">Bar</option>
                                <option value="Panadería">Panadería</option>
                                <option value="Food Truck">Food Truck</option>
                                <option value="Catering">Catering</option>
                                <option value="Otro">Otro</option>
                            </select>
                        </div>
                        <div className="input-group" style={{ marginBottom: 0 }}>
                            <i className="fas fa-users"></i>
                            <select {...register("companySize", { required: true })} defaultValue="">
                                <option value="" disabled>Tamaño de empresa</option>
                                <option value="1-10">1-10 empleados</option>
                                <option value="11-50">11-50 empleados</option>
                                <option value="51-200">51-200 empleados</option>
                                <option value="200+">Más de 200</option>
                            </select>
                        </div>
                        <div className="input-group" style={{ marginBottom: 0 }}>
                            <i className="fas fa-map-marker-alt"></i>
                            <select {...register("country", { required: true })} defaultValue="">
                                <option value="" disabled>Seleccione País</option>
                                <option value="Guatemala">Guatemala</option>
                                <option value="Mexico">México</option>
                                <option value="El Salvador">El Salvador</option>
                                <option value="Colombia">Colombia</option>
                                <option value="Espana">España</option>
                                <option value="Otro">Otro</option>
                            </select>
                        </div>
                        <div className="input-group" style={{ marginBottom: 0 }}>
                            <i className="fas fa-clock"></i>
                            <select {...register("timezone", { required: true })} defaultValue="">
                                <option value="" disabled>Zona Horaria</option>
                                <option value="America/Guatemala">America/Guatemala</option>
                                <option value="America/Mexico_City">America/Mexico_City</option>
                                <option value="America/Bogota">America/Bogota</option>
                                <option value="Europe/Madrid">Europe/Madrid</option>
                            </select>
                        </div>
                        <div className="input-group" style={{ marginBottom: 0 }}>
                            <i className="fas fa-coins"></i>
                            <select {...register("currency", { required: true })} defaultValue="">
                                <option value="" disabled>Moneda</option>
                                <option value="GTQ">Quetzal (GTQ)</option>
                                <option value="MXN">Peso Mexicano (MXN)</option>
                                <option value="COP">Peso Colombiano (COP)</option>
                                <option value="USD">Dólar (USD)</option>
                                <option value="EUR">Euro (EUR)</option>
                            </select>
                        </div>
                        <div className="input-group" style={{ marginBottom: 0, gridColumn: '1 / -1' }}>
                            <i className="fas fa-image"></i>
                            <input {...register("logo")} type="file" accept="image/*" style={{ paddingTop: '12px' }} />
                        </div>
                    </div>

                    <div style={{ marginTop: '40px' }}>
                        <button 
                            type="submit" 
                            disabled={isSubmitting} 
                            className={`auth-btn action-btn w-full py-4 text-lg font-bold shadow-lg uppercase ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                        >
                            {isSubmitting ? 'Registrando...' : 'Registrarme'}
                        </button>
                    </div>
                </form>

                <p className="mt-8 text-center text-gray-500 text-sm">
                    ¿Ya tienes una cuenta? <button type="button" onClick={() => onNavigate("login")} className="text-orange-600 font-bold ml-1 hover:underline">Iniciar Sesión</button>
                </p>
            </div>
        </div>
    );
};
