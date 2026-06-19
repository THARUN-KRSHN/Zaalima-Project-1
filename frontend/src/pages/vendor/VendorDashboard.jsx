import React, { useState, useEffect } from 'react';

// --- SHARED DASHBOARD STRUCTURAL ELEMENTS ---
import Sidebar from '../../components/dashboard/Sidebar';
import TopBar from '../../components/dashboard/TopBar';
import Loader from '../../components/common/Loader';

// --- INTERIOR METRIC CARDS & TABLES ---
import DashboardCard from '../../components/dashboard/DashboardCard';
import RevenueSummary from '../../components/dashboard/RevenueSummary';
import RecentOrdersTable from '../../components/dashboard/RecentOrdersTable';

// --- MOCK DATA ENGINE VALUES INTEGRATION ---
import { recentOrders } from '../../data/dashboardData';

export default function VendorDashboard() {
    const [loading, setLoading] = useState(true);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('Dashboard');

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 1100);
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
                    title={activeTab}
                    isDarkMode={isDarkMode}
                    onToggleTheme={() => setIsDarkMode(!isDarkMode)}
                    onOpenSidebar={() => setIsSidebarOpen(true)}
                />

                <main className="p-4 sm:p-6 lg:p-8 flex flex-col gap-6 w-full max-w-[1440px] mx-auto animate-in fade-in duration-300">
                    {activeTab === 'Dashboard' ? (
                        loading ? (
                            <>
                                <Loader variant="stats" />
                                <Loader variant="table" />
                            </>
                        ) : (
                            <>
                                <div className="w-full">
                                    <DashboardCard />
                                </div>
                                <div className="w-full">
                                    <RevenueSummary />
                                </div>
                                <div className="w-full">
                                    <RecentOrdersTable data={recentOrders} />
                                </div>
                            </>
                        )
                    ) : (
                        <div className="w-full py-24 border border-dashed border-[var(--border-light)] rounded-2xl bg-[var(--bg-surface)] text-center text-xs font-bold tracking-wide uppercase text-[var(--text-muted)] animate-pulse">
                            {activeTab} Management Workspace parameters loading...
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}