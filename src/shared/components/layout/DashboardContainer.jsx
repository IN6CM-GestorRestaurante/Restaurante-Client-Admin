import { useState } from "react";
import { Sidebar } from "./Sidebar";
import { ResumenSection } from "../../../features/dashboard/components/ResumenSection";
import { MesasSection } from "../../../features/dashboard/components/MesasSection";
import { OrdenesSection } from "../../../features/dashboard/components/OrdenesSection";
import { MenuSection } from "../../../features/dashboard/components/MenuSection";
import { ReservacionesSection } from "../../../features/dashboard/components/ReservacionesSection";
import { SucursalesSection } from "../../../features/dashboard/components/SucursalesSection";
import { UsuariosSection } from "../../../features/dashboard/components/UsuariosSection";

export const DashboardContainer = () => {
    const [activeModule, setActiveModule] = useState("resumen");

    const modules = {
        resumen: <ResumenSection onNavigate={setActiveModule} />,
        mesas: <MesasSection />,
        ordenes: <OrdenesSection />,
        menu: <MenuSection />,
        reservaciones: <ReservacionesSection />,
        sucursales: <SucursalesSection />,
        usuarios: <UsuariosSection />,
    };

    return (
        <div className="shell">
            <Sidebar activeItem={activeModule} onSelect={setActiveModule} />

            <main className="content-shell">
                {modules[activeModule]}
            </main>
        </div>
    );
};