import { useEffect, useState } from "react";
import { useEffect as useToastEffect } from "react";

import { useSucursalesStore } from "../../users/store/adminStore";
import { useUIStore } from "../../auth/store/uiStore";

import { showError } from "../../../shared/utils/toast"
import { spinner } from "@material-tailwind/react";
import { FieldModal } from "./SucursalModal";


export const SucursalesSection = () => {
    const { sucursales, loading, error, getSucursales } = useSucursalesStore();
    const { openConfirm } = useUIStore();

    const [openModal, setOpenModal] = useState(false);
    const [selectField, setSelectField] = useState(null);

    useEffect(()=>{
        getSucursales();
    }, [getSucursales]);

    useToastEffect(() => {
        if (error) showError(error);
    }, [error]);

    return (
        <>
            <header className="header">
                <div>
                    <h2>CRUD de Sucursales</h2>
                    <p>Administra sedes, responsable y estado operativo.</p>
                </div>
                <button className="btn danger" type="button" onClick={() => setOpenModal(true)}>Nueva sucursal</button>
            </header>
            <section className="section">
                <div className="top">
                    <p style={{ fontSize: "13px", color: "#6f6f78" }}>Gestion centralizada de sedes del restaurante.</p>
                </div>
                <section className="kpis">
                    <article className="kpi"><span>Total sucursales</span><strong>Sin datos</strong></article>
                    <article className="kpi"><span>Operativas</span><strong>Sin datos</strong></article>
                    <article className="kpi"><span>En mantenimiento</span><strong>Sin datos</strong></article>
                </section>
                <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-linear-to-r from-blue-50 to-blue-100 border-b border-gray-200">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Nombre</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Dirección</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Horario</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Contacto</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Precio Promedio</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Estado</th>
                                    <th className="px-6 py-3 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                <tr className="hover:bg-blue-50 transition-colors duration-200">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center">
                                            <div>
                                                <p className="text-sm font-semibold text-gray-900">Sucursal Centro</p>
                                                <p className="text-xs text-gray-500">Casera</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <p className="text-sm text-gray-700">Avenida principal 123</p>
                                    </td>
                                    <td className="px-6 py-4">
                                        <p className="text-sm text-gray-700">08:00 - 22:00</p>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm">
                                            <p className="text-gray-700">info@restaurante.com</p>
                                            <p className="text-gray-600">+50212345678</p>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <p className="text-sm font-semibold text-green-600">$00.00</p>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                            ✓ Operativa
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex justify-center">
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    const sample = {
                                                        name: "Sucursal Centro",
                                                        descripcion: "Sin datos",
                                                        address: "Avenida principal 123",
                                                        openingTime: "08:00",
                                                        closingTime: "22:00",
                                                        category: "Casera",
                                                        averagePrice: "00.00",
                                                        email: "info@restaurante.com",
                                                        phoneNumber: "+50212345678",
                                                        state: "Operativa",
                                                    };
                                                    setSelectedLocation(sample);
                                                    setOpenModal(true);
                                                }}
                                                className="inline-flex items-center px-3 py-1.5 bg-blue-500 text-white text-xs font-medium rounded-lg hover:bg-blue-600 transition-colors duration-200"
                                            >
                                                <i className="fa-solid fa-pencil mr-1.5"></i> Editar
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
                <SucursalModal
                    initialData={selectedLocation}
                    onClose={() => {
                        setOpenModal(false);
                        setSelectedLocation(null);
                    }}
                />
            ) : null}

            <div className="toast-zone"></div>
        </>
    );
};