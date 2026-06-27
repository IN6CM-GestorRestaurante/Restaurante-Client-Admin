import { useState, useEffect } from "react";
import { Modal } from "../../../shared/ui/Modal";
import { useStocksStore } from "../store/adminStore";
import { showError } from "../../../shared/utils/toast";

const ACTION_COLORS = {
    STOCK_CREATED: { bg: "#e0f2fe", text: "#0369a1", label: "Creado" },
    STOCK_UPDATED: { bg: "#fef3c7", text: "#d97706", label: "Actualizado" },
    QUANTITY_ADJUSTED: { bg: "#dcfce7", text: "#15803d", label: "Cantidad Ajustada" },
    MIN_STOCK_CHANGED: { bg: "#f3e8ff", text: "#6b21a8", label: "Mínimo Cambiado" }
};

export const StockAuditLog = ({ isOpen, onClose, stock }) => {
    const getStockAuditLog = useStocksStore((state) => state.getStockAuditLog);
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!isOpen || !stock?._id) return;

        const loadLogs = async () => {
            setLoading(true);
            try {
                const data = await getStockAuditLog(stock._id);
                setLogs(data);
            } catch (err) {
                showError(err?.response?.data?.message || "Error al cargar historial de auditoría");
            } finally {
                setLoading(false);
            }
        };

        loadLogs();
    }, [isOpen, stock, getStockAuditLog]);

    const formatDateTime = (dateStr) => {
        if (!dateStr) return "";
        return new Date(dateStr).toLocaleString("es-GT", {
            year: "numeric",
            month: "short",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit"
        });
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Historial de Auditoría de Stock"
            subtitle={`Bitácora de cambios para: ${stock?.ingredientId?.name || "Ingrediente"} en sucursal ${stock?.branchId?.name || "Sucursal"}`}
        >
            <div className="space-y-4" style={{ minWidth: 'min(90vw, 700px)', maxHeight: '60vh', overflowY: 'auto' }}>
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-12 text-stone-400">
                        <i className="fas fa-spinner animate-spin text-3xl mb-3"></i>
                        <span className="text-sm font-semibold">Cargando registros de auditoría...</span>
                    </div>
                ) : logs.length === 0 ? (
                    <div className="text-center py-12 border border-dashed border-stone-200 rounded-2xl text-stone-400">
                        <i className="fas fa-history text-3xl mb-2 text-stone-300"></i>
                        <p className="text-sm font-bold">Sin registros de auditoría</p>
                        <p className="text-xs text-stone-400 mt-1">Este registro de stock no tiene historial de auditoría.</p>
                    </div>
                ) : (
                    <div className="relative border-l border-stone-200 ml-4 pl-6 space-y-6 py-2">
                        {logs.map((log) => {
                            const actStyle = ACTION_COLORS[log.action] || { bg: "#f3f4f6", text: "#374151", label: log.action };
                            return (
                                <div key={log._id} className="relative">
                                    {/* Circle Bullet */}
                                    <span className="absolute -left-[31px] top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-white border-2 border-orange-500 shadow-xs" />
                                    
                                    <div className="bg-white border border-stone-200/80 rounded-2xl p-4.5 shadow-xs transition hover:shadow-md hover:border-stone-300/50">
                                        <div className="flex flex-wrap items-center justify-between gap-2.5 mb-2.5">
                                            <div className="flex items-center gap-2">
                                                <span 
                                                    className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-lg"
                                                    style={{ backgroundColor: actStyle.bg, color: actStyle.text }}
                                                >
                                                    {actStyle.label}
                                                </span>
                                                <span className="text-[11px] text-stone-400 font-medium">
                                                    {formatDateTime(log.performedAt)}
                                                </span>
                                            </div>
                                            <span className="text-[10px] text-stone-400 font-semibold flex items-center gap-1">
                                                <i className="fas fa-desktop text-[9px]"></i> {log.ipAddress || "0.0.0.0"}
                                            </span>
                                        </div>

                                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-stone-600 mb-3 bg-stone-50 border border-stone-100 px-3 py-2 rounded-xl">
                                            <span>
                                                <i className="fas fa-user-tie text-orange-500 mr-1.5"></i>
                                                Usuario: <strong className="text-stone-800">{log.actorName}</strong> ({log.actorRole})
                                            </span>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4 text-center mb-3">
                                            <div className="border border-stone-100 rounded-xl p-2.5 bg-stone-50/50">
                                                <span className="block text-[9px] font-extrabold uppercase text-stone-400 tracking-wider mb-1">Cantidad</span>
                                                <div className="text-xs font-black text-stone-700">
                                                    {log.details?.previousQuantity ?? 0} &rarr; <span className="text-orange-600">{log.details?.newQuantity ?? 0}</span>
                                                </div>
                                            </div>
                                            <div className="border border-stone-100 rounded-xl p-2.5 bg-stone-50/50">
                                                <span className="block text-[9px] font-extrabold uppercase text-stone-400 tracking-wider mb-1">Stock Mínimo</span>
                                                <div className="text-xs font-black text-stone-700">
                                                    {log.details?.previousMinStock ?? 0} &rarr; <span className="text-orange-600">{log.details?.newMinStock ?? 0}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="border-t border-stone-100 pt-3">
                                            <span className="block text-[9px] font-extrabold uppercase text-stone-450 tracking-wider mb-1">Motivo del Cambio</span>
                                            <p className="text-xs italic text-stone-700 font-medium">
                                                &ldquo;{log.details?.reason || "Sin motivo especificado"}&rdquo;
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </Modal>
    );
};
