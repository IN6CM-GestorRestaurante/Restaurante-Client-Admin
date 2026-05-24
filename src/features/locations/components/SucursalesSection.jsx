import { useEffect, useState } from "react";
import { useLocationsStore } from "../store/adminStore";
import { SucursalModal } from "./SucursalModal";
import { Modal } from "../../../shared/ui/Modal";
import { showError, showSuccess } from "../../../shared/utils/toast";

const STATE_THEMES = {
    Operativa:          { label: "Operativa",        bg: "#e8f9ef", color: "#19804b", border: "#c2f0d5" },
    "En mantenimiento": { label: "Mantenimiento",     bg: "#fffbeb", color: "#b45309", border: "#fef3c7" },
    Cerrada:            { label: "Cerrada",          bg: "#fef2f2", color: "#b91c1c", border: "#fee2e2" },
};

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
                showSuccess("Sucursal dada de baja / cerrada correctamente");
            }
        } catch {
            showError("Error al desactivar la sucursal");
        } finally {
            setIsDeleteOpen(false);
            setSelectedLocation(null);
        }
    };

    const activeLocations = (locations || []).filter((location) => location?.isActive !== false);

    // KPI Counters
    const totalCount = activeLocations.length;
    const activeCount = activeLocations.filter(loc => (loc.state || loc.status) === "Operativa").length;
    const maintenanceCount = activeLocations.filter(loc => (loc.state || loc.status) === "En mantenimiento").length;
    const closedCount = totalCount - activeCount - maintenanceCount;

    return (
        <div className="space-y-6">
            <header className="header flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-extrabold text-stone-800">CRUD de Sucursales</h2>
                    <p className="text-stone-500 text-sm">Administra sedes, gerentes, información de contacto y estado operativo.</p>
                </div>
                <button 
                    className="btn primary bg-gradient-to-r from-red-500 to-orange-500 border-none font-bold shadow-md shadow-orange-500/10 hover:shadow-orange-500/25 active:scale-[0.98] transition-all cursor-pointer" 
                    type="button" 
                    onClick={handleCreate}
                >
                    <i className="fas fa-plus mr-1" /> Nueva Sucursal
                </button>
            </header>

            {/* KPIs */}
            <section className="kpis grid grid-cols-1 sm:grid-cols-3 gap-5">
                <article className="kpi bg-white p-5 rounded-2xl border border-stone-200 shadow-sm flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-orange-50 flex items-center justify-center border border-orange-100 text-orange-600">
                        <i className="fas fa-store text-lg" />
                    </div>
                    <div>
                        <span className="text-stone-500 text-xs font-semibold block">Total Sucursales</span>
                        <strong className="text-2xl font-black text-stone-800">{loading ? "..." : totalCount}</strong>
                    </div>
                </article>

                <article className="kpi bg-white p-5 rounded-2xl border border-stone-200 shadow-sm flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center border border-emerald-100 text-emerald-600">
                        <i className="fas fa-check-circle text-lg" />
                    </div>
                    <div>
                        <span className="text-stone-500 text-xs font-semibold block">Operativas</span>
                        <strong className="text-2xl font-black text-emerald-700">{loading ? "..." : activeCount}</strong>
                    </div>
                </article>

                <article className="kpi bg-white p-5 rounded-2xl border border-stone-200 shadow-sm flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center border border-amber-100 text-amber-600">
                        <i className="fas fa-screwdriver-wrench text-lg" />
                    </div>
                    <div>
                        <span className="text-stone-500 text-xs font-semibold block">En Mantenimiento</span>
                        <strong className="text-2xl font-black text-amber-700">{loading ? "..." : maintenanceCount}</strong>
                    </div>
                </article>
            </section>

            {/* Cards Grid */}
            <section className="section bg-white p-6 rounded-2xl border border-stone-200 shadow-sm">
                <div className="top border-b border-stone-100 pb-4 mb-6">
                    <h3 className="text-base font-bold text-stone-800">Sedes y Sucursales de la Empresa</h3>
                </div>

                {loading && activeLocations.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12 gap-3 text-stone-400">
                        <i className="fas fa-spinner fa-spin text-2xl text-orange-500" />
                        <span className="text-xs font-semibold">Cargando sucursales de la base de datos...</span>
                    </div>
                ) : activeLocations.length === 0 ? (
                    <div className="text-center py-16 text-stone-400 font-semibold text-xs border border-dashed border-stone-200 rounded-2xl">
                        <i className="fas fa-store-slash text-3xl text-stone-300 block mb-3" />
                        No se encontraron sucursales registradas.
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {activeLocations.map((location) => {
                            const stateVal = location.state || location.status || "Operativa";
                            const theme = STATE_THEMES[stateVal] || STATE_THEMES.Operativa;
                            
                            return (
                                <article 
                                    key={location._id} 
                                    className="bg-white rounded-2xl border border-stone-200 shadow-sm hover:shadow-md transition-all flex flex-col overflow-hidden relative group hover:border-orange-500/20"
                                >
                                    {/* Action Hover Panel */}
                                    <div className="absolute right-4 top-4 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity z-10 bg-white/95 p-1 rounded-lg shadow-sm border border-stone-100">
                                        <button
                                            type="button"
                                            onClick={() => handleEdit(location)}
                                            className="flex h-7 w-7 items-center justify-center rounded-md bg-stone-50 hover:bg-stone-100 text-stone-600 border-none cursor-pointer transition-colors"
                                            title="Editar Sucursal"
                                        >
                                            <i className="fas fa-pen text-xs" />
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() => {
                                                setSelectedLocation(location);
                                                setIsDeleteOpen(true);
                                            }}
                                            className="flex h-7 w-7 items-center justify-center rounded-md bg-red-50 hover:bg-red-100 text-red-600 border-none cursor-pointer transition-colors"
                                            title="Cerrar/Eliminar Sucursal"
                                        >
                                            <i className="fas fa-trash text-xs" />
                                        </button>
                                    </div>

                                    {/* Card Media (Photos) */}
                                    <div className="h-44 bg-stone-100 relative overflow-hidden flex items-center justify-center border-b border-stone-100">
                                        {location.photos?.[0] ? (
                                            <img 
                                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                                                src={location.photos[0]} 
                                                alt={`Sucursal ${location.name}`} 
                                            />
                                        ) : (
                                            <div className="flex flex-col items-center gap-1.5 text-stone-400">
                                                <i className="fas fa-image text-2xl text-stone-300" />
                                                <span className="text-[10px] font-bold uppercase tracking-wider">Sin foto cargada</span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Card Content Header */}
                                    <div className="p-5 border-b border-stone-100 flex items-start justify-between gap-4">
                                        <div className="min-w-0">
                                            <span className="inline-flex items-center gap-1 text-[10px] font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded-md uppercase tracking-wider mb-2">
                                                <i className="fas fa-tag" /> {location.category || "General"}
                                            </span>
                                            <h3 className="text-base font-bold text-stone-800 leading-snug truncate">
                                                {location.name}
                                            </h3>
                                        </div>

                                        <span 
                                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold border shrink-0"
                                            style={{ 
                                                backgroundColor: theme.bg, 
                                                color: theme.color,
                                                borderColor: theme.border
                                            }}
                                        >
                                            {theme.label}
                                        </span>
                                    </div>

                                    {/* Card Body Fields */}
                                    <div className="p-5 flex-1 grid grid-cols-2 gap-4 text-xs font-semibold">
                                        <div className="space-y-0.5 col-span-2">
                                            <span className="text-[10px] text-stone-400 block font-bold uppercase tracking-wider">Dirección</span>
                                            <span className="text-stone-700 leading-snug font-medium truncate block" title={location.address}>
                                                {location.address || "Sin dirección física"}
                                            </span>
                                        </div>

                                        <div className="space-y-0.5">
                                            <span className="text-[10px] text-stone-400 block font-bold uppercase tracking-wider">Horario</span>
                                            <span className="text-stone-700 flex items-center gap-1">
                                                <i className="far fa-clock text-stone-400" /> {location.openingTime || "08:00"} - {location.closingTime || "22:00"}
                                            </span>
                                        </div>

                                        <div className="space-y-0.5">
                                            <span className="text-[10px] text-stone-400 block font-bold uppercase tracking-wider">Precio Promedio</span>
                                            <span className="text-stone-700">
                                                Q{location.averagePrice ? Number(location.averagePrice).toFixed(1) : "0.0"} / persona
                                            </span>
                                        </div>

                                        <div className="space-y-0.5">
                                            <span className="text-[10px] text-stone-400 block font-bold uppercase tracking-wider">Teléfono</span>
                                            <span className="text-stone-700">
                                                {location.phoneNumber || "Sin teléfono"}
                                            </span>
                                        </div>

                                        <div className="space-y-0.5">
                                            <span className="text-[10px] text-stone-400 block font-bold uppercase tracking-wider">Correo</span>
                                            <span className="text-stone-700 truncate block" title={location.email}>
                                                {location.email || "Sin correo"}
                                            </span>
                                        </div>

                                        {location.descripcion && (
                                            <div className="col-span-2 space-y-0.5 border-t border-stone-100 pt-3 mt-1">
                                                <span className="text-[10px] text-stone-400 block font-bold uppercase tracking-wider">Descripción</span>
                                                <p className="text-stone-600 font-medium leading-relaxed">
                                                    {location.descripcion}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </article>
                            );
                        })}
                    </div>
                )}
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
                title="Desactivar y Cerrar Sucursal"
                subtitle="Operación administrativa de baja"
                compact
            >
                <div className="space-y-3">
                    <div className="flex items-start gap-3 p-3 bg-red-50 border border-red-100 rounded-xl text-red-800 text-xs font-semibold">
                        <i className="fas fa-exclamation-triangle text-sm shrink-0 mt-0.5" />
                        <div>
                            <span className="font-bold text-red-900 block mb-1">¡Advertencia de Cierre de Sucursal!</span>
                            Dar de baja la sucursal <strong className="text-stone-900">"{selectedLocation?.name}"</strong> la marcará como inactiva en el sistema. Los clientes no podrán reservar mesas ni ver su menú. Esta operación no afectará datos históricos de facturas, pero detendrá toda operación logística vigente.
                        </div>
                    </div>
                    
                    <p className="text-xs font-medium text-stone-600 leading-relaxed">
                        ¿Deseas confirmar la baja y suspender la actividad de esta sede comercial?
                    </p>
                </div>
                
                <div className="app-modal-actions border-t border-stone-100 pt-4 mt-6">
                    <button type="button" onClick={() => setIsDeleteOpen(false)} className="app-modal-btn app-modal-btnSecondary w-full sm:w-auto">
                        Cancelar
                    </button>
                    <button type="button" onClick={handleDelete} className="app-modal-btn app-modal-btnPrimary w-full sm:w-auto bg-red-600 border-none hover:bg-red-700 font-bold uppercase">
                        Confirmar y Desactivar
                    </button>
                </div>
            </Modal>
        </div>
    );
};
