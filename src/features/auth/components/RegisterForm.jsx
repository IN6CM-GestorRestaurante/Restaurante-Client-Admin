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

            const res = await registerAPI(formData);
            toast.success("Registro exitoso. Introduce el código OTP enviado a tu correo electrónico.");
            onNavigate("otp", { email: data.email, server: res?.data });
        } catch (error) {
            toast.error(error.response?.data?.message || "Error al registrar la empresa");
        }
    };

    const inputBaseClass = "w-full pl-12 pr-5 py-3.5 text-sm leading-5 bg-stone-50 border rounded-full outline-none transition-all";
    const inputValidClass = "border-stone-200 focus:border-orange-500";
    const inputErrorClass = "border-red-400 focus:border-red-500";
    const sectionWrapperClass = "p-0";
    const inputIconClass = "absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center pointer-events-none";

    return (
        <div className="register-card shadow-2xl relative">
            <style>{`
                .register-password-input::-ms-reveal,
                .register-password-input::-ms-clear {
                    display: none;
                }

                .register-password-input::-webkit-credentials-auto-fill-button {
                    visibility: hidden;
                    display: none !important;
                    pointer-events: none;
                    position: absolute;
                    right: 0;
                }
            `}</style>

            <div className="register-left flex flex-col justify-start items-center px-6 sm:px-8 md:px-10 py-9 md:py-11">
                <span className="welcome-text tracking-widest text-xs font-semibold text-stone-400 uppercase">
                    Bienvenido al
                </span>
                <div className="logo-container flex items-center gap-2.5 mt-1 mb-4">
                    <i className="fas fa-utensils text-[1.35rem] leading-none text-orange-500"></i>
                    <span className="text-xl leading-none font-extrabold text-orange-500 uppercase tracking-wider">
                        GESTOR RESTAURANTE
                    </span>
                </div>

                <p className="subtitle text-stone-500 text-xs sm:text-sm max-w-xl text-center mb-6 leading-relaxed">
                    Crea tu cuenta y configura tu empresa para administrar reservas, pedidos, inventario y personal desde un solo panel.
                </p>

                <form onSubmit={handleSubmit(onSubmit)} className="w-full self-stretch space-y-8" style={{ maxWidth: "none" }}>
                    <div className={`${sectionWrapperClass} pb-2`}>
                        <div className="flex items-center gap-3 mb-5">
                            <div className="h-px flex-1 bg-stone-200"></div>
                            <span className="text-[11px] font-bold uppercase tracking-widest text-stone-500">Datos del Administrador</span>
                            <div className="h-px flex-1 bg-stone-200"></div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 md:gap-x-8 gap-y-8" style={{ gap: "35px" }}>
                        <div>
                            <div className="input-group relative" style={{ marginBottom: 0 }}>
                                <span className={inputIconClass}>
                                    <i className="far fa-user text-stone-400 text-sm leading-none" />
                                </span>
                                <input
                                    type="text"
                                    placeholder="Nombre"
                                    className={`${inputBaseClass} ${errors.name ? inputErrorClass : inputValidClass}`}
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
                            <div className="input-group relative" style={{ marginBottom: 0 }}>
                                <span className={inputIconClass}>
                                    <i className="far fa-user text-stone-400 text-sm leading-none" />
                                </span>
                                <input
                                    type="text"
                                    placeholder="Apellidos"
                                    className={`${inputBaseClass} ${errors.surname ? inputErrorClass : inputValidClass}`}
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
                            <div className="input-group relative" style={{ marginBottom: 0 }}>
                                <span className={inputIconClass}>
                                    <i className="far fa-envelope text-stone-400 text-sm leading-none" />
                                </span>
                                <input
                                    type="email"
                                    placeholder="Correo electrónico"
                                    className={`${inputBaseClass} ${errors.email ? inputErrorClass : inputValidClass}`}
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
                            <div className="input-group relative" style={{ marginBottom: 0 }}>
                                <span className={inputIconClass}>
                                    <i className="fas fa-phone text-stone-400 text-sm leading-none" />
                                </span>
                                <input
                                    type="tel"
                                    placeholder="Teléfono (8 dígitos)"
                                    className={`${inputBaseClass} ${errors.phone ? inputErrorClass : inputValidClass}`}
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
                                <span className={inputIconClass}>
                                    <i className="fas fa-at text-stone-400 text-sm leading-none" />
                                </span>
                                <input
                                    type="text"
                                    placeholder="Usuario (opcional)"
                                    className={`${inputBaseClass} ${inputValidClass}`}
                                    {...register("username")}
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center gap-2">
                                <div className="input-group relative flex-1">
                                    <span className={inputIconClass}>
                                        <i className="fas fa-lock text-stone-400 text-sm leading-none" />
                                    </span>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Contraseña"
                                        className={`register-password-input ${inputBaseClass} ${errors.password ? inputErrorClass : inputValidClass}`}
                                        {...register("password", {
                                            required: "La contraseña es obligatoria",
                                            minLength: {
                                                value: 6,
                                                message: "La contraseña debe tener al menos 6 caracteres"
                                            }
                                        })}
                                    />
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="login-password-toggle-btn h-11 w-11 shrink-0 self-center -translate-y-2 rounded-full bg-stone-100 border border-stone-200 inline-flex items-center justify-center text-stone-500 hover:text-stone-700 hover:bg-stone-200 transition-colors focus:outline-none cursor-pointer"
                                    aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                                >
                                    <i className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"} text-sm leading-none`} />
                                </button>
                            </div>
                            {errors.password && <p className="field-error text-red-500 text-xs font-semibold mt-1.5 pl-4 text-left">{errors.password.message}</p>}
                        </div>
                    </div>
                    </div>

                    <div className={`${sectionWrapperClass} pt-6 pb-6`}>
                        <div className="flex items-center gap-3 mb-6">
                            <div className="h-px flex-1 bg-stone-200"></div>
                            <span className="text-[11px] font-bold uppercase tracking-widest text-stone-500">Datos de la Empresa</span>
                            <div className="h-px flex-1 bg-stone-200"></div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 md:gap-x-8 gap-y-10" style={{ gap: "35px" }}>
                        <div>
                            <div className="input-group relative" style={{ marginBottom: 0 }}>
                                <span className={inputIconClass}>
                                    <i className="far fa-building text-stone-400 text-sm leading-none" />
                                </span>
                                <input
                                    type="text"
                                    placeholder="Razón Social (Legal)"
                                    className={`${inputBaseClass} ${errors.legalName ? inputErrorClass : inputValidClass}`}
                                    {...register("legalName", { required: "La razón social es obligatoria" })}
                                />
                            </div>
                            {errors.legalName && <p className="field-error text-red-500 text-xs font-semibold mt-1.5 pl-4 text-left">{errors.legalName.message}</p>}
                        </div>

                        <div>
                            <div className="input-group relative" style={{ marginBottom: 0 }}>
                                <span className={inputIconClass}>
                                    <i className="fas fa-store text-stone-400 text-sm leading-none" />
                                </span>
                                <input
                                    type="text"
                                    placeholder="Nombre Comercial"
                                    className={`${inputBaseClass} ${errors.alias ? inputErrorClass : inputValidClass}`}
                                    {...register("alias", { required: "El nombre comercial es obligatorio" })}
                                />
                            </div>
                            {errors.alias && <p className="field-error text-red-500 text-xs font-semibold mt-1.5 pl-4 text-left">{errors.alias.message}</p>}
                        </div>

                        <div>
                            <div className="input-group relative" style={{ marginBottom: 0 }}>
                                <span className={inputIconClass}>
                                    <i className="fas fa-id-card text-stone-400 text-sm leading-none" />
                                </span>
                                <input
                                    type="text"
                                    placeholder="NIT / Código Fiscal (ej: 1234567-8)"
                                    className={`${inputBaseClass} ${errors.taxId ? inputErrorClass : inputValidClass}`}
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
                            <div className="input-group relative" style={{ marginBottom: 0 }}>
                                <span className={inputIconClass}>
                                    <i className="fas fa-globe text-stone-400 text-sm leading-none" />
                                </span>
                                <input
                                    type="text"
                                    placeholder="Subdominio (ej: elsabor)"
                                    className={`${inputBaseClass} ${errors.subdomain ? inputErrorClass : inputValidClass}`}
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
                            <div className="input-group relative" style={{ marginBottom: 0 }}>
                                <span className={inputIconClass}>
                                    <i className="fas fa-utensils text-stone-400 text-sm leading-none" />
                                </span>
                                <select
                                    className={`${inputBaseClass} appearance-none ${errors.sector ? inputErrorClass : inputValidClass}`}
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
                            <div className="input-group relative" style={{ marginBottom: 0 }}>
                                <span className={inputIconClass}>
                                    <i className="fas fa-users text-stone-400 text-sm leading-none" />
                                </span>
                                <select
                                    className={`${inputBaseClass} appearance-none ${errors.companySize ? inputErrorClass : inputValidClass}`}
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
                            <div className="input-group relative" style={{ marginBottom: 0 }}>
                                <span className={inputIconClass}>
                                    <i className="fas fa-map-marker-alt text-stone-400 text-sm leading-none" />
                                </span>
                                <select
                                    className={`${inputBaseClass} appearance-none ${errors.country ? inputErrorClass : inputValidClass}`}
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
                            <div className="input-group relative" style={{ marginBottom: 0 }}>
                                <span className={inputIconClass}>
                                    <i className="fas fa-clock text-stone-400 text-sm leading-none" />
                                </span>
                                <select
                                    className={`${inputBaseClass} appearance-none ${errors.timezone ? inputErrorClass : inputValidClass}`}
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
                            <div className="input-group relative" style={{ marginBottom: 0 }}>
                                <span className={inputIconClass}>
                                    <i className="fas fa-coins text-stone-400 text-sm leading-none" />
                                </span>
                                <select
                                    className={`${inputBaseClass} appearance-none ${errors.currency ? inputErrorClass : inputValidClass}`}
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

                        <div className="md:col-span-2 lg:col-span-3 mb-6 lg:mb-8">
                            <div className="input-group relative" style={{ marginBottom: 0 }}>
                                <span className={inputIconClass}>
                                    <i className="fas fa-image text-stone-400 text-sm leading-none pointer-events-none" />
                                </span>
                                <input
                                    type="file"
                                    accept="image/*"
                                    className={`${inputBaseClass} ${inputValidClass} file:mr-3 file:rounded-full file:border-0 file:bg-orange-100 file:px-3 file:py-1 file:text-xs file:font-semibold file:text-orange-700 hover:file:bg-orange-200`}
                                    {...register("logo")}
                                />
                            </div>
                        </div>
                    </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        style={{ marginTop: "60px" }}
                        className={`auth-btn action-btn w-full py-4 text-sm font-bold shadow-lg shadow-orange-500/20 hover:shadow-orange-500/35 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] transition-all cursor-pointer bg-linear-to-r from-red-500 to-orange-500 uppercase flex items-center justify-center gap-2 ${isSubmitting ? "opacity-70 cursor-not-allowed" : ""}`}
                    >
                        {isSubmitting ? (
                            <>
                                <Spinner size="sm" />
                                Cargando...
                            </>
                        ) : (
                            "Registrarme"
                        )}
                    </button>
                </form>

                <p className="signin-link text-stone-500 text-xs sm:text-sm mt-6">
                    ¿Ya tienes una cuenta?
                    <button type="button" onClick={() => onNavigate("login")} className="text-orange-500 font-bold hover:underline cursor-pointer ml-1">
                        Iniciar Sesión
                    </button>
                </p>
            </div>
        </div>
    );
};
