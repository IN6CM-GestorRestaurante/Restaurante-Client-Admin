import { useState, useEffect } from "react";

import { Modal } from "../../../shared/ui/Modal";
import { useSaveLocation } from "../hooks/useSaveLocation";
import { useLocationsStore } from "../store/adminStore";
import { getMenus } from "../../../shared/api/admin";
import { showError, showSuccess } from "../../../shared/utils/toast";

export const SucursalModal = ({ isOpen, initialData = null, onClose }) => {
    const { saveLocation } = useSaveLocation();
    const loading = useLocationsStore((state) => state.loading);
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
        photos: [],
    });
    const [preview, setPreview] = useState(null);
    const [categories, setCategories] = useState([]);
    const [errors, setErrors] = useState({});
    

    const [prevInitialData, setPrevInitialData] = useState(null);
    const [prevIsOpen, setPrevIsOpen] = useState(false);

    if (isOpen !== prevIsOpen || initialData !== prevInitialData) {
        setPrevIsOpen(isOpen);
        setPrevInitialData(initialData);

        if (isOpen) {
            setErrors({});
            const nextForm = initialData ? {
                name: initialData.name || "",
                descripcion: initialData.description || initialData.descripcion || "",
                address: initialData.address || "",
                openingTime: initialData.openingTime || "08:00",
                closingTime: initialData.closingTime || "22:00",
                category: initialData.category || "",
                averagePrice: initialData.averagePrice || "",
                email: initialData.email || "",
                phoneNumber: initialData.phoneNumber || "",
                state: initialData.state || "Operativa",
                photos: [],
            } : {
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
                photos: [],
            };
            setForm(nextForm);
            setPreview(initialData?.photos?.[0] || initialData?.image || null);
        }
    }

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const resp = await getMenus({ isActive: true });
                const list = resp?.data?.data ?? resp?.data ?? [];
                const uniq = Array.from(new Set(list.map((m) => m.category).filter(Boolean)));
                setCategories(uniq);
            } catch {
                // ignore errors - keep manual input
            }
        };

        if (isOpen) fetchCategories();
    }, [isOpen]);

    const handleFileChange = (event) => {
        const files = event.target.files;
        const file = files?.[0];

        setForm((current) => ({ ...current, photos: files ? Array.from(files) : [] }));

        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setPreview(imageUrl);
        }
    };

    const validate = () => {
        const newErrors = {};
        if (!form.name) newErrors.name = "Obligatorio";
        if (!form.phoneNumber) newErrors.phoneNumber = "Obligatorio";
        else if (form.phoneNumber.length < 8) newErrors.phoneNumber = "Min 8 dígitos";
        
        if (form.email && !/\S+@\S+\.\S+/.test(form.email)) newErrors.email = "Email inválido";
        if (!form.address) newErrors.address = "Obligatorio";
        if (!form.descripcion) newErrors.descripcion = "La descripción es obligatoria";
        else if (form.descripcion.length < 10) newErrors.descripcion = "Mínimo 10 caracteres";
        if (!form.averagePrice) newErrors.averagePrice = "Obligatorio";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async () => {
        if (!validate()) return;
        try {
            await saveLocation(form, initialData?._id);
            showSuccess(initialData ? "Sucursal actualizada correctamente" : "Sucursal creada correctamente");
            onClose?.();
        } catch (error) {
            const serverErrors = error?.response?.data?.errors;
            if (serverErrors && Array.isArray(serverErrors)) {
                const newErrors = {};
                serverErrors.forEach(e => {
                    const field = e.path || e.param;
                    if (field) newErrors[field] = e.msg;
                });
                setErrors(newErrors);
            }
            showError(error?.response?.data?.message || error?.message || "Error al guardar sucursal");
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={initialData ? "Editar sucursal" : "Nueva sucursal"}
            subtitle="Completa la información de la sucursal"
        >
            <div className="space-y-5">
                <div className="flex flex-col items-center justify-center pb-2 sm:pb-4">
                    <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-2xl border bg-gray-100 shadow-inner sm:h-28 sm:w-28 md:h-32 md:w-32">
                        {preview ? (
                            <img className="h-full w-full object-cover" src={preview} alt="Vista previa de sucursal" />
                        ) : (
                            <span className="text-xs text-gray-400 sm:text-sm">Sin imagen</span>
                        )}
                    </div>
                    {preview && (
                        <button
                            type="button"
                            onClick={() => {
                                setForm(current => ({ ...current, photos: [] }));
                                setPreview(null);
                                setForm(current => ({ ...current, removePhoto: true }));
                                const fileInput = document.querySelector('input[type="file"]');
                                if (fileInput) fileInput.value = "";
                            }}
                            className="mt-2 text-xs font-semibold text-red-500 hover:text-red-700 cursor-pointer flex items-center gap-1"
                        >
                            <i className="fas fa-trash-alt"></i> Eliminar imagen
                        </button>
                    )}
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 sm:gap-6">
                    <div className="flex flex-col gap-2">
                        <label className="app-modal-fieldLabel">Nombre</label>
                        <input
                            className={`app-modal-input ${errors.name ? 'border-red-500' : ''}`}
                            placeholder="Sucursal Centro"
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                        />
                        {errors.name && <span className="text-[10px] text-red-500 font-semibold mt-[-4px] ml-1">{errors.name}</span>}
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="app-modal-fieldLabel">Teléfono</label>
                        <input
                            className={`app-modal-input ${errors.phoneNumber ? 'border-red-500' : ''}`}
                            placeholder="+50212345678"
                            value={form.phoneNumber}
                            onChange={(e) => setForm({ ...form, phoneNumber: e.target.value })}
                        />
                        {errors.phoneNumber && <span className="text-[10px] text-red-500 font-semibold mt-[-4px] ml-1">{errors.phoneNumber}</span>}
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="app-modal-fieldLabel">Correo</label>
                        <input
                            type="email"
                            className={`app-modal-input ${errors.email ? 'border-red-500' : ''}`}
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                        />
                        {errors.email && <span className="text-[10px] text-red-500 font-semibold mt-[-4px] ml-1">{errors.email}</span>}
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="app-modal-fieldLabel">Dirección</label>
                        <input
                            className={`app-modal-input ${errors.address ? 'border-red-500' : ''}`}
                            placeholder="Avenida principal 123"
                            value={form.address}
                            onChange={(e) => setForm({ ...form, address: e.target.value })}
                        />
                        {errors.address && <span className="text-[10px] text-red-500 font-semibold mt-[-4px] ml-1">{errors.address}</span>}
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="app-modal-fieldLabel">Apertura</label>
                        <input
                            type="time"
                            className="app-modal-input"
                            value={form.openingTime}
                            onChange={(e) => setForm({ ...form, openingTime: e.target.value })}
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="app-modal-fieldLabel">Cierre</label>
                        <input
                            type="time"
                            className="app-modal-input"
                            value={form.closingTime}
                            onChange={(e) => setForm({ ...form, closingTime: e.target.value })}
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="app-modal-fieldLabel">Categoría</label>
                        {categories && categories.length > 0 ? (
                            <select
                                className="app-modal-select"
                                value={form.category}
                                onChange={(e) => setForm({ ...form, category: e.target.value })}
                            >
                                <option value="">-- Seleccionar --</option>
                                {categories.map((c) => (
                                    <option key={c} value={c}>{c}</option>
                                ))}
                            </select>
                        ) : (
                            <input
                                className="app-modal-input"
                                placeholder="Italiana"
                                value={form.category}
                                onChange={(e) => setForm({ ...form, category: e.target.value })}
                            />
                        )}
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="app-modal-fieldLabel">Precio promedio</label>
                        <input
                            type="number"
                            min="0"
                            step="0.5"
                            className="app-modal-input"
                            placeholder="00.00"
                            value={form.averagePrice}
                            onChange={(e) => setForm({ ...form, averagePrice: e.target.value })}
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="app-modal-fieldLabel">Estado</label>
                        <select
                            className="app-modal-select"
                            value={form.state}
                            onChange={(e) => setForm({ ...form, state: e.target.value })}
                        >
                            <option>Operativa</option>
                            <option>En mantenimiento</option>
                            <option>Cerrada</option>
                        </select>
                    </div>

                    <div className="flex flex-col gap-2 col-span-full">
                        <label className="app-modal-fieldLabel">Imagen</label>
                        <div className="flex w-full justify-center">
                            <input
                                type="file"
                                accept="image/*"
                                className="app-modal-input w-full cursor-pointer border-dashed md:w-3/4 lg:w-2/3"
                                onChange={handleFileChange}
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-2 col-span-full">
                        <label className="app-modal-fieldLabel">Descripción</label>
                        <div className="flex w-full justify-center">
                            <textarea
                                className="app-modal-textarea w-full md:w-3/4 lg:w-2/3"
                                placeholder="Detalles de la sucursal..."
                                value={form.descripcion}
                                onChange={(e) => setForm({ ...form, descripcion: e.target.value })}
                            />
                        </div>
                    </div>
                </div>

                <div className="app-modal-actions">
                    <button
                        type="button"
                        onClick={() => onClose?.()}
                        className="app-modal-btn app-modal-btnSecondary w-full sm:w-auto"
                    >
                        Cancelar
                    </button>
                    <button
                        type="button"
                        onClick={handleSubmit}
                        className="app-modal-btn app-modal-btnPrimary w-full sm:w-auto"
                        disabled={loading}
                    >
                        {loading ? "Guardando..." : "Guardar"}
                    </button>
                </div>
            </div>
        </Modal>
    );
};
