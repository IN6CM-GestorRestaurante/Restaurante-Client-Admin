import { useState, useEffect } from "react";
import { useOrdersStore } from "../store/adminStore";
import { useLocationsStore } from "../../locations/store/adminStore";
import { useAuthStore } from "../../auth/store/authStore";
import { NuevaOrdenModal } from "./NuevaOrdenModal";
import { AuditoriaModal } from "./AuditoriaModal";
import { Modal } from "../../../shared/ui/Modal";
import { showError, showSuccess } from "../../../shared/utils/toast";

const ITEM_STATUS_STYLE = {
    "pending":    { label: "Pendiente",  bg: "#fef9c3", color: "#854d0e", icon: "fa-clock" },
    "in-kitchen": { label: "En cocina",  bg: "#ffedd5", color: "#9a3412", icon: "fa-fire-burner" },
    "ready":      { label: "Listo",      bg: "#dcfce7", color: "#166534", icon: "fa-check" },
    "delivered":  { label: "Servido",    bg: "#dbeafe", color: "#1e40af", icon: "fa-utensils" },
    "paid":       { label: "Pagado",     bg: "#e0e7ff", color: "#3730a3", icon: "fa-coins" },
    "cancelled":  { label: "Cancelado",  bg: "#fee2e2", color: "#991b1b", icon: "fa-ban" },
};

const NEXT_STATUS = {
    "pending":    "in-kitchen",
    "in-kitchen": "ready",
    "ready":      "delivered",
    "delivered":  "paid",
};

const NEXT_LABEL = {
    "pending":    "Enviar a cocina",
    "in-kitchen": "Marcar listo",
    "ready":      "Marcar servido",
    "delivered":  "Marcar pagado",
};

export const OrdenesSection = () => {
    const user = useAuthStore((s) => s.user);
    const role = user?.role;

    const { orders, loading, error, getOrders, updateItemStatus, updateOrderStatus } = useOrdersStore();
    const branches = useLocationsStore((s) => s.locations);
    const getBranches = useLocationsStore((s) => s.getLocations);

    const [selectedBranch, setSelectedBranch] = useState("");
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [auditOrderId, setAuditOrderId] = useState(null);
    const [cancelOrderId, setCancelOrderId] = useState(null);

    // Cargar sucursales al montar
    useEffect(() => { getBranches?.(); }, [getBranches]);

    // Si el usuario tiene branchId, usarla; si es admin, esperar selección
    useEffect(() => {
        if (user?.branchId) {
            setSelectedBranch(user.branchId);
        }
    }, [user]);

    // Cargar órdenes cuando cambie la sucursal
    useEffect(() => {
        if (selectedBranch) getOrders({ branchId: selectedBranch });
    }, [selectedBranch, getOrders]);

    useEffect(() => { if (error) showError(error); }, [error]);

    const handleItemStatusChange = async (orderId, itemId, nextStatus) => {
        try {
            await updateItemStatus(orderId, itemId, { status: nextStatus });
            showSuccess(`Ítem → ${ITEM_STATUS_STYLE[nextStatus]?.label}`);
        } catch (err) {
            showError(err?.response?.data?.message || err?.message || "Error");
        }
    };

    const handleCancelOrder = async () => {
        try {
            await updateOrderStatus(cancelOrderId, { status: "cancelled" });
            showSuccess("Orden cancelada");
        } catch (err) {
            showError(err?.response?.data?.message || "Error al cancelar");
        } finally {
            setCancelOrderId(null);
        }
    };

    const canManage = ["SUPER_ADMIN", "ADMIN_ROLE", "COMPANY_ADMIN", "BRANCH_MANAGER"].includes(role);
    const canCreateOrder = ["WAITER", "WAITRESS", "BRANCH_MANAGER", "COMPANY_ADMIN"].includes(role);

    const pending = orders.filter((o) => o.status === "pending").length;
    const inKitchen = orders.filter((o) => o.status === "in-kitchen").length;
    const ready = orders.filter((o) => o.status === "ready").length;

    const formatTotal = (n) => typeof n === "number" ? `Q ${n.toFixed(2)}` : "—";

    return (
        <>
            <header className="header">
                <div className="space-y-1 px-1 pb-4 sm:px-0 sm:pb-5">
                    <div className="flex items-center gap-3">
                        <span className="h-6 w-1 rounded-full bg-linear-to-b from-orange-500 to-amber-500" />
                        <h2 className="text-2xl font-bold text-stone-900 tracking-tight sm:text-3xl">Comandas Activas</h2>
                    </div>
                    <p className="text-stone-500 text-sm leading-relaxed mb-4 sm:mb-6 sm:text-base">Gestiona flujo de cocina, entrega y atención en salón.</p>
                </div>
                <div className="flex items-center gap-3">
                    {/* Selector de sucursal para admins */}
                    {canManage && (
                        <select
                            className="app-modal-select"
                            style={{ minWidth: 180 }}
                            value={selectedBranch}
                            onChange={(e) => setSelectedBranch(e.target.value)}
                        >
                            <option value="">Seleccionar sucursal</option>
                            {(branches || []).map((b) => (
                                <option key={b._id} value={b._id}>{b.name}</option>
                            ))}
                        </select>
                    )}
                    {canCreateOrder && (
                        <button className="btn danger" type="button" onClick={() => setIsCreateOpen(true)}>
                            Nueva orden
                        </button>
                    )}
                </div>
            </header>

            <section className="section space-y-8">
                <section className="kpis">
                    <article className="kpi"><span>Total activas</span><strong>{loading ? "..." : orders.length}</strong></article>
                    <article className="kpi"><span>Pendientes</span><strong style={{ color: "#854d0e" }}>{pending}</strong></article>
                    <article className="kpi"><span>En cocina</span><strong style={{ color: "#9a3412" }}>{inKitchen}</strong></article>
                    <article className="kpi"><span>Listas</span><strong style={{ color: "#166534" }}>{ready}</strong></article>
                </section>

                {!selectedBranch && (
                    <p className="text-center text-sm text-stone-400 py-12">Selecciona una sucursal para ver las órdenes.</p>
                )}

                <div className="crud-cards-grid crud-cards-gridCompact">
                    {orders.map((order) => {
                        const orderStyle = ITEM_STATUS_STYLE[order.status] || {};
                        const tables = Array.isArray(order.tables)
                            ? order.tables.map((t) => t.number || t).join(", ")
                            : "—";
                        const waiterName = order.waiter
                            ? `${order.waiter.name || ""} ${order.waiter.surname || ""}`.trim()
                            : "—";

                        return (
                            <article key={order._id} className="crud-card crud-cardCompact crud-cardPost">
                                <div className="crud-cardMedia crud-cardPostMedia">
                                    <div className="crud-cardMediaBox crud-cardMediaBoxIcon crud-cardMediaThemeOrders">
                                        <i className="fas fa-receipt crud-cardMediaIcon" aria-hidden="true"></i>
                                    </div>
                                    <div className="crud-cardOverlayActions">
                                        {canManage && (
                                            <button
                                                type="button"
                                                className="crud-cardAction crud-cardActionEdit crud-cardOverlayAction"
                                                aria-label="Ver auditoría"
                                                onClick={() => setAuditOrderId(order._id)}
                                            >
                                                <i className="fas fa-clipboard-list"></i>
                                            </button>
                                        )}
                                        {canManage && !["paid", "cancelled"].includes(order.status) && (
                                            <button
                                                type="button"
                                                className="crud-cardAction crud-cardActionDelete crud-cardOverlayAction"
                                                aria-label="Cancelar orden"
                                                onClick={() => setCancelOrderId(order._id)}
                                            >
                                                <i className="fas fa-ban"></i>
                                            </button>
                                        )}
                                    </div>
                                </div>

                                <div className="crud-cardHeader">
                                    <div className="crud-cardTitleGroup">
                                        <span className="crud-cardEyebrow">
                                            <i className="fas fa-chair"></i> Mesa {tables}
                                        </span>
                                        <h3 className="crud-cardTitle">{formatTotal(order.total)}</h3>
                                    </div>
                                    <span
                                        className="crud-cardBadge"
                                        style={{ backgroundColor: orderStyle.bg, color: orderStyle.color, border: `1px solid ${orderStyle.color}22` }}
                                    >
                                        <i className={`fas ${orderStyle.icon} mr-1`}></i>
                                        {orderStyle.label || order.status}
                                    </span>
                                </div>

                                <div className="crud-cardBody" style={{ padding: "0 16px 16px" }}>
                                    <p className="text-xs text-stone-500 mb-2">
                                        <i className="fas fa-user-tie mr-1"></i>{waiterName}
                                        <span className="ml-3 text-stone-400">
                                            {order.createdAt ? new Date(order.createdAt).toLocaleTimeString("es-GT", { hour: "2-digit", minute: "2-digit" }) : ""}
                                        </span>
                                    </p>

                                    {/* Items de la orden */}
                                    <div className="flex flex-col gap-2">
                                        {(order.items || []).map((item) => {
                                            const s = ITEM_STATUS_STYLE[item.status] || {};
                                            const next = NEXT_STATUS[item.status];
                                            const menuName = item.menuItem?.name || item.menuItem || "Platillo";
                                            return (
                                                <div
                                                    key={item._id}
                                                    className="flex items-center justify-between gap-2 rounded-lg px-3 py-2"
                                                    style={{ backgroundColor: s.bg + "66", border: `1px solid ${s.color}22` }}
                                                >
                                                    <div className="flex-1 min-w-0">
                                                        <span className="text-sm font-semibold text-stone-800 block truncate">
                                                            {item.quantity}× {menuName}
                                                        </span>
                                                        <span className="text-xs" style={{ color: s.color }}>
                                                            <i className={`fas ${s.icon} mr-1`}></i>{s.label}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center gap-2 shrink-0">
                                                        <span className="text-xs font-bold text-stone-600">
                                                            {formatTotal(item.priceAtTime * item.quantity)}
                                                        </span>
                                                        {next && (
                                                            <button
                                                                type="button"
                                                                onClick={() => handleItemStatusChange(order._id, item._id, next)}
                                                                className="text-xs font-semibold px-2 py-1 rounded-md transition"
                                                                style={{ backgroundColor: ITEM_STATUS_STYLE[next]?.bg, color: ITEM_STATUS_STYLE[next]?.color, border: `1px solid ${ITEM_STATUS_STYLE[next]?.color}33` }}
                                                                title={NEXT_LABEL[item.status]}
                                                            >
                                                                {NEXT_LABEL[item.status]}
                                                            </button>
                                                        )}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </article>
                        );
                    })}
                </div>
            </section>

            {/* Modal Nueva Orden */}
            <NuevaOrdenModal
                isOpen={isCreateOpen}
                branchId={selectedBranch}
                onClose={() => setIsCreateOpen(false)}
            />

            {/* Modal Auditoría */}
            <AuditoriaModal
                orderId={auditOrderId}
                onClose={() => setAuditOrderId(null)}
            />

            {/* Modal Cancelar Orden */}
            <Modal
                isOpen={!!cancelOrderId}
                onClose={() => setCancelOrderId(null)}
                title="Cancelar orden"
                subtitle="Esta acción no se puede deshacer"
                compact
            >
                <p className="text-sm leading-6 text-slate-700">¿Estás seguro de que deseas cancelar esta orden?</p>
                <div className="app-modal-actions">
                    <button type="button" onClick={() => setCancelOrderId(null)} className="app-modal-btn app-modal-btnSecondary w-full sm:w-auto">No, volver</button>
                    <button type="button" onClick={handleCancelOrder} className="app-modal-btn app-modal-btnPrimary w-full sm:w-auto">Sí, cancelar</button>
                </div>
            </Modal>

            <div className="toast-zone"></div>
        </>
    );
};
