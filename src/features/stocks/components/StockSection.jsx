import { useEffect, useState } from "react";
import { useStocksStore } from "../store/adminStore";
import { StockModal } from "./StockModal";
import { showError } from "../../../shared/utils/toast";

export const StockSection = () => {
    const { stocks, loading, error, getStocks } = useStocksStore();
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        getStocks?.();
    }, [getStocks]);

    useEffect(() => {
        if (error) showError(error);
    }, [error]);

    const stockRows = stocks || [];
    const lowStockCount = stockRows.filter(s => s.quantity < s.minStock).length;

    return (
        <>
            <header className="header">
                <div>
                    <h2>Inventario por Sucursal</h2>
                    <p>Visualiza y gestiona el stock de ingredientes.</p>
                </div>
                <button className="btn success" style={{ backgroundColor: '#3b82f6', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer' }} type="button" onClick={() => setIsModalOpen(true)}>Asignar Stock</button>
            </header>
            <section className="section">
                <div className="top">
                    <p style={{ fontSize: "13px", color: "#6f6f78" }}>Monitor de existencias y alertas de bajo stock.</p>
                </div>
                <section className="kpis">
                    <article className="kpi"><span>Total registros</span><strong>{loading ? "Cargando..." : stockRows.length}</strong></article>
                    <article className="kpi"><span>Bajo mínimo</span><strong style={{ color: lowStockCount > 0 ? '#ef4444' : 'inherit' }}>{loading ? "..." : lowStockCount}</strong></article>
                    <article className="kpi"><span>Salud inventario</span><strong>{stockRows.length ? `${Math.round(((stockRows.length - lowStockCount) / stockRows.length) * 100)}%` : '0%'}</strong></article>
                </section>
                <div className="crud-cards-grid crud-cards-gridCompact">
                    {stockRows.map((stock) => {
                        const isLow = stock.quantity < stock.minStock;
                        return (
                            <article key={stock._id} className="crud-card crud-cardCompact crud-cardPost crud-cardDense">
                                <div className="crud-cardMedia crud-cardPostMedia" style={{ backgroundColor: isLow ? '#fee2e2' : '#f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100px', position: 'relative' }}>
                                    <i className="fas fa-boxes-stacked" style={{ fontSize: '3rem', color: isLow ? '#ef4444' : '#9ca3af' }}></i>
                                    {isLow && (
                                        <span style={{ position: 'absolute', top: '8px', right: '8px', backgroundColor: '#ef4444', color: 'white', fontSize: '10px', padding: '2px 6px', borderRadius: '4px', fontWeight: 'bold' }}>¡Bajo!</span>
                                    )}
                                </div>

                                <div className="crud-cardHeader">
                                    <div className="crud-cardTitleGroup">
                                        <span className="crud-cardEyebrow"><i className="fas fa-store"></i> {stock.branchId?.name || "Sucursal"}</span>
                                        <h3 className="crud-cardTitle">{stock.ingredientId?.name || "Ingrediente Desconocido"}</h3>
                                    </div>
                                    <span className="crud-cardBadge">{stock.ingredientId?.unit || "-"}</span>
                                </div>

                                <div className="crud-cardBody crud-cardPostBodyCols">
                                    <div className="crud-cardField">
                                        <span className="crud-cardFieldLabel">Cantidad Actual</span>
                                        <div className="crud-cardFieldValue" style={{ color: isLow ? '#ef4444' : 'inherit', fontWeight: isLow ? 'bold' : 'normal' }}>{stock.quantity}</div>
                                    </div>
                                    <div className="crud-cardField">
                                        <span className="crud-cardFieldLabel">Mínimo Requerido</span>
                                        <div className="crud-cardFieldValue">{stock.minStock}</div>
                                    </div>
                                </div>
                            </article>
                        );
                    })}
                </div>
            </section>

            <StockModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />

            <div className="toast-zone"></div>
        </>
    );
};
