import { Route, Routes, Navigate } from "react-router-dom";
import { AuthPage } from "../../features/auth/pages/AuthPage";
import { DashboardPage } from "../layouts/DashboardPage";
import { SucursalesSection } from "../../features/locations/components/SucursalesSection";
import { MenuSection } from "../../features/menus/components/MenuSection";
import { OrdenesSection } from "../../features/orders/components/OrdenesSection";
import { ReservacionesSection } from "../../features/reservations/components/ReservacionesSection";
import { ResumenSection } from "../../features/summaries/components/ResumenSection";
import { MesasSection } from "../../features/tables/components/MesasSection";
import { UsuariosSection } from "../../features/users/components/UsuariosSection";

export const AppRoutes = () => {

    return (
        <Routes>
            {/* RUTAS DE AUTENTICACIÓN */}
            <Route path="/auth" element={<AuthPage />} />
            
            {/* RUTAS PROTEGIDAS DEL DASHBOARD */}
            <Route path="/dashboard/*" element={<DashboardPage />}>
                <Route path="locations" element={<SucursalesSection />} />
                <Route path="menus" element={<MenuSection />} />
                <Route path="orders" element={<OrdenesSection />} />
                <Route path="reservations" element={<ReservacionesSection />} />
                <Route path="summaries" element={<ResumenSection />} />
                <Route path="tables" element={<MesasSection />} />
                <Route path="users" element={<UsuariosSection />} />
            </Route>

            {/* RUTA RAÍZ - Redirecciona a dashboard o auth */}
            <Route path="/" element={<DashboardPage />} />

            {/* Ruta para páginas no encontradas */}
            <Route path="*" element={<h1>Página no encontrada</h1>} />
        </Routes>
    );
}