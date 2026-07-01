import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/dashboard/Sidebar';
import TopBar from '../../components/dashboard/TopBar';
import Loader from '../../components/common/Loader';
import { Search, Check, AlertOctagon, Star, Trash2, SlidersHorizontal, Sparkles } from 'lucide-react';

export default function AdminProducts() {
    const [loading, setLoading] = useState(true);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('Products');

    const [searchQuery, setSearchQuery] = useState('');
    const [moderationFilter, setModerationFilter] = useState('All');
    const [notification, setNotification] = useState(null);

    // Initial mock administrative product catalog
    const [products, setProducts] = useState([
        { id: "prod-101", name: "Anarkali Kurta Set", brand: "Zaalima Boutiques", vendor: "Zaalima Boutiques", price: 898, stock: 14, status: "Approved", featured: true },
        { id: "prod-102", name: "Quantum Mechanical Keyboard v2", brand: "Apex Electronics", vendor: "Apex Electronics", price: 8499, stock: 4, status: "Approved", featured: false },
        { id: "prod-103", name: "Pro Wireless Dual-Sense Controller", brand: "Apex Electronics", vendor: "Apex Electronics", price: 5899, stock: 0, status: "Pending Approval", featured: false },
        { id: "prod-104", name: "Kerala Cardamom Organic grade A", brand: "Spices Hub", vendor: "Kerala Spice Market", price: 450, stock: 80, status: "Pending Approval", featured: false },
        { id: "prod-105", name: "Silk Blend Brocade Sherwani", brand: "Ethnic Styles", vendor: "Zaalima Boutiques", price: 14999, stock: 2, status: "Flagged", featured: false }
    ]);

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 900);
        return () => clearTimeout(timer);
    }, []);

    const showToast = (message, type = 'success') => {
        setNotification({ message, type });
        setTimeout(() => setNotification(null), 3000);
    };

    const handleApprove = (id, name) => {
        setProducts(prev => prev.map(p => p.id === id ? { ...p, status: 'Approved' } : p));
        showToast(`Product "${name}" approved for marketplace catalog listings.`);
    };

    const handleToggleFlag = (id, name, currentStatus) => {
        const newStatus = currentStatus === 'Flagged' ? 'Approved' : 'Flagged';
        setProducts(prev => prev.map(p => p.id === id ? { ...p, status: newStatus } : p));
        showToast(`Product "${name}" status updated to ${newStatus}.`, newStatus === 'Approved' ? 'success' : 'error');
    };

    const handleToggleFeature = (id, name, currentFeatured) => {
        setProducts(prev => prev.map(p => p.id === id ? { ...p, featured: !currentFeatured } : p));
        showToast(`Product "${name}" featured listing toggled.`);
    };

    const handleDeleteProduct = (id, name) => {
        setProducts(prev => prev.filter(p => p.id !== id));
        showToast(`Product "${name}" deleted from platform database.`, 'error');
    };

    // Filter Logic
    const filteredProducts = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                              product.brand.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesFilter = moderationFilter === 'All' || product.status.toLowerCase() === moderationFilter.toLowerCase();
        return matchesSearch && matchesFilter;
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
                    title="Product Moderation"
                    isDarkMode={isDarkMode}
                    onToggleTheme={() => setIsDarkMode(!isDarkMode)}
                    onOpenSidebar={() => setIsSidebarOpen(true)}
                />

                <main className="p-4 sm:p-6 lg:p-8 flex flex-col gap-6 w-full max-w-[1440px] mx-auto animate-in fade-in duration-300 relative">
                    
                    {/* Toast alerts */}
                    {notification && (
                        <div className={`fixed top-20 right-6 z-50 p-4 rounded-2xl shadow-xl border flex items-center gap-3 animate-in slide-in-from-top-5 duration-350
                            ${notification.type === 'success' 
                                ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-700 dark:text-emerald-400' 
                                : 'bg-rose-500/10 border-rose-500/20 text-rose-700 dark:text-rose-400'
                            }`}
                        >
                            <Sparkles className="w-5 h-5" />
                            <span className="text-xs font-bold font-sans">{notification.message}</span>
                        </div>
                    )}

                    {/* Workspace Header Block */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--border-light)] pb-5 text-left">
                        <div>
                            <h2 className="text-xl font-semibold text-[var(--text-main)] tracking-tight">Catalog Moderation Dashboard</h2>
                            <p className="text-xs text-[var(--text-muted)] mt-1 font-normal">Moderate merchant listings, approve product submissions, and feature selected catalog items.</p>
                        </div>
                    </div>

                    {loading ? (
                        <Loader variant="table" />
                    ) : (
                        <div className="flex flex-col gap-5 w-full">
                            
                            {/* Search & Filter Deck */}
                            <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between bg-[var(--bg-surface)] p-4 border border-[var(--border-light)] rounded-2xl shadow-sm transition-colors">
                                <div className="relative flex-grow max-w-md h-10">
                                    <Search className="w-4 h-4 text-[var(--text-muted)] absolute left-3.5 top-3 pointer-events-none" />
                                    <input
                                        type="text"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        placeholder="Search by product name, brand..."
                                        className="w-full h-full pl-10 pr-4 rounded-xl border border-[var(--border-light)] bg-[var(--bg-main)]/50 text-xs font-medium text-[var(--text-main)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--primary)]"
                                    />
                                </div>

                                <div className="flex items-center gap-3">
                                    <select
                                        value={moderationFilter}
                                        onChange={(e) => setModerationFilter(e.target.value)}
                                        className="h-10 px-3 border border-[var(--border-light)] bg-[var(--bg-main)]/50 rounded-xl focus:outline-none focus:border-[var(--primary)] text-xs text-stone-700 dark:text-stone-300 font-semibold"
                                    >
                                        <option value="All">All States</option>
                                        <option value="Approved">Approved</option>
                                        <option value="Pending Approval">Pending Approval</option>
                                        <option value="Flagged">Flagged</option>
                                    </select>
                                    <div className="text-xs font-medium text-[var(--text-muted)] flex items-center gap-1.5 justify-end shrink-0 pl-2">
                                        <SlidersHorizontal className="w-3.5 h-3.5" />
                                        <span>Items: {filteredProducts.length}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Products Table */}
                            <div className="w-full overflow-x-auto rounded-2xl border border-[var(--border-light)] bg-[var(--bg-surface)] shadow-sm transition-colors text-left">
                                <table className="w-full border-collapse">
                                    <thead>
                                        <tr className="border-b border-[var(--border-light)] text-[10px] sm:text-xs font-bold uppercase tracking-wider text-stone-400 dark:text-stone-500">
                                            <th className="px-6 py-4.5 text-left font-semibold">Product ID</th>
                                            <th className="px-6 py-4.5 text-left font-semibold">Catalog details</th>
                                            <th className="px-6 py-4.5 text-left font-semibold">Merchant (Vendor)</th>
                                            <th className="px-6 py-4.5 text-left font-semibold">Price</th>
                                            <th className="px-6 py-4.5 text-left font-semibold">Stock</th>
                                            <th className="px-6 py-4.5 text-left font-semibold">Mod status</th>
                                            <th className="px-6 py-4.5 text-right font-semibold">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-[var(--border-light)]/60 text-xs sm:text-sm font-medium">
                                        {filteredProducts.map((product) => (
                                            <tr key={product.id} className="hover:bg-[var(--bg-surface-hover)]/40 transition-colors">
                                                <td className="px-6 py-4 font-mono font-semibold text-stone-700 dark:text-stone-300 text-[11px] min-w-[120px]">
                                                    {product.id}
                                                </td>
                                                <td className="px-6 py-4 min-w-[200px]">
                                                    <div className="flex flex-col gap-0.5">
                                                        <span className="font-semibold text-stone-900 dark:text-stone-100">{product.name}</span>
                                                        <span className="text-[10px] text-stone-400 dark:text-stone-500 font-normal">Brand: {product.brand}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-stone-650 dark:text-stone-300">
                                                    {product.vendor}
                                                </td>
                                                <td className="px-6 py-4 font-mono text-stone-850 dark:text-stone-250">
                                                    ₹{product.price.toLocaleString('en-IN')}
                                                </td>
                                                <td className="px-6 py-4 font-mono text-stone-550 dark:text-stone-450">
                                                    {product.stock} units
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold border
                                                        ${product.status === 'Approved' && 'bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400'}
                                                        ${product.status === 'Pending Approval' && 'bg-amber-500/10 border-amber-500/20 text-amber-600 dark:text-amber-400'}
                                                        ${product.status === 'Flagged' && 'bg-rose-500/10 border-rose-500/20 text-rose-600 dark:text-rose-400'}
                                                    `}>
                                                        {product.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <div className="flex items-center justify-end gap-1.5">
                                                        {product.status === 'Pending Approval' ? (
                                                            <button
                                                                onClick={() => handleApprove(product.id, product.name)}
                                                                className="w-7 h-7 bg-emerald-500/10 hover:bg-emerald-500 text-emerald-600 hover:text-white rounded-lg flex items-center justify-center border border-emerald-500/20 transition-all cursor-pointer"
                                                                title="Approve listing"
                                                            >
                                                                <Check className="w-3.5 h-3.5" />
                                                            </button>
                                                        ) : (
                                                            <button
                                                                onClick={() => handleToggleFlag(product.id, product.name, product.status)}
                                                                className={`p-1.5 rounded-lg border transition-colors focus:outline-none cursor-pointer
                                                                    ${product.status === 'Flagged'
                                                                        ? 'border-emerald-250 dark:border-emerald-900 hover:bg-emerald-50 dark:hover:bg-emerald-950/10 text-emerald-500'
                                                                        : 'border-rose-250 dark:border-rose-900 hover:bg-rose-50 dark:hover:bg-rose-950/10 text-rose-500'
                                                                    }`}
                                                                title={product.status === 'Flagged' ? "Unflag product" : "Flag / Suspend Product"}
                                                            >
                                                                <AlertOctagon className="w-3.5 h-3.5" />
                                                            </button>
                                                        )}
                                                        
                                                        <button
                                                            onClick={() => handleToggleFeature(product.id, product.name, product.featured)}
                                                            className={`p-1.5 rounded-lg border transition-colors focus:outline-none cursor-pointer
                                                                ${product.featured
                                                                    ? 'bg-amber-500 border-amber-500 text-white'
                                                                    : 'border-stone-200 dark:border-stone-800 hover:bg-stone-50 dark:hover:bg-stone-900 text-stone-400 hover:text-amber-500'
                                                                }`}
                                                            title="Toggle Featured placement"
                                                        >
                                                            <Star className="w-3.5 h-3.5 fill-current" />
                                                        </button>

                                                        <button
                                                            onClick={() => handleDeleteProduct(product.id, product.name)}
                                                            className="p-1.5 rounded-lg border border-stone-200 dark:border-stone-800 hover:bg-rose-50 dark:hover:bg-rose-950/10 hover:text-rose-500 text-stone-500 dark:text-stone-400 transition-colors focus:outline-none cursor-pointer"
                                                            title="Delete product"
                                                        >
                                                            <Trash2 className="w-3.5 h-3.5" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
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
