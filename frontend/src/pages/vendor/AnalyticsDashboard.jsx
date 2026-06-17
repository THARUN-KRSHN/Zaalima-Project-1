import React, { useState } from 'react';

// --- SHARED DASHBOARD LAYOUT FRAMEWORKS ---
import Sidebar from '../../components/dashboard/Sidebar';
import TopBar from '../../components/dashboard/TopBar';

// --- PRODUCTION READY ANALYTICS ATOMS ---
import AnalyticsCard from '../../components/dashboard/AnalyticsCard';
import RevenueChart from '../../components/dashboard/RevenueChart';
import SalesChart from '../../components/dashboard/SalesChart';
import TopProductsTable from '../../components/dashboard/TopProductsTable';
import OrderTrends from '../../components/dashboard/OrderTrends';

export default function AnalyticsDashboard() {
    // Syncs with the global theme engine state switches
    const [isDarkMode, setIsDarkMode] = useState(false);

    // Toggles the mobile absolute off-canvas navigation overlay drawer
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // Tracks current panel context; defaults to Analytics view tracker
    const [activeTab, setActiveTab] = useState('Analytics');

    return (
        <div className={`${isDarkMode ? 'dark' : ''} min-h-screen w-full bg-[var(--bg-main)] flex transition-colors duration-300`}>

            {/* LEFT CONTROL RAIL NAV PANEL */}
            <Sidebar
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
            />

            {/* RIGHT SCROLL APP CONTENT LAYER */}
            <div className="flex-grow flex flex-col min-w-0 max-h-screen overflow-y-auto">

                {/* SYSTEM NAVIGATION CONTROL HUB BAR */}
                <TopBar
                    title="Analytics Overview"
                    isDarkMode={isDarkMode}
                    onToggleTheme={() => setIsDarkMode(!isDarkMode)}
                    onOpenSidebar={() => setIsSidebarOpen(true)}
                />

                {/* MAIN ANALYTICS DATA GRID SECTION CANVAS */}
                <main className="p-4 sm:p-6 lg:p-8 flex flex-col gap-6 w-full max-w-[1440px] mx-auto animate-in fade-in duration-300">

                    {/* SECTION 1: TOP STATS ANCHOR 
                        - Mobile: 1 Column stack
                        - Tablet: 2x2 grid setup
                        - Desktop: Clean row layout containing 4 Cards */}
                    <div className="w-full">
                        <AnalyticsCard />
                    </div>

                    {/* SECTION 2: GRAPHICAL METRICS INTERACTIVE MATRIX 
                        - Mobile / Tablet: Clean vertical flow stack blocks
                        - Desktop: Perfectly balanced side-by-side 2-Column row blueprint layout */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-6 w-full">
                        <RevenueChart />
                        <SalesChart />
                    </div>

                    {/* SECTION 3: TRANSACTION TREND LINES & LEDGERS
                        - Mobile / Tablet: Single stack vertical rows
                        - Desktop: 5-Column structural grid (Table takes 3 fractions, Trends takes 2 fractions) */}
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-5 lg:gap-6 w-full items-start">

                        {/* Top Products Data Tracking Log */}
                        <div className="lg:col-span-3 w-full">
                            <TopProductsTable />
                        </div>

                        {/* Order Fulfillment Tracking Line Meter Card */}
                        <div className="lg:col-span-2 w-full">
                            <OrderTrends />
                        </div>

                    </div>

                </main>
            </div>
        </div>
    );
}