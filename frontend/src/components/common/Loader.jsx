import React from 'react';

export default function Loader({ variant = 'default' }) {
    // 1. MINI COMPACT SPINNER (For small inline content spaces)
    if (variant === 'spinner') {
        return (
            <div className="flex items-center justify-center py-6 w-full animate-in fade-in duration-200">
                <div className="w-5 h-5 border-2 border-[var(--border-light)] border-t-[var(--primary)] rounded-full animate-spin" />
            </div>
        );
    }

    // 2. ANALYTICS / METRICS STRIP SKELETON (Horizontal banner blocks matching your cards)
    if (variant === 'stats') {
        return (
            <div className="w-full bg-[var(--bg-surface)] border border-[var(--border-light)] rounded-2xl p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-pulse">
                {[...Array(4)].map((_, i) => (
                    <div key={i} className="flex flex-col gap-2">
                        <div className="h-3 w-16 bg-stone-200 dark:bg-stone-800 rounded" />
                        <div className="h-6 w-24 bg-stone-200 dark:bg-stone-800 rounded mt-1" />
                        <div className="h-3 w-32 bg-stone-200 dark:bg-stone-800 rounded mt-1" />
                    </div>
                ))}
            </div>
        );
    }

    // 3. GRAPHICAL CHART LAYOUT SKELETON
    if (variant === 'chart') {
        return (
            <div className="p-6 rounded-2xl border border-[var(--border-light)] bg-[var(--bg-surface)] shadow-sm flex flex-col gap-6 w-full h-[340px] animate-pulse">
                <div className="flex flex-col gap-2">
                    <div className="h-4 w-36 bg-stone-200 dark:bg-stone-800 rounded" />
                    <div className="h-3 w-64 bg-stone-200 dark:bg-stone-800 rounded" />
                </div>
                <div className="w-full flex-grow bg-stone-100/70 dark:bg-stone-800/40 rounded-xl flex items-end gap-3 p-4 justify-between">
                    {[...Array(12)].map((_, i) => (
                        <div
                            key={i}
                            className="bg-stone-200 dark:bg-stone-800 rounded-t w-full"
                            style={{ height: `${Math.floor(Math.random() * 60) + 20}%` }}
                        />
                    ))}
                </div>
            </div>
        );
    }

    // 4. DATATABLE / LEDGER ROWS SKELETON
    if (variant === 'table') {
        return (
            <div className="p-6 rounded-2xl border border-[var(--border-light)] bg-[var(--bg-surface)] shadow-sm flex flex-col gap-4 w-full animate-pulse">
                <div className="h-4 w-32 bg-stone-200 dark:bg-stone-800 rounded" />
                <div className="w-full flex flex-col gap-3 mt-2">
                    <div className="h-9 w-full bg-stone-200 dark:bg-stone-800 rounded-lg" />
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="h-12 w-full bg-stone-100 dark:bg-stone-800/50 rounded-lg" />
                    ))}
                </div>
            </div>
        );
    }

    // 5. DEFAULT FULL PAGE LAYER INTERCEPTOR
    return (
        <div className="w-full py-24 flex flex-col items-center justify-center gap-3 animate-in fade-in duration-300">
            <div className="w-6 h-6 border-2 border-stone-200 dark:border-stone-800 border-t-[var(--primary)] rounded-full animate-spin" />
            <span className="text-[11px] font-bold tracking-widest text-[var(--text-muted)] uppercase">Syncing Live Ledger Nodes...</span>
        </div>
    );
}