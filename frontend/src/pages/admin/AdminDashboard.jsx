import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/dashboard/Sidebar';
import TopBar from '../../components/dashboard/TopBar';
import Loader from '../../components/common/Loader';
import DashboardCard from '../../components/dashboard/DashboardCard';
import { UserCheck, ShieldAlert, Check, X, Sparkles } from 'lucide-react';

export default function AdminDashboard() {
    const [loading, setLoading] = useState(true);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('Dashboard');
    
    // Interactive Vendor Approvals State Registry
    const [pendingVendors, setPendingVendors] = useState([
        { id: 'VND-3921', name: 'Zaalima Boutiques', owner: 'Aleena Manoj', email: 'aleena@boutique.com', gst: '32AAAAA0000A1Z1', date: 'June 24, 2026', status: 'Pending' },
        { id: 'VND-8842', name: 'Apex Electronics', owner: 'Melit Joffy', email: 'melit@apex.com', gst: '32BBBBB1111B2Z2', date: 'June 23, 2026', status: 'Pending' },
        { id: 'VND-5743', name: 'Kerala Spice Market', owner: 'Chrismon Sunny', email: 'chrismon@spices.com', gst: '32CCCCC2222C3Z3', date: 'June 21, 2026', status: 'Pending' },
    ]);

    const [notification, setNotification] = useState(null);

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 900);
        return () => clearTimeout(timer);
    }, []);

    const handleApproveVendor = (id, name) => {
        setPendingVendors(prev =>
            prev.map(vendor => vendor.id === id ? { ...vendor, status: 'Approved' } : vendor)
        );
        showNotification(`Merchant "${name}" has been successfully approved!`);
    };

    const handleRejectVendor = (id, name) => {
        setPendingVendors(prev =>
            prev.map(vendor => vendor.id === id ? { ...vendor, status: 'Rejected' } : vendor)
        );
        showNotification(`Merchant "${name}" registration request denied.`, 'error');
    };

    const showNotification = (message, type = 'success') => {
        setNotification({ message, type });
        setTimeout(() => setNotification(null), 4000);
    };

    return (
        <div className={`${isDarkMode ? 'dark' : ''} min-h-screen w-full bg-[var(--bg-main)] flex transition-colors duration-300`}>
            
            {/* Dynamic Sidebar adapting to Admin Role */}
            <Sidebar
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
            />

            <div className="flex-grow flex flex-col min-w-0 max-h-screen overflow-y-auto">
                <TopBar
                    title={activeTab === 'Dashboard' ? 'Admin Overview' : activeTab}
                    isDarkMode={isDarkMode}
                    onToggleTheme={() => setIsDarkMode(!isDarkMode)}
                    onOpenSidebar={() => setIsSidebarOpen(true)}
                />

                <main className="p-4 sm:p-6 lg:p-8 flex flex-col gap-6 w-full max-w-[1440px] mx-auto animate-in fade-in duration-300 relative">
                    
                    {/* Floating Toast Notification Banner */}
                    {notification && (
                        <div className={`fixed top-20 right-6 z-50 p-4 rounded-2xl shadow-xl border flex items-center gap-3 animate-in slide-in-from-top-5 duration-300
                            ${notification.type === 'success' 
                                ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-700 dark:text-emerald-400' 
                                : 'bg-rose-500/10 border-rose-500/20 text-rose-700 dark:text-rose-400'
                            }`}
                        >
                            <Sparkles className="w-5 h-5" />
                            <span className="text-xs font-bold font-sans">{notification.message}</span>
                        </div>
                    )}

                    {activeTab === 'Dashboard' && (
                        loading ? (
                            <>
                                <Loader variant="stats" />
                                <Loader variant="table" />
                            </>
                        ) : (
                            <>
                                {/* Platform-wide Statistics Strip */}
                                <div className="w-full">
                                    <div className="mb-4">
                                        <h2 className="text-xs font-extrabold text-[var(--text-muted)] uppercase tracking-wider">System Statistics Summary</h2>
                                    </div>
                                    <DashboardCard />
                                </div>

                                {/* Interactive Vendor Approvals Panel */}
                                <div className="w-full bg-[var(--bg-surface)] border border-[var(--border-light)] rounded-2xl shadow-sm p-5 sm:p-6 mt-2">
                                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-6 pb-4 border-b border-[var(--border-light)]">
                                        <div>
                                            <h3 className="text-sm sm:text-base font-extrabold text-[var(--text-main)] tracking-tight flex items-center gap-2">
                                                <UserCheck className="w-5 h-5 text-[var(--primary)]" />
                                                <span>Merchant Setup Approval Workflows</span>
                                            </h3>
                                            <p className="text-[11px] text-[var(--text-muted)] mt-1 font-medium">
                                                Review, verify, and approve vendor applications for access to Zaalima platform.
                                            </p>
                                        </div>
                                        <span className="px-3 py-1 bg-amber-500/10 border border-amber-500/10 rounded-full text-[10px] font-bold text-amber-600 dark:text-amber-400">
                                            {pendingVendors.filter(v => v.status === 'Pending').length} Pending Requests
                                        </span>
                                    </div>

                                    {/* Responsive approvals grid table */}
                                    <div className="w-full overflow-x-auto">
                                        <table className="w-full border-collapse text-left text-xs">
                                            <thead>
                                                <tr className="border-b border-[var(--border-light)] text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)] bg-[var(--bg-surface-hover)]/40">
                                                    <th className="p-3">Store ID</th>
                                                    <th className="p-3">Business Name</th>
                                                    <th className="p-3">Owner Legal Name</th>
                                                    <th className="p-3">GSTIN ID</th>
                                                    <th className="p-3">Application Date</th>
                                                    <th className="p-3">Verification</th>
                                                    <th className="p-3 text-right">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-[var(--border-light)] text-[var(--text-main)]">
                                                {pendingVendors.map((vendor) => (
                                                    <tr key={vendor.id} className="hover:bg-[var(--bg-surface-hover)]/20 transition-all font-medium">
                                                        <td className="p-3 font-mono font-bold text-[11px]">{vendor.id}</td>
                                                        <td className="p-3">
                                                            <div className="flex flex-col">
                                                                <span className="font-bold text-stone-900 dark:text-white">{vendor.name}</span>
                                                                <span className="text-[10px] text-[var(--text-muted)]">{vendor.email}</span>
                                                            </div>
                                                        </td>
                                                        <td className="p-3">{vendor.owner}</td>
                                                        <td className="p-3 font-mono text-[11px] text-[var(--text-muted)]">{vendor.gst}</td>
                                                        <td className="p-3 text-[var(--text-muted)]">{vendor.date}</td>
                                                        <td className="p-3">
                                                            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold border
                                                                ${vendor.status === 'Pending' && 'bg-amber-500/10 border-amber-500/20 text-amber-600 dark:text-amber-400'}
                                                                ${vendor.status === 'Approved' && 'bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400'}
                                                                ${vendor.status === 'Rejected' && 'bg-rose-500/10 border-rose-500/20 text-rose-600 dark:text-rose-400'}
                                                            `}>
                                                                {vendor.status}
                                                            </span>
                                                        </td>
                                                        <td className="p-3 text-right">
                                                            {vendor.status === 'Pending' ? (
                                                                <div className="flex items-center justify-end gap-2">
                                                                    <button
                                                                        onClick={() => handleApproveVendor(vendor.id, vendor.name)}
                                                                        className="w-7 h-7 bg-emerald-500/10 hover:bg-emerald-500 text-emerald-600 hover:text-white rounded-lg flex items-center justify-center border border-emerald-500/20 transition-all cursor-pointer"
                                                                        title="Approve Business"
                                                                    >
                                                                        <Check className="w-3.5 h-3.5" />
                                                                    </button>
                                                                    <button
                                                                        onClick={() => handleRejectVendor(vendor.id, vendor.name)}
                                                                        className="w-7 h-7 bg-rose-500/10 hover:bg-rose-500 text-rose-600 hover:text-white rounded-lg flex items-center justify-center border border-rose-500/20 transition-all cursor-pointer"
                                                                        title="Reject Business"
                                                                    >
                                                                        <X className="w-3.5 h-3.5" />
                                                                    </button>
                                                                </div>
                                                            ) : (
                                                                <span className="text-[10px] font-bold text-[var(--text-muted)] italic">Logged</span>
                                                            )}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </>
                        )
                    )}

                    {activeTab !== 'Dashboard' && (
                        <div className="w-full py-24 border border-dashed border-[var(--border-light)] rounded-2xl bg-[var(--bg-surface)] text-center text-xs font-bold tracking-wide uppercase text-[var(--text-muted)] animate-pulse">
                            {activeTab} Management Administration loading...
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}
