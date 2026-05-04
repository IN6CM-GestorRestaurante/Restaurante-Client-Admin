import { Modal } from "../../../shared/ui/Modal";

export const UserModal = ({ isOpen, onClose }) => {
    return (
        <Modal 
            isOpen={isOpen} 
            onClose={onClose} 
            title="Nuevo usuario" 
            subtitle="Completa la información del usuario"
        >
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">
                <div className="flex flex-col gap-2">
                    <label className="app-modal-fieldLabel">Nombre</label>
                    <input className="app-modal-input" />
                </div>

                <div className="flex flex-col gap-2">
                    <label className="app-modal-fieldLabel">Apellido</label>
                    <input className="app-modal-input" />
                </div>

                <div className="flex flex-col gap-2 md:col-span-2">
                    <label className="app-modal-fieldLabel">Usuario</label>
                    <input className="app-modal-input" />
                </div>

                <div className="flex flex-col gap-2 md:col-span-2">
                    <label className="app-modal-fieldLabel">Correo</label>
                    <input type="email" className="app-modal-input" />
                </div>

                <div className="flex flex-col gap-2 md:col-span-2">
                    <label className="app-modal-fieldLabel">Contraseña</label>
                    <input type="password" className="app-modal-input" />
                </div>

                <div className="flex flex-col gap-2">
                    <label className="app-modal-fieldLabel">Teléfono</label>
                    <input maxLength="8" className="app-modal-input" />
                </div>

                <div className="flex flex-col gap-2">
                    <label className="app-modal-fieldLabel">Rol</label>
                    <input placeholder="ADMIN_ROLE" className="app-modal-input" />
                </div>

                <div className="flex flex-col gap-2 md:col-span-2">
                    <label className="app-modal-fieldLabel">Estado</label>
                    <select className="app-modal-select">
                        <option>Activo</option>
                        <option>Inactivo</option>
                    </select>
                </div>
            </div>

            <div className="app-modal-actions">
                <button type="button" onClick={onClose} className="app-modal-btn app-modal-btnSecondary w-full sm:w-auto">Cancelar</button>
                <button type="button" onClick={onClose} className="app-modal-btn app-modal-btnPrimary w-full sm:w-auto">Guardar</button>
            </div>
        </Modal>
    );
};
