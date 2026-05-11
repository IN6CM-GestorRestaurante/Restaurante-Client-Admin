import { useEffect, useState } from "react";
import { useEffect as useToastEffect } from "react";

import { useMenusStore } from "../../menus/store/adminStore";

import { showError } from "../../../shared/utils/toast";
import { MenuModal } from "./MenuModal";
import { Modal } from "../../../shared/ui/Modal";

export const MenuSection = () => {
    const { menus, loading, error, getMenus, deleteMenu } = useMenusStore();

    const [openModal, setOpenModal] = useState(false);
    const [selectedMenu, setSelectedMenu] = useState(null);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);

    const handleDelete = async () => {
        try {
            if (selectedMenu?._id) {
                await deleteMenu?.(selectedMenu._id);
            }
        } catch {
            // store handles error
        } finally {
            setIsDeleteOpen(false);
            setSelectedMenu(null);
        }
    };

    useEffect(() => {
        getMenus?.();
    }, [getMenus]);

    useToastEffect(() => {
        if (error) showError(error);
    }, [error]);

    return (
        <>
            <header className="header">
                <div>
                    <h2>CRUD de Menu</h2>
                    <p>Organiza categorias, productos y combos del menú.</p>
                </div>
                <button className="btn danger" type="button" onClick={() => setOpenModal(true)}>Nuevo producto</button>
            </header>

            <section className="section">
                <div className="top">
                    <p style={{ fontSize: "13px", color: "#6f6f78" }}>Gestion centralizada de productos y categorias del menu.</p>
                </div>

                <section className="kpis">
                    <article className="kpi"><span>Total productos</span><strong>{loading ? "Cargando..." : menus.length}</strong></article>
                    <article className="kpi"><span>Disponibles</span><strong>{menus.filter((menu) => menu.isActive !== false).length}</strong></article>
                    <article className="kpi"><span>Combos</span><strong>{menus.filter((menu) => menu.itemType === "COMBO").length}</strong></article>
                </section>

                <div className="crud-cards-grid crud-cards-gridCompact">
                    {(menus?.length ? menus : []).map((menu) => {
                        const hasImage = !!(menu.image && menu.image !== "Sin datos" && menu.image !== "");
                        const isPromoActive = menu.promotion?.isActive;
                        const displayPrice = menu.effectivePrice ?? menu.price;

                        return (
                        <article key={menu._id || menu.name} className="crud-card crud-cardCompact crud-cardPost crud-cardDense">
                            <div className="crud-cardMedia crud-cardPostMedia" style={{ minHeight: '120px', backgroundColor: '#f3f4f6' }}>
                                <div className="crud-cardMediaBox crud-cardMediaBoxPhoto" style={{ height: '100%', width: '100%' }}>
                                    {hasImage ? (
                                        <img className="crud-cardMediaImage" src={menu.image} alt={`Imagen de ${menu.name || "producto"}`} style={{ height: '100%', width: '100%', objectFit: 'cover' }} />
                                    ) : (
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#9ca3af' }}>
                                            <i className="fas fa-utensils" style={{ fontSize: '2rem' }}></i>
                                        </div>
                                    )}
                                </div>
                                <div className="crud-cardOverlayActions">
                                    <button
                                        type="button"
                                        className="crud-cardAction crud-cardActionEdit crud-cardOverlayAction"
                                        aria-label="Editar producto"
                                        onClick={() => { setSelectedMenu(menu); setOpenModal(true); }}
                                    >
                                        <i className="fas fa-pen-to-square"></i>
                                    </button>
                                    <button
                                        type="button"
                                        className="crud-cardAction crud-cardActionDelete crud-cardOverlayAction"
                                        aria-label="Eliminar producto"
                                        onClick={() => { setSelectedMenu(menu); setIsDeleteOpen(true); }}
                                    >
                                        <i className="fas fa-trash"></i>
                                    </button>
                                </div>
                                <div style={{ position: 'absolute', top: '8px', left: '8px', display: 'flex', gap: '4px', flexDirection: 'column' }}>
                                    <span style={{ backgroundColor: menu.itemType === 'COMBO' ? '#8b5cf6' : '#3b82f6', color: 'white', fontSize: '10px', padding: '2px 6px', borderRadius: '4px', fontWeight: 'bold', width: 'fit-content' }}>
                                        {menu.itemType === 'COMBO' ? 'COMBO' : 'SINGLE'}
                                    </span>
                                    {isPromoActive && (
                                        <span style={{ backgroundColor: '#ef4444', color: 'white', fontSize: '10px', padding: '2px 6px', borderRadius: '4px', fontWeight: 'bold', width: 'fit-content' }}>
                                            🏷️ Promo
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div className="crud-cardHeader">
                                <div className="crud-cardTitleGroup">
                                    <span className="crud-cardEyebrow"><i className="fas fa-tag"></i> {menu.category || "Producto"}</span>
                                    <h3 className="crud-cardTitle">{menu.name || "Sin datos"}</h3>
                                </div>
                                <span className="crud-cardBadge">{menu.isActive ? "Activo" : "Inactivo"}</span>
                            </div>

                            <div className="crud-cardBody crud-cardPostBodyCols">
                                <div className="crud-cardField">
                                    <span className="crud-cardFieldLabel">Restaurante</span>
                                    <div className="crud-cardFieldValue">{menu.branch?.name || menu.branch || "Sin datos"}</div>
                                </div>
                                <div className="crud-cardField">
                                    <span className="crud-cardFieldLabel">Precio</span>
                                    <div className="crud-cardFieldValue" style={{ fontWeight: 'bold', color: isPromoActive ? '#ef4444' : 'inherit' }}>
                                        ${Number(displayPrice).toFixed(2)}
                                        {isPromoActive && <span style={{ textDecoration: 'line-through', color: '#9ca3af', fontSize: '11px', marginLeft: '4px' }}>${Number(menu.price).toFixed(2)}</span>}
                                    </div>
                                </div>
                                <div className="crud-cardField" style={{ gridColumn: 'span 2' }}>
                                    <span className="crud-cardFieldLabel">Descripción</span>
                                    <div className="crud-cardFieldValue" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{menu.description || "Sin datos"}</div>
                                </div>
                            </div>
                        </article>
                    )})}
                </div>
            </section>

            <MenuModal
                isOpen={openModal}
                initialData={selectedMenu}
                onClose={() => {
                    setOpenModal(false);
                    setSelectedMenu(null);
                }}
            />

            <Modal
                isOpen={isDeleteOpen}
                onClose={() => setIsDeleteOpen(false)}
                title="Eliminar producto"
                subtitle="Confirma la eliminación del registro"
                compact
            >
                <p className="text-sm leading-6 text-slate-700">El producto seleccionado sera eliminado. ¿Deseas continuar?</p>
                <div className="app-modal-actions">
                    <button type="button" onClick={() => setIsDeleteOpen(false)} className="app-modal-btn app-modal-btnSecondary w-full sm:w-auto">Cancelar</button>
                    <button type="button" onClick={handleDelete} className="app-modal-btn app-modal-btnPrimary w-full sm:w-auto">Eliminar</button>
                </div>
            </Modal>

            <div className="toast-zone"></div>
        </>
    );
};
