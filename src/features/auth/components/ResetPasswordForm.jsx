import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Spinner } from "../../../shared/components/ui/Spinner";
import { resetPassword } from "../../../shared/api/auth";

export const ResetPasswordForm = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isSubmitting },
    } = useForm({ mode: "onTouched" });

    const newPassword = watch("newPassword");

    const onSubmit = async ({ newPassword }) => {
        try {
            await resetPassword(token, newPassword);
            toast.success("Contraseña actualizada. Ya puedes iniciar sesión.");
            navigate("/");
        } catch (err) {
            toast.error(err.response?.data?.message || "El enlace es inválido o expiró. Solicita uno nuevo.");
        }
    };

    return (
        <div className="auth-body flex items-center justify-center min-h-screen">
            <div className="otp-card shadow-2xl relative overflow-hidden rounded-4xl border border-stone-200 bg-white/95">
                <div className="otp-left flex flex-col justify-start items-center px-6 py-10 sm:px-8 md:px-10 md:py-12">
                    <div className="mb-5 flex items-center gap-3">
                        <span className="h-6 w-1 rounded-full bg-linear-to-b from-orange-500 to-amber-500" />
                        <h2 className="text-xl font-extrabold text-stone-800 sm:text-2xl">Restablecer contraseña</h2>
                    </div>

                    {!token ? (
                        <p className="mb-10 max-w-md text-center text-sm leading-relaxed text-red-500 font-semibold">
                            Este enlace no incluye un token válido. Solicita uno nuevo desde la pantalla de inicio de sesión.
                        </p>
                    ) : (
                        <>
                            <p className="mb-10 max-w-md text-center text-sm leading-relaxed text-stone-500">
                                Ingresa tu nueva contraseña.
                            </p>

                            <form onSubmit={handleSubmit(onSubmit)} className="w-full" style={{ maxWidth: 420 }}>
                                <div className="mb-5">
                                    <input
                                        type="password"
                                        placeholder="Nueva contraseña"
                                        className="w-full rounded-full border border-stone-200 bg-stone-50 px-4 py-3.5 text-sm outline-none transition focus:border-orange-500 focus:bg-white"
                                        {...register("newPassword", {
                                            required: "La nueva contraseña es obligatoria",
                                            minLength: { value: 6, message: "Debe tener al menos 6 caracteres" },
                                        })}
                                    />
                                    {errors.newPassword && <p className="field-error text-red-500 text-xs font-semibold mt-1.5 pl-4 text-left">{errors.newPassword.message}</p>}
                                </div>

                                <div className="mb-10">
                                    <input
                                        type="password"
                                        placeholder="Confirmar nueva contraseña"
                                        className="w-full rounded-full border border-stone-200 bg-stone-50 px-4 py-3.5 text-sm outline-none transition focus:border-orange-500 focus:bg-white"
                                        {...register("confirmPassword", {
                                            required: "Debes confirmar la contraseña",
                                            validate: (value) => value === newPassword || "Las contraseñas no coinciden",
                                        })}
                                    />
                                    {errors.confirmPassword && <p className="field-error text-red-500 text-xs font-semibold mt-1.5 pl-4 text-left">{errors.confirmPassword.message}</p>}
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className={`auth-btn action-btn flex w-full items-center justify-center gap-2 rounded-full bg-linear-to-r from-red-500 to-orange-500 py-3 text-sm font-bold text-white transition-all hover:shadow-lg hover:shadow-orange-500/20 ${isSubmitting ? "cursor-not-allowed opacity-70" : ""}`}
                                >
                                    {isSubmitting ? (<><Spinner size="sm"/>Actualizando...</>) : ("Restablecer contraseña")}
                                </button>
                            </form>
                        </>
                    )}

                    <div className="text-center mt-6">
                        <button
                            type="button"
                            onClick={() => navigate("/")}
                            className="text-sm text-stone-600 hover:underline"
                        >
                            Volver al inicio de sesión
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResetPasswordForm;
