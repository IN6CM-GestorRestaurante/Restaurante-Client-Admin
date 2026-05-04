import { useEffect, useState } from "react";
import { useEffect as useToastEffect } from "react";
import { useTablesStore } from "../../tables/store/adminStore";
import { showError } from "../../../shared/utils/toast";
import { TableModal } from "./TableModal";
import { useModal } from "../../../shared/ui/hooks/useModal";
import { Modal } from "../../../shared/ui/Modal";

export const MesasSection = () => {
    const { tables, loading, error, getTables, deleteTable } = useTablesStore();
    const { isOpen: openModal, openModal: setOpenModalTrue, closeModal: setOpenModalFalse } = useModal(false);
    const { isOpen: isDeleteOpen, openModal: setDeleteOpenTrue, closeModal: setDeleteOpenFalse } = useModal(false);
    const [selectedTable, setSelectedTable] = useState(null);

    useEffect(() => {
        getTables?.();
    }, [getTables]);

    useToastEffect(() => {
        if (error) showError(error);
    }, [error]);

    const handleDelete = async () => {
        try {
            if (selectedTable?._id) {
                await deleteTable?.(selectedTable._id);
            }
        } finally {
            setDeleteOpenFalse();
            setSelectedTable(null);
        }
    };

    const tableRows = tables?.length
        ? tables
        : [{
            _id: "sample-table",
            restaurant: "Sin datos",
            number: "Sin datos",
            capacity: "Sin datos",
            location: "Sala Principal",
            status: "Disponible",
            availabilitySchedules: "Lunes 08:00-22:00",
            description: "Sin datos",
        }];

    return (
        <>
            <header className="header">
                <div>
                    <h2>CRUD de Mesas</h2>
                    <p>Configura zonas, estado y disponibilidad de mesas.</p>
                </div>
                <button className="btn danger" type="button" onClick={() => { setSelectedTable(null); setOpenModalTrue(); }}>Nueva mesa</button>
            </header>

            <section className="section">
                <div className="top">
                    <p style={{ fontSize: "13px", color: "#6f6f78" }}>Gestion centralizada de mesas y zonas del restaurante.</p>
                </div>

                <section className="kpis">
                    <article className="kpi"><span>Total mesas</span><strong>{loading ? "Cargando..." : (tables?.length ?? "Sin datos")}</strong></article>
                    <article className="kpi"><span>Disponibles</span><strong>Sin datos</strong></article>
                    <article className="kpi"><span>Fuera de servicio</span><strong>Sin datos</strong></article>
                </section>

                <div style={{ overflowX: "auto" }}>
                    <table>
                        <thead>
                            <tr>
                                <th>Restaurante (restaurant)</th>
                                <th>Numero (number)</th>
                                <th>Capacidad (capacity)</th>
                                <th>Ubicacion (location)</th>
                                <th>Estado (status)</th>
                                <th>Horarios (availabilitySchedules)</th>
                                <th>Descripcion (description)</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableRows.map((table) => (
                                <tr key={table._id || table.number}>
                                    <td>{table.restaurant || "Sin datos"}</td>
                                    <td>{table.number || "Sin datos"}</td>
                                    <td>{table.capacity || "Sin datos"}</td>
                                    <td>{table.location || "Sin datos"}</td>
                                    <td>{table.status || "Sin datos"}</td>
                                    <td>{table.availabilitySchedules || "Sin datos"}</td>
                                    <td>{table.description || "Sin datos"}</td>
                                    <td>
                                        <div className="row-actions">
                                            <button type="button" onClick={() => { setSelectedTable(table); setOpenModalTrue(); }}>Editar</button>
                                            <button type="button" onClick={() => { setSelectedTable(table); setDeleteOpenTrue(); }}>Eliminar</button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>

            <TableModal
                isOpen={openModal}
                initialData={selectedTable}
                onClose={() => {
                    setOpenModalFalse();
                    setSelectedTable(null);
                }}
            />

            <Modal
                isOpen={isDeleteOpen}
                onClose={() => setDeleteOpenFalse()}
                title="Eliminar mesa"
                subtitle="Confirmación de eliminación"
            >
                <div className="flex flex-col space-y-4">
                    <p className="text-gray-700">La mesa seleccionada sera eliminada. ¿Deseas continuar?</p>
                    <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 pt-4 border-t">
                        <button type="button" onClick={() => setDeleteOpenFalse()} className="w-full sm:w-auto px-4 py-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition">Cancelar</button>
                        <button type="button" onClick={handleDelete} className="w-full sm:w-auto px-5 py-2 rounded-lg text-white font-medium transition shadow bg-red-600 hover:bg-red-700 border-none">Eliminar</button>
                    </div>
                </div>
            </Modal>

            <div className="toast-zone"></div>
        </>
    );
};
