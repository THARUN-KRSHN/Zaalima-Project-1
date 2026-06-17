import React from 'react';
import { fulfillmentTrends } from '../../data/analyticsData';

export default function OrderTrends() {
    const colorMap = {
        pending: 'bg-amber-500',
        delivered: 'bg-emerald-500',
        cancelled: 'bg-stone-400 dark:bg-stone-600'
    };

    return (
        /* 🌟 STRIP HACKS COMPLETE: h-full ALIGNS vertical borders with the adjacent table card */
        <div className="p-5 sm:p-6 rounded-2xl border border-[var(--border-light)] bg-[var(--bg-surface)] shadow-sm text-left flex flex-col gap-4 w-full h-full min-h-[340px] justify-between">
            <div className="flex flex-col">
                <h3 className="text-sm font-bold text-[var(--text-main)] tracking-tight">Fulfillment Allocation Trends</h3>
                <p className="text-[11px] text-[var(--text-muted)]">Displacement ratio distributions evaluating order status logic flows.</p>
            </div>

            {/* 🌟 OPTIMIZED SPACING INTERVALS: items-stretch handles clean cross-axis alignment */}
            <div className="flex flex-col gap-5 flex-grow justify-center mt-3 lg:mt-0">
                {fulfillmentTrends.breakdown.map((trend) => {
                    const percentage = ((trend.count / fulfillmentTrends.totalOrders) * 100).toFixed(1);
                    const fillStyle = colorMap[trend.type] || colorMap.pending;

                    return (
                        <div key={trend.type} className="w-full flex flex-col gap-2">
                            <div className="flex items-center justify-between w-full text-xs">
                                <span className="font-semibold text-stone-700 dark:text-stone-300">{trend.label}</span>
                                <span className="font-bold text-stone-900 dark:text-white font-sans">
                                    {trend.count} <span className="text-[10px] font-normal text-[var(--text-muted)]">({percentage}%)</span>
                                </span>
                            </div>

                            {/* Ultra Sleek Meter Tracking Line */}
                            <div className="w-full h-1 bg-stone-100 dark:bg-stone-800 rounded-full overflow-hidden">
                                <div
                                    className={`h-full rounded-full transition-all duration-500 ease-out ${fillStyle}`}
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