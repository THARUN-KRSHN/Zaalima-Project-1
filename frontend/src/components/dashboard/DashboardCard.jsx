import React from 'react';
import { IndianRupee, ShoppingBag, Layers, Users, ArrowUpRight, ArrowDownRight } from 'lucide-react';

export default function DashboardCard({ variant = 'revenue', value = '0', percentage = '+0%' }) {

    // Mapping config criteria data properties on the fly
    const configs = {
        revenue: { label: 'Total Revenue', icon: IndianRupee, color: 'text-emerald-500 bg-emerald-500/10' },
        orders: { label: 'Total Orders', icon: ShoppingBag, color: 'text-blue-500 bg-blue-500/10' },
        products: { label: 'Active Products', icon: Layers, color: 'text-purple-500 bg-purple-500/10' },
        customers: { label: 'Total Customers', icon: Users, color: 'text-amber-500 bg-amber-500/10' },
    };

    const target = configs[variant] || configs.revenue;
    const Icon = target.icon;
    const isNegative = percentage.startsWith('-');

    return (
        <div className="p-5 rounded-2xl border border-[var(--border-light)] bg-[var(--bg-surface)] shadow-sm text-left flex items-start justify-between transition-all duration-300 hover:shadow-md hover:border-stone-300 dark:hover:border-stone-700 w-full group">
            <div className="flex flex-col gap-1 min-w-0">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)]">
                    {target.label}
                </span>
                <span className="text-xl sm:text-2xl font-extrabold tracking-tight text-[#1a191e] dark:text-[#f4f5f7] font-sans mt-0.5 group-hover:text-[var(--primary)] transition-colors">
                    {variant === 'revenue' ? `₹${Number(value).toLocaleString()}` : Number(value).toLocaleString()}
                </span>

                {/* Visual dynamic performance indicator badges */}
                <div className={`mt-2 flex items-center gap-1 text-[11px] font-bold rounded-lg px-2 py-0.5 w-fit
                    ${isNegative
                        ? 'bg-rose-500/10 text-rose-600 dark:text-rose-400'
                        : 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                    }`}
                >
                    {isNegative ? <ArrowDownRight className="w-3 h-3 shrink-0" /> : <ArrowUpRight className="w-3 h-3 shrink-0" />}
                    <span>{percentage} vs last month</span>
                </div>
            </div>

            {/* Vector identity layout boxes */}
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${target.color}`}>
                <Icon className="w-5 h-5 stroke-[2]" />
            </div>
        </div>
    );
}