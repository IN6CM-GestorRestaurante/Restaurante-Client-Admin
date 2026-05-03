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
            {/* PUBLIC */}
            <Route path="/" element={<AuthPage />} />
            
            {/* PROTECTED + ROLE */}
            <Route path="/dashboard/*" element={<DashboardPage />}>
                <Route path="locations" element={<SucursalesSection />} />
                <Route path="menus" element={<MenuSection />} />
                <Route path="orders" element={<OrdenesSection />} />
                <Route path="reservations" element={<ReservacionesSection />} />
                <Route path="summaries" element={<ResumenSection />} />
                <Route path="tables" element={<MesasSection />} />
                <Route path="users" element={<UsuariosSection />} />
                <Route index element={<Navigate to="summaries" replace />} />
            </Route>

            {/* Ruta temporal para pruebas */}
            <Route path="*" element={<h1>Página no encontrada</h1>} />
        </Routes>
    );
}