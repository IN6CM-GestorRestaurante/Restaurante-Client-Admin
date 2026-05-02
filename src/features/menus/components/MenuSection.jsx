import { useEffect, useState } from "react";
import { useEffect as useToastEffect } from "react";

import { useMenusStore } from "../../menus/store/adminStore";
import { useUIStore } from "../../auth/store/uiStore";

import { showError } from "../../../shared/utils/toast";
import { spinner } from "@material-tailwind/react";
import { MenuModal } from "./MenuModal";

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

    return (
        <>
            <header className="header">
                <div>
                    <h2>CRUD de Menu</h2>
                    <p>Organiza categorias, productos y disponibilidad de cocina.</p>
                </div>
                <button className="btn danger" type="button" onClick={() => setIsCreateOpen(true)}>Nuevo producto</button>
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

                <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gradient-to-r from-blue-50 to-blue-100 border-b border-gray-200">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Nombre</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Descripción</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Categoría</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Precio</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Estado</th>
                                    <th className="px-6 py-3 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                <tr className="hover:bg-blue-50 transition-colors duration-200">
                                    <td className="px-6 py-4">
                                        <p className="text-sm font-semibold text-gray-900">Pasta Alfredo</p>
                                    </td>
                                    <td className="px-6 py-4">
                                        <p className="text-sm text-gray-700">Pasta cremosa con salsa Alfredo</p>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                                            Entrada
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <p className="text-sm font-semibold text-green-600">$12.99</p>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                            ✓ Activo
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex justify-center gap-2">
                                            <button type="button" onClick={() => { setSelectedMenu({ name: "Pasta Alfredo" }); setOpenModal(true); }} className="inline-flex items-center px-3 py-1.5 bg-blue-500 text-white text-xs font-medium rounded-lg hover:bg-blue-600 transition-colors duration-200">
                                                <i className="fa-solid fa-pencil mr-1.5"></i> Editar
                                            </button>
                                            <button type="button" onClick={() => setIsDeleteOpen(true)} className="inline-flex items-center px-3 py-1.5 bg-red-500 text-white text-xs font-medium rounded-lg hover:bg-red-600 transition-colors duration-200">
                                                <i className="fa-solid fa-trash mr-1.5"></i> Eliminar
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {openModal ? (
                <MenuModal
                    initialData={selectedMenu}
                    onClose={() => {
                        setOpenModal(false);
                        setSelectedMenu(null);
                    }}
                />
            ) : null}

            {isDeleteOpen ? (
                <div className="modal">
                    <div className="modal-card">
                        <h2 style={{ fontSize: "18px", marginBottom: "10px" }}>Eliminar producto</h2>
                        <p className="confirm-text">El producto seleccionado sera eliminado. ¿Deseas continuar?</p>
                        <div className="row">
                            <button className="btn soft" type="button" onClick={() => setIsDeleteOpen(false)}>Cancelar</button>
                            <button className="btn danger" type="button" onClick={() => setIsDeleteOpen(false)}>Eliminar</button>
                        </div>
                    </div>
                </div>
            ) : null}

            <div className="toast-zone"></div>
        </>
    );
};