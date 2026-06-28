import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Spinner } from "../../../shared/components/ui/Spinner";
import { verifyEmail, resendVerification } from "../../../shared/api/auth";
import { useEffect, useState } from "react";

export const OtpForm = ({ onNavigate, otpPayload }) => {
    const { register, handleSubmit, formState: { errors, isSubmitting }, getValues } = useForm({ mode: "onTouched" });
    const [resendCooldown, setResendCooldown] = useState(0);
    const [resendLoading, setResendLoading] = useState(false);

    useEffect(() => {
        let timer;
        if (resendCooldown > 0) {
            timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
        }
        return () => clearTimeout(timer);
    }, [resendCooldown]);

    const onSubmit = async (data) => {
        try {
            // AuthService expects a token field under /auth/verify-email
            const token = data.code;
            await verifyEmail(token);
            toast.success("Código verificado. Ya puedes iniciar sesión.");
            onNavigate("login");
        } catch (err) {
            toast.error(err.response?.data?.message || "Error verificando el código OTP");
        }
    };

    return (
        <div className="otp-card shadow-2xl relative overflow-hidden rounded-4xl border border-stone-200 bg-white/95">
            <div className="otp-left flex flex-col justify-start items-center px-6 py-10 sm:px-8 md:px-10 md:py-12" style={{ paddingTop: "2rem" }}>
                <div className="mb-5 flex items-center gap-3" style={{ marginTop: "0.5rem" }}>
                    <span className="h-6 w-1 rounded-full bg-linear-to-b from-orange-500 to-amber-500" />
                    <h2 className="text-xl font-extrabold text-stone-800 sm:text-2xl">Verificación OTP</h2>
                </div>
                <p className="mb-2 max-w-md text-center text-sm leading-relaxed text-stone-500">
                    Introduce el código enviado a tu correo electrónico para verificar tu cuenta.
                </p>
                {otpPayload?.email && (
                    <p className="mb-10 text-center text-sm text-stone-600">
                        Código enviado a <strong className="text-stone-800">{otpPayload.email}</strong>
                    </p>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className="w-full" style={{ maxWidth: 420 }}>
                    <div className="mb-10" style={{ marginTop: "45px", marginBottom: "45px" }}>
                        <input
                            type="text"
                            placeholder="Código OTP"
                            className="w-full rounded-full border border-stone-200 bg-stone-50 px-4 py-3.5 text-sm outline-none transition focus:border-orange-500 focus:bg-white"
                            {...register("code", { required: "El código es obligatorio", pattern: { value: /^[0-9A-Za-z-]{4,8}$/, message: "Código inválido" } })}
                        />
                        {errors.code && <p className="field-error text-red-500 text-xs font-semibold mt-1.5 pl-4 text-left">{errors.code.message}</p>}
                    </div>

                    {!otpPayload?.email && (
                        <div className="mb-5">
                            <input
                                type="email"
                                placeholder="Correo usado en el registro"
                                className="w-full rounded-full border border-stone-200 bg-stone-50 px-4 py-3.5 text-sm outline-none transition focus:border-orange-500 focus:bg-white"
                                {...register("email", { required: "El correo es obligatorio", pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: "Correo inválido" } })}
                            />
                            {errors.email && <p className="field-error text-red-500 text-xs font-semibold mt-1.5 pl-4 text-left">{errors.email.message}</p>}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        style={{ marginTop: "40px", marginBottom: "30px" }}
                        className={`auth-btn action-btn flex w-full items-center justify-center gap-2 rounded-full bg-linear-to-r from-red-500 to-orange-500 py-3 text-sm font-bold text-white transition-all hover:shadow-lg hover:shadow-orange-500/20 ${isSubmitting ? "cursor-not-allowed opacity-70" : ""}`}
                    >
                        {isSubmitting ? (<><Spinner size="sm"/>Verificando...</>) : ("Verificar código")}
                    </button>

                    <div className="text-center mt-4">
                        <button
                            type="button"
                            disabled={resendCooldown > 0 || resendLoading}
                            onClick={async () => {
                                try {
                                    const email = otpPayload?.email || getValues("email");
                                    if (!email) {
                                        toast.error("No hay correo para reenviar el código. Por favor ingrésalo arriba.");
                                        return;
                                    }
                                    setResendLoading(true);
                                    await resendVerification(email);
                                    toast.success("Código reenviado al correo.");
                                    setResendCooldown(60);
                                } catch (err) {
                                    toast.error(err.response?.data?.message || "Error re-enviando el código");
                                } finally {
                                    setResendLoading(false);
                                }
                            }}
                            className="text-sm text-stone-600 hover:underline disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {resendLoading ? "Enviando..." : resendCooldown > 0 ? `Reenviar (${resendCooldown}s)` : "Reenviar código"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default OtpForm;
