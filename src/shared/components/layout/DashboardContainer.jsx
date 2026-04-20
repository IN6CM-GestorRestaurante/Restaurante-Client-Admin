import { useState } from "react";
import { Navbar } from "./Navbar";
import { Sidebar } from "./Sidebar";
import { MenuSection } from "../../../features/dashboard/components/MenuSection";
import { MesasSection } from "../../../features/dashboard/components/MesasSection";
import { ReservacionesSection } from "../../../features/dashboard/components/ReservacionesSection";
import { OrdenesSection } from "../../../features/dashboard/components/OrdenesSection";
import { RestaurantesSection } from "../../../features/dashboard/components/RestaurantesSection";
import { UsuariosSection } from "../../../features/dashboard/components/UsuariosSection";

export const DashboardContainer = ({}) => {
    const [activeModule, setActiveModule] = useState("principal");

    const modules = {
        principal: (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                <MenuSection showCrud={false} />
                <MesasSection showCrud={false} />
                <ReservacionesSection showCrud={false} />
                <OrdenesSection showCrud={false} />
                <RestaurantesSection showCrud={false} />
                <UsuariosSection showCrud={false} />
            </div>
        ),
        menu: <MenuSection />,
        mesas: <MesasSection />,
        reservaciones: <ReservacionesSection />,
        ordenes: <OrdenesSection />,
        restaurantes: <RestaurantesSection />,
        usuarios: <UsuariosSection />,
    };

    return (
        <div className="min-h-screen text-stone-900">
            <Navbar />

            <div className="flex min-h-[calc(100vh-4rem)] flex-col md:flex-row">
                <Sidebar activeItem={activeModule} onSelect={setActiveModule} />

                <main className="flex-1 p-4 sm:p-6 lg:p-8">
                    <div className="mb-6 rounded-3xl border border-stone-200/80 bg-white/75 p-5 shadow-[0_18px_45px_-34px_rgba(80,62,43,0.45)] backdrop-blur-sm">
                        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-stone-500">
                            Panel administrativo
                        </p>
                        <h2 className="mt-1 text-3xl font-semibold text-stone-900">
                            {activeModule === "principal"
                                ? "Resumen general"
                                : activeModule.charAt(0).toUpperCase() + activeModule.slice(1)}
                        </h2>
                        <p className="mt-2 max-w-2xl text-sm text-stone-600 sm:text-base">
                            Vista estática del módulo seleccionado, manteniendo el cambio de panel con el mismo flujo del sidebar.
                        </p>
                    </div>

                    {modules[activeModule]}
                </main>
            </div>
        </div>
    );
};