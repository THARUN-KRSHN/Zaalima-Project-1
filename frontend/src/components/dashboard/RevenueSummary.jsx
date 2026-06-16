import React from 'react';
import { TrendingUp, Calendar, Landmark } from 'lucide-react';

export default function RevenueSummary() {

    const streams = [
        { id: 'today', label: "Today's Revenue", amount: 2450, icon: TrendingUp, delta: "+4.2%", color: 'text-emerald-500 border-emerald-500/20 bg-emerald-500/5' },
        { id: 'month', label: "Monthly Revenue", amount: 50000, icon: Calendar, delta: "+15.8%", color: 'text-blue-500 border-blue-500/20 bg-blue-500/5' },
        { id: 'yearly', label: "Yearly Revenue", amount: 584000, icon: Landmark, delta: "+22.4%", color: 'text-purple-500 border-purple-500/20 bg-purple-500/5' }
    ];

    return (
        <div className="p-5 sm:p-6 rounded-2xl border border-[var(--border-light)] bg-[var(--bg-surface)] shadow-sm text-left flex flex-col gap-4 transition-colors duration-300 w-full">
            <div>
                <h3 className="text-sm font-bold text-[var(--text-main)] tracking-tight">Revenue Breakdown</h3>
                <p className="text-[11px] text-[var(--text-muted)]">Periodic snapshot distributions tracking ledger processing targets.</p>
            </div>

            {/* Stacks vertically on mobile viewports, grids columns on small tablets and up */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full mt-1">
                {streams.map((stream) => {
                    const Icon = stream.icon;

                    return (
                        <div key={stream.id} className="p-4 rounded-xl border border-[var(--border-light)] bg-[var(--bg-main)] flex flex-col gap-2 relative overflow-hidden group hover:border-stone-300 dark:hover:border-stone-700 transition-all">
                            <span className="text-[11px] font-bold text-[var(--text-muted)] tracking-wide">{stream.label}</span>

                            <div className="flex items-baseline gap-1 mt-0.5">
                                <span className="text-lg font-extrabold text-[#1a191e] dark:text-[#f4f5f7] font-sans">₹{stream.amount.toLocaleString()}</span>
                                <span className="text-[10px] text-emerald-600 font-bold ml-1">{stream.delta}</span>
                            </div>

                            {/* Watermarked Icon badge embedded quietly in backend layout spaces */}
                            <div className="absolute right-3 bottom-3 text-stone-300/40 dark:text-stone-800/60 transition-transform duration-300 group-hover:scale-110">
                                <Icon className="w-8 h-8 stroke-[1.5]" />
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}