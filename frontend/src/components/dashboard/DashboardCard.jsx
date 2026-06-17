import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { dashboardStats } from '../../data/dashboardData';

export default function DashboardCard() {
    // Mapping direct statistics values straight from centralized data properties
    const dataPoints = [
        {
            id: 'rev',
            label: 'Total Revenue',
            value: `₹${Number(dashboardStats.totalRevenue).toLocaleString()}`,
            change: dashboardStats.growthRates.revenue,
            isNegative: dashboardStats.growthRates.revenue.startsWith('-')
        },
        {
            id: 'ord',
            label: 'Total Orders',
            value: Number(dashboardStats.totalOrders).toLocaleString(),
            change: dashboardStats.growthRates.orders,
            isNegative: dashboardStats.growthRates.orders.startsWith('-')
        },
        {
            id: 'prod',
            label: 'Active Products',
            value: Number(dashboardStats.totalProducts).toLocaleString(),
            change: dashboardStats.growthRates.products,
            isNegative: dashboardStats.growthRates.products.startsWith('-')
        },
        {
            id: 'cust',
            label: 'Total Customers',
            value: Number(dashboardStats.totalCustomers).toLocaleString(),
            change: dashboardStats.growthRates.customers,
            isNegative: dashboardStats.growthRates.customers.startsWith('-')
        },
    ];

    return (
        /* 🌟 UNIFIED BANNER STRIP STRUCTURE */
        <div className="w-full bg-[var(--bg-surface)] border border-[var(--border-light)] rounded-2xl shadow-sm overflow-hidden transition-all duration-300">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 lg:divide-x divide-[var(--border-light)] text-left">
                {dataPoints.map((item) => (
                    <div key={item.id} className="p-6 flex flex-col justify-center bg-transparent transition-colors hover:bg-[var(--bg-surface-hover)]/30 group">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)]">
                            {item.label}
                        </span>
                        <span className="text-xl font-extrabold tracking-tight text-[#1a191e] dark:text-[#f4f5f7] mt-1 font-sans transition-colors group-hover:text-[var(--primary)]">
                            {item.value}
                        </span>
                        <div className={`mt-1.5 flex items-center gap-0.5 text-[11px] font-bold ${item.isNegative ? 'text-rose-500' : 'text-emerald-600 dark:text-emerald-400'
                            }`}>
                            {item.isNegative ? <ArrowDownRight className="w-3 h-3 stroke-[2.5]" /> : <ArrowUpRight className="w-3 h-3 stroke-[2.5]" />}
                            <span>{item.change} vs last month</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}