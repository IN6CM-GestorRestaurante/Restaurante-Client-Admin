import { useEffect, useState } from "react";

import { Modal } from "../../../shared/ui/Modal";
import { useMenusStore } from "../store/adminStore";
import { useSaveMenu } from "../hooks/useSaveMenu";
import { showError, showSuccess } from "../../../shared/utils/toast";

export const MenuModal = ({ isOpen, initialData = null, onClose }) => {
    const { saveMenu } = useSaveMenu();
    const loading = useMenusStore((state) => state.loading);
    const getDependencies = useMenusStore((state) => state.getDependencies);
    const ingredients = useMenusStore((state) => state.ingredients);
    const branches = useMenusStore((state) => state.branches);
    const menus = useMenusStore((state) => state.menus);

    const [form, setForm] = useState({
        branch: "",
        itemType: "SINGLE",
        name: "",
        description: "",
        price: "",
        category: "Entrada",
        isActive: true,
        image: [],
        recipe: [],
        comboItems: [],
        promotion: {
            isActive: false,
            discountType: "PERCENTAGE",
            discountValue: "",
            startsAt: "",
            endsAt: ""
        }
    });

    const [preview, setPreview] = useState(null);
    const [showPromo, setShowPromo] = useState(false);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (isOpen) {
            getDependencies();
        }
    }, [isOpen, getDependencies]);

    const [prevInitialData, setPrevInitialData] = useState(null);
    const [prevIsOpen, setPrevIsOpen] = useState(false);

    if (isOpen !== prevIsOpen || initialData !== prevInitialData) {
        setPrevIsOpen(isOpen);
        setPrevInitialData(initialData);

        if (isOpen) {
            setErrors({});
            const nextForm = initialData ? {
                branch: initialData.branch?._id || initialData.branch || "",
                itemType: initialData.itemType || "SINGLE",
                name: initialData.name || "",
                description: initialData.description || "",
                price: initialData.price || "",
                category: initialData.category || "Entrada",
                isActive: initialData.isActive !== false,
                image: [],
                recipe: Array.isArray(initialData.recipe) && (initialData.itemType || "SINGLE") === "SINGLE" ? initialData.recipe.map(r => ({
                    ingredientId: r.componentId?._id || r.componentId || r.ingredientId?._id || r.ingredientId || "",
                    quantityRequired: r.quantityRequired || ""
                })) : [],
                comboItems: Array.isArray(initialData.recipe) && initialData.itemType === "COMBO" ? initialData.recipe.map(c => ({
                    menuItemId: c.componentId?._id || c.componentId || c.menuItemId?._id || c.menuItemId || "",
                    quantity: c.quantityRequired || c.quantity || 1
                })) : [],
                promotion: {
                    isActive: initialData.promotion?.isActive || false,
                    discountType: initialData.promotion?.discountType || "PERCENTAGE",
                    discountValue: initialData.promotion?.discountValue || "",
                    startsAt: initialData.promotion?.startsAt ? initialData.promotion.startsAt.substring(0, 10) : "",
                    endsAt: initialData.promotion?.endsAt ? initialData.promotion.endsAt.substring(0, 10) : ""
                }
            } : {
                branch: "",
                itemType: "SINGLE",
                name: "",
                description: "",
                price: "",
                category: "Entrada",
                isActive: true,
                image: [],
                recipe: [],
                comboItems: [],
                promotion: {
                    isActive: false,
                    discountType: "PERCENTAGE",
                    discountValue: "",
                    startsAt: "",
                    endsAt: ""
                }
            };
            setForm(nextForm);
            setShowPromo(initialData?.promotion?.isActive || false);
            setPreview(initialData?.image || null);
        }
    }

    const handleFileChange = (event) => {
        const files = event.target.files;
        const file = files?.[0];

        setForm((current) => ({ ...current, image: files ? Array.from(files) : [] }));

        if (file) {
            setPreview(URL.createObjectURL(file));
        }
    };

    const addRecipeRow = () => setForm(f => ({ ...f, recipe: [...f.recipe, { ingredientId: "", quantityRequired: "" }] }));
    const removeRecipeRow = (index) => setForm(f => ({ ...f, recipe: f.recipe.filter((_, i) => i !== index) }));
    const updateRecipeRow = (index, field, value) => {
        const newRecipe = [...form.recipe];
        newRecipe[index][field] = value;
        setForm(f => ({ ...f, recipe: newRecipe }));
    };

    const addComboRow = () => setForm(f => ({ ...f, comboItems: [...f.comboItems, { menuItemId: "", quantity: 1 }] }));
    const removeComboRow = (index) => setForm(f => ({ ...f, comboItems: f.comboItems.filter((_, i) => i !== index) }));
    const updateComboRow = (index, field, value) => {
        const newCombo = [...form.comboItems];
        newCombo[index][field] = value;
        setForm(f => ({ ...f, comboItems: newCombo }));
    };

    const validate = () => {
        const newErrors = {};
        if (!form.branch) newErrors.branch = "Obligatorio";
        if (!form.name) newErrors.name = "Obligatorio";
        else if (form.name.length > 25) newErrors.name = "Máx 25 carac.";
        if (!form.description) newErrors.description = "Obligatorio";
        else if (form.description.length < 10) newErrors.description = "Mínimo 10 caracteres";
        if (!form.price) newErrors.price = "Obligatorio";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async () => {
        if (!validate()) return;
        try {
            const formData = new FormData();
            formData.append("branch", form.branch);
            formData.append("itemType", form.itemType);
            formData.append("name", form.name);
            formData.append("description", form.description);
            formData.append("price", form.price);
            formData.append("category", form.category);
            formData.append("isActive", form.isActive);

            if (form.image?.length > 0) {
                formData.append("image", form.image[0]); // backend expects 'image'
            } else if (form.removeImage) {
                formData.append("removeImage", "true");
            }

            if (form.itemType === "SINGLE") {
                formData.append("recipe", JSON.stringify(form.recipe.filter(r => r.ingredientId && r.quantityRequired)));
            } else {
                formData.append("comboItems", JSON.stringify(form.comboItems.filter(c => c.menuItemId && c.quantity)));
            }

            if (form.promotion.isActive) {
                formData.append("promotion", JSON.stringify(form.promotion));
            } else {
                formData.append("promotion", JSON.stringify({ isActive: false }));
            }

            await saveMenu(formData, initialData?._id);
            showSuccess(initialData ? "Producto actualizado correctamente" : "Producto creado correctamente");
            onClose?.();
        } catch (error) {
            const serverErrors = error?.response?.data?.errors || error?.response?.data?.error;
            if (serverErrors && Array.isArray(serverErrors)) {
                const newErrors = {};
                serverErrors.forEach(e => {
                    const field = e.path || e.param || e.field;
                    if (field) newErrors[field] = e.msg || e.message;
                });
                setErrors(newErrors);
            }
            showError(error?.response?.data?.message || error?.message || "Error al guardar producto");
        }
    };

    const singleMenus = menus.filter(m => m.itemType !== "COMBO");

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={initialData ? "Editar producto" : "Nuevo producto"}
            subtitle="Completa la información del producto"
        >
            <div className="flex flex-col items-center justify-center pb-4 pt-2 sm:pb-6 sm:pt-3">
                <div className="relative flex h-24 w-24 items-center justify-center overflow-hidden rounded-2xl border bg-gray-100 shadow-inner sm:h-28 sm:w-28 md:h-32 md:w-32">
                    {preview ? (
                        <img className="h-full w-full object-cover" src={preview} alt="Vista previa de producto" />
                    ) : (
                        <span className="text-xs text-gray-400 sm:text-sm">Sin imagen</span>
                    )}
                    <input type="file" accept="image/*" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" onChange={handleFileChange} />
                </div>
                {preview && (
                    <button
                        type="button"
                        onClick={() => {
                            setForm(current => ({ ...current, image: [] }));
                            setPreview(null);
                            setForm(current => ({ ...current, removeImage: true }));
                            const fileInputs = document.querySelectorAll('input[type="file"]');
                            fileInputs.forEach(input => input.value = "");
                        }}
                        className="mt-2 text-xs font-semibold text-red-500 hover:text-red-700 cursor-pointer flex items-center gap-1 z-10 relative"
                    >
                        <i className="fas fa-trash-alt"></i> Eliminar imagen
                    </button>
                )}
            </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 sm:gap-6">
                <div className="flex flex-col gap-2">
                    <label className="app-modal-fieldLabel">Tipo</label>
                    <div className="flex bg-gray-100 p-1 rounded-lg">
                        <button type="button" className={`flex-1 py-1 text-sm rounded-md transition-colors ${form.itemType === "SINGLE" ? "bg-white shadow text-blue-600 font-medium" : "text-gray-500"}`} onClick={() => setForm({ ...form, itemType: "SINGLE" })}>SINGLE</button>
                        <button type="button" className={`flex-1 py-1 text-sm rounded-md transition-colors ${form.itemType === "COMBO" ? "bg-white shadow text-purple-600 font-medium" : "text-gray-500"}`} onClick={() => setForm({ ...form, itemType: "COMBO" })}>COMBO</button>
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <label className="app-modal-fieldLabel">Sucursal</label>
                    <select className={`app-modal-select ${errors.branch ? 'border-red-500' : ''}`} value={form.branch} onChange={(e) => setForm({ ...form, branch: e.target.value })}>
                        <option value="">Seleccionar Sucursal</option>
                        {branches.map(b => <option key={b._id} value={b._id}>{b.name}</option>)}
                    </select>
                    {errors.branch && <span className="-mt-1 ml-1 text-[10px] font-semibold text-red-500">{errors.branch}</span>}
                </div>

                <div className="flex flex-col gap-2">
                    <label className="app-modal-fieldLabel">Categoría</label>
                    <select className="app-modal-select" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
                        <option>Entrada</option>
                        <option>Plato Fuerte</option>
                        <option>Postre</option>
                        <option>Bebida</option>
                        <option>Acompañamiento</option>
                        {form.itemType === "COMBO" && <option>Combo</option>}
                        <option>Otro</option>
                    </select>
                </div>

                <div className="flex flex-col gap-2 sm:col-span-2">
                    <label className="app-modal-fieldLabel">Nombre</label>
                    <input className={`app-modal-input ${errors.name ? 'border-red-500' : ''}`} placeholder="Ej. Pasta Alfredo" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                    {errors.name && <span className="-mt-1 ml-1 text-[10px] font-semibold text-red-500">{errors.name}</span>}
                </div>

                <div className="flex flex-col gap-2">
                    <label className="app-modal-fieldLabel">Precio Base</label>
                    <input type="number" min="0" step="0.01" className={`app-modal-input ${errors.price ? 'border-red-500' : ''}`} placeholder="00.00" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
                    {errors.price && <span className="-mt-1 ml-1 text-[10px] font-semibold text-red-500">{errors.price}</span>}
                </div>

                <div className="flex flex-col gap-2 col-span-full">
                    <label className="app-modal-fieldLabel">Descripción</label>
                    <textarea className={`app-modal-textarea ${errors.description ? 'border-red-500' : ''}`} placeholder="Detalles del producto..." value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
                    {errors.description && <span className="-mt-1 ml-1 text-[10px] font-semibold text-red-500">{errors.description}</span>}
                </div>

                <div className="flex flex-col col-span-full" style={{ gap: "8px", marginTop: "10px", marginBottom: "15px" }}>
                    <label className="app-modal-fieldLabel">Agregar una imagen</label>
                    <div className="flex w-full justify-center">
                        <input
                            type="file"
                            accept="image/*"
                            className="app-modal-input w-full cursor-pointer border-dashed md:w-3/4 lg:w-2/3"
                            onChange={handleFileChange}
                        />
                    </div>
                </div>

                {/* DYNAMIC SECTION: RECIPE OR COMBO */}
                <div className="col-span-full border border-gray-200 rounded-lg p-4 bg-gray-50">
                    <div className="flex justify-between items-center mb-3">
                        <h4 className="font-semibold text-gray-700 text-sm"><i className={form.itemType === "SINGLE" ? "fas fa-carrot" : "fas fa-boxes-stacked"}></i> {form.itemType === "SINGLE" ? "Receta" : "Items del Combo"}</h4>
                        <button type="button" className="text-sm text-blue-600 hover:text-blue-800" onClick={form.itemType === "SINGLE" ? addRecipeRow : addComboRow}>
                            + Agregar {form.itemType === "SINGLE" ? "ingrediente" : "item"}
                        </button>
                    </div>

                    {form.itemType === "SINGLE" ? (
                        <div className="space-y-2">
                            {form.recipe.length === 0 && <p className="text-xs text-gray-400">No hay ingredientes. Agrega uno.</p>}
                            {form.recipe.map((row, index) => (
                                <div key={index} className="grid grid-cols-[minmax(0,1.6fr)_minmax(0,0.95fr)_auto] gap-1.5 items-center">
                                    <select className="app-modal-select w-full min-w-0" value={row.ingredientId} onChange={(e) => updateRecipeRow(index, 'ingredientId', e.target.value)}>
                                        <option value="">Seleccionar ingrediente</option>
                                        {ingredients.map(i => <option key={i._id} value={i._id}>{i.name} ({i.unit})</option>)}
                                    </select>
                                    <input type="number" step="0.01" placeholder="Cantidad" className="app-modal-input w-full min-w-0" value={row.quantityRequired} onChange={(e) => updateRecipeRow(index, 'quantityRequired', e.target.value)} />
                                    <button type="button" className="flex h-9 w-9 items-center justify-center rounded-full text-red-500 hover:bg-red-50 hover:text-red-700" onClick={() => removeRecipeRow(index)}><i className="fas fa-times text-xs"></i></button>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="space-y-2">
                            {form.comboItems.length === 0 && <p className="text-xs text-gray-400">No hay items. Agrega uno.</p>}
                            {form.comboItems.map((row, index) => (
                                <div key={index} className="grid grid-cols-[minmax(0,1.6fr)_minmax(0,0.95fr)_auto] gap-1.5 items-center">
                                    <select className="app-modal-select w-full min-w-0" value={row.menuItemId} onChange={(e) => updateComboRow(index, 'menuItemId', e.target.value)}>
                                        <option value="">Seleccionar platillo (SINGLE)</option>
                                        {singleMenus.map(m => <option key={m._id} value={m._id}>{m.name}</option>)}
                                    </select>
                                    <input type="number" min="1" step="1" placeholder="Cantidad" className="app-modal-input w-full min-w-0" value={row.quantity} onChange={(e) => updateComboRow(index, 'quantity', e.target.value)} />
                                    <button type="button" className="flex h-9 w-9 items-center justify-center rounded-full text-red-500 hover:bg-red-50 hover:text-red-700" onClick={() => removeComboRow(index)}><i className="fas fa-times text-xs"></i></button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* PROMOTION SECTION */}
                <div className="col-span-full border border-gray-200 rounded-lg overflow-hidden">
                    <div className="bg-gray-100 p-3 flex justify-between items-center cursor-pointer" onClick={() => setShowPromo(!showPromo)}>
                        <h4 className="font-semibold text-gray-700 text-sm"><i className="fas fa-tag text-red-500"></i> Promoción</h4>
                        <i className={`fas fa-chevron-${showPromo ? 'up' : 'down'} text-gray-500`}></i>
                    </div>
                    {showPromo && (
                        <div className="p-4 bg-white grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="flex items-center gap-2 col-span-full">
                                <input type="checkbox" id="promoActive" checked={form.promotion.isActive} onChange={(e) => setForm(f => ({ ...f, promotion: { ...f.promotion, isActive: e.target.checked } }))} />
                                <label htmlFor="promoActive" className="text-sm font-medium text-gray-700">Activar promoción</label>
                            </div>
                            
                            {form.promotion.isActive && (
                                <>
                                    <div className="flex flex-col gap-2">
                                        <label className="app-modal-fieldLabel">Tipo Descuento</label>
                                        <select className="app-modal-select" value={form.promotion.discountType} onChange={(e) => setForm(f => ({ ...f, promotion: { ...f.promotion, discountType: e.target.value } }))}>
                                            <option value="PERCENTAGE">Porcentaje (%)</option>
                                            <option value="FIXED_PRICE">Fijo ($)</option>
                                        </select>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="app-modal-fieldLabel">Valor Descuento</label>
                                        <input type="number" min="0" step="0.01" className="app-modal-input" placeholder="0" value={form.promotion.discountValue} onChange={(e) => setForm(f => ({ ...f, promotion: { ...f.promotion, discountValue: e.target.value } }))} />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="app-modal-fieldLabel">Inicio</label>
                                        <input type="date" className="app-modal-input" value={form.promotion.startsAt} onChange={(e) => setForm(f => ({ ...f, promotion: { ...f.promotion, startsAt: e.target.value } }))} />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="app-modal-fieldLabel">Fin</label>
                                        <input type="date" className="app-modal-input" value={form.promotion.endsAt} onChange={(e) => setForm(f => ({ ...f, promotion: { ...f.promotion, endsAt: e.target.value } }))} />
                                    </div>
                                </>
                            )}
                        </div>
                    )}
                </div>
            </div>

            <div className="app-modal-actions mt-6">
                <button type="button" onClick={() => onClose?.()} className="app-modal-btn app-modal-btnSecondary w-full sm:w-auto">Cancelar</button>
                <button type="button" onClick={handleSubmit} className="app-modal-btn app-modal-btnPrimary w-full sm:w-auto" disabled={loading}>{loading ? "Guardando..." : "Guardar"}</button>
            </div>
        </Modal>
    );
};
