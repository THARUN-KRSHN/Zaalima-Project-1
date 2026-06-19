import React, { useState, useEffect } from 'react';

// Layout structure
import Sidebar from '../../components/dashboard/Sidebar';
import TopBar from '../../components/dashboard/TopBar';
import Loader from '../../components/common/Loader';

// Active components
import AnalyticsCard from '../../components/dashboard/AnalyticsCard';
import RevenueChart from '../../components/dashboard/RevenueChart';
import SalesChart from '../../components/dashboard/SalesChart';
import TopProductsTable from '../../components/dashboard/TopProductsTable';
import OrderTrends from '../../components/dashboard/OrderTrends';

// Empty State Fallback
import EmptyAnalytics from '../../components/empty/EmptyAnalytics';

// 🌟 Import your real mock data vectors directly to check their element sizes
import { revenueData, salesVolumeData } from '../../data/analyticsData';

export default function AnalyticsDashboard() {
    const [loading, setLoading] = useState(true);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('Analytics');

    // 🌟 FIX: Automatically detects if your data layers are empty
    const hasAnalyticsData = revenueData && revenueData.length > 0 && salesVolumeData && salesVolumeData.length > 0;

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 1300);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className={`${isDarkMode ? 'dark' : ''} min-h-screen w-full bg-[var(--bg-main)] flex transition-colors duration-300`}>
            <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} activeTab={activeTab} setActiveTab={setActiveTab} />

            <div className="flex-grow flex flex-col min-w-0 max-h-screen overflow-y-auto">
                <TopBar title="Analytics Overview" isDarkMode={isDarkMode} onToggleTheme={() => setIsDarkMode(!isDarkMode)} onOpenSidebar={() => setIsSidebarOpen(true)} />

                <main className="p-4 sm:p-6 lg:p-8 flex flex-col gap-6 w-full max-w-[1440px] mx-auto animate-in fade-in duration-300">
                    {loading ? (
                        <>
                            <Loader variant="stats" />
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-6 w-full">
                                <Loader variant="chart" />
                                <Loader variant="chart" />
                            </div>
                        </>
                    ) : !hasAnalyticsData ? (
                        /* 🌟 AUTOMATIC EVALUATION: Shows clean fallback canvas if arrays are empty */
                        <div className="w-full mt-4">
                            <EmptyAnalytics />
                        </div>
                    ) : (
                        /* STANDARD ACTIVE CHART METRICS CONTENT */
                        <>
                            <div className="w-full"><AnalyticsCard /></div>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-6 w-full">
                                <RevenueChart />
                                <SalesChart />
                            </div>
                            <div className="grid grid-cols-1 lg:grid-cols-5 gap-5 lg:gap-6 w-full items-start">
                                <div className="lg:col-span-3 w-full"><TopProductsTable /></div>
                                <div className="lg:col-span-2 w-full"><OrderTrends /></div>
                            </div>
                        </>
                    )}
                </main>
            </div>
        </div>
    );
}