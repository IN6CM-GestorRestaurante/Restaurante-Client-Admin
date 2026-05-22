import { useState } from "react";
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

    const [errors, setErrors] = useState({});
    const [prevInitialData, setPrevInitialData] = useState(null);
    const [prevIsOpen, setPrevIsOpen] = useState(false);

    if (isOpen !== prevIsOpen || initialData !== prevInitialData) {
        setPrevIsOpen(isOpen);
        setPrevInitialData(initialData);

        if (isOpen) {
            setErrors({});
            const nextForm = initialData ? {
                name: initialData.name ?? "",
                surname: initialData.surname ?? "",
                phone: initialData.phone ?? "",
                username: initialData.username ?? "",
                email: initialData.email ?? "",
                role: initialData.role ?? "ADMIN_ROLE",
                password: "",
                status: initialData.status ?? "Activo",
            } : {
                name: "",
                surname: "",
                phone: "",
                username: "",
                email: "",
                role: "ADMIN_ROLE",
                password: "",
                status: "Activo",
            };
            setForm(nextForm);
        }
    }

    const validate = () => {
        const newErrors = {};
        if (!form.name) newErrors.name = "Obligatorio";
        else if (form.name.length > 25) newErrors.name = "Máx 25 carac.";

        if (!form.surname) newErrors.surname = "Obligatorio";
        else if (form.surname.length > 25) newErrors.surname = "Máx 25 carac.";

        if (!form.email) newErrors.email = "Obligatorio";
        else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = "Email inválido";

        if (!form.phone) newErrors.phone = "Obligatorio";
        else if (form.phone.length !== 8) newErrors.phone = "8 dígitos";

        if (!form.username) newErrors.username = "Obligatorio";

        if (!initialData && !form.password) newErrors.password = "Obligatorio";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async () => {
        if (!validate()) return;
        try {
            await saveUser(form, initialData?._id);
            showSuccess(initialData ? "Usuario actualizado" : "Usuario creado");
            onClose?.();
        } catch (err) {
            const serverErrors = err?.response?.data?.errors;
            if (serverErrors && Array.isArray(serverErrors)) {
                const newErrors = {};
                serverErrors.forEach(e => {
                    if (e.path) newErrors[e.path] = e.msg;
                    else if (e.param) newErrors[e.param] = e.msg;
                });
                setErrors(newErrors);
            }
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
                    <input className={`app-modal-input ${errors.name ? 'border-red-500' : ''}`} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                    {errors.name && <span className="text-[10px] text-red-500 font-semibold mt-[-4px] ml-1">{errors.name}</span>}
                </div>

                <div className="flex flex-col gap-2">
                    <label className="app-modal-fieldLabel">Apellido</label>
                    <input className={`app-modal-input ${errors.surname ? 'border-red-500' : ''}`} value={form.surname} onChange={(e) => setForm({ ...form, surname: e.target.value })} />
                    {errors.surname && <span className="text-[10px] text-red-500 font-semibold mt-[-4px] ml-1">{errors.surname}</span>}
                </div>

                <div className="flex flex-col gap-2">
                    <label className="app-modal-fieldLabel">Teléfono</label>
                    <input maxLength="8" className={`app-modal-input ${errors.phone ? 'border-red-500' : ''}`} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                    {errors.phone && <span className="text-[10px] text-red-500 font-semibold mt-[-4px] ml-1">{errors.phone}</span>}
                </div>

                <div className="flex flex-col gap-2">
                    <label className="app-modal-fieldLabel">Usuario</label>
                    <input className={`app-modal-input ${errors.username ? 'border-red-500' : ''}`} value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} />
                    {errors.username && <span className="text-[10px] text-red-500 font-semibold mt-[-4px] ml-1">{errors.username}</span>}
                </div>

                <div className="flex flex-col gap-2">
                    <label className="app-modal-fieldLabel">Correo</label>
                    <input type="email" className={`app-modal-input ${errors.email ? 'border-red-500' : ''}`} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                    {errors.email && <span className="text-[10px] text-red-500 font-semibold mt-[-4px] ml-1">{errors.email}</span>}
                </div>

                <div className="flex flex-col gap-2">
                    <label className="app-modal-fieldLabel">Rol</label>
                    <input placeholder="ADMIN_ROLE" className="app-modal-input" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} />
                </div>

                <div className="flex flex-col gap-2">
                    <label className="app-modal-fieldLabel">Contraseña</label>
                    <input type="password" className={`app-modal-input ${errors.password ? 'border-red-500' : ''}`} value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
                    {errors.password && <span className="text-[10px] text-red-500 font-semibold mt-[-4px] ml-1">{errors.password}</span>}
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
