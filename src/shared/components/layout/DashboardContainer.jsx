import { Navbar } from "./Navbar";
import { Sidebar } from "./Sidebar";
import { Outlet } from "react-router-dom";

export const DashboardContainer = () => {
  return (
    <div className="min-h-screen bg-[#f6f6fa] flex flex-col w-full">
      <Navbar />
      <div className="shell flex-1 w-full overflow-hidden">
        <Sidebar />
        <main className="content-shell min-w-0 overflow-y-auto bg-gray-50/50">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
