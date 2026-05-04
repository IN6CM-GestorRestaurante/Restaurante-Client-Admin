import { Modal } from "../../../shared/ui/Modal";

export const TableModal = ({ isOpen, onClose, initialData }) => {
    return (
        <Modal 
            isOpen={isOpen} 
            onClose={onClose} 
            title={initialData ? "Editar mesa" : "Nueva mesa"} 
            subtitle="Completa la información de la mesa"
        >
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 sm:gap-6">
                <div className="flex flex-col">
                    <label className="app-modal-fieldLabel">Restaurante</label>
                    <input placeholder="MongoID" className="app-modal-input" />
                </div>

                <div className="flex flex-col gap-2">
                    <label className="app-modal-fieldLabel">Número</label>
                    <input placeholder="Mesa 12" className="app-modal-input" />
                </div>

                <div className="flex flex-col gap-2">
                    <label className="app-modal-fieldLabel">Capacidad</label>
                    <input type="number" min="1" placeholder="4" className="app-modal-input" />
                </div>

                <div className="flex flex-col gap-2">
                    <label className="app-modal-fieldLabel">Ubicación</label>
                    <select className="app-modal-select">
                        <option>Terraza</option>
                        <option>Sala Principal</option>
                        <option>VIP</option>
                        <option>Bar</option>
                        <option>Ventana</option>
                        <option>Balcón</option>
                        <option>Otro</option>
                    </select>
                </div>

                <div className="flex flex-col gap-2">
                    <label className="app-modal-fieldLabel">Estado</label>
                    <select className="app-modal-select">
                        <option>Disponible</option>
                        <option>Ocupada</option>
                        <option>Reservada</option>
                        <option>Mantenimiento</option>
                    </select>
                </div>

                <div className="flex flex-col gap-2 sm:col-span-2 lg:col-span-2">
                    <label className="app-modal-fieldLabel">Día horario</label>
                    <input placeholder="Lunes" className="app-modal-input" />
                </div>

                <div className="flex flex-col gap-2 sm:col-span-1">
                    <label className="app-modal-fieldLabel">Inicio horario</label>
                    <input placeholder="08:00" className="app-modal-input" />
                </div>

                <div className="flex flex-col gap-2 sm:col-span-2 lg:col-span-1">
                    <label className="app-modal-fieldLabel">Fin horario</label>
                    <input placeholder="22:00" className="app-modal-input" />
                </div>

                <div className="flex flex-col gap-2 sm:col-span-2 lg:col-span-2">
                    <label className="app-modal-fieldLabel">Descripción</label>
                    <textarea rows="4" className="app-modal-textarea" placeholder="Detalles de la mesa..." />
                </div>
            </div>

            <div className="app-modal-actions">
                <button type="button" onClick={onClose} className="app-modal-btn app-modal-btnSecondary w-full sm:w-auto">Cancelar</button>
                <button type="button" onClick={onClose} className="app-modal-btn app-modal-btnPrimary w-full sm:w-auto">Guardar</button>
            </div>
        </Modal>
    );
};
