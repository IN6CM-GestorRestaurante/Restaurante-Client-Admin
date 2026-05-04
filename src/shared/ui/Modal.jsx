import { useEffect } from "react";
/*
* Modal: Un componente de modal reutilizable que muestra un título, subtítulo y contenido personalizado.
* Permite cerrar el modal con un botón o presionando la tecla Escape.
*/
export const Modal = ({ isOpen, onClose, title, subtitle, children }) => {
    // Cerrar con Escape
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Escape") {
                onClose();
            }
        };
        if (isOpen) {
            window.addEventListener("keydown", handleKeyDown);
        }
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 px-3 sm:px-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg md:max-w-2xl max-h-[90vh] flex flex-col overflow-hidden relative">
                {/* HEADER */}
                <div
                    className="p-4 sm:p-5 text-white sticky top-0 z-10 flex justify-between items-center"
                    style={{
                        background: "linear-gradient(135deg, var(--primary-red) 0%, var(--primary-orange) 100%)"
                    }}
                >
                    <div>
                        <h2 className="text-xl sm:text-2xl font-bold">{title}</h2>
                        {subtitle && <p className="text-xs sm:text-sm opacity-80">{subtitle}</p>}
                    </div>
                    {/* Botón de cierre manual */}
                    <button 
                        onClick={onClose}
                        className="text-white hover:text-gray-200 transition text-3xl font-bold align-top leading-none"
                    >
                        &times;
                    </button>
                </div>

                {/* CONTENIDO INTERNO */}
                <div className="p-4 sm:p-6 space-y-5 overflow-y-auto">
                    {children}
                </div>
            </div>
        </div>
    );
};
