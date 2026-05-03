import { useEffect, useState } from "react";
import { useEffect as useToastEffect } from "react";
import { useTablesStore } from "../../tables/store/adminStore";
import { showError } from "../../../shared/utils/toast";
import { TableModal } from "./TableModal";

export const MesasSection = () => {
    const { tables, loading, error, getTables, deleteTable } = useTablesStore();
    const [openModal, setOpenModal] = useState(false);
    const [selectedTable, setSelectedTable] = useState(null);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);

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
            setIsDeleteOpen(false);
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
                <button className="btn danger" type="button" onClick={() => setOpenModal(true)}>Nueva mesa</button>
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
                                            <button type="button" onClick={() => { setSelectedTable(table); setOpenModal(true); }}>Editar</button>
                                            <button type="button" onClick={() => { setSelectedTable(table); setIsDeleteOpen(true); }}>Eliminar</button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>

            {openModal ? (
                <TableModal
                    initialData={selectedTable}
                    onClose={() => {
                        setOpenModal(false);
                        setSelectedTable(null);
                    }}
                />
            ) : null}

            {isDeleteOpen ? (
            <div className="modal open">
                <div className="modal-card">
                    <h2 style={{ fontSize: "18px", marginBottom: "10px" }}>Eliminar mesa</h2>
                    <p className="confirm-text">La mesa seleccionada sera eliminada. ¿Deseas continuar?</p>
                    <div className="row">
                        <button className="btn soft" type="button" onClick={() => setIsDeleteOpen(false)}>Cancelar</button>
                        <button className="btn danger" type="button" onClick={handleDelete}>Eliminar</button>
                    </div>
                </div>
            </div>
            ) : null}

            <div className="toast-zone"></div>
        </>
    );
};