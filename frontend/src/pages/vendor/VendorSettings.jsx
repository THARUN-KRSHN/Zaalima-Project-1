import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/dashboard/Sidebar';
import TopBar from '../../components/dashboard/TopBar';
import Loader from '../../components/common/Loader';
import { Save, Store, Shield, CreditCard, Bell, CheckCircle } from 'lucide-react';

export default function VendorSettings() {
    const [loading, setLoading] = useState(true);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('Settings');

    // Sub-tab selection state inside settings page
    const [activeSection, setActiveSection] = useState('store');
    const [isSaved, setIsSaved] = useState(false);

    // Initial mock vendor settings
    const [settings, setSettings] = useState({
        storeName: "Zaalima Boutiques",
        description: "Curators of premium ethnic designs and comfortable lifestyle wear.",
        email: "merchant@zaalima.com",
        phone: "9778585423",
        logoUrl: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=100&auto=format&fit=crop&q=80",
        bannerUrl: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&auto=format&fit=crop&q=80",
        gstin: "32AAAAA1111A1Z1",
        pan: "ABCDE1234F",
        accountName: "Zaalima Projects PVT LTD",
        accountNumber: "9180299839931",
        ifscCode: "BARB0IRINJA",
        notifyOnNewOrder: true,
        notifyOnLowStock: true
    });

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 900);
        return () => clearTimeout(timer);
    }, []);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setSettings(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSave = (e) => {
        e.preventDefault();
        setIsSaved(true);
        setTimeout(() => setIsSaved(false), 3000);
    };

    return (
        <div className={`${isDarkMode ? 'dark' : ''} min-h-screen w-full bg-[var(--bg-main)] flex transition-colors duration-300`}>

            <Sidebar
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
                activeTab="Settings"
                setActiveTab={setActiveTab}
            />

            <div className="flex-grow flex flex-col min-w-0 max-h-screen overflow-y-auto">
                <TopBar
                    title="Storefront Settings"
                    isDarkMode={isDarkMode}
                    onToggleTheme={() => setIsDarkMode(!isDarkMode)}
                    onOpenSidebar={() => setIsSidebarOpen(true)}
                />

                <main className="p-4 sm:p-6 lg:p-8 flex flex-col gap-6 w-full max-w-[1440px] mx-auto animate-in fade-in duration-300">

                    {/* Workspace Header Block */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--border-light)] pb-5 text-left">
                        <div>
                            <h2 className="text-xl font-semibold text-[var(--text-main)] tracking-tight">Merchant Control Deck</h2>
                            <p className="text-xs text-[var(--text-muted)] mt-1 font-normal">Configure storefront metadata, registration details, tax profiles, and notification preferences.</p>
                        </div>
                    </div>

                    {loading ? (
                        <Loader variant="profile" />
                    ) : (
                        <div className="flex flex-col lg:flex-row gap-6 items-start w-full">
                            
                            {/* Inner Settings Rail Navigation */}
                            <div className="w-full lg:w-[260px] bg-[var(--bg-surface)] p-3 border border-[var(--border-light)] rounded-2xl flex flex-row lg:flex-col gap-1.5 overflow-x-auto shrink-0 shadow-sm transition-colors">
                                <button
                                    onClick={() => setActiveSection('store')}
                                    className={`px-4 py-2.5 rounded-xl font-semibold text-xs tracking-wide flex items-center gap-2.5 focus:outline-none cursor-pointer w-full text-left shrink-0 ${activeSection === 'store' ? 'bg-[var(--primary)] text-[var(--text-on-primary)]' : 'text-[var(--text-muted)] hover:bg-[var(--bg-surface-hover)]'}`}
                                >
                                    <Store className="w-4 h-4" />
                                    <span>Store Profile</span>
                                </button>
                                <button
                                    onClick={() => setActiveSection('legal')}
                                    className={`px-4 py-2.5 rounded-xl font-semibold text-xs tracking-wide flex items-center gap-2.5 focus:outline-none cursor-pointer w-full text-left shrink-0 ${activeSection === 'legal' ? 'bg-[var(--primary)] text-[var(--text-on-primary)]' : 'text-[var(--text-muted)] hover:bg-[var(--bg-surface-hover)]'}`}
                                >
                                    <Shield className="w-4 h-4" />
                                    <span>Tax & Legal</span>
                                </button>
                                <button
                                    onClick={() => setActiveSection('banking')}
                                    className={`px-4 py-2.5 rounded-xl font-semibold text-xs tracking-wide flex items-center gap-2.5 focus:outline-none cursor-pointer w-full text-left shrink-0 ${activeSection === 'banking' ? 'bg-[var(--primary)] text-[var(--text-on-primary)]' : 'text-[var(--text-muted)] hover:bg-[var(--bg-surface-hover)]'}`}
                                >
                                    <CreditCard className="w-4 h-4" />
                                    <span>Settlements</span>
                                </button>
                                <button
                                    onClick={() => setActiveSection('notifications')}
                                    className={`px-4 py-2.5 rounded-xl font-semibold text-xs tracking-wide flex items-center gap-2.5 focus:outline-none cursor-pointer w-full text-left shrink-0 ${activeSection === 'notifications' ? 'bg-[var(--primary)] text-[var(--text-on-primary)]' : 'text-[var(--text-muted)] hover:bg-[var(--bg-surface-hover)]'}`}
                                >
                                    <Bell className="w-4 h-4" />
                                    <span>Preferences</span>
                                </button>
                            </div>

                            {/* Main settings form container */}
                            <form onSubmit={handleSave} className="flex-grow w-full bg-[var(--bg-surface)] p-6 sm:p-8 border border-[var(--border-light)] rounded-2xl shadow-sm transition-colors text-left flex flex-col gap-6">
                                
                                {activeSection === 'store' && (
                                    <div className="flex flex-col gap-5 animate-in fade-in duration-150">
                                        <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-150 border-b border-[var(--border-light)] pb-2.5 flex items-center gap-2"><Store className="w-4 h-4 text-stone-400" /><span>Store Profile Settings</span></h3>
                                        
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                                            <div className="flex flex-col gap-1.5">
                                                <label className="font-semibold text-stone-700 dark:text-stone-300">Store Name</label>
                                                <input
                                                    type="text"
                                                    name="storeName"
                                                    value={settings.storeName}
                                                    onChange={handleChange}
                                                    required
                                                    className="w-full h-10 px-3 border border-[var(--border-light)] bg-[var(--bg-main)]/50 rounded-xl focus:outline-none focus:border-[var(--primary)] font-medium text-stone-850 dark:text-stone-200"
                                                />
                                            </div>
                                            <div className="flex flex-col gap-1.5">
                                                <label className="font-semibold text-stone-700 dark:text-stone-300">Support Phone</label>
                                                <input
                                                    type="text"
                                                    name="phone"
                                                    value={settings.phone}
                                                    onChange={handleChange}
                                                    required
                                                    className="w-full h-10 px-3 border border-[var(--border-light)] bg-[var(--bg-main)]/50 rounded-xl focus:outline-none focus:border-[var(--primary)] font-medium text-stone-850 dark:text-stone-200"
                                                />
                                            </div>
                                        </div>

                                        <div className="flex flex-col gap-1.5 text-xs sm:text-sm">
                                            <label className="font-semibold text-stone-700 dark:text-stone-300">Store Email</label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={settings.email}
                                                onChange={handleChange}
                                                required
                                                className="w-full h-10 px-3 border border-[var(--border-light)] bg-[var(--bg-main)]/50 rounded-xl focus:outline-none focus:border-[var(--primary)] font-medium text-stone-850 dark:text-stone-200"
                                            />
                                        </div>

                                        <div className="flex flex-col gap-1.5 text-xs sm:text-sm">
                                            <label className="font-semibold text-stone-700 dark:text-stone-300">Store Description</label>
                                            <textarea
                                                name="description"
                                                value={settings.description}
                                                onChange={handleChange}
                                                rows="3"
                                                className="w-full p-3 border border-[var(--border-light)] bg-[var(--bg-main)]/50 rounded-xl focus:outline-none focus:border-[var(--primary)] font-medium text-stone-850 dark:text-stone-200 resize-none"
                                            />
                                        </div>

                                        <div className="flex flex-col gap-1.5 text-xs sm:text-sm">
                                            <label className="font-semibold text-stone-700 dark:text-stone-300">Logo URL</label>
                                            <input
                                                type="text"
                                                name="logoUrl"
                                                value={settings.logoUrl}
                                                onChange={handleChange}
                                                className="w-full h-10 px-3 border border-[var(--border-light)] bg-[var(--bg-main)]/50 rounded-xl focus:outline-none focus:border-[var(--primary)] font-medium text-stone-850 dark:text-stone-200"
                                            />
                                        </div>
                                    </div>
                                )}

                                {activeSection === 'legal' && (
                                    <div className="flex flex-col gap-5 animate-in fade-in duration-150">
                                        <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-150 border-b border-[var(--border-light)] pb-2.5 flex items-center gap-2"><Shield className="w-4 h-4 text-stone-400" /><span>Tax & Registration Parameters</span></h3>
                                        
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                                            <div className="flex flex-col gap-1.5">
                                                <label className="font-semibold text-stone-700 dark:text-stone-300">GSTIN Registration</label>
                                                <input
                                                    type="text"
                                                    name="gstin"
                                                    value={settings.gstin}
                                                    onChange={handleChange}
                                                    placeholder="32AAAAA1111A1Z1"
                                                    className="w-full h-10 px-3 border border-[var(--border-light)] bg-[var(--bg-main)]/50 rounded-xl focus:outline-none focus:border-[var(--primary)] font-mono text-stone-850 dark:text-stone-200"
                                                />
                                            </div>
                                            <div className="flex flex-col gap-1.5">
                                                <label className="font-semibold text-stone-700 dark:text-stone-300">Corporate PAN</label>
                                                <input
                                                    type="text"
                                                    name="pan"
                                                    value={settings.pan}
                                                    onChange={handleChange}
                                                    placeholder="ABCDE1234F"
                                                    className="w-full h-10 px-3 border border-[var(--border-light)] bg-[var(--bg-main)]/50 rounded-xl focus:outline-none focus:border-[var(--primary)] font-mono text-stone-850 dark:text-stone-200"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {activeSection === 'banking' && (
                                    <div className="flex flex-col gap-5 animate-in fade-in duration-150">
                                        <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-150 border-b border-[var(--border-light)] pb-2.5 flex items-center gap-2"><CreditCard className="w-4 h-4 text-stone-400" /><span>Settlements & Bank Details</span></h3>
                                        
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                                            <div className="flex flex-col gap-1.5">
                                                <label className="font-semibold text-stone-700 dark:text-stone-300">Account Holder Name</label>
                                                <input
                                                    type="text"
                                                    name="accountName"
                                                    value={settings.accountName}
                                                    onChange={handleChange}
                                                    className="w-full h-10 px-3 border border-[var(--border-light)] bg-[var(--bg-main)]/50 rounded-xl focus:outline-none focus:border-[var(--primary)] font-medium text-stone-850 dark:text-stone-200"
                                                />
                                            </div>
                                            <div className="flex flex-col gap-1.5">
                                                <label className="font-semibold text-stone-700 dark:text-stone-300">Account Number</label>
                                                <input
                                                    type="text"
                                                    name="accountNumber"
                                                    value={settings.accountNumber}
                                                    onChange={handleChange}
                                                    className="w-full h-10 px-3 border border-[var(--border-light)] bg-[var(--bg-main)]/50 rounded-xl focus:outline-none focus:border-[var(--primary)] font-mono text-stone-850 dark:text-stone-200"
                                                />
                                            </div>
                                        </div>
                                        <div className="flex flex-col gap-1.5 text-xs sm:text-sm max-w-sm">
                                            <label className="font-semibold text-stone-700 dark:text-stone-300">IFSC Settlement Code</label>
                                            <input
                                                type="text"
                                                name="ifscCode"
                                                value={settings.ifscCode}
                                                onChange={handleChange}
                                                className="w-full h-10 px-3 border border-[var(--border-light)] bg-[var(--bg-main)]/50 rounded-xl focus:outline-none focus:border-[var(--primary)] font-mono text-stone-850 dark:text-stone-200"
                                            />
                                        </div>
                                    </div>
                                )}

                                {activeSection === 'notifications' && (
                                    <div className="flex flex-col gap-5 animate-in fade-in duration-150">
                                        <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-150 border-b border-[var(--border-light)] pb-2.5 flex items-center gap-2"><Bell className="w-4 h-4 text-stone-400" /><span>Fulfillment Preferences</span></h3>
                                        
                                        <div className="flex flex-col gap-4.5 text-xs sm:text-sm">
                                            <label className="flex items-center gap-3 select-none cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    name="notifyOnNewOrder"
                                                    checked={settings.notifyOnNewOrder}
                                                    onChange={handleChange}
                                                    className="w-4.5 h-4.5 rounded border-stone-300 accent-[var(--primary)] cursor-pointer"
                                                />
                                                <span className="font-semibold text-stone-850 dark:text-stone-200">Email alert on new customer checkout</span>
                                            </label>
                                            <label className="flex items-center gap-3 select-none cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    name="notifyOnLowStock"
                                                    checked={settings.notifyOnLowStock}
                                                    onChange={handleChange}
                                                    className="w-4.5 h-4.5 rounded border-stone-300 accent-[var(--primary)] cursor-pointer"
                                                />
                                                <span className="font-semibold text-stone-850 dark:text-stone-200">Stock dashboard warnings on items &lt; 10 units</span>
                                            </label>
                                        </div>
                                    </div>
                                )}

                                {/* Save Button with notification confirmation */}
                                <div className="mt-4 pt-5 border-t border-[var(--border-light)]/60 flex items-center justify-between gap-4">
                                    <div className="flex-grow">
                                        {isSaved && (
                                            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 text-xs font-semibold animate-in fade-in duration-150">
                                                <CheckCircle className="w-4 h-4" />
                                                <span>Settings saved successfully!</span>
                                            </div>
                                        )}
                                    </div>
                                    <button
                                        type="submit"
                                        className="h-10 px-5 bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-[var(--text-on-primary)] font-semibold text-xs rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-sm transition-all focus:outline-none shrink-0"
                                    >
                                        <Save className="w-4 h-4" />
                                        <span>Save Settings</span>
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}

                </main>
            </div>
        </div>
    );
}
