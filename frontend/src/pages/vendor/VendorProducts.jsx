import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/dashboard/Sidebar';
import TopBar from '../../components/dashboard/TopBar';
import Loader from '../../components/common/Loader';

// 🌟 Import your Empty state layout handler component
import EmptyProducts from '../../components/empty/EmptyProducts';

export default function VendorProducts() {
    const [loading, setLoading] = useState(true);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('Products');

    // 🌟 This array state controls whether the page is empty or full.
    // To test the Empty state, leave it empty: useState([])
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 1000);
        return () => clearTimeout(timer);
    }, []);

    // Simulated callback attached directly to the empty state's action trigger button
    const handleCreateFirstProduct = () => {
        // Automatically injects a template product row item to showcase the switch effect
        setProducts([
            { id: 1, name: "Anarkali Kurta Set", price: 898, stock: 14 }
        ]);
    };

    return (
        <div className={`${isDarkMode ? 'dark' : ''} min-h-screen w-full bg-[var(--bg-main)] flex transition-colors duration-300`}>

            <Sidebar
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
                activeTab="Products" // Kept locked to sync sidebar navigation
                setActiveTab={setActiveTab}
            />

            <div className="flex-grow flex flex-col min-w-0 max-h-screen overflow-y-auto">
                <TopBar
                    title="Products Inventory"
                    isDarkMode={isDarkMode}
                    onToggleTheme={() => setIsDarkMode(!isDarkMode)}
                    onOpenSidebar={() => setIsSidebarOpen(true)}
                />

                <main className="p-4 sm:p-6 lg:p-8 flex flex-col gap-6 w-full max-w-[1440px] mx-auto animate-in fade-in duration-300">

                    {/* Workspace Header Block */}
                    <div className="flex items-center justify-between border-b border-[var(--border-light)] pb-4 text-left">
                        <div>
                            <h2 className="text-sm sm:text-lg font-bold text-[var(--text-main)] tracking-tight">Storefront Inventory Matrix</h2>
                            <p className="text-[11px] text-[var(--text-muted)] mt-0.5">Manage and list public marketplace distribution products.</p>
                        </div>
                    </div>

                    {loading ? (
                        <Loader variant="table" />
                    ) : products.length === 0 ? (
                        /* 🌟 CASE A: Content matrix is empty -> Serve Empty State placeholder */
                        <div className="py-12 w-full">
                            <EmptyProducts onAddProductSubmit={handleCreateFirstProduct} />
                        </div>
                    ) : (
                        /* CASE B: Items exist -> Render traditional catalog table view layout */
                        <div className="w-full overflow-x-auto rounded-xl border border-[var(--border-light)] bg-[var(--bg-surface)] p-6 text-left">
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">Active Listings</span>
                                <button
                                    onClick={() => setProducts([])}
                                    className="text-[11px] text-rose-500 font-bold hover:underline"
                                >
                                    Clear all items (Test Empty View)
                                </button>
                            </div>
                            <div className="divide-y divide-[var(--border-light)] text-xs font-medium">
                                {products.map(item => (
                                    <div key={item.id} className="py-4 flex justify-between items-center text-[var(--text-main)]">
                                        <span className="font-bold text-stone-900 dark:text-white">{item.name}</span>
                                        <span className="font-mono font-bold">₹{item.price}</span>
                                        <span className="text-[var(--text-muted)]">{item.stock} units left</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                </main>
            </div>
        </div>
    );
}