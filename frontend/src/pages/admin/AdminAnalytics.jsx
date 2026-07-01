import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/dashboard/Sidebar';
import TopBar from '../../components/dashboard/TopBar';
import Loader from '../../components/common/Loader';
import { BarChart3, TrendingUp, Users, DollarSign, ShoppingBag, ArrowUpRight } from 'lucide-react';

export default function AdminAnalytics() {
    const [loading, setLoading] = useState(true);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('Analytics');

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 900);
        return () => clearTimeout(timer);
    }, []);

    // Mock platform analytics datasets
    const platformStats = [
        { label: "Platform GMV", value: "₹24,89,500", change: "+14.2% MoM", icon: DollarSign, color: "text-emerald-500 bg-emerald-500/10" },
        { label: "Total Active Users", value: "8,924 Users", change: "+8.7% MoM", icon: Users, color: "text-blue-500 bg-blue-500/10" },
        { label: "Merchant Stores", value: "114 Stores", change: "+12.1% MoM", icon: ShoppingBag, color: "text-violet-500 bg-violet-500/10" }
    ];

    const topCategories = [
        { name: "Ethnic Fashion", share: "52%", volume: "₹12,94,540", color: "bg-[var(--primary)]" },
        { name: "Apex Electronics", share: "28%", volume: "₹6,97,060", color: "bg-blue-500" },
        { name: "Organic Spices", share: "12%", volume: "₹2,98,740", color: "bg-emerald-500" },
        { name: "Home Decor", share: "8%", volume: "₹1,99,160", color: "bg-violet-500" }
    ];

    return (
        <div className={`${isDarkMode ? 'dark' : ''} min-h-screen w-full bg-[var(--bg-main)] flex transition-colors duration-300`}>

            <Sidebar
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
                activeTab="Analytics"
                setActiveTab={setActiveTab}
            />

            <div className="flex-grow flex flex-col min-w-0 max-h-screen overflow-y-auto">
                <TopBar
                    title="Platform Analytics"
                    isDarkMode={isDarkMode}
                    onToggleTheme={() => setIsDarkMode(!isDarkMode)}
                    onOpenSidebar={() => setIsSidebarOpen(true)}
                />

                <main className="p-4 sm:p-6 lg:p-8 flex flex-col gap-6 w-full max-w-[1440px] mx-auto animate-in fade-in duration-300">

                    {/* Workspace Header Block */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--border-light)] pb-5 text-left">
                        <div>
                            <h2 className="text-xl font-semibold text-[var(--text-main)] tracking-tight">System Performance & Onboarding Trends</h2>
                            <p className="text-xs text-[var(--text-muted)] mt-1 font-normal">Audit total platform transaction volume, customer acquisition rates, and storefront growth metrics.</p>
                        </div>
                    </div>

                    {loading ? (
                        <>
                            <Loader variant="stats" />
                            <Loader variant="chart" />
                        </>
                    ) : (
                        <div className="flex flex-col gap-6 w-full">
                            
                            {/* Platform Metrics strips */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 w-full text-left">
                                {platformStats.map((stat, i) => {
                                    const Icon = stat.icon;
                                    return (
                                        <div key={i} className="p-5 bg-[var(--bg-surface)] border border-[var(--border-light)] rounded-2xl shadow-sm flex items-center justify-between transition-colors">
                                            <div className="flex flex-col gap-1">
                                                <span className="text-xs text-[var(--text-muted)] font-semibold">{stat.label}</span>
                                                <span className="text-2xl font-bold text-stone-900 dark:text-white mt-1">{stat.value}</span>
                                                <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-0.5 mt-1">
                                                    <ArrowUpRight className="w-3.5 h-3.5" />
                                                    <span>{stat.change}</span>
                                                </span>
                                            </div>
                                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${stat.color}`}>
                                                <Icon className="w-5 h-5" />
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Analytics Visuals charts and lists */}
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full items-start">
                                
                                {/* Custom SVG Revenue curve */}
                                <div className="lg:col-span-2 bg-[var(--bg-surface)] p-6 border border-[var(--border-light)] rounded-2xl shadow-sm transition-colors text-left flex flex-col gap-4">
                                    <div className="flex items-center justify-between border-b border-[var(--border-light)] pb-3">
                                        <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-150 flex items-center gap-2"><TrendingUp className="w-4 h-4 text-stone-400" /><span>GMV Transaction volume Trend</span></h3>
                                        <span className="text-[10px] bg-stone-150 dark:bg-stone-900 text-stone-600 dark:text-stone-400 px-2 py-0.5 rounded font-bold font-sans border border-stone-200 dark:border-stone-800">Last 6 Months</span>
                                    </div>
                                    
                                    <div className="w-full h-64 relative flex items-end justify-between px-2 pt-4">
                                        {/* Grid Lines */}
                                        <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-10">
                                            <div className="w-full border-t border-[var(--text-main)]" />
                                            <div className="w-full border-t border-[var(--text-main)]" />
                                            <div className="w-full border-t border-[var(--text-main)]" />
                                            <div className="w-full border-t border-[var(--text-main)]" />
                                        </div>

                                        {/* SVG Chart curve */}
                                        <svg className="absolute inset-0 w-full h-full p-2 overflow-visible" viewBox="0 0 400 150">
                                            <defs>
                                                <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.25" />
                                                    <stop offset="100%" stopColor="var(--primary)" stopOpacity="0.0" />
                                                </linearGradient>
                                            </defs>
                                            
                                            {/* Filled Area */}
                                            <path 
                                                d="M 10 130 C 50 110, 100 100, 150 70 C 200 40, 250 80, 300 40 C 350 0, 390 10, 390 10 L 390 130 Z" 
                                                fill="url(#chartGradient)"
                                            />
                                            
                                            {/* Path line */}
                                            <path 
                                                d="M 10 130 C 50 110, 100 100, 150 70 C 200 40, 250 80, 300 40 C 350 0, 390 10, 390 10" 
                                                fill="none" 
                                                stroke="var(--primary)" 
                                                strokeWidth="2.5"
                                                strokeLinecap="round"
                                            />
                                            
                                            {/* Data points */}
                                            <circle cx="10" cy="130" r="4.5" fill="var(--primary)" className="animate-pulse" />
                                            <circle cx="150" cy="70" r="4.5" fill="var(--primary)" />
                                            <circle cx="300" cy="40" r="4.5" fill="var(--primary)" />
                                            <circle cx="390" cy="10" r="4.5" fill="var(--primary)" className="animate-ping" />
                                        </svg>

                                        {/* Chart Labels */}
                                        <div className="w-full flex justify-between text-[10px] text-stone-400 dark:text-stone-500 font-semibold absolute bottom-0 left-0 right-0 px-2 font-mono">
                                            <span>Jan</span>
                                            <span>Feb</span>
                                            <span>Mar</span>
                                            <span>Apr</span>
                                            <span>May</span>
                                            <span>Jun</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Category Performance panel */}
                                <div className="bg-[var(--bg-surface)] p-6 border border-[var(--border-light)] rounded-2xl shadow-sm transition-colors text-left flex flex-col gap-4 w-full">
                                    <div className="border-b border-[var(--border-light)] pb-3">
                                        <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-150 flex items-center gap-2"><BarChart3 className="w-4 h-4 text-stone-400" /><span>Category GMV Shares</span></h3>
                                    </div>
                                    <div className="flex flex-col gap-4 mt-2">
                                        {topCategories.map((cat, i) => (
                                            <div key={i} className="flex flex-col gap-2">
                                                <div className="flex justify-between items-center text-xs font-semibold">
                                                    <span className="text-stone-800 dark:text-stone-200">{cat.name}</span>
                                                    <span className="text-[var(--text-muted)] font-mono">{cat.volume} ({cat.share})</span>
                                                </div>
                                                <div className="w-full h-2 bg-stone-100 dark:bg-stone-850 rounded-full overflow-hidden">
                                                    <div className={`h-full rounded-full ${cat.color}`} style={{ width: cat.share }} />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                            </div>
                        </div>
                    )}

                </main>
            </div>
        </div>
    );
}
