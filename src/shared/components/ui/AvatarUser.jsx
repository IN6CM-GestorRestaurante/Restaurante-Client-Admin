import { useState, useRef, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuthStore } from "../../../features/auth/store/authStore.js";
import defaultAvatarImg from "../../../assets/img/avatarDefault.png";

export const AvatarUser = () => {
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
        logout();
        navigate("/", { replace: true });
    };

    const avatarSrc = user?.profilePicture && user.profilePicture.trim() !== ""
        ? user.profilePicture
        : defaultAvatarImg;

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                type="button"
                onClick={toggleMenu}
                className="group flex items-center justify-center gap-3 rounded-full border border-stone-200 bg-white px-4 py-2 shadow-sm transition hover:border-(--primary-orange) hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[rgba(255,106,43,0.2)]"
                aria-label="Abrir menú de usuario"
            >
                <span className="hidden h-10 w-28 items-center justify-center overflow-hidden text-center sm:flex">
                    <span className="block w-full truncate text-sm font-semibold leading-none text-slate-800 text-center">
                        Administrador
                    </span>
                </span>
                <img
                    src={avatarSrc}
                    alt={user?.username || "avatar"}
                    className="h-10 w-10 shrink-0 rounded-full object-cover ring-1 ring-stone-200"
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = defaultAvatarImg;
                    }}
                />
            </button>

            {open && (
                <div className="absolute right-0 mt-3 w-72 overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-[0_24px_60px_-30px_rgba(15,23,42,0.42)] animate-fadeIn z-50">
                    <div className="flex flex-col items-center gap-3 border-b border-stone-100 bg-linear-to-r from-stone-50 to-white px-4 py-5 text-center">
                        <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-orange-200 bg-orange-50 shadow-sm">
                            <img
                                src={avatarSrc}
                                alt={user?.username || "avatar"}
                                className="h-full w-full object-cover"
                            />
                        </div>

                        <div className="min-w-0 w-full">
                            <p className="truncate text-sm font-semibold text-slate-900">{user?.username || "Administrador"}</p>
                            <p className="truncate text-xs text-slate-500">{user?.email || "Cuenta activa"}</p>
                        </div>
                    </div>

                    <ul className="p-2 text-sm font-medium text-slate-700">
                        <li>
                            <Link
                                to="/dashboard"
                                className="block rounded-2xl px-3 py-3 text-center transition hover:bg-amber-50 hover:text-(--primary-red)"
                            >
                                Dashboard
                            </Link>
                        </li>

                        <li>
                            <Link
                                to="/dashboard/users"
                                className="block rounded-2xl px-3 py-3 text-center transition hover:bg-amber-50 hover:text-(--primary-red)"
                            >
                                Usuarios
                            </Link>
                        </li>

                        <li className="pt-2">
                            <button
                                onClick={handleLogout}
                                className="block w-full rounded-2xl px-3 py-3 text-center font-semibold text-red-600 transition hover:bg-red-50"
                            >
                                Cerrar sesión
                            </button>
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );

};
