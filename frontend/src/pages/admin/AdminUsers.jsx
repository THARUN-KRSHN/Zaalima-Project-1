import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/dashboard/Sidebar';
import TopBar from '../../components/dashboard/TopBar';
import Loader from '../../components/common/Loader';
import { Search, UserMinus, UserCheck, Trash2, Shield, User, SlidersHorizontal, Sparkles } from 'lucide-react';

export default function AdminUsers() {
    const [loading, setLoading] = useState(true);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('Users');

    const [searchQuery, setSearchQuery] = useState('');
    const [roleFilter, setRoleFilter] = useState('All');
    const [notification, setNotification] = useState(null);

    // Mock platform users database
    const [users, setUsers] = useState([
        { id: "USR-001", name: "Tharun Krishna C U", email: "tharun@zmarket.com", role: "Customer", status: "Active" },
        { id: "USR-002", name: "Aleena Manoj", email: "aleena@boutique.com", role: "Vendor", status: "Active" },
        { id: "USR-003", name: "Melit Joffy", email: "melit@apex.com", role: "Vendor", status: "Active" },
        { id: "USR-004", name: "Chrismon Sunny", email: "chrismon@spices.com", role: "Vendor", status: "Suspended" },
        { id: "USR-005", name: "Nihal PJ", email: "nihal@zmarket.com", role: "Customer", status: "Active" },
        { id: "USR-006", name: "System Admin", email: "admin@zmarket.com", role: "Admin", status: "Active" }
    ]);

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 900);
        return () => clearTimeout(timer);
    }, []);

    const showToast = (msg, type = 'success') => {
        setNotification({ message: msg, type });
        setTimeout(() => setNotification(null), 3000);
    };

    const handleToggleStatus = (id, name, currentStatus) => {
        const newStatus = currentStatus === 'Active' ? 'Suspended' : 'Active';
        setUsers(prev => prev.map(u => u.id === id ? { ...u, status: newStatus } : u));
        showToast(`User "${name}" status updated to ${newStatus}.`, newStatus === 'Active' ? 'success' : 'error');
    };

    const handleDeleteUser = (id, name) => {
        setUsers(prev => prev.filter(u => u.id !== id));
        showToast(`User "${name}" deleted from database.`, 'error');
    };

    // Filter Logic
    const filteredUsers = users.filter(user => {
        const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                              user.email.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesRole = roleFilter === 'All' || user.role.toLowerCase() === roleFilter.toLowerCase();
        return matchesSearch && matchesRole;
    });

    return (
        <div className={`${isDarkMode ? 'dark' : ''} min-h-screen w-full bg-[var(--bg-main)] flex transition-colors duration-300`}>

            <Sidebar
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
                activeTab="Users"
                setActiveTab={setActiveTab}
            />

            <div className="flex-grow flex flex-col min-w-0 max-h-screen overflow-y-auto">
                <TopBar
                    title="User Management"
                    isDarkMode={isDarkMode}
                    onToggleTheme={() => setIsDarkMode(!isDarkMode)}
                    onOpenSidebar={() => setIsSidebarOpen(true)}
                />

                <main className="p-4 sm:p-6 lg:p-8 flex flex-col gap-6 w-full max-w-[1440px] mx-auto animate-in fade-in duration-300 relative">
                    
                    {/* Floating Toast Notification */}
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
                            <h2 className="text-xl font-semibold text-[var(--text-main)] tracking-tight">Platform Users</h2>
                            <p className="text-xs text-[var(--text-muted)] mt-1 font-normal">Monitor user registrations, toggle account flags, or suspend profiles.</p>
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
                                        placeholder="Search by username or email address..."
                                        className="w-full h-full pl-10 pr-4 rounded-xl border border-[var(--border-light)] bg-[var(--bg-main)]/50 text-xs font-medium text-[var(--text-main)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--primary)]"
                                    />
                                </div>

                                <div className="flex items-center gap-3">
                                    <select
                                        value={roleFilter}
                                        onChange={(e) => setRoleFilter(e.target.value)}
                                        className="h-10 px-3 border border-[var(--border-light)] bg-[var(--bg-main)]/50 rounded-xl focus:outline-none focus:border-[var(--primary)] text-xs text-stone-700 dark:text-stone-300 font-semibold"
                                    >
                                        <option value="All">All Roles</option>
                                        <option value="Customer">Customer</option>
                                        <option value="Vendor">Vendor</option>
                                        <option value="Admin">Admin</option>
                                    </select>
                                    <div className="text-xs font-medium text-[var(--text-muted)] flex items-center gap-1.5 justify-end shrink-0 pl-2">
                                        <SlidersHorizontal className="w-3.5 h-3.5" />
                                        <span>Matches: {filteredUsers.length}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Users Table */}
                            <div className="w-full overflow-x-auto rounded-2xl border border-[var(--border-light)] bg-[var(--bg-surface)] shadow-sm transition-colors text-left">
                                <table className="w-full border-collapse">
                                    <thead>
                                        <tr className="border-b border-[var(--border-light)] text-[10px] sm:text-xs font-bold uppercase tracking-wider text-stone-400 dark:text-stone-500">
                                            <th className="px-6 py-4.5 text-left font-semibold">User ID</th>
                                            <th className="px-6 py-4.5 text-left font-semibold">Identity Details</th>
                                            <th className="px-6 py-4.5 text-left font-semibold">Role</th>
                                            <th className="px-6 py-4.5 text-left font-semibold">Status</th>
                                            <th className="px-6 py-4.5 text-right font-semibold">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-[var(--border-light)]/60 text-xs sm:text-sm font-medium">
                                        {filteredUsers.map((user) => (
                                            <tr key={user.id} className="hover:bg-[var(--bg-surface-hover)]/40 transition-colors">
                                                <td className="px-6 py-4 font-mono font-semibold text-stone-700 dark:text-stone-300 text-[11px] min-w-[120px]">
                                                    {user.id}
                                                </td>
                                                <td className="px-6 py-4 min-w-[200px]">
                                                    <div className="flex flex-col gap-0.5">
                                                        <span className="font-semibold text-stone-900 dark:text-stone-100">{user.name}</span>
                                                        <span className="text-[10px] text-stone-400 dark:text-stone-500 font-normal">{user.email}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border flex items-center gap-1 w-fit
                                                        ${user.role === 'Admin' && 'bg-rose-50 border-rose-100 text-rose-600 dark:bg-rose-950/20 dark:border-rose-950/50 dark:text-rose-400'}
                                                        ${user.role === 'Vendor' && 'bg-violet-50 border-violet-100 text-violet-650 dark:bg-violet-950/20 dark:border-violet-950/50 dark:text-violet-400'}
                                                        ${user.role === 'Customer' && 'bg-blue-50 border-blue-100 text-blue-650 dark:bg-blue-950/20 dark:border-blue-950/50 dark:text-blue-400'}
                                                    `}>
                                                        {user.role === 'Admin' ? <Shield className="w-3 h-3" /> : <User className="w-3 h-3" />}
                                                        <span>{user.role}</span>
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    {user.status === 'Active' ? (
                                                        <span className="px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 text-[10px] font-semibold border border-emerald-100 dark:border-emerald-950/50">Active</span>
                                                    ) : (
                                                        <span className="px-2 py-0.5 rounded-full bg-stone-100 dark:bg-stone-900 text-stone-550 dark:text-stone-450 text-[10px] font-semibold border border-stone-200/50 dark:border-stone-800">Suspended</span>
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <div className="flex items-center justify-end gap-1.5">
                                                        <button
                                                            onClick={() => handleToggleStatus(user.id, user.name, user.status)}
                                                            className={`p-1.5 rounded-lg border transition-colors focus:outline-none cursor-pointer
                                                                ${user.status === 'Active'
                                                                    ? 'border-amber-200 dark:border-amber-900 hover:bg-amber-50 dark:hover:bg-amber-950/10 text-amber-500'
                                                                    : 'border-emerald-200 dark:border-emerald-900 hover:bg-emerald-50 dark:hover:bg-emerald-950/10 text-emerald-500'
                                                                }`}
                                                            title={user.status === 'Active' ? "Suspend user" : "Activate user"}
                                                        >
                                                            {user.status === 'Active' ? <UserMinus className="w-3.5 h-3.5" /> : <UserCheck className="w-3.5 h-3.5" />}
                                                        </button>
                                                        {user.role !== 'Admin' && (
                                                            <button
                                                                onClick={() => handleDeleteUser(user.id, user.name)}
                                                                className="p-1.5 rounded-lg border border-stone-200 dark:border-stone-800 hover:bg-rose-50 dark:hover:bg-rose-950/10 hover:text-rose-500 text-stone-500 dark:text-stone-400 transition-colors focus:outline-none cursor-pointer"
                                                                title="Delete user"
                                                            >
                                                                <Trash2 className="w-3.5 h-3.5" />
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
