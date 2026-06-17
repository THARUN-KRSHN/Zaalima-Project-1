import React from 'react';
import { revenueBreakdown } from '../../data/dashboardData';

export default function RevenueSummary() {
    const segments = [
        { id: 'today', label: "Today's Revenue", amount: revenueBreakdown.today.amount, delta: revenueBreakdown.today.delta },
        { id: 'month', label: "Monthly Revenue", amount: revenueBreakdown.monthly.amount, delta: revenueBreakdown.monthly.delta },
        { id: 'yearly', label: "Yearly Revenue", amount: revenueBreakdown.yearly.amount, delta: revenueBreakdown.yearly.delta }
    ];

    return (
        <div className="p-5 sm:p-6 rounded-2xl border border-[var(--border-light)] bg-[var(--bg-surface)] shadow-sm text-left flex flex-col gap-6 transition-colors duration-300 w-full">
            <div>
                <h3 className="text-sm font-bold text-[var(--text-main)] tracking-tight">Revenue Breakdown</h3>
                <p className="text-[11px] text-[var(--text-muted)]">Periodic snapshot distributions tracking ledger processing targets.</p>
            </div>

            {/* 🌟 BORDERLESS COLUMN FLOW: Stripped inner cards to clean up density clutter */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-1 w-full">
                {segments.map((stream) => (
                    <div
                        key={stream.id}
                        className="flex flex-col gap-1 py-1 px-1 border-l-2 border-stone-100 dark:border-stone-800/70 transition-colors hover:border-[var(--primary)] pl-4"
                    >
                        <span className="text-[11px] font-semibold text-[var(--text-muted)] tracking-wide">
                            {stream.label}
                        </span>
                        <div className="flex items-baseline gap-2 mt-0.5">
                            <span className="text-lg font-extrabold text-[#1a191e] dark:text-[#f4f5f7] font-sans">
                                ₹{stream.amount.toLocaleString()}
                            </span>
                            <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold font-sans">
                                {stream.delta}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}