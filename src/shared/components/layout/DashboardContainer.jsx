import { Navbar } from "./Navbar";
import { Sidebar } from "./Sidebar";
import { Outlet } from "react-router-dom";

export const DashboardContainer = () => {
  return (
    <div className="min-h-screen bg-[#f6f6fa] flex flex-col w-full overflow-hidden">
      <Navbar />
      <div className="shell flex-1 w-full" style={{ display: 'flex', minHeight: 'calc(100vh - 4rem)' }}>
        <Sidebar />
        <main className="content-shell flex-1 w-full overflow-y-auto bg-gray-50/50 p-6 md:p-8" style={{ width: 'calc(100% - 290px)' }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};
