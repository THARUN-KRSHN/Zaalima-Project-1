import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/dashboard/Sidebar';
import TopBar from '../../components/dashboard/TopBar';
import Loader from '../../components/common/Loader';
import { Search, Check, X, ShieldAlert, SlidersHorizontal, Sparkles, Store } from 'lucide-react';

export default function AdminVendors() {
    const [loading, setLoading] = useState(true);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('Vendors');

    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    const [notification, setNotification] = useState(null);

    // Initial mock merchant listings matching dashboard and checklists
    const [vendors, setVendors] = useState([
        { id: 'VND-3921', name: 'Zaalima Boutiques', owner: 'Aleena Manoj', email: 'aleena@boutique.com', gst: '32AAAAA0000A1Z1', date: 'June 24, 2026', status: 'Pending', rating: 4.8 },
        { id: 'VND-8842', name: 'Apex Electronics', owner: 'Melit Joffy', email: 'melit@apex.com', gst: '32BBBBB1111B2Z2', date: 'June 23, 2026', status: 'Pending', rating: 4.5 },
        { id: 'VND-5743', name: 'Kerala Spice Market', owner: 'Chrismon Sunny', email: 'chrismon@spices.com', gst: '32CCCCC2222C3Z3', date: 'June 21, 2026', status: 'Suspended', rating: 3.9 },
        { id: 'VND-1002', name: 'Aroma Perfumers', owner: 'Nisha Varghese', email: 'nisha@perfumes.com', gst: '32DDDDD4444D4Z4', date: 'June 18, 2026', status: 'Approved', rating: 4.9 }
    ]);

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 900);
        return () => clearTimeout(timer);
    }, []);

    const showToast = (message, type = 'success') => {
        setNotification({ message, type });
        setTimeout(() => setNotification(null), 3000);
    };

    const handleApproveVendor = (id, name) => {
        setVendors(prev =>
            prev.map(v => v.id === id ? { ...v, status: 'Approved' } : v)
        );
        showToast(`Merchant "${name}" has been approved!`);
    };

    const handleRejectVendor = (id, name) => {
        setVendors(prev =>
            prev.map(v => v.id === id ? { ...v, status: 'Rejected' } : v)
        );
        showToast(`Merchant "${name}" registration denied.`, 'error');
    };

    const handleToggleSuspension = (id, name, currentStatus) => {
        const newStatus = currentStatus === 'Suspended' ? 'Approved' : 'Suspended';
        setVendors(prev =>
            prev.map(v => v.id === id ? { ...v, status: newStatus } : v)
        );
        showToast(`Merchant "${name}" status changed to ${newStatus}.`, newStatus === 'Approved' ? 'success' : 'error');
    };

    // Filter Logic
    const filteredVendors = vendors.filter(vendor => {
        const matchesSearch = vendor.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                              vendor.owner.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = statusFilter === 'All' || vendor.status.toLowerCase() === statusFilter.toLowerCase();
        return matchesSearch && matchesStatus;
    });

    return (
        <div className={`${isDarkMode ? 'dark' : ''} min-h-screen w-full bg-[var(--bg-main)] flex transition-colors duration-300`}>

            <Sidebar
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
                activeTab="Vendors"
                setActiveTab={setActiveTab}
            />

            <div className="flex-grow flex flex-col min-w-0 max-h-screen overflow-y-auto">
                <TopBar
                    title="Merchant Management"
                    isDarkMode={isDarkMode}
                    onToggleTheme={() => setIsDarkMode(!isDarkMode)}
                    onOpenSidebar={() => setIsSidebarOpen(true)}
                />

                <main className="p-4 sm:p-6 lg:p-8 flex flex-col gap-6 w-full max-w-[1440px] mx-auto animate-in fade-in duration-300 relative">
                    
                    {/* Toast Alert Banner */}
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
                            <h2 className="text-xl font-semibold text-[var(--text-main)] tracking-tight">Merchant Approvals & Performance</h2>
                            <p className="text-xs text-[var(--text-muted)] mt-1 font-normal">Moderate new vendor application files, check shop metrics, and toggle merchant access flags.</p>
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
                                        placeholder="Search by business name or owner name..."
                                        className="w-full h-full pl-10 pr-4 rounded-xl border border-[var(--border-light)] bg-[var(--bg-main)]/50 text-xs font-medium text-[var(--text-main)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--primary)]"
                                    />
                                </div>

                                <div className="flex items-center gap-3">
                                    <select
                                        value={statusFilter}
                                        onChange={(e) => setStatusFilter(e.target.value)}
                                        className="h-10 px-3 border border-[var(--border-light)] bg-[var(--bg-main)]/50 rounded-xl focus:outline-none focus:border-[var(--primary)] text-xs text-stone-700 dark:text-stone-300 font-semibold"
                                    >
                                        <option value="All">All Statuses</option>
                                        <option value="Pending">Pending</option>
                                        <option value="Approved">Approved</option>
                                        <option value="Suspended">Suspended</option>
                                        <option value="Rejected">Rejected</option>
                                    </select>
                                    <div className="text-xs font-medium text-[var(--text-muted)] flex items-center gap-1.5 justify-end shrink-0 pl-2">
                                        <SlidersHorizontal className="w-3.5 h-3.5" />
                                        <span>Total: {filteredVendors.length}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Vendors Table */}
                            <div className="w-full overflow-x-auto rounded-2xl border border-[var(--border-light)] bg-[var(--bg-surface)] shadow-sm transition-colors text-left">
                                <table className="w-full border-collapse">
                                    <thead>
                                        <tr className="border-b border-[var(--border-light)] text-[10px] sm:text-xs font-bold uppercase tracking-wider text-stone-400 dark:text-stone-500">
                                            <th className="px-6 py-4.5 text-left font-semibold">Store ID</th>
                                            <th className="px-6 py-4.5 text-left font-semibold">Business Info</th>
                                            <th className="px-6 py-4.5 text-left font-semibold">GSTIN</th>
                                            <th className="px-6 py-4.5 text-left font-semibold">Performance</th>
                                            <th className="px-6 py-4.5 text-left font-semibold">Status</th>
                                            <th className="px-6 py-4.5 text-right font-semibold">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-[var(--border-light)]/60 text-xs sm:text-sm font-medium">
                                        {filteredVendors.map((vendor) => (
                                            <tr key={vendor.id} className="hover:bg-[var(--bg-surface-hover)]/40 transition-colors">
                                                <td className="px-6 py-4 font-mono font-semibold text-stone-700 dark:text-stone-300 text-[11px] min-w-[120px]">
                                                    {vendor.id}
                                                </td>
                                                <td className="px-6 py-4 min-w-[200px]">
                                                    <div className="flex items-center gap-2.5">
                                                        <div className="w-8 h-8 rounded-lg bg-stone-100 dark:bg-stone-800 text-stone-500 flex items-center justify-center shrink-0">
                                                            <Store className="w-4 h-4" />
                                                        </div>
                                                        <div className="flex flex-col gap-0.5">
                                                            <span className="font-semibold text-stone-900 dark:text-stone-100">{vendor.name}</span>
                                                            <span className="text-[10px] text-stone-400 dark:text-stone-500 font-normal">Owner: {vendor.owner} • {vendor.email}</span>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 font-mono text-[11px] text-stone-600 dark:text-stone-300">
                                                    {vendor.gst}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className="font-semibold text-stone-800 dark:text-stone-200">⭐ {vendor.rating} / 5.0</span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold border
                                                        ${vendor.status === 'Pending' && 'bg-amber-500/10 border-amber-500/20 text-amber-600 dark:text-amber-400'}
                                                        ${vendor.status === 'Approved' && 'bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400'}
                                                        ${vendor.status === 'Suspended' && 'bg-rose-500/10 border-rose-500/20 text-rose-600 dark:text-rose-400'}
                                                        ${vendor.status === 'Rejected' && 'bg-stone-100 border-stone-200 text-stone-550 dark:bg-stone-900 dark:border-stone-800'}
                                                    `}>
                                                        {vendor.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <div className="flex items-center justify-end gap-1.5">
                                                        {vendor.status === 'Pending' ? (
                                                            <>
                                                                <button
                                                                    onClick={() => handleApproveVendor(vendor.id, vendor.name)}
                                                                    className="w-7 h-7 bg-emerald-500/10 hover:bg-emerald-500 text-emerald-600 hover:text-white rounded-lg flex items-center justify-center border border-emerald-500/20 transition-all cursor-pointer"
                                                                    title="Approve Merchant"
                                                                >
                                                                    <Check className="w-3.5 h-3.5" />
                                                                </button>
                                                                <button
                                                                    onClick={() => handleRejectVendor(vendor.id, vendor.name)}
                                                                    className="w-7 h-7 bg-rose-500/10 hover:bg-rose-500 text-rose-600 hover:text-white rounded-lg flex items-center justify-center border border-rose-500/20 transition-all cursor-pointer"
                                                                    title="Reject Application"
                                                                >
                                                                    <X className="w-3.5 h-3.5" />
                                                                </button>
                                                            </>
                                                        ) : (
                                                            <button
                                                                onClick={() => handleToggleSuspension(vendor.id, vendor.name, vendor.status)}
                                                                className={`p-1.5 rounded-lg border transition-colors focus:outline-none cursor-pointer
                                                                    ${vendor.status === 'Suspended'
                                                                        ? 'border-emerald-250 dark:border-emerald-900 hover:bg-emerald-50 dark:hover:bg-emerald-950/10 text-emerald-500'
                                                                        : 'border-amber-250 dark:border-amber-900 hover:bg-amber-50 dark:hover:bg-amber-950/10 text-amber-500'
                                                                    }`}
                                                                title={vendor.status === 'Suspended' ? "Unsuspend Store" : "Suspend Store"}
                                                            >
                                                                {vendor.status === 'Suspended' ? <Check className="w-3.5 h-3.5" /> : <ShieldAlert className="w-3.5 h-3.5" />}
                                                            </button>
                                                        )}
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
