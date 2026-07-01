import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
    LayoutDashboard, ShoppingBag, ClipboardList,
    BarChart3, Warehouse, Settings, Sparkles, X, User
} from 'lucide-react';

export default function Sidebar({ isOpen, onClose, activeTab }) {
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);
    const isAdmin = user?.role === 'admin';

    // Config path blueprint structural map arrays based on role
    const menuItems = isAdmin ? [
        { id: 'Dashboard', label: 'Admin Panel', icon: LayoutDashboard, path: '/admin/dashboard' },
        { id: 'Vendors', label: 'Manage Vendors', icon: Warehouse, path: '#vendors' },
        { id: 'Products', label: 'Products Catalog', icon: ShoppingBag, path: '/products' },
        { id: 'Analytics', label: 'System Analytics', icon: BarChart3, path: '#analytics' },
        { id: 'Settings', label: 'Settings', icon: Settings, path: '#settings' },
    ] : [
        { id: 'Dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/vendor/dashboard' },
        { id: 'Products', label: 'Products', icon: ShoppingBag, path: '/vendor/products' },
        { id: 'Orders', label: 'Orders', icon: ClipboardList, path: '/vendor/orders' },
        { id: 'Analytics', label: 'Analytics', icon: BarChart3, path: '/vendor/analytics' },
        { id: 'Inventory', label: 'Inventory', icon: Warehouse, path: '/vendor/inventory' },
        { id: 'Settings', label: 'Settings', icon: Settings, path: '/vendor/settings' },
    ];

    return (
        <>
            {/* Mobile Drawer Overlay Backdrop Sheet mask */}
            {isOpen && (
                <div
                    onClick={onClose}
                    className="fixed inset-0 bg-stone-900/40 backdrop-blur-sm z-40 md:hidden transition-opacity animate-in fade-in duration-200"
                />
            )}

            {/* SLIDE-OUT TRACK PANEL CAPTION CONTAINER */}
            <aside className={`fixed top-0 bottom-0 left-0 w-64 bg-[var(--bg-surface)] border-r border-[var(--border-light)] p-5 z-50 flex flex-col justify-between transition-transform duration-300 md:sticky md:translate-x-0
                ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}
            >
                <div className="flex flex-col gap-8 w-full">
                    {/* Header Workspace Row */}
                    <div className="flex items-center justify-between px-2">
                        <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-full bg-[var(--primary)] flex items-center justify-center text-[var(--text-on-primary)] shadow-sm">
                                <Sparkles className="w-4 h-4 fill-current" />
                            </div>
                            <span className="text-[16px] text-[var(--text-main)] font-extrabold tracking-tight">
                                Z<span className="italic font-normal font-serif text-[var(--primary)]">{isAdmin ? 'admin' : 'vendor'}</span>
                            </span>
                        </div>
                        {/* Mobile Close Button Anchor */}
                        <button onClick={onClose} className="p-1 md:hidden text-[var(--text-muted)] hover:text-[var(--text-main)] focus:outline-none">
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Navigation Links Column */}
                    <nav className="flex flex-col gap-1.5 w-full">
                        {menuItems.map((item) => {
                            const Icon = item.icon;
                            // Checks against the passed current activeTab identifier string prop
                            const isActive = activeTab?.toLowerCase() === item.id.toLowerCase();

                            return (
                                <button
                                    key={item.id}
                                    type="button"
                                    onClick={() => {
                                        // Dynamic Single Page Link Dispatches
                                        if (item.path.startsWith('/')) {
                                            navigate(item.path);
                                        }
                                        if (window.innerWidth < 768) {
                                            onClose(); // Seamlessly dismiss mobile drawers on trigger tap
                                        }
                                    }}
                                    className={`w-full h-11 px-4 rounded-xl flex items-center gap-3.5 font-bold text-xs tracking-wide transition-all focus:outline-none cursor-pointer
                                        ${isActive
                                            ? 'bg-[var(--primary)] text-[var(--text-on-primary)] shadow-sm'
                                            : 'text-[var(--text-muted)] hover:bg-[var(--bg-surface-hover)] hover:text-[var(--text-main)]'
                                        }`}
                                >
                                    <Icon className={`w-4.5 h-4.5 stroke-[2] ${isActive ? 'text-white' : 'opacity-70'}`} />
                                    <span>{item.label}</span>
                                </button>
                            );
                        })}
                    </nav>
                </div>

                {/* Subtle Footer Watermark Label */}
                <div className="px-3 text-[11px] font-semibold text-[var(--text-muted)] tracking-wider uppercase opacity-60">
                    V1.0.4 Premium Deck
                </div>
            </aside>
        </>
    );
}