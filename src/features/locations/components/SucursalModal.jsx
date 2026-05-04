import { useState, useEffect } from "react";
import { Modal } from "../../../shared/ui/Modal";

export const SucursalModal = ({ isOpen, initialData = null, onClose }) => {
    const [form, setForm] = useState({
        name: "",
        descripcion: "",
        address: "",
        openingTime: "08:00",
        closingTime: "22:00",
        category: "",
        averagePrice: "",
        email: "",
        phoneNumber: "",
        state: "Operativa",
    });

    useEffect(() => {
        if (initialData) {
            setForm((current) => ({ ...current, ...initialData }));
        }
    }, [initialData]);

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={initialData ? "Editar sucursal" : "Nueva sucursal"}
            subtitle="Completa la información de la sucursal"
        >
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">
                <div className="flex justify-center md:col-span-2">
                    <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-2xl border bg-gray-100 shadow-inner sm:h-28 sm:w-28 md:h-32 md:w-32">
                        <span className="text-xs text-gray-400 sm:text-sm">Sin imagen</span>
                    </div>
                </div>

                <div className="flex flex-col gap-2 md:col-span-2">
                    <label className="app-modal-fieldLabel">Nombre</label>
                    <input className="app-modal-input" placeholder="Sucursal Centro" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                </div>

                <div className="flex flex-col gap-2 md:col-span-2">
                    <label className="app-modal-fieldLabel">Descripción</label>
                    <textarea className="app-modal-textarea" placeholder="Detalles de la sucursal..." value={form.descripcion} onChange={(e) => setForm({ ...form, descripcion: e.target.value })} />
                </div>

                <div className="flex flex-col gap-2">
                    <label className="app-modal-fieldLabel">Dirección</label>
                    <input className="app-modal-input" placeholder="Avenida principal 123" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
                </div>

                <div className="flex flex-col gap-2">
                    <label className="app-modal-fieldLabel">Apertura</label>
                    <input type="time" className="app-modal-input" value={form.openingTime} onChange={(e) => setForm({ ...form, openingTime: e.target.value })} />
                </div>

                <div className="flex flex-col gap-2">
                    <label className="app-modal-fieldLabel">Cierre</label>
                    <input type="time" className="app-modal-input" value={form.closingTime} onChange={(e) => setForm({ ...form, closingTime: e.target.value })} />
                </div>

                <div className="flex flex-col gap-2">
                    <label className="app-modal-fieldLabel">Categoria</label>
                    <input className="app-modal-input" placeholder="Italiana" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} />
                </div>

                <div className="flex flex-col gap-2">
                    <label className="app-modal-fieldLabel">Precio promedio</label>
                    <input type="number" min="0" step="0.01" className="app-modal-input" placeholder="00.00" value={form.averagePrice} onChange={(e) => setForm({ ...form, averagePrice: e.target.value })} />
                </div>

                <div className="flex flex-col gap-2">
                    <label className="app-modal-fieldLabel">Correo</label>
                    <input type="email" className="app-modal-input" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                </div>

                <div className="flex flex-col gap-2">
                    <label className="app-modal-fieldLabel">Teléfono</label>
                    <input className="app-modal-input" placeholder="+50212345678" value={form.phoneNumber} onChange={(e) => setForm({ ...form, phoneNumber: e.target.value })} />
                </div>

                <div className="flex flex-col gap-2 md:col-span-2">
                    <label className="app-modal-fieldLabel">Imagen</label>
                    <input type="file" accept="image/*" className="app-modal-input cursor-pointer border-dashed" />
                </div>

                <div className="flex flex-col gap-2 md:col-span-2">
                    <label className="app-modal-fieldLabel">Estado</label>
                    <select className="app-modal-select" value={form.state} onChange={(e) => setForm({ ...form, state: e.target.value })}>
                        <option>Operativa</option>
                        <option>En mantenimiento</option>
                        <option>Cerrada</option>
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
