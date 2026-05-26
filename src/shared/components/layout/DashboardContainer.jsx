import { Navbar } from "./Navbar";
import { Sidebar } from "./Sidebar";
import { Outlet } from "react-router-dom";
import { useUIStore } from "../../../features/auth/store/uiStore";

/**
 * Flexible, responsive main Dashboard container layout.
 * Decouples rigid custom grid/shell classes in favor of robust tailwind flex rows.
 */
export const DashboardContainer = () => {
  const isMobileOpen = useUIStore((s) => s.isMobileOpen);
  const setMobileSidebar = useUIStore((s) => s.setMobileSidebar);

  return (
    <div className="min-h-screen bg-[#f6f6fa] flex flex-col w-full">
      <Navbar />
      
      {/* Overlay para móviles */}
      <div
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 lg:hidden ${
          isMobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setMobileSidebar(false)}
      />

      <div className="flex flex-1 w-full relative flex-col lg:flex-row items-stretch">
        {/* Contenedor del Sidebar con soporte responsivo y animación */}
        <div
          className={`fixed inset-y-0 left-0 z-50 w-72 transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 lg:w-72 lg:shrink-0 ${
            isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
          }`}
        >
          <Sidebar />
        </div>
        
        <main className="flex-1 min-w-0 w-full bg-stone-50/40 p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
