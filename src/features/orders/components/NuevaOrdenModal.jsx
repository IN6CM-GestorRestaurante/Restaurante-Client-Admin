import { useState, useEffect } from "react";
import { Modal } from "../../../shared/ui/Modal";
import { useOrdersStore } from "../store/adminStore";
import { useAuthStore } from "../../auth/store/authStore";
import { getTables, getMenus } from "../../../shared/api/admin";
import { showError, showSuccess } from "../../../shared/utils/toast";

/**
 * Gorgeous tactile McDonald's-style Kiosk Dashboard for order creation.
 * Left Panel: High density product catalog categorized with filters and stock indicators.
 * Right Panel: Cart ticket showing active tables, quantity adjusters, and kitchen release actions.
 */
export const NuevaOrdenModal = ({ isOpen, branchId, onClose }) => {
    const createOrder = useOrdersStore((s) => s.createOrder);
    const loading = useOrdersStore((s) => s.loading);
    const user = useAuthStore((s) => s.user);
    const role = user?.role;

    const [tables, setTables] = useState([]);
    const [menus, setMenus] = useState([]);
    const [selectedTables, setSelectedTables] = useState([]);
    const [basket, setBasket] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("ALIMENTOS");

    const [prevIsOpen, setPrevIsOpen] = useState(false);

    if (isOpen !== prevIsOpen) {
        setPrevIsOpen(isOpen);
        if (isOpen) {
            setSelectedTables([]);
            setBasket([]);
            setSearchQuery("");
            setSelectedCategory("ALIMENTOS");
        }
    }

    useEffect(() => {
        if (!isOpen || !branchId) return;
        const load = async () => {
            try {
                const [tRes, mRes] = await Promise.all([
                    getTables({ branch: branchId }),
                    getMenus({ branch: branchId }),
                ]);
                const nextTables = (tRes?.data?.data ?? tRes?.data ?? []).filter((t) => t.status === "Disponible");
                const nextMenus = mRes?.data?.data ?? mRes?.data ?? [];
                
                setTables(nextTables);
                setMenus(nextMenus);
            } catch { /* ignore */ }
        };
        load();
    }, [isOpen, branchId]);

    const getCategoryGroup = (category = "") => {
        const cat = category.toLowerCase().trim();
        if (cat.includes("bebida") || cat.includes("refresco") || cat.includes("jugo") || cat.includes("drink")) return "BEBIDAS";
        if (cat.includes("postre") || cat.includes("dulce") || cat.includes("helado") || cat.includes("dessert")) return "POSTRES";
        if (cat.includes("combo") || cat.includes("paquete") || cat.includes("promocion") || cat.includes("bundle")) return "COMBOS";
        return "ALIMENTOS";
    };

    const toggleTable = (id) => {
        setSelectedTables((prev) =>
            prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
        );
    };

    const addToBasket = (menuItem) => {
        setBasket((prev) => {
            const existing = prev.find((i) => i.menuItem === menuItem._id);
            if (existing) {
                return prev.map((i) =>
                    i.menuItem === menuItem._id ? { ...i, quantity: i.quantity + 1 } : i
                );
            }
            return [...prev, { menuItem: menuItem._id, name: menuItem.name, price: menuItem.price, quantity: 1 }];
        });
    };

    const updateQuantity = (menuItemId, delta) => {
        setBasket((prev) =>
            prev
                .map((i) => (i.menuItem === menuItemId ? { ...i, quantity: i.quantity + delta } : i))
                .filter((i) => i.quantity > 0)
        );
    };

    const removeFromBasket = (menuItemId) => {
        setBasket((prev) => prev.filter((i) => i.menuItem !== menuItemId));
    };

    const basketTotal = basket.reduce((acc, item) => acc + item.price * item.quantity, 0);

    const handleSubmit = async () => {
        if (selectedTables.length === 0) return showError("Selecciona al menos una mesa");
        if (basket.length === 0) return showError("Agrega al menos un platillo a la comanda");

        const payload = {
            tables: selectedTables,
            items: basket.map((i) => ({ menuItem: i.menuItem, quantity: Number(i.quantity) })),
        };

        if (["COMPANY_ADMIN", "BRANCH_MANAGER", "SUPER_ADMIN", "ADMIN_ROLE"].includes(role)) {
            payload.branch = branchId;
        }

        try {
            await createOrder(payload);
            showSuccess("Orden creada exitosamente");
            onClose?.();
        } catch (err) {
            showError(err?.response?.data?.message || err?.message || "Error al crear orden");
        }
    };

    // Filter menus based on search query and category tabs
    const filteredMenus = menus.filter((item) => {
        const itemCategoryGroup = getCategoryGroup(item.category);
        const matchesCategory = itemCategoryGroup === selectedCategory;
        const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                              (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase()));
        return matchesCategory && matchesSearch;
    });

    const categoryIcons = {
        ALIMENTOS: "fas fa-bowl-food",
        BEBIDAS: "fas fa-glass-water",
        POSTRES: "fas fa-ice-cream",
        COMBOS: "fas fa-burger"
    };

    const selectedTableButtonStyle = {
        backgroundColor: "#ea580c",
        borderColor: "#ea580c",
        color: "#ffffff",
    };

    const availableTableButtonStyle = {
        backgroundColor: "#ffffff",
        borderColor: "#e7e5e4",
        color: "#57534e",
    };

    const submitButtonStyle = loading || basket.length === 0 || selectedTables.length === 0
        ? { backgroundColor: "#e7e5e4", color: "#a8a29e" }
        : { backgroundImage: "linear-gradient(to right, #ea580c, #d97706)", color: "#ffffff" };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Kiosco Táctil de Comandas" subtitle="Arma comandas rápidamente e inyecta pedidos directamente a cocina">
            {/* Custom high-density layout style override inside Modal body */}
            <div className="flex flex-col lg:flex-row gap-6 w-full text-stone-800" style={{ minWidth: 'min(90vw, 1100px)', height: '70vh', maxHeight: '700px' }}>
                
                {/* LEFT PANEL: Categories, search & card grid */}
                <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
                    
                    {/* Category tabs */}
                    <div className="flex gap-2 p-1 bg-stone-100 rounded-2xl mb-4 shrink-0">
                        {["ALIMENTOS", "BEBIDAS", "POSTRES", "COMBOS"].map((cat) => (
                            <button
                                key={cat}
                                type="button"
                                onClick={() => setSelectedCategory(cat)}
                                className={`flex-1 py-3 px-2 rounded-xl text-xs font-black uppercase transition flex items-center justify-center gap-2 cursor-pointer
                                    \${selectedCategory === cat 
                                        ? "bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow-md" 
                                        : "text-stone-500 hover:text-stone-800 hover:bg-stone-200"
                                    }`}
                            >
                                <i className={categoryIcons[cat]}></i>
                                <span className="hidden sm:inline">{cat}</span>
                            </button>
                        ))}
                    </div>

                    {/* Search filter */}
                    <div className="relative mb-4 shrink-0">
                        <input
                            type="text"
                            placeholder="Buscar plato o postre..."
                            className="w-full pl-4 pr-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-stone-850 text-xs focus:outline-none focus:ring-1 focus:ring-orange-500 placeholder-stone-400"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    {/* Product grid */}
                    <div className="flex-1 overflow-y-auto pr-1">
                        {filteredMenus.length === 0 ? (
                            <div className="h-full flex flex-col items-center justify-center text-stone-400 border border-dashed border-stone-200 rounded-2xl p-6">
                                <i className="fas fa-circle-question text-3xl mb-2 text-stone-300"></i>
                                <span className="font-bold text-xs">No se encontraron productos</span>
                                <span className="text-[10px] text-stone-400 mt-1">Prueba con otra palabra clave en esta sección.</span>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5">
                                {filteredMenus.map((item) => {
                                    const inBasket = basket.find((bi) => bi.menuItem === item._id);
                                    return (
                                        <div
                                            key={item._id}
                                            onClick={() => addToBasket(item)}
                                            className={`p-3.5 bg-white border rounded-2xl transition hover:border-orange-500/50 hover:shadow-md cursor-pointer flex flex-col justify-between relative overflow-hidden group
                                                \${inBasket ? "border-orange-500 bg-orange-50/20" : "border-stone-200/80"}`}
                                        >
                                            {inBasket && (
                                                <span className="absolute top-0 right-0 bg-orange-600 text-white text-[9px] font-black px-2 py-0.5 rounded-bl-xl shadow-sm">
                                                    \${inBasket.quantity} en comanda
                                                </span>
                                            )}
                                            
                                            <div>
                                                <span className="text-[9px] font-bold text-stone-400 bg-stone-50 border px-1.5 py-0.5 rounded-full mb-2 inline-block">
                                                    {item.category || "General"}
                                                </span>
                                                <h3 className="font-extrabold text-stone-800 text-sm group-hover:text-orange-600 transition-colors line-clamp-1">
                                                    {item.name}
                                                </h3>
                                                <p className="text-[11px] text-stone-500 mt-1 line-clamp-2 leading-relaxed">
                                                    {item.description || "Receta artesanal fresca preparada al instante."}
                                                </p>
                                            </div>

                                            <div className="mt-4 pt-2.5 border-t border-stone-100 flex justify-between items-center shrink-0">
                                                <span className="text-sm font-black text-orange-600">
                                                    Q{item.price.toFixed(2)}
                                                </span>
                                                <span className="bg-stone-50 hover:bg-orange-600 hover:text-white border border-stone-200 w-6.5 h-6.5 rounded-full flex items-center justify-center text-xs font-bold text-stone-500 transition-all shrink-0">
                                                    +
                                                </span>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>

                {/* RIGHT PANEL: Salón tables & Cart ticket */}
                <div className="w-full lg:w-90 bg-stone-50 border border-stone-200 rounded-3xl p-4.5 flex flex-col overflow-hidden shrink-0 h-full">
                    
                    {/* Tables list */}
                    <div className="mb-4 shrink-0 rounded-none border border-stone-200 bg-white p-4 shadow-sm">
                        <span className="mb-3 block text-[10px] font-black uppercase tracking-wider text-stone-500 leading-snug">
                            <i className="fas fa-chair text-orange-500 mr-1.5"></i> Mesas Disponibles
                        </span>
                        
                        {tables.length === 0 ? (
                            <span className="block rounded-xl border border-dashed border-stone-200 bg-stone-50 px-3 py-4 text-[11px] italic text-stone-400">No hay mesas libres en esta sucursal.</span>
                        ) : (
                            <div className="grid max-h-28 grid-cols-2 gap-2 overflow-y-auto pr-1 sm:grid-cols-3 lg:grid-cols-2">
                                {tables.map((t) => (
                                    <button
                                        key={t._id}
                                        type="button"
                                        onClick={() => toggleTable(t._id)}
                                        className="aspect-square rounded-none border p-2 text-xs font-bold transition-all cursor-pointer flex flex-col items-center justify-center gap-1 text-center hover:bg-stone-100"
                                        style={selectedTables.includes(t._id) ? selectedTableButtonStyle : availableTableButtonStyle}
                                    >
                                        <i className="fas fa-chair text-[10px]"></i>
                                        <span className="wrap-break-word leading-tight">M-{t.number}</span>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Active Basket list */}
                    <div className="flex-1 flex flex-col overflow-hidden min-h-0 border-t border-stone-200 pt-3">
                        <span className="text-[10px] font-black uppercase text-stone-400 tracking-wider block mb-2">
                            <i className="fas fa-receipt text-orange-500 mr-1.5"></i> Comanda Ticket
                        </span>

                        {basket.length === 0 ? (
                            <div className="flex-1 flex flex-col items-center justify-center text-stone-400 border border-dashed border-stone-200 rounded-2xl p-4 bg-white/50">
                                <i className="fas fa-shopping-basket text-2xl mb-1.5 text-stone-300"></i>
                                <span className="font-bold text-[11px] uppercase text-stone-400">Comanda vacía</span>
                                <span className="text-[9px] text-stone-400 text-center mt-0.5">Agrega platillos pulsando en las tarjetas a la izquierda.</span>
                            </div>
                        ) : (
                            <div className="flex-1 overflow-y-auto flex flex-col gap-2 pr-1">
                                {basket.map((item) => (
                                    <div
                                        key={item.menuItem}
                                        className="bg-white border border-stone-200/60 p-2.5 rounded-xl flex items-center justify-between gap-2.5"
                                    >
                                        <div className="flex-1 min-w-0">
                                            <h4 className="font-extrabold text-stone-850 text-[11px] truncate">{item.name}</h4>
                                            <span className="text-[10px] text-amber-600 font-bold">
                                                Q{item.price.toFixed(2)} c/u
                                            </span>
                                        </div>

                                        <div className="flex items-center gap-2 shrink-0">
                                            {/* Quantity adjustments */}
                                            <div className="flex items-center bg-stone-100 border border-stone-200/60 rounded-lg px-1.5 py-0.5 shrink-0">
                                                <button
                                                    type="button"
                                                    onClick={() => updateQuantity(item.menuItem, -1)}
                                                    className="w-4 h-4 text-xs font-black text-stone-400 hover:text-stone-700 transition cursor-pointer"
                                                >
                                                    -
                                                </button>
                                                <span className="text-center text-xs font-black text-stone-700 min-w-3.5">
                                                    {item.quantity}
                                                </span>
                                                <button
                                                    type="button"
                                                    onClick={() => updateQuantity(item.menuItem, 1)}
                                                    className="w-4 h-4 text-xs font-black text-stone-400 hover:text-stone-700 transition cursor-pointer"
                                                >
                                                    +
                                                </button>
                                            </div>

                                            <span className="text-right text-xs font-black text-stone-800 min-w-12.5 shrink-0">
                                                Q{(item.price * item.quantity).toFixed(2)}
                                            </span>

                                            <button
                                                type="button"
                                                onClick={() => removeFromBasket(item.menuItem)}
                                                className="text-stone-400 hover:text-red-600 transition pl-0.5 cursor-pointer"
                                            >
                                                <i className="fas fa-xmark text-xs"></i>
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Ticket Checkout Totals */}
                    <div className="mt-4 pt-3 border-t border-stone-200 shrink-0">
                        <div className="flex justify-between items-center text-xs font-semibold text-stone-500 mb-1.5">
                            <span>Subtotal</span>
                            <span>Q{basketTotal.toFixed(2)}</span>
                        </div>
                        
                        <div className="flex justify-between items-end mb-4">
                            <span className="text-xs font-black uppercase text-stone-400 tracking-wider">Total Comanda</span>
                            <span className="text-xl font-black text-orange-600">
                                Q{basketTotal.toFixed(2)}
                            </span>
                        </div>

                        <div className="flex gap-2">
                            <button 
                                type="button" 
                                onClick={onClose} 
                                className="flex-1 py-3 rounded-xl border border-stone-300 text-stone-500 bg-white hover:bg-stone-50 font-bold text-xs uppercase tracking-wide transition cursor-pointer"
                            >
                                Cancelar
                            </button>
                            
                            <button
                                type="button"
                                disabled={loading || basket.length === 0 || selectedTables.length === 0}
                                onClick={handleSubmit}
                                className="flex-2 py-3 rounded-xl font-black uppercase tracking-wider transition-all text-xs flex items-center justify-center gap-1.5 shadow-md cursor-pointer active:scale-98"
                                style={submitButtonStyle}
                            >
                                {loading ? (
                                    <>
                                        <i className="fas fa-spinner animate-spin"></i>
                                        Enviando...
                                    </>
                                ) : (
                                    <>
                                        <i className="fas fa-utensils"></i>
                                        Enviar a cocina
                                    </>
                                )}
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </Modal>
    );
};
