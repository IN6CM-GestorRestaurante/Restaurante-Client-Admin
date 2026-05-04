import { AvatarUser } from "../ui/AvatarUser";
import { BuildingStorefrontIcon } from "@heroicons/react/24/outline";

export const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 border-b border-stone-200/80 bg-white/90 backdrop-blur-xl shadow-[0_12px_34px_-26px_rgba(80,62,43,0.55)]">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-6 sm:px-8 lg:px-12">
        <div className="flex min-w-0 flex-1 items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-orange-200 bg-orange-50 text-orange-500 shadow-sm">
            <BuildingStorefrontIcon className="h-6 w-6" />
          </div>

          <div className="min-w-0">
            <p className="text-sm font-extrabold tracking-wide text-stone-900 sm:text-base">
              Gestor de Restaurante
            </p>
            <p className="hidden text-xs font-medium text-stone-500 sm:block">
              Panel de administración
            </p>
          </div>
        </div>

        <div className="flex shrink-0 items-center justify-end">
          <AvatarUser />
        </div>
      </div>
    </nav>
  );
};
