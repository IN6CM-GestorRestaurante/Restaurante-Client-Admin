import { Modal } from "../../../shared/ui/Modal";

export const ReservationModal = ({ isOpen, onClose }) => {
    return (
        <Modal 
            isOpen={isOpen} 
            onClose={onClose} 
            title="Nueva reservacion" 
            subtitle="Completa la información de la reservación"
        >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col md:col-span-2">
                    <label className="text-sm font-semibold text-gray-700 mb-1">Usuario (user)</label>
                    <input placeholder="MongoID" className="w-full px-3 py-2 rounded-lg border-2 border-gray-300 bg-gray-50 shadow-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition" />
                </div>

                <div className="flex flex-col md:col-span-2">
                    <label className="text-sm font-semibold text-gray-700 mb-1">Restaurante (restaurant)</label>
                    <input placeholder="MongoID" className="w-full px-3 py-2 rounded-lg border-2 border-gray-300 bg-gray-50 shadow-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition" />
                </div>

                <div className="flex flex-col">
                    <label className="text-sm font-semibold text-gray-700 mb-1">Tipo (type)</label>
                    <select className="w-full px-3 py-2 rounded-lg border-2 border-gray-300 bg-gray-50 shadow-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition">
                        <option>En Mesa</option>
                        <option>Para llevar</option>
                        <option>A domicilio</option>
                    </select>
                </div>

                <div className="flex flex-col">
                    <label className="text-sm font-semibold text-gray-700 mb-1">Mesa (table)</label>
                    <input placeholder="Requerido para En Mesa" className="w-full px-3 py-2 rounded-lg border-2 border-gray-300 bg-gray-50 shadow-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition" />
                </div>

                <div className="flex flex-col md:col-span-2">
                    <label className="text-sm font-semibold text-gray-700 mb-1">Fecha y hora (date)</label>
                    <input placeholder="2026-04-26T19:30:00.000Z" className="w-full px-3 py-2 rounded-lg border-2 border-gray-300 bg-gray-50 shadow-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition" />
                </div>

                <div className="flex flex-col md:col-span-2">
                    <label className="text-sm font-semibold text-gray-700 mb-1">Dirección entrega (deliveryAddress)</label>
                    <input placeholder="Requerido para A domicilio" className="w-full px-3 py-2 rounded-lg border-2 border-gray-300 bg-gray-50 shadow-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition" />
                </div>

                <div className="flex flex-col md:col-span-2">
                    <label className="text-sm font-semibold text-gray-700 mb-1">Item menu (items.menuItem)</label>
                    <input placeholder="MongoID" className="w-full px-3 py-2 rounded-lg border-2 border-gray-300 bg-gray-50 shadow-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition" />
                </div>

                <div className="flex flex-col">
                    <label className="text-sm font-semibold text-gray-700 mb-1">Cantidad item (items.quantity)</label>
                    <input type="number" min="1" className="w-full px-3 py-2 rounded-lg border-2 border-gray-300 bg-gray-50 shadow-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition" />
                </div>

                <div className="flex flex-col">
                    <label className="text-sm font-semibold text-gray-700 mb-1">Estado (status)</label>
                    <select className="w-full px-3 py-2 rounded-lg border-2 border-gray-300 bg-gray-50 shadow-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition">
                        <option>Confirmada</option>
                        <option>Pendiente</option>
                        <option>En curso</option>
                        <option>Completada</option>
                        <option>Cancelada</option>
                    </select>
                </div>

                <div className="flex flex-col md:col-span-2">
                    <label className="text-sm font-semibold text-gray-700 mb-1">Notas (notes)</label>
                    <textarea className="w-full px-3 py-2 rounded-lg border-2 border-gray-300 bg-gray-50 shadow-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition" placeholder="Observaciones..." />
                </div>
            </div>

            <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 pt-4 border-t">
                <button type="button" onClick={onClose} className="w-full sm:w-auto px-4 py-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition">Cancelar</button>
                <button type="button" onClick={onClose} className="w-full sm:w-auto px-5 py-2 rounded-lg text-white font-medium transition shadow" style={{ background: "linear-gradient(135deg, var(--primary-red) 0%, var(--primary-orange) 100%)", border: "none" }}>Guardar</button>
            </div>
        </Modal>
    );
};
