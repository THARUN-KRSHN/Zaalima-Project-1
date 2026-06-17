import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export default function AnalyticsCard() {
    const metrics = [
        { id: 'rev', label: 'Total Revenue', value: '₹50,000', change: '+15.4%' },
        { id: 'ord', label: 'Total Orders', value: '120', change: '+8.2%' },
        { id: 'cust', label: 'Total Customers', value: '80', change: '+12.1%' },
        { id: 'top', label: 'Top Product', value: 'Anarkali Set', change: '48 Sold' },
    ];

    return (
        /* 🌟 SINGLE COHESIVE ROUNDED BANNER LAYOUT STRIP */
        <div className="w-full bg-[var(--bg-surface)] border border-[var(--border-light)] rounded-2xl shadow-sm transition-all duration-300 overflow-hidden">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 lg:divide-x divide-[var(--border-light)] text-left">
                {metrics.map((item) => (
                    <div key={item.id} className="p-6 flex flex-col justify-center min-w-0 bg-transparent transition-colors hover:bg-[var(--bg-surface-hover)]/30 group">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)]">
                            {item.label}
                        </span>
                        <span className="text-xl font-extrabold tracking-tight text-stone-900 dark:text-white truncate mt-1 group-hover:text-[var(--primary)] transition-colors font-sans">
                            {item.value}
                        </span>
                        <div className="mt-1.5 flex items-center gap-0.5 text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                            <ArrowUpRight className="w-3 h-3 stroke-[2.5]" />
                            <span>{item.change}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}