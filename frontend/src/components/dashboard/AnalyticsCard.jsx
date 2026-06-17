import React from 'react';
import { DollarSign, ShoppingBag, Users, Trophy, ArrowUpRight } from 'lucide-react';

export default function AnalyticsCard() {
    // Isolated Mock Dataset matching global platform tracking targets
    const metrics = [
        { id: 'rev', label: 'Total Revenue', value: '₹50,000', change: '+15.4%', icon: DollarSign, color: 'text-emerald-500 bg-emerald-500/10' },
        { id: 'ord', label: 'Total Orders', value: '120', change: '+8.2%', icon: ShoppingBag, color: 'text-blue-500 bg-blue-500/10' },
        { id: 'cust', label: 'Total Customers', value: '80', change: '+12.1%', icon: Users, color: 'text-purple-500 bg-purple-500/10' },
        { id: 'top', label: 'Top Product', value: 'Anarkali Set', change: '48 Sold', icon: Trophy, color: 'text-amber-500 bg-amber-500/10' },
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 w-full">
            {metrics.map((item) => {
                const Icon = item.icon;
                return (
                    <div key={item.id} className="p-5 rounded-2xl border border-[var(--border-light)] bg-[var(--bg-surface)] shadow-sm flex items-start justify-between transition-all duration-300 hover:shadow-md group w-full">
                        <div className="flex flex-col gap-1 min-w-0">
                            <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)]">{item.label}</span>
                            <span className="text-lg sm:text-xl font-extrabold tracking-tight text-[#1a191e] dark:text-[#f4f5f7] truncate mt-0.5 group-hover:text-[var(--primary)] transition-colors font-sans">
                                {item.value}
                            </span>
                            <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold mt-1.5 flex items-center gap-0.5">
                                <ArrowUpRight className="w-3 h-3" />
                                {item.change}
                            </span>
                        </div>
                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${item.color}`}>
                            <Icon className="w-4.5 h-4.5 stroke-[2]" />
                        </div>
                    </div>
                );
            })}
        </div>
    );
}