import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/dashboard/Sidebar';
import TopBar from '../../components/dashboard/TopBar';
import Loader from '../../components/common/Loader';
import { Search, Download, ClipboardList, User, SlidersHorizontal, ArrowUpRight } from 'lucide-react';

export default function VendorOrders() {
    const [loading, setLoading] = useState(true);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('Orders');

    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');

    // Initial mock vendor orders database
    const [orders, setOrders] = useState([
        { id: "ZMK-98231-IND", date: "2026-06-28", customerName: "Tharun Krishna C U", city: "Irinjalakuda", items: "Quantum Mechanical Keyboard v2 (x1), Pro Wireless Dual-Sense Controller (x1)", amount: "₹14,398", status: "Processing" },
        { id: "ZMK-87112-IND", date: "2026-06-24", customerName: "Tharun Krishna C U", city: "Irinjalakuda", items: "Premium Leather Birken Clogs (x1)", amount: "₹4,299", status: "Shipped" },
        { id: "ZMK-65432-IND", date: "2026-06-20", customerName: "Adithya Dev", city: "Kochi", items: "Minimalist Ergonomic Cargo Trouser (x2)", amount: "₹4,398", status: "Delivered" },
        { id: "ZMK-12345-IND", date: "2026-06-15", customerName: "Nihal PJ", city: "Thrissur", items: "Quantum Mechanical Keyboard v2 (x1)", amount: "₹8,499", status: "Pending" }
    ]);

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 900);
        return () => clearTimeout(timer);
    }, []);

    const handleStatusChange = (orderId, newStatus) => {
        setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
    };

    const handleExportOrders = () => {
        alert("Simulating export of order ledger database to CSV spreadsheet file.");
    };

    // Filter logic
    const filteredOrders = orders.filter(order => {
        const matchesSearch = order.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
                              order.customerName.toLowerCase().includes(searchQuery.toLowerCase());
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
                    title="Orders Management"
                    isDarkMode={isDarkMode}
                    onToggleTheme={() => setIsDarkMode(!isDarkMode)}
                    onOpenSidebar={() => setIsSidebarOpen(true)}
                />

                <main className="p-4 sm:p-6 lg:p-8 flex flex-col gap-6 w-full max-w-[1440px] mx-auto animate-in fade-in duration-300">

                    {/* Workspace Header Block */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--border-light)] pb-5 text-left">
                        <div>
                            <h2 className="text-xl font-semibold text-[var(--text-main)] tracking-tight">Fulfillment Ledger</h2>
                            <p className="text-xs text-[var(--text-muted)] mt-1 font-normal">Track transactions and update delivery statuses for merchant orders.</p>
                        </div>
                        <button
                            onClick={handleExportOrders}
                            className="h-10 px-4 bg-[var(--bg-surface)] hover:bg-[var(--bg-surface-hover)] border border-[var(--border-light)] text-[var(--text-main)] font-semibold text-xs rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-sm shrink-0 transition-colors focus:outline-none"
                        >
                            <Download className="w-4 h-4 text-stone-500" />
                            <span>Export Ledger</span>
                        </button>
                    </div>

                    {loading ? (
                        <Loader variant="table" />
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
                                        placeholder="Search by Order ID or customer..."
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
                                        <option value="Pending">Pending</option>
                                        <option value="Processing">Processing</option>
                                        <option value="Shipped">Shipped</option>
                                        <option value="Delivered">Delivered</option>
                                    </select>
                                    <div className="text-xs font-medium text-[var(--text-muted)] flex items-center gap-1.5 justify-end shrink-0 pl-2">
                                        <SlidersHorizontal className="w-3.5 h-3.5" />
                                        <span>Total: {filteredOrders.length}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Orders Table Block */}
                            <div className="w-full overflow-x-auto rounded-2xl border border-[var(--border-light)] bg-[var(--bg-surface)] shadow-sm transition-colors text-left">
                                <table className="w-full border-collapse">
                                    <thead>
                                        <tr className="border-b border-[var(--border-light)] text-[10px] sm:text-xs font-bold uppercase tracking-wider text-stone-400 dark:text-stone-500">
                                            <th className="px-6 py-4.5 text-left font-semibold">Order ID</th>
                                            <th className="px-6 py-4.5 text-left font-semibold">Customer</th>
                                            <th className="px-6 py-4.5 text-left font-semibold">Order Details</th>
                                            <th className="px-6 py-4.5 text-left font-semibold">Amount</th>
                                            <th className="px-6 py-4.5 text-left font-semibold">Fulfillment status</th>
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
                                                <td className="px-6 py-4 min-w-[180px]">
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-7 h-7 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-500 flex items-center justify-center text-xs shrink-0 font-sans">
                                                            <User className="w-3.5 h-3.5" />
                                                        </div>
                                                        <div className="flex flex-col gap-0.5">
                                                            <span className="font-semibold text-stone-900 dark:text-stone-100">{order.customerName}</span>
                                                            <span className="text-[10px] text-stone-400 dark:text-stone-500 font-normal">{order.city}</span>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 min-w-[240px] max-w-sm">
                                                    <p className="text-stone-600 dark:text-stone-300 truncate font-normal leading-relaxed">{order.items}</p>
                                                </td>
                                                <td className="px-6 py-4 font-mono font-semibold text-stone-950 dark:text-white">
                                                    {order.amount}
                                                </td>
                                                <td className="px-6 py-4 min-w-[180px]">
                                                    <select
                                                        value={order.status}
                                                        onChange={(e) => handleStatusChange(order.id, e.target.value)}
                                                        className={`px-3 py-1.5 rounded-full border text-xs font-semibold focus:outline-none cursor-pointer transition-colors ${getStatusStyle(order.status)}`}
                                                    >
                                                        <option value="Pending">Pending</option>
                                                        <option value="Processing">Processing</option>
                                                        <option value="Shipped">Shipped</option>
                                                        <option value="Delivered">Delivered</option>
                                                    </select>
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
