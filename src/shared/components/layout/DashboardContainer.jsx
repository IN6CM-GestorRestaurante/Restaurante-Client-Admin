import { Navbar } from "./Navbar";
import { Sidebar } from "./Sidebar";
import { Outlet } from "react-router-dom";

/**
 * Flexible, responsive main Dashboard container layout.
 * Decouples rigid custom grid/shell classes in favor of robust tailwind flex rows.
 */
export const DashboardContainer = () => {
  return (
    <div className="min-h-screen bg-[#f6f6fa] flex flex-col w-full">
      <Navbar />
      <div className="flex flex-1 w-full relative flex-col lg:flex-row items-stretch">
        <Sidebar />
        <main className="flex-1 min-w-0 w-full bg-stone-50/40 p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
