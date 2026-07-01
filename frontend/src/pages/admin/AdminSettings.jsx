import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/dashboard/Sidebar';
import TopBar from '../../components/dashboard/TopBar';
import Loader from '../../components/common/Loader';
import { Save, Percent, Settings, CreditCard, CheckCircle } from 'lucide-react';

export default function AdminSettings() {
    const [loading, setLoading] = useState(true);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('Settings');

    const [isSaved, setIsSaved] = useState(false);

    // Initial mock admin system configuration settings
    const [platformConfig, setPlatformConfig] = useState({
        commissionRate: "5.0",
        taxGstRate: "18.0",
        baseListingFee: "99",
        enableStripe: true,
        enableRazorpay: true,
        enableCOD: true,
        strictProductModeration: true
    });

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 900);
        return () => clearTimeout(timer);
    }, []);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setPlatformConfig(prev => ({
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
                    title="Platform Config"
                    isDarkMode={isDarkMode}
                    onToggleTheme={() => setIsDarkMode(!isDarkMode)}
                    onOpenSidebar={() => setIsSidebarOpen(true)}
                />

                <main className="p-4 sm:p-6 lg:p-8 flex flex-col gap-6 w-full max-w-[1440px] mx-auto animate-in fade-in duration-300">

                    {/* Workspace Header Block */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--border-light)] pb-5 text-left">
                        <div>
                            <h2 className="text-xl font-semibold text-[var(--text-main)] tracking-tight">System Settings & Rules</h2>
                            <p className="text-xs text-[var(--text-muted)] mt-1 font-normal">Configure platform commission splits, VAT/GST percentage parameters, and payment gateways.</p>
                        </div>
                    </div>

                    {loading ? (
                        <Loader variant="profile" />
                    ) : (
                        <form onSubmit={handleSave} className="w-full bg-[var(--bg-surface)] p-6 sm:p-8 border border-[var(--border-light)] rounded-2xl shadow-sm transition-colors text-left flex flex-col gap-6">
                            
                            {/* Commission & Fees block */}
                            <div className="flex flex-col gap-5">
                                <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-150 border-b border-[var(--border-light)] pb-2.5 flex items-center gap-2">
                                    <Percent className="w-4 h-4 text-stone-400" />
                                    <span>Commission splits & taxation</span>
                                </h3>
                                
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 text-xs sm:text-sm">
                                    <div className="flex flex-col gap-1.5">
                                        <label className="font-semibold text-stone-700 dark:text-stone-300">Commission Rate (%)</label>
                                        <input
                                            type="number"
                                            name="commissionRate"
                                            value={platformConfig.commissionRate}
                                            onChange={handleChange}
                                            step="0.1"
                                            required
                                            className="w-full h-10 px-3 border border-[var(--border-light)] bg-[var(--bg-main)]/50 rounded-xl focus:outline-none focus:border-[var(--primary)] font-medium text-stone-850 dark:text-stone-200"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-1.5">
                                        <label className="font-semibold text-stone-700 dark:text-stone-300">GST / VAT Rate (%)</label>
                                        <input
                                            type="number"
                                            name="taxGstRate"
                                            value={platformConfig.taxGstRate}
                                            onChange={handleChange}
                                            step="0.1"
                                            required
                                            className="w-full h-10 px-3 border border-[var(--border-light)] bg-[var(--bg-main)]/50 rounded-xl focus:outline-none focus:border-[var(--primary)] font-medium text-stone-850 dark:text-stone-200"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-1.5">
                                        <label className="font-semibold text-stone-700 dark:text-stone-300">Base Listing Fee (₹)</label>
                                        <input
                                            type="number"
                                            name="baseListingFee"
                                            value={platformConfig.baseListingFee}
                                            onChange={handleChange}
                                            required
                                            className="w-full h-10 px-3 border border-[var(--border-light)] bg-[var(--bg-main)]/50 rounded-xl focus:outline-none focus:border-[var(--primary)] font-medium text-stone-850 dark:text-stone-200"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Payment Gateways Config */}
                            <div className="flex flex-col gap-5 mt-4">
                                <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-150 border-b border-[var(--border-light)] pb-2.5 flex items-center gap-2">
                                    <CreditCard className="w-4 h-4 text-stone-400" />
                                    <span>Active payment gateways</span>
                                </h3>
                                
                                <div className="flex flex-col sm:flex-row gap-6 text-xs sm:text-sm">
                                    <label className="flex items-center gap-3 select-none cursor-pointer">
                                        <input
                                            type="checkbox"
                                            name="enableStripe"
                                            checked={platformConfig.enableStripe}
                                            onChange={handleChange}
                                            className="w-4.5 h-4.5 rounded border-stone-300 accent-[var(--primary)] cursor-pointer"
                                        />
                                        <span className="font-semibold text-stone-850 dark:text-stone-250">Enable Stripe Gateway payments</span>
                                    </label>
                                    <label className="flex items-center gap-3 select-none cursor-pointer">
                                        <input
                                            type="checkbox"
                                            name="enableRazorpay"
                                            checked={platformConfig.enableRazorpay}
                                            onChange={handleChange}
                                            className="w-4.5 h-4.5 rounded border-stone-300 accent-[var(--primary)] cursor-pointer"
                                        />
                                        <span className="font-semibold text-stone-850 dark:text-stone-250">Enable Razorpay Gateway checkout</span>
                                    </label>
                                    <label className="flex items-center gap-3 select-none cursor-pointer">
                                        <input
                                            type="checkbox"
                                            name="enableCOD"
                                            checked={platformConfig.enableCOD}
                                            onChange={handleChange}
                                            className="w-4.5 h-4.5 rounded border-stone-300 accent-[var(--primary)] cursor-pointer"
                                        />
                                        <span className="font-semibold text-stone-850 dark:text-stone-250">Enable Cash on Delivery (COD) option</span>
                                    </label>
                                </div>
                            </div>

                            {/* Moderation Rules block */}
                            <div className="flex flex-col gap-5 mt-4">
                                <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-150 border-b border-[var(--border-light)] pb-2.5 flex items-center gap-2">
                                    <Settings className="w-4 h-4 text-stone-400" />
                                    <span>Product moderation rules</span>
                                </h3>
                                
                                <div className="text-xs sm:text-sm">
                                    <label className="flex items-center gap-3 select-none cursor-pointer">
                                        <input
                                            type="checkbox"
                                            name="strictProductModeration"
                                            checked={platformConfig.strictProductModeration}
                                            onChange={handleChange}
                                            className="w-4.5 h-4.5 rounded border-stone-300 accent-[var(--primary)] cursor-pointer"
                                        />
                                        <span className="font-semibold text-stone-850 dark:text-stone-250">Strict Product Verification (requires admin approval before publishing)</span>
                                    </label>
                                </div>
                            </div>

                            {/* Save Actions & Toast notification */}
                            <div className="mt-4 pt-5 border-t border-[var(--border-light)]/60 flex items-center justify-between gap-4">
                                <div className="flex-grow">
                                    {isSaved && (
                                        <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 text-xs font-semibold animate-in fade-in duration-150">
                                            <CheckCircle className="w-4 h-4" />
                                            <span>Platform settings saved!</span>
                                        </div>
                                    )}
                                </div>
                                <button
                                    type="submit"
                                    className="h-10 px-5 bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-[var(--text-on-primary)] font-semibold text-xs rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-sm transition-all focus:outline-none shrink-0"
                                >
                                    <Save className="w-4 h-4" />
                                    <span>Save Configuration</span>
                                </button>
                            </div>
                        </form>
                    )}

                </main>
            </div>
        </div>
    );
}
