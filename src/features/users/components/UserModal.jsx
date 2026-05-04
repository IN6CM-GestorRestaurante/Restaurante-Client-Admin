import { Modal } from "../../../shared/ui/Modal";

export const UserModal = ({ isOpen, onClose }) => {
    return (
        <Modal 
            isOpen={isOpen} 
            onClose={onClose} 
            title="Nuevo usuario" 
            subtitle="Completa la información del usuario"
        >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col">
                    <label className="text-sm font-semibold text-gray-700 mb-1">Nombre (name)</label>
                    <input className="w-full px-3 py-2 rounded-lg border-2 border-gray-300 bg-gray-50 shadow-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition" />
                </div>

                <div className="flex flex-col">
                    <label className="text-sm font-semibold text-gray-700 mb-1">Apellido (surname)</label>
                    <input className="w-full px-3 py-2 rounded-lg border-2 border-gray-300 bg-gray-50 shadow-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition" />
                </div>

                <div className="flex flex-col md:col-span-2">
                    <label className="text-sm font-semibold text-gray-700 mb-1">Usuario (username)</label>
                    <input className="w-full px-3 py-2 rounded-lg border-2 border-gray-300 bg-gray-50 shadow-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition" />
                </div>

                <div className="flex flex-col md:col-span-2">
                    <label className="text-sm font-semibold text-gray-700 mb-1">Correo (email)</label>
                    <input type="email" className="w-full px-3 py-2 rounded-lg border-2 border-gray-300 bg-gray-50 shadow-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition" />
                </div>

                <div className="flex flex-col md:col-span-2">
                    <label className="text-sm font-semibold text-gray-700 mb-1">Contraseña (password)</label>
                    <input type="password" className="w-full px-3 py-2 rounded-lg border-2 border-gray-300 bg-gray-50 shadow-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition" />
                </div>

                <div className="flex flex-col">
                    <label className="text-sm font-semibold text-gray-700 mb-1">Teléfono (phone)</label>
                    <input maxLength="8" className="w-full px-3 py-2 rounded-lg border-2 border-gray-300 bg-gray-50 shadow-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition" />
                </div>

                <div className="flex flex-col">
                    <label className="text-sm font-semibold text-gray-700 mb-1">Rol (role)</label>
                    <input placeholder="ADMIN_ROLE" className="w-full px-3 py-2 rounded-lg border-2 border-gray-300 bg-gray-50 shadow-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition" />
                </div>

                <div className="flex flex-col md:col-span-2">
                    <label className="text-sm font-semibold text-gray-700 mb-1">Estado (status)</label>
                    <select className="w-full px-3 py-2 rounded-lg border-2 border-gray-300 bg-gray-50 shadow-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition">
                        <option>Activo</option>
                        <option>Inactivo</option>
                    </select>
                </div>
            </div>

            <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 pt-4 border-t">
                <button type="button" onClick={onClose} className="w-full sm:w-auto px-4 py-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition">Cancelar</button>
                <button type="button" onClick={onClose} className="w-full sm:w-auto px-5 py-2 rounded-lg text-white font-medium transition shadow" style={{ background: "linear-gradient(135deg, var(--primary-red) 0%, var(--primary-orange) 100%)", border: "none" }}>Guardar</button>
            </div>
        </Modal>
    );
};
