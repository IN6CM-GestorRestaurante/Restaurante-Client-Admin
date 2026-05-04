import { Modal } from "../../../shared/ui/Modal";

export const OrderModal = ({ isOpen, onClose }) => {
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Nueva orden"
            subtitle="Completa la información de la orden"
        >
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">
                <div className="flex flex-col gap-2 md:col-span-2">
                    <label className="app-modal-fieldLabel">Mesa</label>
                    <input placeholder="MongoID" className="app-modal-input" />
                </div>

                <div className="flex flex-col gap-2 md:col-span-2">
                    <label className="app-modal-fieldLabel">Restaurante</label>
                    <input placeholder="MongoID" className="app-modal-input" />
                </div>

                <div className="flex flex-col gap-2 md:col-span-2">
                    <label className="app-modal-fieldLabel">Platillo</label>
                    <input placeholder="MongoID" className="app-modal-input" />
                </div>

                <div className="flex flex-col gap-2">
                    <label className="app-modal-fieldLabel">Cantidad</label>
                    <input type="number" min="1" className="app-modal-input" />
                </div>

                <div className="flex flex-col gap-2">
                    <label className="app-modal-fieldLabel">Precio</label>
                    <input type="number" min="0" step="0.01" className="app-modal-input" />
                </div>

                <div className="flex flex-col gap-2 md:col-span-2">
                    <label className="app-modal-fieldLabel">Modificadores</label>
                    <input placeholder="Sin cebolla, extra queso" className="app-modal-input" />
                </div>

                <div className="flex flex-col gap-2">
                    <label className="app-modal-fieldLabel">Estado item</label>
                    <select className="app-modal-select">
                        <option>En espera</option>
                        <option>En cocina</option>
                        <option>Listo</option>
                        <option>Servido</option>
                    </select>
                </div>

                <div className="flex flex-col gap-2">
                    <label className="app-modal-fieldLabel">Estado orden</label>
                    <select className="app-modal-select">
                        <option>Abierta</option>
                        <option>Cerrada</option>
                        <option>Cancelada</option>
                    </select>
                </div>
            </div>

            <div className="app-modal-actions">
                <button type="button" onClick={() => onClose?.()} className="app-modal-btn app-modal-btnSecondary w-full sm:w-auto">Cancelar</button>
                <button type="button" onClick={() => onClose?.()} className="app-modal-btn app-modal-btnPrimary w-full sm:w-auto">Guardar</button>
            </div>
        </Modal>
    );
};
