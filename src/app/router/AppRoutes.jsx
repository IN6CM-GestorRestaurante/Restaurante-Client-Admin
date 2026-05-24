import { Route, Routes, Navigate } from "react-router-dom";
import { AuthPage } from "../../features/auth/pages/AuthPage";
import { DashboardPage } from "../layouts/DashboardPage";
import { ProtectedRoute } from "../../shared/components/layout/ProtectedRoute";
import { SucursalesSection } from "../../features/locations/components/SucursalesSection";
import { MenuSection } from "../../features/menus/components/MenuSection";
import { OrdenesSection } from "../../features/orders/components/OrdenesSection";
import { ReservacionesSection } from "../../features/reservations/components/ReservacionesSection";
import { ResumenSection } from "../../features/summaries/components/ResumenSection";
import { MesasSection } from "../../features/tables/components/MesasSection";
import { UsuariosSection } from "../../features/users/components/UsuariosSection";
import { IngredientesSection } from "../../features/ingredients/components/IngredientesSection";
import { StockSection } from "../../features/stocks/components/StockSection";
import { FacturasSection } from "../../features/invoices/components/FacturasSection";
import { CompaniasSection } from "../../features/companies/components/CompaniasSection";

// Constantes de roles para legibilidad
const ADMIN = ["SUPER_ADMIN", "ADMIN_ROLE", "COMPANY_ADMIN"];
const MANAGEMENT = [...ADMIN, "BRANCH_MANAGER"];
const KITCHEN = [...MANAGEMENT, "CHEF"];
const FLOOR = [...MANAGEMENT, "WAITER", "WAITRESS", "RECEPTIONIST"];
const SALES = [...MANAGEMENT, "CASHIER"];
const ALL = [...KITCHEN, "WAITER", "WAITRESS", "CASHIER", "RECEPTIONIST"];

export const AppRoutes = () => {
    return (
        <Routes>
            {/* PUBLIC */}
            <Route path="/" element={<AuthPage />} />

            {/* PROTECTED + ROLE */}
            <Route
                path="/dashboard/*"
                element={
                    <ProtectedRoute>
                        <DashboardPage />
                    </ProtectedRoute>
                }
            >
                <Route path="summaries" element={<ResumenSection />} />
                <Route path="companies" element={
                    <ProtectedRoute allowedRoles={["SUPER_ADMIN", "ADMIN_ROLE"]}><CompaniasSection /></ProtectedRoute>
                } />
                <Route path="locations" element={
                    <ProtectedRoute allowedRoles={ADMIN}><SucursalesSection /></ProtectedRoute>
                } />
                <Route path="users" element={
                    <ProtectedRoute allowedRoles={ADMIN}><UsuariosSection /></ProtectedRoute>
                } />
                <Route path="menus" element={
                    <ProtectedRoute allowedRoles={KITCHEN}><MenuSection /></ProtectedRoute>
                } />
                <Route path="tables" element={
                    <ProtectedRoute allowedRoles={FLOOR}><MesasSection /></ProtectedRoute>
                } />
                <Route path="ingredients" element={
                    <ProtectedRoute allowedRoles={KITCHEN}><IngredientesSection /></ProtectedRoute>
                } />
                <Route path="stocks" element={
                    <ProtectedRoute allowedRoles={MANAGEMENT}><StockSection /></ProtectedRoute>
                } />
                <Route path="orders" element={
                    <ProtectedRoute allowedRoles={[...KITCHEN, "WAITER", "WAITRESS"]}><OrdenesSection /></ProtectedRoute>
                } />
                <Route path="reservations" element={
                    <ProtectedRoute allowedRoles={FLOOR}><ReservacionesSection /></ProtectedRoute>
                } />
                <Route path="invoices" element={
                    <ProtectedRoute allowedRoles={SALES}><FacturasSection /></ProtectedRoute>
                } />
                <Route index element={<Navigate to="summaries" replace />} />
            </Route>

            <Route path="*" element={<h1>Página no encontrada</h1>} />
        </Routes>
    );
};
