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
    // Shared display color system depth modes state tracker
    const [isDarkMode, setIsDarkMode] = useState(false);

    // Mobile slide-out overlay backdrop toggle panel manager state
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // Internal workspace active tab navigation index tracker
    const [activeTab, setActiveTab] = useState('Dashboard');

    return (
        <div className={`${isDarkMode ? 'dark' : ''} min-h-screen w-full bg-[var(--bg-main)] flex transition-colors duration-300`}>

            {/* 🌟 DESKTOP: Renders static on the left rail as 'Sidebar | Main Content'
                🌟 MOBILE: Hidden off-screen, reveals dynamically via Hamburger click tracking triggers */}
            <Sidebar
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
            />

            {/* MAIN WORKSPACE CANVAS WRAPPER RAIL (Takes remaining width space) */}
            <div className="flex-grow flex flex-col min-w-0 max-h-screen overflow-y-auto">

                {/* TOP BAR BRAND HOOK PLATFORM (Contains title tracker, notifications, profile, and mobile triggers) */}
                <TopBar
                    title={activeTab}
                    isDarkMode={isDarkMode}
                    onToggleTheme={() => setIsDarkMode(!isDarkMode)}
                    onOpenSidebar={() => setIsSidebarOpen(true)} // Opens the off-canvas hamburger drawer on mobile
                />

                {/* SCROLLABLE INTERIOR APP HUB COMPONENT VIEWPORTS */}
                <main className="p-4 sm:p-6 lg:p-8 flex flex-col gap-6 w-full max-w-[1440px] mx-auto animate-in fade-in duration-300">

                    {activeTab === 'Dashboard' ? (
                        <>
                            {/* SECTION 1: SYSTEM PROFILE STATS CARDS GRID 
                                Hydrated directly from dashboardStats nodes */}
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

                            {/* SECTION 2: REVENUE SUMMARY snapshot periodic matrices */}
                            <div className="w-full">
                                <RevenueSummary data={revenueBreakdown} />
                            </div>

                            {/* SECTION 3: RECENT DISPATCHES DATATABLE LOG LEDGER REVIEWS */}
                            <div className="w-full">
                                <RecentOrdersTable data={recentOrders} />
                            </div>
                        </>
                    ) : (
                        /* Standard empty workspace frame fallback placeholder grid sheet for alternative side panel paths */
                        <div className="w-full py-24 border border-dashed border-[var(--border-light)] rounded-2xl bg-[var(--bg-surface)] text-center text-xs font-bold tracking-wide uppercase text-[var(--text-muted)] animate-pulse">
                            {activeTab} Management Workspace pipeline modules loading...
                        </div>
                    )}

                </main>
            </div>
        </div>
    );
}