import React from 'react';
import { Hourglass, CheckCircle2, AlertTriangle } from 'lucide-react';

export default function OrderTrends() {
    const data = [
        { id: 'pend', label: 'Pending Orders', count: 24, total: 120, color: 'text-amber-500 border-amber-500/20 bg-amber-500/5', fill: 'bg-amber-500', icon: Hourglass },
        { id: 'deliv', label: 'Delivered Orders', count: 86, total: 120, color: 'text-emerald-500 border-emerald-500/20 bg-emerald-500/5', fill: 'bg-emerald-500', icon: CheckCircle2 },
        { id: 'canc', label: 'Cancelled Orders', count: 10, total: 120, color: 'text-rose-500 border-rose-500/20 bg-rose-500/5', fill: 'bg-rose-500', icon: AlertTriangle },
    ];

    return (
        <div className="p-5 sm:p-6 rounded-2xl border border-[var(--border-light)] bg-[var(--bg-surface)] shadow-sm text-left flex flex-col gap-4 w-full">
            <div>
                <h3 className="text-sm font-bold text-[var(--text-main)] tracking-tight">Fulfillment Allocation Trends</h3>
                <p className="text-[11px] text-[var(--text-muted)]">Displacement ratio distributions evaluating order status logic flows.</p>
            </div>

            <div className="flex flex-col gap-4 mt-1">
                {data.map((trend) => {
                    const percentage = ((trend.count / trend.total) * 100).toFixed(1);
                    const Icon = trend.icon;

                    return (
                        <div key={trend.id} className="w-full flex flex-col gap-2 p-3.5 border border-[var(--border-light)] rounded-xl bg-[var(--bg-main)]">
                            <div className="flex items-center justify-between w-full">
                                <div className="flex items-center gap-2.5">
                                    <div className={`p-1.5 rounded-lg shrink-0 border ${trend.color}`}>
                                        <Icon className="w-4 h-4" />
                                    </div>
                                    <span className="text-xs font-bold text-stone-800 dark:text-stone-200">{trend.label}</span>
                                </div>
                                <span className="text-xs font-bold font-sans text-stone-900 dark:text-white">
                                    {trend.count} <span className="text-[10px] font-medium text-[var(--text-muted)]">({percentage}%)</span>
                                </span>
                            </div>

                            {/* Line Meter Track Layout Frame */}
                            <div className="w-full h-1.5 bg-stone-200 dark:bg-stone-800 rounded-full overflow-hidden">
                                <div
                                    className={`h-full rounded-full transition-all duration-500 ease-out ${trend.fill}`}
                                    style={{ width: `${percentage}%` }}
                                />
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}