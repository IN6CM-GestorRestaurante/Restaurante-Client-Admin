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

            <div className="flex flex-1 flex-col md:flex-row">
                <Sidebar activeItem={activeModule} onSelect={setActiveModule} />

                <main className="flex-1 p-4 sm:p-6 lg:p-8">
                    {modules[activeModule]}
                </main>
            </div>
        </div>
    );
};