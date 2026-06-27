import { AvatarUser } from "../ui/AvatarUser";
import { BuildingStorefrontIcon, Bars3Icon } from "@heroicons/react/24/outline";
import { useUIStore } from "../../../features/auth/store/uiStore";

export const Navbar = () => {
  const toggleMobileSidebar = useUIStore((s) => s.toggleMobileSidebar);

  return (
    <nav className="sticky top-0 z-50 border-b border-stone-200/80 bg-white/90 backdrop-blur-xl shadow-[0_12px_34px_-26px_rgba(80,62,43,0.55)]">
      <div className="flex h-16 w-full items-center justify-between px-5 sm:px-7 lg:px-10">
        <div className="ml-1 flex min-w-0 flex-1 items-center gap-3">
          <button
            type="button"
            onClick={toggleMobileSidebar}
            className="flex h-10 w-10 items-center justify-center rounded-2xl border border-stone-200 hover:bg-stone-50 transition-colors lg:hidden text-stone-600 focus:outline-none cursor-pointer"
            aria-label="Abrir panel lateral"
          >
            <Bars3Icon className="h-6 w-6" />
          </button>

          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-orange-200 bg-orange-50 text-orange-500 shadow-sm">
            <BuildingStorefrontIcon className="h-6 w-6" />
          </div>
        </div>

        <div className="flex shrink-0 items-center justify-end" style={{ marginRight: "60px" }}>
          <AvatarUser />
        </div>
      </div>
    </nav>
  );
};
