import { useEffect } from "react";
import { Modal } from "../../../shared/ui/Modal";
import { useOrdersStore } from "../store/adminStore";

export const AuditoriaModal = ({ orderId, onClose }) => {
    const audit = useOrdersStore((s) => s.audit);
    const loading = useOrdersStore((s) => s.loading);
    const getAudit = useOrdersStore((s) => s.getAudit);

    useEffect(() => {
        if (orderId) getAudit(orderId);
    }, [orderId, getAudit]);

    const isOpen = !!orderId;

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Historial de Auditoría" subtitle="Registro de cambios en esta orden">
            <div className="space-y-3 max-h-96 overflow-y-auto">
                {loading && <p className="text-sm text-stone-400 text-center py-4">Cargando...</p>}
                {!loading && audit.length === 0 && (
                    <p className="text-sm text-stone-400 text-center py-4">Sin registros de auditoría.</p>
                )}
                {audit.map((entry, idx) => (
                    <div
                        key={entry._id || idx}
                        className="p-3 rounded-lg border border-gray-100 bg-gray-50"
                    >
                        <div className="flex items-center justify-between mb-1">
                            <span className="text-xs font-bold text-orange-700 uppercase">
                                {entry.action?.replace(/_/g, " ")}
                            </span>
                            <span className="text-xs text-stone-400">
                                {entry.createdAt ? new Date(entry.createdAt).toLocaleString("es-GT") : "—"}
                            </span>
                        </div>
                        <p className="text-sm text-stone-700">
                            {entry.details?.description || "Sin descripción"}
                        </p>
                        <p className="text-xs text-stone-500 mt-1">
                            <i className="fas fa-user mr-1"></i>
                            {entry.actorName || "Sistema"} ({entry.actorRole || "—"})
                        </p>
                    </div>
                ))}
            </div>
            <div className="app-modal-actions mt-4">
                <button type="button" onClick={onClose} className="app-modal-btn app-modal-btnSecondary w-full sm:w-auto">Cerrar</button>
            </div>
        </Modal>
    );
};
