import { Modal } from "../../../shared/ui/Modal";

export const ReservationModal = ({ isOpen, onClose }) => {
    return (
        <Modal 
            isOpen={isOpen} 
            onClose={onClose} 
            title="Nueva reservacion" 
            subtitle="Completa la información de la reservación"
        >
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">
                <div className="flex flex-col gap-2 md:col-span-2">
                    <label className="app-modal-fieldLabel">Usuario</label>
                    <input placeholder="MongoID" className="app-modal-input" />
                </div>

                <div className="flex flex-col gap-2 md:col-span-2">
                    <label className="app-modal-fieldLabel">Restaurante</label>
                    <input placeholder="MongoID" className="app-modal-input" />
                </div>

                <div className="flex flex-col gap-2">
                    <label className="app-modal-fieldLabel">Tipo</label>
                    <select className="app-modal-select">
                        <option>En Mesa</option>
                        <option>Para llevar</option>
                        <option>A domicilio</option>
                    </select>
                </div>

                <div className="flex flex-col gap-2">
                    <label className="app-modal-fieldLabel">Mesa</label>
                    <input placeholder="Requerido para En Mesa" className="app-modal-input" />
                </div>

                <div className="flex flex-col gap-2 md:col-span-2">
                    <label className="app-modal-fieldLabel">Fecha y hora</label>
                    <input placeholder="2026-04-26T19:30:00.000Z" className="app-modal-input" />
                </div>

                <div className="flex flex-col gap-2 md:col-span-2">
                    <label className="app-modal-fieldLabel">Dirección entrega</label>
                    <input placeholder="Requerido para A domicilio" className="app-modal-input" />
                </div>

                <div className="flex flex-col gap-2 md:col-span-2">
                    <label className="app-modal-fieldLabel">Item menú</label>
                    <input placeholder="MongoID" className="app-modal-input" />
                </div>

                <div className="flex flex-col gap-2">
                    <label className="app-modal-fieldLabel">Cantidad item</label>
                    <input type="number" min="1" className="app-modal-input" />
                </div>

                <div className="flex flex-col gap-2">
                    <label className="app-modal-fieldLabel">Estado</label>
                    <select className="app-modal-select">
                        <option>Confirmada</option>
                        <option>Pendiente</option>
                        <option>En curso</option>
                        <option>Completada</option>
                        <option>Cancelada</option>
                    </select>
                </div>

                <div className="flex flex-col gap-2 md:col-span-2">
                    <label className="app-modal-fieldLabel">Notas</label>
                    <textarea className="app-modal-textarea" placeholder="Observaciones..." />
                </div>
            </div>

            <div className="app-modal-actions">
                <button type="button" onClick={onClose} className="app-modal-btn app-modal-btnSecondary w-full sm:w-auto">Cancelar</button>
                <button type="button" onClick={onClose} className="app-modal-btn app-modal-btnPrimary w-full sm:w-auto">Guardar</button>
            </div>
        </Modal>
    );
};
