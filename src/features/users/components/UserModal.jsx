import { useState, useEffect } from "react";
import { Modal } from "../../../shared/ui/Modal";
import { useSaveUser } from "../hooks/useSaveUser";
import { useUsersStore } from "../store/adminStore";
import { showError, showSuccess } from "../../../shared/utils/toast";

export const UserModal = ({ isOpen, initialData = null, onClose }) => {
    const { saveUser } = useSaveUser();
    const loading = useUsersStore((s) => s.loading);

    const [form, setForm] = useState({
        name: "",
        surname: "",
        phone: "",
        username: "",
        email: "",
        role: "ADMIN_ROLE",
        password: "",
        status: "Activo",
    });

    useEffect(() => {
        if (!isOpen) return;
        if (initialData) {
            setForm({
                name: initialData.name ?? "",
                surname: initialData.surname ?? "",
                phone: initialData.phone ?? "",
                username: initialData.username ?? "",
                email: initialData.email ?? "",
                role: initialData.role ?? "ADMIN_ROLE",
                password: "",
                status: initialData.status ?? "Activo",
            });
        } else {
            setForm({
                name: "",
                surname: "",
                phone: "",
                username: "",
                email: "",
                role: "ADMIN_ROLE",
                password: "",
                status: "Activo",
            });
        }
    }, [isOpen, initialData]);

    const handleSubmit = async () => {
        try {
            await saveUser(form, initialData?._id);
            showSuccess(initialData ? "Usuario actualizado" : "Usuario creado");
            onClose?.();
        } catch (err) {
            showError(err?.response?.data?.message || err?.message || "Error al guardar usuario");
        }
    };

    return (
        <Modal 
            isOpen={isOpen} 
            onClose={onClose} 
            title={initialData ? "Editar usuario" : "Nuevo usuario"} 
            subtitle="Completa la información del usuario"
        >
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 sm:gap-6">
                <div className="flex flex-col gap-2">
                    <label className="app-modal-fieldLabel">Nombre</label>
                    <input className="app-modal-input" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                </div>

                <div className="flex flex-col gap-2">
                    <label className="app-modal-fieldLabel">Apellido</label>
                    <input className="app-modal-input" value={form.surname} onChange={(e) => setForm({ ...form, surname: e.target.value })} />
                </div>

                <div className="flex flex-col gap-2">
                    <label className="app-modal-fieldLabel">Teléfono</label>
                    <input maxLength="8" className="app-modal-input" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                </div>

                <div className="flex flex-col gap-2">
                    <label className="app-modal-fieldLabel">Usuario</label>
                    <input className="app-modal-input" value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} />
                </div>

                <div className="flex flex-col gap-2">
                    <label className="app-modal-fieldLabel">Correo</label>
                    <input type="email" className="app-modal-input" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                </div>

                <div className="flex flex-col gap-2">
                    <label className="app-modal-fieldLabel">Rol</label>
                    <input placeholder="ADMIN_ROLE" className="app-modal-input" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} />
                </div>

                <div className="flex flex-col gap-2">
                    <label className="app-modal-fieldLabel">Contraseña</label>
                    <input type="password" className="app-modal-input" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
                </div>

                <div className="flex flex-col gap-2">
                    <label className="app-modal-fieldLabel">Estado</label>
                    <select className="app-modal-select" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
                        <option>Activo</option>
                        <option>Inactivo</option>
                    </select>
                </div>
            </div>

            <div className="app-modal-actions">
                <button type="button" onClick={onClose} className="app-modal-btn app-modal-btnSecondary w-full sm:w-auto">Cancelar</button>
                <button type="button" onClick={handleSubmit} className="app-modal-btn app-modal-btnPrimary w-full sm:w-auto" disabled={loading}>{loading ? "Guardando..." : "Guardar"}</button>
            </div>
        </Modal>
    );
};
