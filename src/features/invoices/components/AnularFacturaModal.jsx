import { useState } from "react";
import { Modal } from "../../../shared/ui/Modal";
import { useInvoicesStore } from "../store/adminStore";
import { showError, showSuccess } from "../../../shared/utils/toast";

export const AnularFacturaModal = ({ invoice, onClose }) => {
    const voidInvoice = useInvoicesStore((s) => s.voidInvoice);
    const loading = useInvoicesStore((s) => s.loading);
    const [reason, setReason] = useState("");

    const isOpen = !!invoice;

    const handleVoid = async () => {
        if (!reason.trim()) return showError("La razón de anulación es obligatoria");

        try {
            await voidInvoice(invoice._id, reason.trim());
            showSuccess("Factura anulada");
            setReason("");
            onClose?.();
        } catch (err) {
            showError(err?.response?.data?.message || err?.message || "Error al anular factura");
        }
    };

    const formatQ = (n) => typeof n === "number" ? `Q ${n.toFixed(2)}` : "—";

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Anular Factura"
            subtitle={`Factura ${invoice?.invoiceNumber || ""}`}
            compact
        >
            <div className="space-y-4">
                <div className="p-4 rounded-lg bg-red-50 border border-red-200">
                    <p className="text-sm text-red-800 font-semibold mb-1">
                        <i className="fas fa-triangle-exclamation mr-1"></i>
                        Acción fiscal irreversible
                    </p>
                    <p className="text-xs text-red-700">
                        Se generará una Nota de Crédito y la factura pasará a estado VOIDED de forma permanente.
                    </p>
                </div>

                <div className="flex flex-col gap-1">
                    <span className="text-sm font-bold text-stone-700">Total: {formatQ(invoice?.totalAmount)}</span>
                </div>

                <div className="flex flex-col gap-2">
                    <label className="app-modal-fieldLabel">Razón de anulación</label>
                    <textarea
                        className="app-modal-textarea w-full"
                        rows="3"
                        placeholder="Ej: Error en el monto cobrado al cliente..."
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                    />
                </div>

                <div className="app-modal-actions">
                    <button type="button" onClick={onClose} className="app-modal-btn app-modal-btnSecondary w-full sm:w-auto">
                        Cancelar
                    </button>
                    <button type="button" onClick={handleVoid} disabled={loading || !reason.trim()} className="app-modal-btn app-modal-btnPrimary w-full sm:w-auto" style={{ backgroundColor: "#dc2626" }}>
                        {loading ? "Procesando..." : "Anular Factura"}
                    </button>
                </div>
            </div>
        </Modal>
    );
};
