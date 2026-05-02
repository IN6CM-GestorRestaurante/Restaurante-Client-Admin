export const TableModal = ({ onClose }) => {
    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 px-3 sm:px-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg md:max-w-2xl max-h-[90vh] flex flex-col overflow-hidden">
                <div className="p-4 sm:p-5 text-white sticky top-0 z-10" style={{ background: "linear-gradient(90deg, var(--main-blue) 0%, #1956a3 100%)" }}>
                    <h2 className="text-xl sm:text-2xl font-bold">Nueva mesa</h2>
                    <p className="text-xs sm:text-sm opacity-80">Completa la información de la mesa</p>
                </div>

                <div className="p-4 sm:p-6 space-y-5 overflow-y-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex flex-col md:col-span-2">
                            <label className="text-sm font-semibold text-gray-700 mb-1">Restaurante (restaurant)</label>
                            <input placeholder="MongoID" className="w-full px-3 py-2 rounded-lg border-2 border-gray-300 bg-gray-50 shadow-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition" />
                        </div>

                        <div className="flex flex-col">
                            <label className="text-sm font-semibold text-gray-700 mb-1">Número (number)</label>
                            <input placeholder="Mesa 12" className="w-full px-3 py-2 rounded-lg border-2 border-gray-300 bg-gray-50 shadow-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition" />
                        </div>

                        <div className="flex flex-col">
                            <label className="text-sm font-semibold text-gray-700 mb-1">Capacidad (capacity)</label>
                            <input type="number" min="1" placeholder="4" className="w-full px-3 py-2 rounded-lg border-2 border-gray-300 bg-gray-50 shadow-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition" />
                        </div>

                        <div className="flex flex-col">
                            <label className="text-sm font-semibold text-gray-700 mb-1">Ubicación (location)</label>
                            <select className="w-full px-3 py-2 rounded-lg border-2 border-gray-300 bg-gray-50 shadow-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition">
                                <option>Terraza</option>
                                <option>Sala Principal</option>
                                <option>VIP</option>
                                <option>Bar</option>
                                <option>Ventana</option>
                                <option>Balcón</option>
                                <option>Otro</option>
                            </select>
                        </div>

                        <div className="flex flex-col">
                            <label className="text-sm font-semibold text-gray-700 mb-1">Estado (status)</label>
                            <select className="w-full px-3 py-2 rounded-lg border-2 border-gray-300 bg-gray-50 shadow-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition">
                                <option>Disponible</option>
                                <option>Ocupada</option>
                                <option>Reservada</option>
                                <option>Mantenimiento</option>
                            </select>
                        </div>

                        <div className="flex flex-col">
                            <label className="text-sm font-semibold text-gray-700 mb-1">Día horario (availabilitySchedules.day)</label>
                            <input placeholder="Lunes" className="w-full px-3 py-2 rounded-lg border-2 border-gray-300 bg-gray-50 shadow-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition" />
                        </div>

                        <div className="flex flex-col">
                            <label className="text-sm font-semibold text-gray-700 mb-1">Inicio horario (startTime)</label>
                            <input placeholder="08:00" className="w-full px-3 py-2 rounded-lg border-2 border-gray-300 bg-gray-50 shadow-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition" />
                        </div>

                        <div className="flex flex-col">
                            <label className="text-sm font-semibold text-gray-700 mb-1">Fin horario (endTime)</label>
                            <input placeholder="22:00" className="w-full px-3 py-2 rounded-lg border-2 border-gray-300 bg-gray-50 shadow-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition" />
                        </div>

                        <div className="flex flex-col md:col-span-2">
                            <label className="text-sm font-semibold text-gray-700 mb-1">Descripción (description)</label>
                            <textarea className="w-full px-3 py-2 rounded-lg border-2 border-gray-300 bg-gray-50 shadow-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition" placeholder="Detalles de la mesa..." />
                        </div>
                    </div>

                    <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 pt-4 border-t">
                        <button type="button" onClick={() => onClose?.()} className="w-full sm:w-auto px-4 py-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition">Cancelar</button>
                        <button type="button" onClick={() => onClose?.()} className="w-full sm:w-auto px-5 py-2 rounded-lg text-white font-medium transition shadow" style={{ background: "linear-gradient(90deg, var(--main-blue) 0%, #1956a3 100%)", border: "none" }}>Guardar</button>
                    </div>
                </div>
            </div>
        </div>
    );
};
