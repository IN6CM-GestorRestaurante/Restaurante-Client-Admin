import { useEffect } from "react";
export const Modal = ({ isOpen, onClose, title, subtitle, children }) => {
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
        <div className="app-modal-overlay">
            <div className="app-modal-card">
                <div className="app-modal-header">
                    <div className="app-modal-titleGroup">
                        <h2 className="app-modal-title">{title}</h2>
                        {subtitle ? <p className="app-modal-subtitle">{subtitle}</p> : null}
                    </div>

                    <button
                        onClick={onClose}
                        className="app-modal-close"
                        aria-label="Cerrar modal"
                        type="button"
                    >
                        &times;
                    </button>
                </div>

                <div className="app-modal-body">
                    {children}
                </div>
            </div>
        </div>
    );
};
