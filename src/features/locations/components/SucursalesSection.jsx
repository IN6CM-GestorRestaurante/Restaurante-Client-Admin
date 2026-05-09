import { useEffect, useState } from "react";
import { useLocationsStore } from "../store/adminStore";
import { SucursalModal } from "./SucursalModal";
import { Modal } from "../../../shared/ui/Modal";
import { showError, showSuccess } from "../../../shared/utils/toast";

export const SucursalesSection = () => {
    const { locations, loading, error, getLocations, deleteLocation } = useLocationsStore();
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [selectedLocation, setSelectedLocation] = useState(null);

    useEffect(() => {
        getLocations?.();
    }, [getLocations]);

    useEffect(() => {
        if (error) showError(error);
    }, [error]);

    const handleCreate = () => {
        setSelectedLocation(null);
        setIsCreateOpen(true);
    };

    const handleEdit = (location) => {
        setSelectedLocation(location);
        setIsCreateOpen(true);
    };

    const handleDelete = async () => {
        try {
            if (selectedLocation?._id) {
                await deleteLocation?.(selectedLocation._id);
                showSuccess("Sucursal eliminada");
            }
        } catch {
            showError("Error al eliminar sucursal");
        } finally {
            setIsDeleteOpen(false);
            setSelectedLocation(null);
        }
    };

    const locationRows = (locations || []).filter((location) => location?.isActive !== false);

    return (
        <>
            <header className="header">
                <div>
                    <h2>CRUD de Sucursales</h2>
                    <p>Administra sedes, responsable y estado operativo.</p>
                </div>
                <button className="btn danger" type="button" onClick={handleCreate}>Nueva sucursal</button>
            </header>
            <section className="section">
                <div className="top">
                    <p style={{ fontSize: "13px", color: "#6f6f78" }}>Gestion centralizada de sedes del restaurante.</p>
                </div>
                <section className="kpis">
                    <article className="kpi"><span>Total sucursales</span><strong>{loading ? "Cargando..." : locationRows.length || "Sin datos"}</strong></article>
                    <article className="kpi"><span>Operativas</span><strong>Sin datos</strong></article>
                    <article className="kpi"><span>En mantenimiento</span><strong>Sin datos</strong></article>
                </section>
                <div className="crud-cards-grid crud-cards-gridCompact">
                    {locationRows.map((location) => (
                        <article key={location._id} className="crud-card crud-cardCompact crud-cardPost crud-cardDense">
                            <div className="crud-cardMedia crud-cardPostMedia">
                                <div className="crud-cardMediaBox crud-cardMediaBoxPhoto">
                                    {location.photos?.[0] ? (
                                        <img className="crud-cardMediaImage" src={location.photos[0]} alt={`Imagen de ${location.name}`} />
                                    ) : (
                                        <span>Sin imagen</span>
                                    )}
                                </div>

                                <div className="crud-cardOverlayActions">
                                    <button
                                        type="button"
                                        className="crud-cardAction crud-cardActionEdit crud-cardOverlayAction"
                                        aria-label="Editar sucursal"
                                        onClick={() => handleEdit(location)}
                                    >
                                        <i className="fas fa-pen-to-square"></i>
                                    </button>
                                    <button
                                        type="button"
                                        className="crud-cardAction crud-cardActionDelete crud-cardOverlayAction"
                                        aria-label="Eliminar sucursal"
                                        onClick={() => {
                                            setSelectedLocation(location);
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
                                    <span className="crud-cardEyebrow"><i className="fas fa-store"></i> Sucursal</span>
                                    <h3 className="crud-cardTitle">{location.name}</h3>
                                </div>
                                <span className="crud-cardBadge">{location.isActive !== false ? "Operativa" : "Inactiva"}</span>
                            </div>

                            <div className="crud-cardBody crud-cardPostBodyCols">
                                <div className="crud-cardField">
                                    <span className="crud-cardFieldLabel">Dirección</span>
                                    <div className="crud-cardFieldValue">{location.address}</div>
                                </div>
                                <div className="crud-cardField">
                                    <span className="crud-cardFieldLabel">Horario</span>
                                    <div className="crud-cardFieldValue">{location.openingTime} - {location.closingTime}</div>
                                </div>
                                <div className="crud-cardField">
                                    <span className="crud-cardFieldLabel">Categoría</span>
                                    <div className="crud-cardFieldValue">{location.category}</div>
                                </div>
                                <div className="crud-cardField">
                                    <span className="crud-cardFieldLabel">Precio promedio</span>
                                    <div className="crud-cardFieldValue">{location.averagePrice}</div>
                                </div>
                                <div className="crud-cardField">
                                    <span className="crud-cardFieldLabel">Correo</span>
                                    <div className="crud-cardFieldValue">{location.email}</div>
                                </div>
                                <div className="crud-cardField">
                                    <span className="crud-cardFieldLabel">Teléfono</span>
                                    <div className="crud-cardFieldValue">{location.phoneNumber}</div>
                                </div>
                                <div className="crud-cardField">
                                    <span className="crud-cardFieldLabel">Descripción</span>
                                    <div className="crud-cardFieldValue">{location.descripcion}</div>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </section>

            <SucursalModal
                isOpen={isCreateOpen}
                initialData={selectedLocation}
                onClose={() => {
                    setIsCreateOpen(false);
                    setSelectedLocation(null);
                }}
            />

            <Modal
                isOpen={isDeleteOpen}
                onClose={() => setIsDeleteOpen(false)}
                title="Eliminar sucursal"
                subtitle="Confirma la eliminación del registro"
                compact
            >
                <p className="text-sm leading-6 text-slate-700">La sucursal seleccionada sera desactivada. ¿Deseas continuar?</p>
                <div className="app-modal-actions">
                    <button type="button" onClick={() => setIsDeleteOpen(false)} className="app-modal-btn app-modal-btnSecondary w-full sm:w-auto">Cancelar</button>
                    <button type="button" onClick={handleDelete} className="app-modal-btn app-modal-btnPrimary w-full sm:w-auto">Eliminar</button>
                </div>
            </Modal>

            <div className="toast-zone"></div>
        </>
    );
};
