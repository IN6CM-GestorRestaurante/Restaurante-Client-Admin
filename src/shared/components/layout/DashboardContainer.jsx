import { Navbar } from "./Navbar";
import { Sidebar } from "./Sidebar";

export const DashboardContainer = ({}) => {
    return (
        <div className="min-h-screen text-stone-900">
            <Navbar />

            <div className="flex flex-1 flex-col md:flex-row">
                <Sidebar />

                <main className="flex-1 p-4 sm:p-6 lg:p-8">
                    <section className="marble-surface rounded-3xl border border-stone-200/70 p-6 shadow-[0_18px_45px_-30px_rgba(80,62,43,0.45)] backdrop-blur-sm sm:p-8">
                        <h2 className="text-xl font-bold text-stone-900 sm:text-2xl">Panel general</h2>
                        <p className="mt-2 text-sm text-stone-600 sm:text-base">
                            Contenido del menú
                        </p>
                    </section>
                </main>
            </div>
        </div>
    );
};