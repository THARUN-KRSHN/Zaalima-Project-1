import React, { useState, useEffect } from 'react';

// --- SHARED DASHBOARD LAYOUT FRAMEWORKS ---
import Sidebar from '../../components/dashboard/Sidebar';
import TopBar from '../../components/dashboard/TopBar';
import Loader from '../../components/common/Loader';

// --- PRODUCTION READY ANALYTICS ATOMS ---
import AnalyticsCard from '../../components/dashboard/AnalyticsCard';
import RevenueChart from '../../components/dashboard/RevenueChart';
import SalesChart from '../../components/dashboard/SalesChart';
import TopProductsTable from '../../components/dashboard/TopProductsTable';
import OrderTrends from '../../components/dashboard/OrderTrends';

export default function AnalyticsDashboard() {
    const [loading, setLoading] = useState(true);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('Analytics');

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 1300);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className={`${isDarkMode ? 'dark' : ''} min-h-screen w-full bg-[var(--bg-main)] flex transition-colors duration-300`}>

            <Sidebar
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
            />

            <div className="flex-grow flex flex-col min-w-0 max-h-screen overflow-y-auto">
                <TopBar
                    title="Analytics Overview"
                    isDarkMode={isDarkMode}
                    onToggleTheme={() => setIsDarkMode(!isDarkMode)}
                    onOpenSidebar={() => setIsSidebarOpen(true)}
                />

                <main className="p-4 sm:p-6 lg:p-8 flex flex-col gap-6 w-full max-w-[1440px] mx-auto animate-in fade-in duration-300">
                    {loading ? (
                        <>
                            <Loader variant="stats" />
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-6 w-full">
                                <Loader variant="chart" />
                                <Loader variant="chart" />
                            </div>
                            <Loader variant="table" />
                        </>
                    ) : (
                        <>
                            <div className="w-full">
                                <AnalyticsCard />
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-6 w-full">
                                <RevenueChart />
                                <SalesChart />
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-5 gap-5 lg:gap-6 w-full items-start">
                                <div className="lg:col-span-3 w-full">
                                    <TopProductsTable />
                                </div>
                                <div className="lg:col-span-2 w-full">
                                    <OrderTrends />
                                </div>
                            </div>
                        </>
                    )}
                </main>
            </div>
        </div>
    );
}