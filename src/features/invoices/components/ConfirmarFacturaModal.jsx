import { useState } from "react";
import { Modal } from "../../../shared/ui/Modal";
import { useInvoicesStore } from "../store/adminStore";
import { showError, showSuccess } from "../../../shared/utils/toast";

const PAYMENT_METHODS = [
    { value: "CASH", label: "Efectivo" },
    { value: "CARD", label: "Tarjeta" },
    { value: "TRANSFER", label: "Transferencia" },
    { value: "MIXED", label: "Mixto" },
];

export const ConfirmarFacturaModal = ({ invoice, onClose }) => {
    const commitInvoice = useInvoicesStore((s) => s.commitInvoice);
    const loading = useInvoicesStore((s) => s.loading);
    const [paymentMethod, setPaymentMethod] = useState("CASH");

    const isOpen = !!invoice;

    const handleConfirm = async () => {
        try {
            await commitInvoice(invoice._id, paymentMethod);
            showSuccess("Factura confirmada exitosamente");
            onClose?.();
        } catch (err) {
            showError(err?.response?.data?.message || err?.message || "Error al confirmar factura");
        }
    };

    const formatQ = (n) => typeof n === "number" ? `Q ${n.toFixed(2)}` : "—";

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Confirmar Factura"
            subtitle={`Factura ${invoice?.invoiceNumber || ""}`}
            compact
        >
            <div className="space-y-4">
                <div className="p-4 rounded-lg bg-green-50 border border-green-200">
                    <p className="text-sm text-green-800 font-semibold mb-1">
                        <i className="fas fa-circle-info mr-1"></i>
                        Esta acción es irreversible
                    </p>
                    <p className="text-xs text-green-700">
                        Una vez confirmada, la factura queda emitida y no podrá modificarse. Solo podrá anularse mediante una Nota de Crédito.
                    </p>
                </div>

                <div className="flex flex-col gap-2">
                    <span className="text-sm font-bold text-stone-700">Total: {formatQ(invoice?.totalAmount)}</span>
                </div>

                <div className="flex flex-col gap-2">
                    <label className="app-modal-fieldLabel">Método de pago</label>
                    <select
                        className="app-modal-select"
                        value={paymentMethod}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                    >
                        {PAYMENT_METHODS.map((m) => (
                            <option key={m.value} value={m.value}>{m.label}</option>
                        ))}
                    </select>
                </div>

                <div className="app-modal-actions">
                    <button type="button" onClick={onClose} className="app-modal-btn app-modal-btnSecondary w-full sm:w-auto">
                        Cancelar
                    </button>
                    <button type="button" onClick={handleConfirm} disabled={loading} className="app-modal-btn app-modal-btnPrimary w-full sm:w-auto">
                        {loading ? "Procesando..." : "Confirmar y Emitir"}
                    </button>
                </div>
            </div>
        </Modal>
    );
};
