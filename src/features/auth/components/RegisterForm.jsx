import { useForm } from "react-hook-form";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { register as registerAPI } from "../../../shared/api/auth";
import { Spinner } from "../../../shared/components/ui/Spinner";

export const RegisterForm = ({ onNavigate }) => {
    const [showPassword, setShowPassword] = useState(false);

    const { 
        register, 
        handleSubmit, 
        formState: { errors, isSubmitting } 
    } = useForm({
        mode: "onTouched"
    });

    const handleNameKeyDown = (e) => {
        const allowedKeys = ['Backspace', 'Delete', 'Tab', 'ArrowLeft', 'ArrowRight', ' ', 'Shift', 'CapsLock'];
        if (allowedKeys.includes(e.key)) return;
        
        // Prevent if it's a number or special character (allow letters and spanish accents)
        if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ]$/.test(e.key)) {
            e.preventDefault();
        }
    };

    const handlePhoneKeyDown = (e) => {
        const allowedKeys = ['Backspace', 'Delete', 'Tab', 'ArrowLeft', 'ArrowRight'];
        if (allowedKeys.includes(e.key)) return;
        
        // Block non-digits
        if (!/^\d$/.test(e.key)) {
            e.preventDefault();
            return;
        }
        
        // Block writing more than 8 digits
        const val = e.target.value || "";
        if (val.length >= 8) {
            e.preventDefault();
        }
    };

    const handleNitKeyDown = (e) => {
        const allowedKeys = ['Backspace', 'Delete', 'Tab', 'ArrowLeft', 'ArrowRight', '-'];
        if (allowedKeys.includes(e.key)) return;
        
        // Allow only letters, digits and hyphens
        if (!/^[a-zA-Z0-9]$/.test(e.key)) {
            e.preventDefault();
        }
    };

    const onSubmit = async (data) => {
        try {
            const formData = new FormData();
            
            // Datos del Administrador
            formData.append("name", data.name.trim());
            formData.append("surname", data.surname.trim());
            formData.append("email", data.email.trim());
            formData.append("password", data.password);
            formData.append("phone", data.phone.trim());
            if (data.username) formData.append("username", data.username.trim());
            
            // Datos de la Empresa
            formData.append("legalName", data.legalName.trim());
            formData.append("alias", data.alias.trim());
            formData.append("taxId", data.taxId.trim().toUpperCase());
            formData.append("sector", data.sector);
            formData.append("companySize", data.companySize);
            formData.append("country", data.country);
            formData.append("timezone", data.timezone);
            formData.append("currency", data.currency);
            formData.append("subdomain", data.subdomain.trim().toLowerCase());
            
            // Archivo de Logo
            if (data.logo && data.logo[0]) {
                formData.append("logo", data.logo[0]);
            }

            await registerAPI(formData);
            toast.success("Registro exitoso. Introduce el código OTP enviado a tu correo electrónico.");
            onNavigate("otp");
        } catch (error) {
            toast.error(error.response?.data?.message || "Error al registrar la empresa");
        }
    };

    return (
        <div className="w-full max-w-4xl mx-auto p-8 md:p-10 bg-white rounded-3xl shadow-2xl overflow-y-auto my-8 border border-stone-100" style={{ maxHeight: "92vh" }}>
            <div className="w-full">
                <span className="welcome-text block mb-1 text-stone-400 text-xs font-semibold uppercase tracking-wider">Crear cuenta</span>
                <div className="logo-container mb-2 flex items-center gap-2">
                    <i className="fas fa-utensils text-orange-500 text-2xl"></i>
                    <span className="text-xl font-extrabold text-orange-500 tracking-wider">GESTOR RESTAURANTE</span>
                </div>

                <p className="subtitle mb-8 text-stone-500 text-sm">Registra tu restaurante para gestionar reservas, mesas, inventario y personal en un solo lugar.</p>

                <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-6">
                    
                    {/* Sección: Datos del Administrador */}
                    <div className="flex items-center my-6">
                        <div className="flex-grow border-t border-stone-200"></div>
                        <h2 className="px-4 text-sm font-bold text-stone-700 uppercase tracking-wider">Datos del Administrador</h2>
                        <div className="flex-grow border-t border-stone-200"></div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <div className={`input-group relative ${errors.name ? 'border-red-400' : ''}`} style={{ marginBottom: 0 }}>
                                <i className="far fa-user absolute left-5 top-1/2 -translate-y-1/2 text-stone-400"></i>
                                <input 
                                    type="text" 
                                    placeholder="Nombre" 
                                    className="w-full pl-12 pr-5 py-3 border border-stone-200 rounded-full outline-none focus:border-orange-500 transition-colors text-sm"
                                    onKeyDown={handleNameKeyDown}
                                    {...register("name", { 
                                        required: "El nombre es obligatorio",
                                        pattern: {
                                            value: /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/,
                                            message: "El nombre no debe contener números ni símbolos"
                                        }
                                    })} 
                                />
                            </div>
                            {errors.name && <p className="field-error text-red-500 text-xs font-semibold mt-1.5 pl-4 text-left">{errors.name.message}</p>}
                        </div>

                        <div>
                            <div className={`input-group relative ${errors.surname ? 'border-red-400' : ''}`} style={{ marginBottom: 0 }}>
                                <i className="far fa-user absolute left-5 top-1/2 -translate-y-1/2 text-stone-400"></i>
                                <input 
                                    type="text" 
                                    placeholder="Apellidos" 
                                    className="w-full pl-12 pr-5 py-3 border border-stone-200 rounded-full outline-none focus:border-orange-500 transition-colors text-sm"
                                    onKeyDown={handleNameKeyDown}
                                    {...register("surname", { 
                                        required: "Los apellidos son obligatorios",
                                        pattern: {
                                            value: /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/,
                                            message: "Los apellidos no deben contener números ni símbolos"
                                        }
                                    })} 
                                />
                            </div>
                            {errors.surname && <p className="field-error text-red-500 text-xs font-semibold mt-1.5 pl-4 text-left">{errors.surname.message}</p>}
                        </div>

                        <div>
                            <div className={`input-group relative ${errors.email ? 'border-red-400' : ''}`} style={{ marginBottom: 0 }}>
                                <i className="far fa-envelope absolute left-5 top-1/2 -translate-y-1/2 text-stone-400"></i>
                                <input 
                                    type="email" 
                                    placeholder="Correo electrónico" 
                                    className="w-full pl-12 pr-5 py-3 border border-stone-200 rounded-full outline-none focus:border-orange-500 transition-colors text-sm"
                                    {...register("email", { 
                                        required: "El correo es obligatorio",
                                        pattern: {
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                            message: "Ingresa un correo electrónico válido"
                                        }
                                    })} 
                                />
                            </div>
                            {errors.email && <p className="field-error text-red-500 text-xs font-semibold mt-1.5 pl-4 text-left">{errors.email.message}</p>}
                        </div>

                        <div>
                            <div className={`input-group relative ${errors.phone ? 'border-red-400' : ''}`} style={{ marginBottom: 0 }}>
                                <i className="fas fa-phone absolute left-5 top-1/2 -translate-y-1/2 text-stone-400"></i>
                                <input 
                                    type="tel" 
                                    placeholder="Teléfono (8 dígitos)" 
                                    className="w-full pl-12 pr-5 py-3 border border-stone-200 rounded-full outline-none focus:border-orange-500 transition-colors text-sm"
                                    onKeyDown={handlePhoneKeyDown}
                                    {...register("phone", { 
                                        required: "El teléfono es obligatorio",
                                        pattern: {
                                            value: /^\d{8}$/,
                                            message: "El teléfono debe contener exactamente 8 números"
                                        }
                                    })} 
                                />
                            </div>
                            {errors.phone && <p className="field-error text-red-500 text-xs font-semibold mt-1.5 pl-4 text-left">{errors.phone.message}</p>}
                        </div>

                        <div>
                            <div className="input-group relative" style={{ marginBottom: 0 }}>
                                <i className="fas fa-at absolute left-5 top-1/2 -translate-y-1/2 text-stone-400"></i>
                                <input 
                                    type="text" 
                                    placeholder="Usuario (opcional)" 
                                    className="w-full pl-12 pr-5 py-3 border border-stone-200 rounded-full outline-none focus:border-orange-500 transition-colors text-sm"
                                    {...register("username")} 
                                />
                            </div>
                        </div>

                        <div>
                            <div className={`input-group relative ${errors.password ? 'border-red-400' : ''}`} style={{ marginBottom: 0 }}>
                                <i className="fas fa-lock absolute left-5 top-1/2 -translate-y-1/2 text-stone-400"></i>
                                <input 
                                    type={showPassword ? "text" : "password"} 
                                    placeholder="Contraseña" 
                                    className="w-full pl-12 pr-12 py-3 border border-stone-200 rounded-full outline-none focus:border-orange-500 transition-colors text-sm"
                                    {...register("password", { 
                                        required: "La contraseña es obligatoria",
                                        minLength: {
                                            value: 6,
                                            message: "La contraseña debe tener al menos 6 caracteres"
                                        }
                                    })} 
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 cursor-pointer"
                                >
                                    <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`} />
                                </button>
                            </div>
                            {errors.password && <p className="field-error text-red-500 text-xs font-semibold mt-1.5 pl-4 text-left">{errors.password.message}</p>}
                        </div>
                    </div>

                    {/* Sección: Datos de la Empresa */}
                    <div className="flex items-center my-6">
                        <div className="flex-grow border-t border-stone-200"></div>
                        <h2 className="px-4 text-sm font-bold text-stone-700 uppercase tracking-wider">Datos de la Empresa</h2>
                        <div className="flex-grow border-t border-stone-200"></div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <div className={`input-group relative ${errors.legalName ? 'border-red-400' : ''}`} style={{ marginBottom: 0 }}>
                                <i className="far fa-building absolute left-5 top-1/2 -translate-y-1/2 text-stone-400"></i>
                                <input 
                                    type="text" 
                                    placeholder="Razón Social (Legal)" 
                                    className="w-full pl-12 pr-5 py-3 border border-stone-200 rounded-full outline-none focus:border-orange-500 transition-colors text-sm"
                                    {...register("legalName", { required: "La razón social es obligatoria" })} 
                                />
                            </div>
                            {errors.legalName && <p className="field-error text-red-500 text-xs font-semibold mt-1.5 pl-4 text-left">{errors.legalName.message}</p>}
                        </div>

                        <div>
                            <div className={`input-group relative ${errors.alias ? 'border-red-400' : ''}`} style={{ marginBottom: 0 }}>
                                <i className="fas fa-store absolute left-5 top-1/2 -translate-y-1/2 text-stone-400"></i>
                                <input 
                                    type="text" 
                                    placeholder="Nombre Comercial" 
                                    className="w-full pl-12 pr-5 py-3 border border-stone-200 rounded-full outline-none focus:border-orange-500 transition-colors text-sm"
                                    {...register("alias", { required: "El nombre comercial es obligatorio" })} 
                                />
                            </div>
                            {errors.alias && <p className="field-error text-red-500 text-xs font-semibold mt-1.5 pl-4 text-left">{errors.alias.message}</p>}
                        </div>

                        <div>
                            <div className={`input-group relative ${errors.taxId ? 'border-red-400' : ''}`} style={{ marginBottom: 0 }}>
                                <i className="fas fa-id-card absolute left-5 top-1/2 -translate-y-1/2 text-stone-400"></i>
                                <input 
                                    type="text" 
                                    placeholder="NIT / Código Fiscal (ej: 1234567-8)" 
                                    className="w-full pl-12 pr-5 py-3 border border-stone-200 rounded-full outline-none focus:border-orange-500 transition-colors text-sm"
                                    onKeyDown={handleNitKeyDown}
                                    {...register("taxId", { 
                                        required: "El código fiscal/NIT es obligatorio",
                                        pattern: {
                                            value: /^[a-zA-Z0-9-]+$/,
                                            message: "Ingresa un NIT/Código fiscal válido"
                                        }
                                    })} 
                                />
                            </div>
                            {errors.taxId && <p className="field-error text-red-500 text-xs font-semibold mt-1.5 pl-4 text-left">{errors.taxId.message}</p>}
                        </div>

                        <div>
                            <div className={`input-group relative ${errors.subdomain ? 'border-red-400' : ''}`} style={{ marginBottom: 0 }}>
                                <i className="fas fa-globe absolute left-5 top-1/2 -translate-y-1/2 text-stone-400"></i>
                                <input 
                                    type="text" 
                                    placeholder="Subdominio (ej: elsabor)" 
                                    className="w-full pl-12 pr-5 py-3 border border-stone-200 rounded-full outline-none focus:border-orange-500 transition-colors text-sm"
                                    {...register("subdomain", { 
                                        required: "El subdominio es obligatorio",
                                        pattern: {
                                            value: /^[a-z0-9-]+$/,
                                            message: "El subdominio solo admite minúsculas, números y guiones"
                                        }
                                    })} 
                                />
                            </div>
                            {errors.subdomain && <p className="field-error text-red-500 text-xs font-semibold mt-1.5 pl-4 text-left">{errors.subdomain.message}</p>}
                        </div>

                        <div>
                            <div className={`input-group relative ${errors.sector ? 'border-red-400' : ''}`} style={{ marginBottom: 0 }}>
                                <i className="fas fa-utensils absolute left-5 top-1/2 -translate-y-1/2 text-stone-400"></i>
                                <select 
                                    className="w-full pl-12 pr-5 py-3 border border-stone-200 rounded-full outline-none focus:border-orange-500 transition-colors text-sm bg-stone-50"
                                    {...register("sector", { required: "El sector es obligatorio" })} 
                                    defaultValue=""
                                >
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
                            {errors.sector && <p className="field-error text-red-500 text-xs font-semibold mt-1.5 pl-4 text-left">{errors.sector.message}</p>}
                        </div>

                        <div>
                            <div className={`input-group relative ${errors.companySize ? 'border-red-400' : ''}`} style={{ marginBottom: 0 }}>
                                <i className="fas fa-users absolute left-5 top-1/2 -translate-y-1/2 text-stone-400"></i>
                                <select 
                                    className="w-full pl-12 pr-5 py-3 border border-stone-200 rounded-full outline-none focus:border-orange-500 transition-colors text-sm bg-stone-50"
                                    {...register("companySize", { required: "El tamaño es obligatorio" })} 
                                    defaultValue=""
                                >
                                    <option value="" disabled>Tamaño de empresa</option>
                                    <option value="1-10">1-10 empleados</option>
                                    <option value="11-50">11-50 empleados</option>
                                    <option value="51-200">51-200 empleados</option>
                                    <option value="200+">Más de 200</option>
                                </select>
                            </div>
                            {errors.companySize && <p className="field-error text-red-500 text-xs font-semibold mt-1.5 pl-4 text-left">{errors.companySize.message}</p>}
                        </div>

                        <div>
                            <div className={`input-group relative ${errors.country ? 'border-red-400' : ''}`} style={{ marginBottom: 0 }}>
                                <i className="fas fa-map-marker-alt absolute left-5 top-1/2 -translate-y-1/2 text-stone-400"></i>
                                <select 
                                    className="w-full pl-12 pr-5 py-3 border border-stone-200 rounded-full outline-none focus:border-orange-500 transition-colors text-sm bg-stone-50"
                                    {...register("country", { required: "El país es obligatorio" })} 
                                    defaultValue=""
                                >
                                    <option value="" disabled>Seleccione País</option>
                                    <option value="Guatemala">Guatemala</option>
                                    <option value="Mexico">México</option>
                                    <option value="El Salvador">El Salvador</option>
                                    <option value="Colombia">Colombia</option>
                                    <option value="Espana">España</option>
                                    <option value="Otro">Otro</option>
                                </select>
                            </div>
                            {errors.country && <p className="field-error text-red-500 text-xs font-semibold mt-1.5 pl-4 text-left">{errors.country.message}</p>}
                        </div>

                        <div>
                            <div className={`input-group relative ${errors.timezone ? 'border-red-400' : ''}`} style={{ marginBottom: 0 }}>
                                <i className="fas fa-clock absolute left-5 top-1/2 -translate-y-1/2 text-stone-400"></i>
                                <select 
                                    className="w-full pl-12 pr-5 py-3 border border-stone-200 rounded-full outline-none focus:border-orange-500 transition-colors text-sm bg-stone-50"
                                    {...register("timezone", { required: "La zona horaria es obligatoria" })} 
                                    defaultValue=""
                                >
                                    <option value="" disabled>Zona Horaria</option>
                                    <option value="America/Guatemala">America/Guatemala</option>
                                    <option value="America/Mexico_City">America/Mexico_City</option>
                                    <option value="America/Bogota">America/Bogota</option>
                                    <option value="Europe/Madrid">Europe/Madrid</option>
                                </select>
                            </div>
                            {errors.timezone && <p className="field-error text-red-500 text-xs font-semibold mt-1.5 pl-4 text-left">{errors.timezone.message}</p>}
                        </div>

                        <div>
                            <div className={`input-group relative ${errors.currency ? 'border-red-400' : ''}`} style={{ marginBottom: 0 }}>
                                <i className="fas fa-coins absolute left-5 top-1/2 -translate-y-1/2 text-stone-400"></i>
                                <select 
                                    className="w-full pl-12 pr-5 py-3 border border-stone-200 rounded-full outline-none focus:border-orange-500 transition-colors text-sm bg-stone-50"
                                    {...register("currency", { required: "La moneda es obligatoria" })} 
                                    defaultValue=""
                                >
                                    <option value="" disabled>Moneda</option>
                                    <option value="GTQ">Quetzal (GTQ)</option>
                                    <option value="MXN">Peso Mexicano (MXN)</option>
                                    <option value="COP">Peso Colombiano (COP)</option>
                                    <option value="USD">Dólar (USD)</option>
                                    <option value="EUR">Euro (EUR)</option>
                                </select>
                            </div>
                            {errors.currency && <p className="field-error text-red-500 text-xs font-semibold mt-1.5 pl-4 text-left">{errors.currency.message}</p>}
                        </div>

                        <div className="input-group relative md:col-span-2" style={{ marginBottom: 0 }}>
                            <i className="fas fa-image absolute left-5 top-1/2 -translate-y-1/2 text-stone-400"></i>
                            <input 
                                type="file" 
                                accept="image/*" 
                                className="w-full pl-12 pr-5 py-3 border border-stone-200 rounded-full outline-none focus:border-orange-500 transition-colors text-sm"
                                style={{ paddingTop: '10px' }} 
                                {...register("logo")} 
                            />
                        </div>
                    </div>

                    <div className="pt-6">
                        <button 
                            type="submit" 
                            disabled={isSubmitting} 
                            className={`auth-btn action-btn w-full py-4 text-sm font-bold shadow-lg shadow-orange-500/20 hover:shadow-orange-500/35 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] transition-all cursor-pointer bg-gradient-to-r from-red-500 to-orange-500 uppercase flex items-center justify-center gap-2 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                        >
                            {isSubmitting ? <Spinner size="sm" /> : 'Registrarme'}
                        </button>
                    </div>
                </form>

                <p className="mt-8 text-center text-stone-500 text-sm">
                    ¿Ya tienes una cuenta? <button type="button" onClick={() => onNavigate("login")} className="text-orange-500 font-bold ml-1 hover:underline cursor-pointer">Iniciar Sesión</button>
                </p>
            </div>
        </div>
    );
};
