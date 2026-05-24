import { useState, useEffect } from "react";
import { useInvoicesStore } from "../store/adminStore";
import { ConfirmarFacturaModal } from "./ConfirmarFacturaModal";
import { AnularFacturaModal } from "./AnularFacturaModal";
import { showError } from "../../../shared/utils/toast";

const STATUS_STYLE = {
    DRAFT:     { label: "Borrador",   bg: "#fef9c3", color: "#854d0e", icon: "fa-file-pen" },
    COMMITTED: { label: "Confirmada", bg: "#dcfce7", color: "#166534", icon: "fa-file-circle-check" },
    VOIDED:    { label: "Anulada",    bg: "#fee2e2", color: "#991b1b", icon: "fa-file-circle-xmark" },
};

export const FacturasSection = () => {
    const { invoices, loading, error, getInvoices } = useInvoicesStore();

    const [commitTarget, setCommitTarget] = useState(null);
    const [voidTarget, setVoidTarget] = useState(null);

    useEffect(() => { getInvoices(); }, [getInvoices]);
    useEffect(() => { if (error) showError(error); }, [error]);

    const drafts = invoices.filter((i) => i.status === "DRAFT").length;
    const committed = invoices.filter((i) => i.status === "COMMITTED").length;
    const voided = invoices.filter((i) => i.status === "VOIDED").length;

    const formatQ = (n) => typeof n === "number" ? `Q ${n.toFixed(2)}` : "—";

    return (
        <>
            <header className="header">
                <div className="space-y-1 px-1 pb-4 sm:px-0 sm:pb-5">
                    <div className="flex items-center gap-3">
                        <span className="h-6 w-1 rounded-full bg-linear-to-b from-orange-500 to-amber-500" />
                        <h2 className="text-2xl font-bold text-stone-900 tracking-tight sm:text-3xl">Facturación</h2>
                    </div>
                    <p className="text-stone-500 text-sm leading-relaxed mb-4 sm:mb-6 sm:text-base">Consulta, confirma y anula facturas del sistema.</p>
                </div>
            </header>

            <section className="section space-y-8">
                <div className="top mb-4 sm:mb-6">
                    <p style={{ fontSize: "13px", color: "#6f6f78" }}>
                        Las facturas se crean automáticamente al cerrar una orden. Aquí puedes confirmarlas o anularlas.
                    </p>
                </div>

                <section className="kpis">
                    <article className="kpi"><span>Total facturas</span><strong>{loading ? "..." : invoices.length}</strong></article>
                    <article className="kpi"><span>Borradores</span><strong style={{ color: "#854d0e" }}>{drafts}</strong></article>
                    <article className="kpi"><span>Confirmadas</span><strong style={{ color: "#166534" }}>{committed}</strong></article>
                    <article className="kpi"><span>Anuladas</span><strong style={{ color: "#991b1b" }}>{voided}</strong></article>
                </section>

                <div className="crud-cards-grid crud-cards-gridCompact">
                    {invoices.map((inv) => {
                        const s = STATUS_STYLE[inv.status] || {};
                        return (
                            <article key={inv._id} className="crud-card crud-cardCompact crud-cardPost">
                                <div className="crud-cardMedia crud-cardPostMedia">
                                    <div className="crud-cardMediaBox crud-cardMediaBoxIcon" style={{ backgroundColor: s.bg, color: s.color }}>
                                        <i className={`fas ${s.icon} crud-cardMediaIcon`} aria-hidden="true"></i>
                                    </div>
                                    <div className="crud-cardOverlayActions">
                                        {inv.status === "DRAFT" && (
                                            <button
                                                type="button"
                                                className="crud-cardAction crud-cardActionEdit crud-cardOverlayAction"
                                                aria-label="Confirmar factura"
                                                onClick={() => setCommitTarget(inv)}
                                            >
                                                <i className="fas fa-check"></i>
                                            </button>
                                        )}
                                        {inv.status === "COMMITTED" && (
                                            <button
                                                type="button"
                                                className="crud-cardAction crud-cardActionDelete crud-cardOverlayAction"
                                                aria-label="Anular factura"
                                                onClick={() => setVoidTarget(inv)}
                                            >
                                                <i className="fas fa-ban"></i>
                                            </button>
                                        )}
                                    </div>
                                </div>

                                <div className="crud-cardHeader">
                                    <div className="crud-cardTitleGroup">
                                        <span className="crud-cardEyebrow">
                                            <i className="fas fa-file-invoice-dollar"></i> {inv.invoiceNumber}
                                        </span>
                                        <h3 className="crud-cardTitle">{formatQ(inv.totalAmount)}</h3>
                                    </div>
                                    <span
                                        className="crud-cardBadge"
                                        style={{ backgroundColor: s.bg, color: s.color, border: `1px solid ${s.color}22` }}
                                    >
                                        {s.label}
                                    </span>
                                </div>

                                <div className="crud-cardBody crud-cardPostBodyCols">
                                    <div className="crud-cardField">
                                        <span className="crud-cardFieldLabel">Subtotal</span>
                                        <div className="crud-cardFieldValue">{formatQ(inv.subtotal)}</div>
                                    </div>
                                    <div className="crud-cardField">
                                        <span className="crud-cardFieldLabel">IVA ({((inv.taxRate || 0) * 100).toFixed(0)}%)</span>
                                        <div className="crud-cardFieldValue">{formatQ(inv.taxAmount)}</div>
                                    </div>
                                    <div className="crud-cardField">
                                        <span className="crud-cardFieldLabel">Método pago</span>
                                        <div className="crud-cardFieldValue">{inv.paymentMethod || "—"}</div>
                                    </div>
                                    <div className="crud-cardField">
                                        <span className="crud-cardFieldLabel">Fecha</span>
                                        <div className="crud-cardFieldValue">
                                            {inv.createdAt ? new Date(inv.createdAt).toLocaleDateString("es-GT") : "—"}
                                        </div>
                                    </div>
                                    {inv.voidReason && (
                                        <div className="crud-cardField col-span-full">
                                            <span className="crud-cardFieldLabel">Razón de anulación</span>
                                            <div className="crud-cardFieldValue text-red-700">{inv.voidReason}</div>
                                        </div>
                                    )}
                                    {/* Items snapshot */}
                                    {inv.itemsSnapshot && inv.itemsSnapshot.length > 0 && (
                                        <div className="crud-cardField col-span-full">
                                            <span className="crud-cardFieldLabel">Detalle</span>
                                            <div className="crud-cardFieldValue text-xs">
                                                {inv.itemsSnapshot.map((it, i) => (
                                                    <span key={i} className="block">
                                                        {it.quantity}× {it.menuItemName} — {formatQ(it.subtotal)}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </article>
                        );
                    })}
                </div>
            </section>

            <ConfirmarFacturaModal
                invoice={commitTarget}
                onClose={() => setCommitTarget(null)}
            />

            <AnularFacturaModal
                invoice={voidTarget}
                onClose={() => setVoidTarget(null)}
            />

            <div className="toast-zone"></div>
        </>
    );
};
