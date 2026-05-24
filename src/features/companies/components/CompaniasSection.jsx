import { useEffect, useState } from "react";
import { useCompaniesStore } from "../store/adminStore";
import { Spinner } from "../../auth/components/Spinner";

const STATUS_MAP = {
    true:  { label: "Activa",   bg: "#e8f9ef", color: "#19804b" },
    false: { label: "Inactiva", bg: "#ffeaea", color: "#b72828" },
};

export const CompaniasSection = () => {
    const companies = useCompaniesStore((s) => s.companies);
    const loading = useCompaniesStore((s) => s.loading);
    const error = useCompaniesStore((s) => s.error);
    const getCompanies = useCompaniesStore((s) => s.getCompanies);

    const [search, setSearch] = useState("");

    useEffect(() => {
        getCompanies();
    }, [getCompanies]);

    const filtered = companies.filter((c) => {
        const term = search.toLowerCase();
        return (
            (c.legalName || "").toLowerCase().includes(term) ||
            (c.alias || "").toLowerCase().includes(term) ||
            (c.sector || "").toLowerCase().includes(term) ||
            (c.email || "").toLowerCase().includes(term)
        );
    });

    const activeCount = companies.filter((c) => c.isActive !== false).length;
    const inactiveCount = companies.length - activeCount;

    if (loading && companies.length === 0) {
        return (
            <div className="flex items-center justify-center h-64">
                <Spinner size="lg" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <header className="header flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-extrabold text-stone-800">Compañías Registradas</h2>
                    <p className="text-stone-500 text-sm">Vista global de todas las empresas afiliadas a la plataforma.</p>
                </div>
            </header>

            {/* KPIs */}
            <section className="kpis grid grid-cols-1 sm:grid-cols-3 gap-5">
                <article className="kpi bg-white p-5 rounded-2xl border border-stone-200 shadow-sm flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-purple-50 flex items-center justify-center border border-purple-100 text-purple-600">
                        <i className="fas fa-building text-lg" />
                    </div>
                    <div>
                        <span className="text-stone-500 text-xs font-semibold block">Total de Compañías</span>
                        <strong className="text-2xl font-black text-stone-800">{companies.length}</strong>
                    </div>
                </article>

                <article className="kpi bg-white p-5 rounded-2xl border border-stone-200 shadow-sm flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center border border-emerald-100 text-emerald-600">
                        <i className="fas fa-check-circle text-lg" />
                    </div>
                    <div>
                        <span className="text-stone-500 text-xs font-semibold block">Compañías Activas</span>
                        <strong className="text-2xl font-black text-emerald-700">{activeCount}</strong>
                    </div>
                </article>

                <article className="kpi bg-white p-5 rounded-2xl border border-stone-200 shadow-sm flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-rose-50 flex items-center justify-center border border-rose-100 text-rose-600">
                        <i className="fas fa-times-circle text-lg" />
                    </div>
                    <div>
                        <span className="text-stone-500 text-xs font-semibold block">Compañías Inactivas</span>
                        <strong className="text-2xl font-black text-rose-700">{inactiveCount}</strong>
                    </div>
                </article>
            </section>

            {/* Toolbar */}
            <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-sm flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="relative w-full sm:w-80">
                    <i className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" />
                    <input
                        type="text"
                        placeholder="Buscar por nombre, alias o sector..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 text-sm border border-stone-200 rounded-xl outline-none focus:border-orange-500 transition-colors"
                    />
                </div>
                {error && (
                    <span className="text-xs font-medium text-red-500 bg-red-50 px-3 py-1.5 rounded-lg border border-red-100">
                        {error}
                    </span>
                )}
            </div>

            {/* Table */}
            <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-stone-50 border-b border-stone-200">
                                <th className="px-6 py-4 text-xs font-bold text-stone-500 uppercase">Empresa / Compañía</th>
                                <th className="px-6 py-4 text-xs font-bold text-stone-500 uppercase">Sector</th>
                                <th className="px-6 py-4 text-xs font-bold text-stone-500 uppercase">Contacto</th>
                                <th className="px-6 py-4 text-xs font-bold text-stone-500 uppercase text-center">Estado</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-stone-200">
                            {filtered.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="px-6 py-12 text-center text-stone-500 text-sm">
                                        No se encontraron compañías registradas.
                                    </td>
                                </tr>
                            ) : (
                                filtered.map((c) => {
                                    const state = STATUS_MAP[c.isActive !== false] || STATUS_MAP[true];
                                    return (
                                        <tr key={c._id || c.id} className="hover:bg-stone-50/50 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-xl bg-purple-100 border border-purple-200 text-purple-600 flex items-center justify-center font-bold text-base shadow-sm">
                                                        {(c.legalName || "C").charAt(0).toUpperCase()}
                                                    </div>
                                                    <div>
                                                        <h4 className="text-sm font-bold text-stone-800 leading-tight">
                                                            {c.legalName || "Sin Nombre Legal"}
                                                        </h4>
                                                        <span className="text-xs text-stone-500">
                                                            {c.alias || "Sin Alias"}
                                                        </span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-stone-600 font-medium">
                                                {c.sector || "General"}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-semibold text-stone-700">{c.email || "Sin email"}</span>
                                                    <span className="text-xs text-stone-500">{c.phoneNumber || "Sin teléfono"}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <span 
                                                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold shadow-xs border"
                                                    style={{ 
                                                        backgroundColor: state.bg, 
                                                        color: state.color,
                                                        borderColor: `${state.color}15`
                                                    }}
                                                >
                                                    {state.label}
                                                </span>
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};
