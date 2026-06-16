import React, { useState } from 'react';

// --- SHARED DASHBOARD STRUCTURAL ELEMENTS ---
import Sidebar from '../../components/dashboard/Sidebar';
import TopBar from '../../components/dashboard/TopBar';

// --- INTERIOR METRIC CARDS & TABLES ---
import DashboardCard from '../../components/dashboard/DashboardCard';
import RevenueSummary from '../../components/dashboard/RevenueSummary';
import RecentOrdersTable from '../../components/dashboard/RecentOrdersTable';

// --- MOCK DATA ENGINE VALUES INTEGRATION ---
import { dashboardStats, revenueBreakdown, recentOrders } from '../../data/dashboardData';

export default function VendorDashboard() {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('Dashboard');

    return (
        <div className={`${isDarkMode ? 'dark' : ''} min-h-screen w-full bg-[var(--bg-main)] flex transition-colors duration-300`}>

            {/* SIDEBAR TRACKWAY PANEL */}
            <Sidebar
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
            />

            {/* MAIN WORKSPACE CANVAS WRAPPER */}
            <div className="flex-grow flex flex-col min-w-0 max-h-screen overflow-y-auto">

                <TopBar
                    title={activeTab}
                    isDarkMode={isDarkMode}
                    onToggleTheme={() => setIsDarkMode(!isDarkMode)}
                    onOpenSidebar={() => setIsSidebarOpen(true)}
                />

                {/* SCROLLABLE INTERIOR APP HUB */}
                <main className="p-4 sm:p-6 lg:p-8 flex flex-col gap-6 w-full max-w-[1440px] mx-auto animate-in fade-in duration-300">

                    {activeTab === 'Dashboard' ? (
                        <>
                            {/* 🌟 STATS CARDS RESPONSIVE GRID CONFIGURATION 
                                - Mobile: grid-cols-1 (1 Column vertical list stack)
                                - Tablet (sm:): sm:grid-cols-2 (Clean 2 x 2 balance grid)
                                - Desktop (lg:): lg:grid-cols-4 (4 Cards side-by-side) */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 w-full">
                                <DashboardCard
                                    variant="revenue"
                                    value={dashboardStats.totalRevenue}
                                    percentage={dashboardStats.growthRates.revenue}
                                />
                                <DashboardCard
                                    variant="orders"
                                    value={dashboardStats.totalOrders}
                                    percentage={dashboardStats.growthRates.orders}
                                />
                                <DashboardCard
                                    variant="products"
                                    value={dashboardStats.totalProducts}
                                    percentage={dashboardStats.growthRates.products}
                                />
                                <DashboardCard
                                    variant="customers"
                                    value={dashboardStats.totalCustomers}
                                    percentage={dashboardStats.growthRates.customers}
                                />
                            </div>

                            {/* REVENUE SUMMARY SNAPSHOT */}
                            <div className="w-full">
                                <RevenueSummary data={revenueBreakdown} />
                            </div>

                            {/* RECENT DISPATCHES DATATABLE */}
                            <div className="w-full">
                                <RecentOrdersTable data={recentOrders} />
                            </div>
                        </>
                    ) : (
                        /* Fallback view placeholder */
                        <div className="w-full py-24 border border-dashed border-[var(--border-light)] rounded-2xl bg-[var(--bg-surface)] text-center text-xs font-bold tracking-wide uppercase text-[var(--text-muted)] animate-pulse">
                            {activeTab} Management Workspace parameters loading...
                        </div>
                    )}

                </main>
            </div>
        </div>
    );
}