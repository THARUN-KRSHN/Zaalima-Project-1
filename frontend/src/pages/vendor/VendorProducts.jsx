import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/dashboard/Sidebar';
import TopBar from '../../components/dashboard/TopBar';
import Loader from '../../components/common/Loader';
import EmptyProducts from '../../components/empty/EmptyProducts';
import ProductFormModal from '../../components/dashboard/ProductFormModal';
import { Search, Plus, Edit2, Trash2, SlidersHorizontal, Eye } from 'lucide-react';

export default function VendorProducts() {
    const [loading, setLoading] = useState(true);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('Products');

    // Wires up search and filter states
    const [searchQuery, setSearchQuery] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('All');

    // Modal Control States
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    // Initial mock products list
    const [products, setProducts] = useState([
        { id: "vprod-1", name: "Anarkali Kurta Set", category: "Fashion", brand: "Zaalima Premium", price: 898, stock: 14, status: "published", imageUrl: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&auto=format&fit=crop&q=80", specs: "Material: Viscose Rayon, Style: Embellished" },
        { id: "vprod-2", name: "Quantum Mechanical Keyboard v2", category: "Electronics", brand: "Apex Digital", price: 8499, stock: 4, status: "published", imageUrl: "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=600&auto=format&fit=crop&q=80", specs: "Switch: Red Linear, Keycaps: Double-Shot PBT" },
        { id: "vprod-3", name: "Pro Wireless Dual-Sense Controller", category: "Electronics", brand: "Apex Digital", price: 5899, stock: 0, status: "published", specs: "Connection: Bluetooth, Battery: 12 Hours" },
        { id: "vprod-4", name: "Minimalist Cargo Trouser", category: "Fashion", brand: "Zaalima Boutiques", price: 2199, stock: 25, status: "draft", specs: "Fabric: Cotton Cargo, Color: Olive Green" }
    ]);

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 900);
        return () => clearTimeout(timer);
    }, []);

    const handleCreateProductClick = () => {
        setSelectedProduct(null);
        setIsModalOpen(true);
    };

    const handleEditProductClick = (product) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    };

    const handleDeleteProduct = (productId) => {
        setProducts(prev => prev.filter(p => p.id !== productId));
    };

    const handleSaveProduct = (productFormPayload) => {
        if (selectedProduct) {
            // Edit Mode
            setProducts(prev => prev.map(p => p.id === selectedProduct.id ? { ...productFormPayload, id: selectedProduct.id } : p));
        } else {
            // Create Mode
            const newProduct = {
                ...productFormPayload,
                id: `vprod-${Date.now()}`
            };
            setProducts(prev => [newProduct, ...prev]);
        }
        setIsModalOpen(false);
        setSelectedProduct(null);
    };

    const handleCreateFirstProduct = () => {
        setProducts([
            { id: "vprod-1", name: "Anarkali Kurta Set", category: "Fashion", brand: "Zaalima Premium", price: 898, stock: 14, status: "published" }
        ]);
    };

    // Filtered Product Feeds logic
    const filteredProducts = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                              product.brand.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = categoryFilter === 'All' || product.category.toLowerCase() === categoryFilter.toLowerCase();
        return matchesSearch && matchesCategory;
    });

    return (
        <div className={`${isDarkMode ? 'dark' : ''} min-h-screen w-full bg-[var(--bg-main)] flex transition-colors duration-300`}>

            <Sidebar
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
                activeTab="Products"
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
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--border-light)] pb-5 text-left">
                        <div>
                            <h2 className="text-xl font-semibold text-[var(--text-main)] tracking-tight">Products Catalog</h2>
                            <p className="text-xs text-[var(--text-muted)] mt-1 font-normal">Manage and update your public marketplace stock details.</p>
                        </div>
                        {products.length > 0 && (
                            <button
                                onClick={handleCreateProductClick}
                                className="h-10 px-4 bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-[var(--text-on-primary)] font-semibold text-xs rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-sm shrink-0 transition-colors focus:outline-none"
                            >
                                <Plus className="w-4 h-4" />
                                <span>Add New Product</span>
                            </button>
                        )}
                    </div>

                    {loading ? (
                        <Loader variant="table" />
                    ) : products.length === 0 ? (
                        <div className="py-12 w-full">
                            <EmptyProducts onAddProductSubmit={handleCreateFirstProduct} />
                        </div>
                    ) : (
                        <div className="flex flex-col gap-5 w-full">
                            
                            {/* Search & Filtering Control Deck */}
                            <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between bg-[var(--bg-surface)] p-4 border border-[var(--border-light)] rounded-2xl shadow-sm transition-colors">
                                <div className="relative flex-grow max-w-md h-10">
                                    <Search className="w-4 h-4 text-[var(--text-muted)] absolute left-3.5 top-3 pointer-events-none" />
                                    <input
                                        type="text"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        placeholder="Search by product name or brand..."
                                        className="w-full h-full pl-10 pr-4 rounded-xl border border-[var(--border-light)] bg-[var(--bg-main)]/50 text-xs font-medium text-[var(--text-main)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--primary)]"
                                    />
                                </div>

                                <div className="flex items-center gap-3">
                                    <select
                                        value={categoryFilter}
                                        onChange={(e) => setCategoryFilter(e.target.value)}
                                        className="h-10 px-3 border border-[var(--border-light)] bg-[var(--bg-main)]/50 rounded-xl focus:outline-none focus:border-[var(--primary)] text-xs text-stone-700 dark:text-stone-300 font-semibold"
                                    >
                                        <option value="All">All Categories</option>
                                        <option value="Fashion">Fashion</option>
                                        <option value="Electronics">Electronics</option>
                                        <option value="Home Decor">Home Decor</option>
                                    </select>
                                    <div className="text-xs font-medium text-[var(--text-muted)] flex items-center gap-1.5 justify-end shrink-0 pl-2">
                                        <SlidersHorizontal className="w-3.5 h-3.5" />
                                        <span>Items: {filteredProducts.length}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Catalog Table Block */}
                            <div className="w-full overflow-x-auto rounded-2xl border border-[var(--border-light)] bg-[var(--bg-surface)] shadow-sm transition-colors text-left">
                                <table className="w-full border-collapse">
                                    <thead>
                                        <tr className="border-b border-[var(--border-light)] text-[10px] sm:text-xs font-bold uppercase tracking-wider text-stone-400 dark:text-stone-500">
                                            <th className="px-6 py-4.5 text-left font-semibold">Product info</th>
                                            <th className="px-6 py-4.5 text-left font-semibold">Category</th>
                                            <th className="px-6 py-4.5 text-left font-semibold">Price</th>
                                            <th className="px-6 py-4.5 text-left font-semibold">Stock</th>
                                            <th className="px-6 py-4.5 text-left font-semibold">Status</th>
                                            <th className="px-6 py-4.5 text-right font-semibold">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-[var(--border-light)]/60 text-xs sm:text-sm font-medium">
                                        {filteredProducts.map((product) => {
                                            const isOutOfStock = product.stock === 0;
                                            const isLowStock = product.stock > 0 && product.stock < 10;
                                            return (
                                                <tr key={product.id} className="hover:bg-[var(--bg-surface-hover)]/40 transition-colors">
                                                    <td className="px-6 py-4 flex items-center gap-3 min-w-[200px]">
                                                        <div className="w-10 h-10 rounded-lg bg-stone-100 dark:bg-stone-800 border border-[var(--border-light)] flex items-center justify-center text-xs text-stone-400 shrink-0 overflow-hidden font-sans">
                                                            {product.imageUrl ? (
                                                                <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
                                                            ) : (
                                                                '📦'
                                                            )}
                                                        </div>
                                                        <div className="flex flex-col gap-0.5 min-w-0">
                                                            <span className="font-semibold text-stone-900 dark:text-stone-100 truncate">{product.name}</span>
                                                            <span className="text-[10px] text-stone-400 dark:text-stone-500 font-medium tracking-wide uppercase font-mono">{product.brand}</span>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 text-stone-600 dark:text-stone-300">
                                                        {product.category}
                                                    </td>
                                                    <td className="px-6 py-4 font-mono font-medium text-stone-900 dark:text-stone-100">
                                                        ₹{product.price.toLocaleString('en-IN')}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        {isOutOfStock ? (
                                                            <span className="px-2 py-0.5 rounded-full bg-rose-50 dark:bg-rose-950/20 text-rose-600 dark:text-rose-400 text-[10px] font-semibold border border-rose-100 dark:border-rose-950/50">Out of Stock</span>
                                                        ) : isLowStock ? (
                                                            <span className="px-2 py-0.5 rounded-full bg-amber-50 dark:bg-amber-950/20 text-amber-600 dark:text-amber-400 text-[10px] font-semibold border border-amber-100 dark:border-amber-950/50">Low Stock ({product.stock})</span>
                                                        ) : (
                                                            <span className="text-stone-600 dark:text-stone-350">{product.stock} units</span>
                                                        )}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        {product.status === 'published' ? (
                                                            <span className="px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 text-[10px] font-semibold border border-emerald-100 dark:border-emerald-950/50">Published</span>
                                                        ) : (
                                                            <span className="px-2 py-0.5 rounded-full bg-stone-100 dark:bg-stone-900 text-stone-500 dark:text-stone-450 text-[10px] font-semibold border border-stone-200/50 dark:border-stone-800">Draft</span>
                                                        )}
                                                    </td>
                                                    <td className="px-6 py-4 text-right">
                                                        <div className="flex items-center justify-end gap-1.5">
                                                            <button
                                                                onClick={() => handleEditProductClick(product)}
                                                                className="p-1.5 rounded-lg border border-stone-200 dark:border-stone-800 hover:bg-stone-50 dark:hover:bg-stone-900 hover:text-[var(--primary)] text-stone-500 dark:text-stone-400 transition-colors focus:outline-none cursor-pointer"
                                                                title="Edit product"
                                                            >
                                                                <Edit2 className="w-3.5 h-3.5" />
                                                            </button>
                                                            <button
                                                                onClick={() => handleDeleteProduct(product.id)}
                                                                className="p-1.5 rounded-lg border border-stone-200 dark:border-stone-800 hover:bg-rose-50 dark:hover:bg-rose-950/10 hover:text-rose-500 text-stone-500 dark:text-stone-400 transition-colors focus:outline-none cursor-pointer"
                                                                title="Delete product"
                                                            >
                                                                <Trash2 className="w-3.5 h-3.5" />
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

            {/* Product form Modal overlay popup */}
            <ProductFormModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSaveProduct}
                initialProduct={selectedProduct}
            />
        </div>
    );
}