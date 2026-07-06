import { useState } from "react";
import { Modal } from "../../../shared/ui/Modal";
import { useSaveUser } from "../hooks/useSaveUser";
import { useUsersStore } from "../store/adminStore";
import { showError, showSuccess } from "../../../shared/utils/toast";

const ROLE_OPTIONS = [
    { value: "COMPANY_ADMIN", label: "Administrador" },
    { value: "BRANCH_MANAGER", label: "Gerente de Sucursal" },
    { value: "WAITER", label: "Mesero" },
    { value: "WAITRESS", label: "Mesera" },
    { value: "CHEF", label: "Chef" },
    { value: "CASHIER", label: "Cajero" },
    { value: "RECEPTIONIST", label: "Recepcionista" },
];

export const UserModal = ({ isOpen, initialData = null, onClose }) => {
    const { saveUser } = useSaveUser();
    const loading = useUsersStore((s) => s.loading);

    const [form, setForm] = useState({
        name: "",
        surname: "",
        phone: "",
        username: "",
        email: "",
        role: "WAITER",
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
                username: initialData.username ?? initialData.name ?? "",
                email: initialData.email ?? "",
                role: initialData.role ?? "WAITER",
                password: "",
                status: initialData.status === true || initialData.status === "Activo" ? "Activo" : initialData.status === false || initialData.status === "Inactivo" ? "Inactivo" : (initialData.status ?? "Activo"),
                branchId: initialData.branchId ?? "",
            } : {
                name: "",
                surname: "",
                phone: "",
                username: "",
                email: "",
                role: "WAITER",
                password: "",
                status: "Activo",
                branchId: "",
            };
            setForm(nextForm);
        }
    }

    const validate = () => {
        const newErrors = {};
        if (!form.username) newErrors.username = "Obligatorio";

        if (!form.email) newErrors.email = "Obligatorio";
        else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = "Email inválido";

        if (!initialData && !form.password) newErrors.password = "Obligatorio";
        if (form.password && form.password.length < 6) newErrors.password = "Mínimo 6 caracteres";

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
            const errData = err?.response?.data || {};
            const serverErrors = errData.errors || errData.error;
            const newErrors = {};
            let firstErrMsg = null;
            if (serverErrors) {
                if (Array.isArray(serverErrors)) {
                    serverErrors.forEach(e => {
                        const field = e.field || e.param || e.path;
                        const msg = e.message || e.msg;
                        if (field) newErrors[field.toLowerCase()] = msg;
                        if (!firstErrMsg) firstErrMsg = msg;
                    });
                } else if (typeof serverErrors === 'object') {
                    Object.keys(serverErrors).forEach(key => {
                        const val = serverErrors[key];
                        const msg = Array.isArray(val) ? val[0] : val;
                        newErrors[key.toLowerCase()] = msg;
                        if (!firstErrMsg) firstErrMsg = msg;
                    });
                }
                if (Object.keys(newErrors).length > 0) setErrors(prev => ({ ...prev, ...newErrors }));
            }
            showError(firstErrMsg || errData.message || errData.details || err?.message || "Error al guardar usuario");
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
                    <input className={`app-modal-input ${errors.name ? 'border-red-500' : ''}`} placeholder="Ej. Juan" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                    {errors.name && <span className="text-[10px] text-red-500 font-semibold mt-[-4px] ml-1">{errors.name}</span>}
                </div>

                <div className="flex flex-col gap-2">
                    <label className="app-modal-fieldLabel">Apellido</label>
                    <input className={`app-modal-input ${errors.surname ? 'border-red-500' : ''}`} placeholder="Ej. Pérez" value={form.surname} onChange={(e) => setForm({ ...form, surname: e.target.value })} />
                    {errors.surname && <span className="text-[10px] text-red-500 font-semibold mt-[-4px] ml-1">{errors.surname}</span>}
                </div>

                <div className="flex flex-col gap-2">
                    <label className="app-modal-fieldLabel">Teléfono</label>
                    <input maxLength="8" className={`app-modal-input ${errors.phone ? 'border-red-500' : ''}`} placeholder="Ej. 55551234" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                    {errors.phone && <span className="text-[10px] text-red-500 font-semibold mt-[-4px] ml-1">{errors.phone}</span>}
                </div>

                <div className="flex flex-col gap-2">
                    <label className="app-modal-fieldLabel">Usuario</label>
                    <input className={`app-modal-input ${errors.username ? 'border-red-500' : ''}`} placeholder="Ej. jperez" value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} />
                    {errors.username && <span className="text-[10px] text-red-500 font-semibold mt-[-4px] ml-1">{errors.username}</span>}
                </div>

                <div className="flex flex-col gap-2">
                    <label className="app-modal-fieldLabel">Correo</label>
                    <input type="email" className={`app-modal-input ${errors.email ? 'border-red-500' : ''}`} placeholder="Ej. juan@correo.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                    {errors.email && <span className="text-[10px] text-red-500 font-semibold mt-[-4px] ml-1">{errors.email}</span>}
                </div>

                <div className="flex flex-col gap-2">
                    <label className="app-modal-fieldLabel">Rol</label>
                    <select className={`app-modal-select ${errors.role ? 'border-red-500' : ''}`} value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}>
                        {ROLE_OPTIONS.map(opt => (
                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                    </select>
                    {errors.role && <span className="text-[10px] text-red-500 font-semibold mt-[-4px] ml-1">{errors.role}</span>}
                </div>

                <div className="flex flex-col gap-2">
                    <label className="app-modal-fieldLabel">Contraseña {initialData ? "(dejar vacío para no cambiar)" : ""}</label>
                    <input type="password" className={`app-modal-input ${errors.password ? 'border-red-500' : ''}`} placeholder={initialData ? "••••••••" : "Mínimo 6 caracteres"} value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
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

