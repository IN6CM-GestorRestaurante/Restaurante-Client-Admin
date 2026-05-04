import { Modal } from "../../../shared/ui/Modal";

export const MenuModal = ({ isOpen, initialData = null, onClose }) => {
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={initialData ? "Editar producto" : "Nuevo producto"}
            subtitle="Completa la información del producto"
        >
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">
                <div className="flex justify-center md:col-span-2">
                    <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-2xl border bg-gray-100 shadow-inner sm:h-28 sm:w-28 md:h-32 md:w-32">
                        <span className="text-xs text-gray-400 sm:text-sm">Sin imagen</span>
                    </div>
                </div>

                <div className="flex flex-col gap-2 md:col-span-2">
                    <label className="app-modal-fieldLabel">Restaurante</label>
                    <input className="app-modal-input" placeholder="MongoID" />
                </div>

                <div className="flex flex-col gap-2 md:col-span-2">
                    <label className="app-modal-fieldLabel">Nombre</label>
                    <input className="app-modal-input" placeholder="Ej. Pasta Alfredo" />
                </div>

                <div className="flex flex-col gap-2 md:col-span-2">
                    <label className="app-modal-fieldLabel">Descripcion</label>
                    <textarea className="app-modal-textarea" placeholder="Detalles del producto..." />
                </div>

                <div className="flex flex-col gap-2 md:col-span-2">
                    <label className="app-modal-fieldLabel">Ingredientes</label>
                    <input className="app-modal-input" placeholder="tomate, queso, albahaca" />
                </div>

                <div className="flex flex-col gap-2">
                    <label className="app-modal-fieldLabel">Precio</label>
                    <input type="number" min="0" step="0.01" className="app-modal-input" placeholder="00.00" />
                </div>

                <div className="flex flex-col gap-2">
                    <label className="app-modal-fieldLabel">Categoria</label>
                    <select className="app-modal-select">
                        <option>Entrada</option>
                        <option>Plato Fuerte</option>
                        <option>Postre</option>
                        <option>Bebida</option>
                        <option>Acompañamiento</option>
                        <option>Otro</option>
                    </select>
                </div>

                <div className="flex flex-col gap-2 md:col-span-2">
                    <label className="app-modal-fieldLabel">Imagen</label>
                    <input type="file" accept="image/*" className="app-modal-input cursor-pointer border-dashed" />
                </div>

                <div className="flex flex-col gap-2 md:col-span-2">
                    <label className="app-modal-fieldLabel">Activo</label>
                    <select className="app-modal-select">
                        <option>Activo</option>
                        <option>Inactivo</option>
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