import { useEffect, useState } from "react";
import { useEffect as useToastEffect } from "react";

import { useMenusStore } from "../../menus/store/adminStore";
import { useUIStore } from "../../auth/store/uiStore";

import { showError } from "../../../shared/utils/toast";
import { spinner } from "@material-tailwind/react";
import { MenuModal } from "./MenuModal";
import { Modal } from "../../../shared/ui/Modal";

export const MenuSection = () => {
    const { menus, loading, error, getMenus, deleteMenu } = useMenusStore();
    const { openConfirm } = useUIStore();

    const [openModal, setOpenModal] = useState(false);
    const [selectedMenu, setSelectedMenu] = useState(null);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);

    useEffect(() => {
        getMenus?.();
    }, [getMenus]);

    useToastEffect(() => {
        if (error) showError(error);
    }, [error]);

    const handleDelete = async () => {
        try {
            if (selectedMenu?._id) {
                await deleteMenu?.(selectedMenu._id);
            }
            setIsDeleteOpen(false);
        } catch {
            setIsDeleteOpen(false);
        }
    };

    void spinner;
    void openConfirm;

    return (
        <>
            <header className="header">
                <div>
                    <h2>CRUD de Menu</h2>
                    <p>Organiza categorias, productos y disponibilidad de cocina.</p>
                </div>
                <button className="btn danger" type="button" onClick={() => setOpenModal(true)}>Nuevo producto</button>
            </header>

            <section className="section">
                <div className="top">
                    <p style={{ fontSize: "13px", color: "#6f6f78" }}>Gestion centralizada de productos y categorias del menu.</p>
                </div>

                <section className="kpis">
                    <article className="kpi"><span>Total productos</span><strong>Sin datos</strong></article>
                    <article className="kpi"><span>Disponibles</span><strong>Sin datos</strong></article>
                    <article className="kpi"><span>No disponibles</span><strong>Sin datos</strong></article>
                </section>

                <div style={{ overflowX: "auto" }}>
                    <table>
                        <thead>
                            <tr>
                                <th>Restaurante (restaurant)</th>
                                <th>Nombre (name)</th>
                                <th>Descripcion (description)</th>
                                <th>Ingredientes (ingredients)</th>
                                <th>Precio (price)</th>
                                <th>Categoria (category)</th>
                                <th>Imagen (image)</th>
                                <th>Activo (isActive)</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {(menus?.length ? menus : [
                                {
                                    _id: "sample-menu",
                                    restaurant: "Sin datos",
                                    name: "Pasta Alfredo",
                                    description: "Pasta cremosa con salsa Alfredo",
                                    ingredients: "Sin datos",
                                    price: "12.99",
                                    category: "Entrada",
                                    image: "Sin datos",
                                    isActive: true,
                                },
                            ]).map((menu) => (
                                <tr key={menu._id || menu.name}>
                                    <td>{menu.restaurant || "Sin datos"}</td>
                                    <td>{menu.name || "Sin datos"}</td>
                                    <td>{menu.description || "Sin datos"}</td>
                                    <td>{menu.ingredients || "Sin datos"}</td>
                                    <td>{menu.price || "00.00"}</td>
                                    <td>{menu.category || "Sin datos"}</td>
                                    <td>{menu.image || "Sin datos"}</td>
                                    <td>{menu.isActive ? "Activo" : "Inactivo"}</td>
                                    <td>
                                        <div className="row-actions">
                                            <button type="button" onClick={() => { setSelectedMenu(menu); setOpenModal(true); }}>Editar</button>
                                            <button type="button" onClick={() => { setSelectedMenu(menu); setIsDeleteOpen(true); }}>Eliminar</button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
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
