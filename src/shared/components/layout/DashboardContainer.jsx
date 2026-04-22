import { useState } from "react";
import { Sidebar } from "./Sidebar";
import { ResumenSection } from "../../../features/dashboard/components/ResumenSection";
import { AdministradoresSection } from "../../../features/dashboard/components/AdministradoresSection";
import { RolesSection } from "../../../features/dashboard/components/RolesSection";
import { SucursalesSection } from "../../../features/dashboard/components/SucursalesSection";
import { ConfiguracionSection } from "../../../features/dashboard/components/ConfiguracionSection";

export const DashboardContainer = () => {
    const [activeModule, setActiveModule] = useState("resumen");

    const modules = {
        resumen: <ResumenSection onNavigate={setActiveModule} />,
        administradores: <AdministradoresSection />,
        roles: <RolesSection />,
        sucursales: <SucursalesSection />,
        configuracion: <ConfiguracionSection />,
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