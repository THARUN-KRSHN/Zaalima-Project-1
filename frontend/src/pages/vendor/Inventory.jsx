import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/dashboard/Sidebar';
import TopBar from '../../components/dashboard/TopBar';
import Loader from '../../components/common/Loader';
import { Search, AlertTriangle, CheckCircle, Package, ArrowUpRight } from 'lucide-react';

export default function Inventory() {
    const [loading, setLoading] = useState(true);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('Inventory');

    const [searchQuery, setSearchQuery] = useState('');

    // Mock inventory dataset
    const [inventoryItems, setInventoryItems] = useState([
        { id: "vprod-1", sku: "ZMK-KURTA-FAS-01", name: "Anarkali Kurta Set", category: "Fashion", price: 898, stock: 14 },
        { id: "vprod-2", sku: "ZMK-KBDV2-ELE-02", name: "Quantum Mechanical Keyboard v2", category: "Electronics", price: 8499, stock: 4 },
        { id: "vprod-3", sku: "ZMK-CTRLR-ELE-03", name: "Pro Wireless Dual-Sense Controller", category: "Electronics", price: 5899, stock: 0 },
        { id: "vprod-4", sku: "ZMK-PANTS-FAS-04", name: "Minimalist Cargo Trouser", category: "Fashion", price: 2199, stock: 25 }
    ]);

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 900);
        return () => clearTimeout(timer);
    }, []);

    // Quick stock actions
    const handleAdjustStock = (itemId, amount) => {
        setInventoryItems(prev => prev.map(item => {
            if (item.id === itemId) {
                const updatedStock = Math.max(0, item.stock + amount);
                return { ...item, stock: updatedStock };
            }
            return item;
        }));
    };

    // Calculate metrics
    const totalItems = inventoryItems.length;
    const lowStockCount = inventoryItems.filter(item => item.stock > 0 && item.stock < 10).length;
    const outOfStockCount = inventoryItems.filter(item => item.stock === 0).length;

    // Filter list
    const filteredInventory = inventoryItems.filter(item => 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.sku.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className={`${isDarkMode ? 'dark' : ''} min-h-screen w-full bg-[var(--bg-main)] flex transition-colors duration-300`}>

            <Sidebar
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
                activeTab="Inventory"
                setActiveTab={setActiveTab}
            />

            <div className="flex-grow flex flex-col min-w-0 max-h-screen overflow-y-auto">
                <TopBar
                    title="Inventory Ledger"
                    isDarkMode={isDarkMode}
                    onToggleTheme={() => setIsDarkMode(!isDarkMode)}
                    onOpenSidebar={() => setIsSidebarOpen(true)}
                />

                <main className="p-4 sm:p-6 lg:p-8 flex flex-col gap-6 w-full max-w-[1440px] mx-auto animate-in fade-in duration-300">

                    {/* Workspace Header Block */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--border-light)] pb-5 text-left">
                        <div>
                            <h2 className="text-xl font-semibold text-[var(--text-main)] tracking-tight">Stock Analytics & Alerts</h2>
                            <p className="text-xs text-[var(--text-muted)] mt-1 font-normal">Monitor stock levels, manage low-stock thresholds, and adjust inventory balances.</p>
                        </div>
                    </div>

                    {loading ? (
                        <>
                            <Loader variant="stats" />
                            <Loader variant="table" />
                        </>
                    ) : (
                        <div className="flex flex-col gap-6 w-full">
                            
                            {/* Stock Metrics summary grids */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 w-full text-left">
                                <div className="p-5 bg-[var(--bg-surface)] border border-[var(--border-light)] rounded-2xl shadow-sm flex items-center justify-between transition-colors">
                                    <div className="flex flex-col gap-1.5">
                                        <span className="text-xs text-[var(--text-muted)] font-semibold">Total SKUs</span>
                                        <span className="text-2xl font-bold text-stone-900 dark:text-white">{totalItems} Products</span>
                                    </div>
                                    <div className="w-10 h-10 rounded-xl bg-[var(--primary)]/10 text-[var(--primary)] flex items-center justify-center">
                                        <Package className="w-5 h-5" />
                                    </div>
                                </div>

                                <div className="p-5 bg-[var(--bg-surface)] border border-[var(--border-light)] rounded-2xl shadow-sm flex items-center justify-between transition-colors">
                                    <div className="flex flex-col gap-1.5">
                                        <span className="text-xs text-[var(--text-muted)] font-semibold">Low Stock Alerts</span>
                                        <span className="text-2xl font-bold text-amber-600 dark:text-amber-400">{lowStockCount} Items</span>
                                    </div>
                                    <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
                                        <AlertTriangle className="w-5 h-5" />
                                    </div>
                                </div>

                                <div className="p-5 bg-[var(--bg-surface)] border border-[var(--border-light)] rounded-2xl shadow-sm flex items-center justify-between transition-colors">
                                    <div className="flex flex-col gap-1.5">
                                        <span className="text-xs text-[var(--text-muted)] font-semibold">Out of Stock</span>
                                        <span className="text-2xl font-bold text-rose-600 dark:text-rose-400">{outOfStockCount} Items</span>
                                    </div>
                                    <div className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-500 flex items-center justify-center">
                                        <AlertTriangle className="w-5 h-5" />
                                    </div>
                                </div>
                            </div>

                            {/* Search Control */}
                            <div className="flex bg-[var(--bg-surface)] p-4 border border-[var(--border-light)] rounded-2xl shadow-sm transition-colors">
                                <div className="relative flex-grow max-w-md h-10">
                                    <Search className="w-4 h-4 text-[var(--text-muted)] absolute left-3.5 top-3 pointer-events-none" />
                                    <input
                                        type="text"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        placeholder="Search inventory by product name or SKU..."
                                        className="w-full h-full pl-10 pr-4 rounded-xl border border-[var(--border-light)] bg-[var(--bg-main)]/50 text-xs font-medium text-[var(--text-main)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--primary)]"
                                    />
                                </div>
                            </div>

                            {/* Inventory List Table */}
                            <div className="w-full overflow-x-auto rounded-2xl border border-[var(--border-light)] bg-[var(--bg-surface)] shadow-sm transition-colors text-left">
                                <table className="w-full border-collapse">
                                    <thead>
                                        <tr className="border-b border-[var(--border-light)] text-[10px] sm:text-xs font-bold uppercase tracking-wider text-stone-400 dark:text-stone-500">
                                            <th className="px-6 py-4.5 text-left font-semibold">SKU Reference</th>
                                            <th className="px-6 py-4.5 text-left font-semibold">Product Name</th>
                                            <th className="px-6 py-4.5 text-left font-semibold">Category</th>
                                            <th className="px-6 py-4.5 text-left font-semibold">Price</th>
                                            <th className="px-6 py-4.5 text-left font-semibold">Current Stock</th>
                                            <th className="px-6 py-4.5 text-right font-semibold">Adjust Stock</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-[var(--border-light)]/60 text-xs sm:text-sm font-medium">
                                        {filteredInventory.map((item) => {
                                            const isOutOfStock = item.stock === 0;
                                            const isLowStock = item.stock > 0 && item.stock < 10;
                                            return (
                                                <tr key={item.id} className="hover:bg-[var(--bg-surface-hover)]/40 transition-colors">
                                                    <td className="px-6 py-4 font-mono font-semibold text-stone-700 dark:text-stone-300 text-[11px] min-w-[140px]">
                                                        {item.sku}
                                                    </td>
                                                    <td className="px-6 py-4 min-w-[200px] text-stone-900 dark:text-white font-semibold">
                                                        {item.name}
                                                    </td>
                                                    <td className="px-6 py-4 text-stone-500 dark:text-stone-400">
                                                        {item.category}
                                                    </td>
                                                    <td className="px-6 py-4 font-mono text-stone-700 dark:text-stone-300">
                                                        ₹{item.price.toLocaleString('en-IN')}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center gap-2">
                                                            <span className={`text-sm font-semibold font-mono ${isOutOfStock ? 'text-rose-500' : isLowStock ? 'text-amber-500 font-bold' : 'text-stone-800 dark:text-stone-200'}`}>
                                                                {item.stock} units
                                                            </span>
                                                            {isOutOfStock ? (
                                                                <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                                                            ) : isLowStock ? (
                                                                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping" />
                                                            ) : (
                                                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                                            )}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 text-right">
                                                        <div className="flex items-center justify-end gap-1.5">
                                                            <button
                                                                onClick={() => handleAdjustStock(item.id, -1)}
                                                                className="w-8 h-8 rounded-lg border border-stone-200 dark:border-stone-850 hover:bg-stone-50 dark:hover:bg-stone-900 text-stone-500 dark:text-stone-400 transition-colors focus:outline-none cursor-pointer flex items-center justify-center font-bold text-base"
                                                                title="Reduce stock by 1"
                                                            >
                                                                -
                                                            </button>
                                                            <button
                                                                onClick={() => handleAdjustStock(item.id, 1)}
                                                                className="w-8 h-8 rounded-lg border border-stone-200 dark:border-stone-850 hover:bg-stone-50 dark:hover:bg-stone-900 text-stone-500 dark:text-stone-400 transition-colors focus:outline-none cursor-pointer flex items-center justify-center font-bold text-base"
                                                                title="Increase stock by 1"
                                                            >
                                                                +
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                </main>
            </div>
        </div>
    );
}
