import { Modal } from "../../../shared/ui/Modal";

export const TableModal = ({ isOpen, onClose, initialData }) => {
    return (
        <Modal 
            isOpen={isOpen} 
            onClose={onClose} 
            title={initialData ? "Editar mesa" : "Nueva mesa"} 
            subtitle="Completa la información de la mesa"
        >
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
                <button type="button" onClick={onClose} className="w-full sm:w-auto px-4 py-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition">Cancelar</button>
                <button type="button" onClick={onClose} className="w-full sm:w-auto px-5 py-2 rounded-lg text-white font-medium transition shadow" style={{ background: "linear-gradient(135deg, var(--primary-red) 0%, var(--primary-orange) 100%)", border: "none" }}>Guardar</button>
            </div>
        </Modal>
    );
};
