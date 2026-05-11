import { Navigate } from "react-router-dom";
import { useAuthStore } from "../../../features/auth/store/authStore";

/**
 * Protege rutas del dashboard.
 * - Si no hay token → redirige a login.
 * - Si se pasan `allowedRoles` y el rol no está → redirige a /dashboard/summaries.
 */
export const ProtectedRoute = ({ children, allowedRoles }) => {
    const token = useAuthStore((s) => s.token);
    const role = useAuthStore((s) => s.user?.role);

    if (!token) {
        return <Navigate to="/" replace />;
    }

    if (allowedRoles && allowedRoles.length > 0 && !allowedRoles.includes(role)) {
        return <Navigate to="/dashboard/summaries" replace />;
    }

    return children;
};
