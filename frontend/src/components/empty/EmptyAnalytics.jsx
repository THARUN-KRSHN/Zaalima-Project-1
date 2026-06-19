import React from 'react';
import { BarChartHorizontal } from 'lucide-react';

export default function EmptyAnalytics() {
    return (
        <div className="w-full py-20 sm:py-28 px-4 rounded-2xl border border-[var(--border-light)] bg-[var(--bg-surface)] text-center flex flex-col items-center justify-center gap-4 w-full shadow-sm animate-in fade-in duration-300">
            <div className="w-12 h-12 rounded-xl bg-stone-50 dark:bg-stone-800 text-[var(--text-muted)] flex items-center justify-center border border-[var(--border-light)] shadow-sm">
                <BarChartHorizontal className="w-6 h-6 stroke-[1.5]" />
            </div>

            <div className="flex flex-col gap-1 max-w-xs">
                <h4 className="text-sm font-bold text-stone-900 dark:text-white tracking-tight">
                    Awaiting Performance Metrics Pack
                </h4>
                <p className="text-xs text-[var(--text-muted)] leading-relaxed font-normal">
                    Analytical charts, revenue trajectories, and item conversion models will generate automatically as soon as your first order converts.
                </p>
            </div>
        </div>
    );
}