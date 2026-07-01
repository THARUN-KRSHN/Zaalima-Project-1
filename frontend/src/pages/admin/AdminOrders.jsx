import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/dashboard/Sidebar';
import TopBar from '../../components/dashboard/TopBar';
import Loader from '../../components/common/Loader';
import { Search, XCircle, RefreshCw, SlidersHorizontal, Sparkles } from 'lucide-react';

export default function AdminOrders() {
    const [loading, setLoading] = useState(true);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('Orders');

    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    const [notification, setNotification] = useState(null);

    // Initial mock system-wide orders database
    const [orders, setOrders] = useState([
        { id: "ZMK-98231-IND", date: "2026-06-28", customer: "Tharun Krishna C U", vendor: "Zaalima Boutiques", items: "Quantum Mechanical Keyboard v2 (x1)", amount: "₹8,499", status: "Processing" },
        { id: "ZMK-87112-IND", date: "2026-06-24", customer: "Tharun Krishna C U", vendor: "Zaalima Boutiques", items: "Premium Leather Birken Clogs (x1)", amount: "₹4,299", status: "Shipped" },
        { id: "ZMK-65432-IND", date: "2026-06-20", customer: "Adithya Dev", vendor: "Apex Electronics", items: "Pro Wireless Dual-Sense Controller (x1)", amount: "₹5,899", status: "Delivered" },
        { id: "ZMK-43210-IND", date: "2026-06-18", customer: "Nihal PJ", vendor: "Kerala Spice Market", items: "Kerala Cardamom Organic (x5)", amount: "₹2,250", status: "Cancelled" }
    ]);

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 900);
        return () => clearTimeout(timer);
    }, []);

    const showToast = (message, type = 'success') => {
        setNotification({ message, type });
        setTimeout(() => setNotification(null), 3000);
    };

    const handleCancelOrder = (id) => {
        setOrders(prev => prev.map(o => o.id === id ? { ...o, status: 'Cancelled' } : o));
        showToast(`Order "${id}" has been cancelled.`, 'error');
    };

    const handleIssueRefund = (id) => {
        showToast(`Refund transaction initialized for order "${id}".`);
    };

    // Filter Logic
    const filteredOrders = orders.filter(order => {
        const matchesSearch = order.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
                              order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
                              order.vendor.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = statusFilter === 'All' || order.status.toLowerCase() === statusFilter.toLowerCase();
        return matchesSearch && matchesStatus;
    });

    const getStatusStyle = (status) => {
        switch (status.toLowerCase()) {
            case 'pending':
                return 'bg-blue-50 text-blue-700 dark:bg-blue-950/20 dark:text-blue-400 border-blue-100 dark:border-blue-900/50';
            case 'processing':
                return 'bg-violet-50 text-violet-750 dark:bg-violet-950/20 dark:text-violet-400 border-violet-100 dark:border-violet-900/50';
            case 'shipped':
                return 'bg-amber-50 text-amber-700 dark:bg-amber-950/20 dark:text-amber-400 border-amber-100 dark:border-amber-900/50';
            case 'delivered':
                return 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/20 dark:text-emerald-400 border-emerald-100 dark:border-emerald-900/50';
            case 'cancelled':
                return 'bg-rose-50 text-rose-700 dark:bg-rose-950/20 dark:text-rose-400 border-rose-100 dark:border-rose-900/50';
            default:
                return 'bg-stone-50 text-stone-700 dark:bg-stone-900 dark:text-stone-400 border-stone-200 dark:border-stone-850';
        }
    };

    return (
        <div className={`${isDarkMode ? 'dark' : ''} min-h-screen w-full bg-[var(--bg-main)] flex transition-colors duration-300`}>

            <Sidebar
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
                activeTab="Orders"
                setActiveTab={setActiveTab}
            />

            <div className="flex-grow flex flex-col min-w-0 max-h-screen overflow-y-auto">
                <TopBar
                    title="Platform Orders"
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
                            <RefreshCw className="w-4 h-4 animate-spin text-[var(--primary)]" />
                            <span className="text-xs font-bold font-sans">{notification.message}</span>
                        </div>
                    )}

                    {/* Workspace Header Block */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--border-light)] pb-5 text-left">
                        <div>
                            <h2 className="text-xl font-semibold text-[var(--text-main)] tracking-tight">Order Audit Logs</h2>
                            <p className="text-xs text-[var(--text-muted)] mt-1 font-normal">Audit transactions, manage refunds, and cancel logistics flows for merchant sales.</p>
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
                                        placeholder="Search by Order ID, customer, vendor..."
                                        className="w-full h-full pl-10 pr-4 rounded-xl border border-[var(--border-light)] bg-[var(--bg-main)]/50 text-xs font-medium text-[var(--text-main)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--primary)]"
                                    />
                                </div>

                                <div className="flex items-center gap-3">
                                    <select
                                        value={statusFilter}
                                        onChange={(e) => setStatusFilter(e.target.value)}
                                        className="h-10 px-3 border border-[var(--border-light)] bg-[var(--bg-main)]/50 rounded-xl focus:outline-none focus:border-[var(--primary)] text-xs text-stone-700 dark:text-stone-300 font-semibold"
                                    >
                                        <option value="All">All States</option>
                                        <option value="Processing">Processing</option>
                                        <option value="Shipped">Shipped</option>
                                        <option value="Delivered">Delivered</option>
                                        <option value="Cancelled">Cancelled</option>
                                    </select>
                                    <div className="text-xs font-medium text-[var(--text-muted)] flex items-center gap-1.5 justify-end shrink-0 pl-2">
                                        <SlidersHorizontal className="w-3.5 h-3.5" />
                                        <span>Total: {filteredOrders.length}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Orders Table */}
                            <div className="w-full overflow-x-auto rounded-2xl border border-[var(--border-light)] bg-[var(--bg-surface)] shadow-sm transition-colors text-left">
                                <table className="w-full border-collapse">
                                    <thead>
                                        <tr className="border-b border-[var(--border-light)] text-[10px] sm:text-xs font-bold uppercase tracking-wider text-stone-400 dark:text-stone-500">
                                            <th className="px-6 py-4.5 text-left font-semibold">Order ID</th>
                                            <th className="px-6 py-4.5 text-left font-semibold">Customer</th>
                                            <th className="px-6 py-4.5 text-left font-semibold">Merchant (Vendor)</th>
                                            <th className="px-6 py-4.5 text-left font-semibold">Total Amount</th>
                                            <th className="px-6 py-4.5 text-left font-semibold">Status</th>
                                            <th className="px-6 py-4.5 text-right font-semibold">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-[var(--border-light)]/60 text-xs sm:text-sm font-medium">
                                        {filteredOrders.map((order) => (
                                            <tr key={order.id} className="hover:bg-[var(--bg-surface-hover)]/40 transition-colors">
                                                <td className="px-6 py-4 min-w-[140px]">
                                                    <span className="font-mono font-semibold text-stone-900 dark:text-stone-100 bg-stone-100 dark:bg-stone-900 px-2 py-0.5 rounded text-[11px] border border-stone-200/50 dark:border-stone-850">
                                                        {order.id}
                                                    </span>
                                                    <span className="block text-[10px] text-stone-400 dark:text-stone-500 mt-1 font-medium">{order.date}</span>
                                                </td>
                                                <td className="px-6 py-4 text-stone-900 dark:text-stone-100 font-semibold min-w-[150px]">
                                                    {order.customer}
                                                </td>
                                                <td className="px-6 py-4 text-stone-600 dark:text-stone-300">
                                                    {order.vendor}
                                                </td>
                                                <td className="px-6 py-4 font-mono font-semibold text-stone-950 dark:text-white">
                                                    {order.amount}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${getStatusStyle(order.status)}`}>
                                                        {order.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <div className="flex items-center justify-end gap-1.5">
                                                        {order.status !== 'Cancelled' ? (
                                                            <button
                                                                onClick={() => handleCancelOrder(order.id)}
                                                                className="p-1.5 rounded-lg border border-stone-200 dark:border-stone-800 hover:bg-rose-50 dark:hover:bg-rose-950/10 hover:text-rose-500 text-stone-500 dark:text-stone-400 transition-colors focus:outline-none cursor-pointer"
                                                                title="Cancel Order"
                                                            >
                                                                <XCircle className="w-3.5 h-3.5" />
                                                            </button>
                                                        ) : (
                                                            <button
                                                                onClick={() => handleIssueRefund(order.id)}
                                                                className="p-1.5 rounded-lg border border-stone-200 dark:border-stone-800 hover:bg-emerald-50 dark:hover:bg-emerald-950/10 hover:text-emerald-500 text-stone-500 dark:text-stone-400 transition-colors focus:outline-none cursor-pointer"
                                                                title="Issue Refund"
                                                            >
                                                                <RefreshCw className="w-3.5 h-3.5" />
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
