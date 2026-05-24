import { useState, useRef, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuthStore } from "../../../features/auth/store/authStore.js";
import defaultAvatarImg from "../../../assets/img/avatarDefault.png";

export const AvatarUser = ({ isSidebar = false, isCollapsed = false }) => {
    const { user, logout } = useAuthStore();
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();

    const toggleMenu = () => setOpen((prev) => !prev);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleLogout = () => {
        setOpen(false);
        logout();
        navigate("/", { replace: true });
    };

    const avatarSrc = user?.profilePicture && user.profilePicture.trim() !== ""
        ? user.profilePicture
        : null;

    const rawUsername = typeof user?.username === "string" ? user.username.trim() : "";
    const displayName = rawUsername && rawUsername.toLowerCase() !== "undefined" ? rawUsername : "Administrador";

    const rawEmail = typeof user?.email === "string" ? user.email.trim() : "";
    const displayEmail = rawEmail && rawEmail.toLowerCase() !== "undefined" ? rawEmail : "Cuenta activa";

    const displayRole = user?.role ? user.role.replace(/_/g, " ") : "COLABORADOR";

    const getInitials = (name) => {
        if (!name) return "AD";
        return name
            .split(/[\s_-]+/)
            .map((p) => p[0])
            .join("")
            .toUpperCase()
            .substring(0, 2);
    };

    const initials = getInitials(displayName);

    // Dynamic dropdown positioning classes
    let dropdownClasses = "absolute z-50 overflow-visible rounded-2xl border border-stone-200 bg-white shadow-xl animate-fadeIn w-[min(16rem,calc(100vw-1rem))] sm:w-64 ";
    if (isSidebar) {
        if (isCollapsed) {
            // Position to the right when collapsed in sidebar
            dropdownClasses += "left-full top-0 ml-3";
        } else {
            // Position on top of the avatar when in sidebar (expanded)
            dropdownClasses += "left-0 bottom-full mb-3";
        }
    } else {
        // Standard top-bar right alignment
        dropdownClasses += "right-0 sm:right-[-8px] mt-3";
    }

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                type="button"
                onClick={toggleMenu}
                className={`group flex items-center gap-3 rounded-xl transition-all focus:outline-none focus:ring-2 focus:ring-orange-500/20 ${
                    isSidebar 
                        ? isCollapsed
                            ? "w-12 h-12 justify-center bg-stone-800/40 border border-stone-700/50 hover:bg-stone-800/80 p-0"
                            : "w-full bg-stone-800/40 border border-stone-700/50 hover:bg-stone-800/80 px-3 py-2.5"
                        : "border border-stone-200 bg-white px-3 py-1.5 shadow-sm hover:border-orange-500/50 hover:shadow-md"
                }`}
                aria-label="Abrir menú de usuario"
            >
                {/* Avatar circle */}
                <div className="relative shrink-0">
                    {avatarSrc ? (
                        <img
                            src={avatarSrc}
                            alt={displayName}
                            className="h-9 w-9 rounded-lg object-cover border border-stone-700/30"
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.style.display = "none";
                                // Fallback to showing initials if img load fails
                                const parent = e.target.parentNode;
                                const fallback = parent.querySelector(".initials-fallback");
                                if (fallback) fallback.style.display = "flex";
                            }}
                        />
                    ) : null}
                    
                    {/* Initials Fallback */}
                    <div 
                        className={`initials-fallback h-9 w-9 rounded-lg bg-linear-to-br from-orange-500 to-red-500 text-white font-bold text-sm items-center justify-center shadow-inner ${
                            avatarSrc ? "hidden" : "flex"
                        }`}
                    >
                        {initials}
                    </div>
                </div>

                {/* User info labels */}
                {(!isSidebar || !isCollapsed) && (
                    <div className="text-left min-w-0 flex-1">
                        <p className={`text-xs font-bold truncate leading-tight ${
                            isSidebar ? "text-stone-100" : "text-stone-800"
                        }`}>
                            {displayName}
                        </p>
                        <p className={`text-[10px] font-medium truncate uppercase tracking-wider mt-0.5 ${
                            isSidebar ? "text-stone-400" : "text-stone-500"
                        }`}>
                            {displayRole}
                        </p>
                    </div>
                )}

                {/* Dropdown Chevron */}
                {(!isSidebar || !isCollapsed) && (
                    <i className={`fas fa-chevron-down text-[10px] transition-transform duration-200 ${
                        open ? "rotate-180" : ""
                    } ${isSidebar ? "text-stone-400" : "text-stone-500"}`} />
                )}
            </button>

            {open && (
                <div className={dropdownClasses}>
                    <div className="flex flex-col items-center gap-3 border-b border-stone-100 bg-linear-to-r from-stone-50 to-white px-4 py-5 text-center">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-orange-200 bg-orange-50 shadow-sm text-white font-bold text-base bg-linear-to-br from-orange-500 to-red-500">
                            {initials}
                        </div>

                        <div className="min-w-0 w-full">
                            <p className="truncate text-xs font-bold text-stone-900">{displayName}</p>
                            <p className="truncate text-[10px] text-stone-500">{displayEmail}</p>
                            <span className="inline-block mt-1.5 px-2 py-0.5 text-[9px] font-bold text-orange-600 bg-orange-50 border border-orange-100 rounded-md uppercase tracking-wider">
                                {displayRole}
                            </span>
                        </div>
                    </div>

                    <ul className="px-2 py-2 pb-3 text-xs font-semibold text-stone-700 text-center">
                        <li>
                            <Link
                                to="/dashboard"
                                onClick={() => setOpen(false)}
                                className="flex items-center justify-center gap-2 rounded-lg px-3 py-2.5 hover:bg-stone-50 hover:text-orange-500 transition-colors"
                            >
                                <i className="fas fa-chart-pie text-stone-400 w-4 shrink-0"></i>
                                Dashboard
                            </Link>
                        </li>

                        <li>
                            <Link
                                to="/dashboard/users"
                                onClick={() => setOpen(false)}
                                className="flex items-center justify-center gap-2 rounded-lg px-3 py-2.5 hover:bg-stone-50 hover:text-orange-500 transition-colors"
                            >
                                <i className="fas fa-users text-stone-400 w-4 shrink-0"></i>
                                Usuarios
                            </Link>
                        </li>

                        <li className="border-t border-stone-100 my-1"></li>

                        <li>
                            <button
                                onClick={handleLogout}
                                className="flex w-full items-center justify-center gap-2 rounded-lg px-3 py-2.5 text-red-600 font-bold hover:bg-red-50 transition-colors"
                            >
                                <i className="fas fa-right-from-bracket w-4 shrink-0"></i>
                                Cerrar sesión
                            </button>
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
};
