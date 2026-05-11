import { useEffect, useState } from "react";
import { useIngredientsStore } from "../store/adminStore";
import { IngredienteModal } from "./IngredienteModal";
import { Modal } from "../../../shared/ui/Modal";
import { showError, showSuccess } from "../../../shared/utils/toast";

export const IngredientesSection = () => {
    const { ingredients, loading, error, getIngredients, deleteIngredient } = useIngredientsStore();
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [selectedIngredient, setSelectedIngredient] = useState(null);

    useEffect(() => {
        getIngredients?.();
    }, [getIngredients]);

    useEffect(() => {
        if (error) showError(error);
    }, [error]);

    const handleCreate = () => {
        setSelectedIngredient(null);
        setIsCreateOpen(true);
    };

    const handleEdit = (ingredient) => {
        setSelectedIngredient(ingredient);
        setIsCreateOpen(true);
    };

    const handleDelete = async () => {
        try {
            if (selectedIngredient?._id) {
                await deleteIngredient?.(selectedIngredient._id);
                showSuccess("Ingrediente eliminado");
            }
        } catch {
            showError("Error al eliminar ingrediente");
        } finally {
            setIsDeleteOpen(false);
            setSelectedIngredient(null);
        }
    };

    const ingredientRows = (ingredients || []).filter((ingredient) => ingredient?.isActive !== false);

    return (
        <>
            <header className="header">
                <div>
                    <h2>CRUD de Ingredientes</h2>
                    <p>Administra el catálogo de ingredientes y sus costos.</p>
                </div>
                <button className="btn success" style={{ backgroundColor: '#10b981', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer' }} type="button" onClick={handleCreate}>Nuevo ingrediente</button>
            </header>
            <section className="section">
                <div className="top">
                    <p style={{ fontSize: "13px", color: "#6f6f78" }}>Catálogo maestro de insumos.</p>
                </div>
                <section className="kpis">
                    <article className="kpi"><span>Total ingredientes</span><strong>{loading ? "Cargando..." : ingredientRows.length || "0"}</strong></article>
                    <article className="kpi"><span>Activos</span><strong>{loading ? "Cargando..." : ingredientRows.length || "0"}</strong></article>
                    <article className="kpi"><span>Stock bajo</span><strong>0</strong></article>
                </section>
                <div className="crud-cards-grid crud-cards-gridCompact">
                    {ingredientRows.map((ingredient) => (
                        <article key={ingredient._id} className="crud-card crud-cardCompact crud-cardPost crud-cardDense">
                            <div className="crud-cardMedia crud-cardPostMedia" style={{ backgroundColor: '#d1fae5', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100px', position: 'relative' }}>
                                <i className="fas fa-carrot" style={{ fontSize: '3rem', color: '#10b981' }}></i>
                                <div className="crud-cardOverlayActions">
                                    <button
                                        type="button"
                                        className="crud-cardAction crud-cardActionEdit crud-cardOverlayAction"
                                        aria-label="Editar ingrediente"
                                        onClick={() => handleEdit(ingredient)}
                                    >
                                        <i className="fas fa-pen-to-square"></i>
                                    </button>
                                    <button
                                        type="button"
                                        className="crud-cardAction crud-cardActionDelete crud-cardOverlayAction"
                                        aria-label="Eliminar ingrediente"
                                        onClick={() => {
                                            setSelectedIngredient(ingredient);
                                            setIsCreateOpen(false);
                                            setIsDeleteOpen(true);
                                        }}
                                    >
                                        <i className="fas fa-trash"></i>
                                    </button>
                                </div>
                            </div>

                            <div className="crud-cardHeader">
                                <div className="crud-cardTitleGroup">
                                    <span className="crud-cardEyebrow"><i className="fas fa-box"></i> Insumo</span>
                                    <h3 className="crud-cardTitle">{ingredient.name}</h3>
                                </div>
                                <span className="crud-cardBadge">{ingredient.isActive !== false ? "Activo" : "Inactivo"}</span>
                            </div>

                            <div className="crud-cardBody crud-cardPostBodyCols">
                                <div className="crud-cardField">
                                    <span className="crud-cardFieldLabel">Unidad de Medida</span>
                                    <div className="crud-cardFieldValue">{ingredient.unit}</div>
                                </div>
                                <div className="crud-cardField">
                                    <span className="crud-cardFieldLabel">Costo Unitario</span>
                                    <div className="crud-cardFieldValue">${Number(ingredient.costPrice).toFixed(2)}</div>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </section>

            <IngredienteModal
                isOpen={isCreateOpen}
                initialData={selectedIngredient}
                onClose={() => {
                    setIsCreateOpen(false);
                    setSelectedIngredient(null);
                }}
            />

            <Modal
                isOpen={isDeleteOpen}
                onClose={() => setIsDeleteOpen(false)}
                title="Eliminar ingrediente"
                subtitle="Confirma la eliminación del registro"
                compact
            >
                <p className="text-sm leading-6 text-slate-700">El ingrediente seleccionado será desactivado. ¿Deseas continuar?</p>
                <div className="app-modal-actions">
                    <button type="button" onClick={() => setIsDeleteOpen(false)} className="app-modal-btn app-modal-btnSecondary w-full sm:w-auto">Cancelar</button>
                    <button type="button" onClick={handleDelete} className="app-modal-btn app-modal-btnPrimary w-full sm:w-auto">Eliminar</button>
                </div>
            </Modal>

            <div className="toast-zone"></div>
        </>
    );
};
