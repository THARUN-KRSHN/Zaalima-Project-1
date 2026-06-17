import React from 'react';
import { topProducts } from '../../data/analyticsData';

export default function TopProductsTable() {
    return (
        /* 🌟 FLEX & H-FULL CONFIGURATIONS STANDARDIZE THE CROSS-AXIS ROW HEIGHT BASELINE */
        <div className="p-5 sm:p-6 rounded-2xl border border-[var(--border-light)] bg-[var(--bg-surface)] shadow-sm text-left flex flex-col gap-4 w-full h-full min-h-[340px] justify-between overflow-hidden">
            <div className="flex flex-col">
                <h3 className="text-sm font-bold text-[var(--text-main)] tracking-tight">Top Performing Products</h3>
                <p className="text-[11px] text-[var(--text-muted)]">Ranked inventory matrix sorted by sales unit totals.</p>
            </div>

            <div className="w-full flex-grow overflow-x-auto scrollbar-none rounded-xl border border-[var(--border-light)] bg-[var(--bg-main)] mt-1">
                <table className="w-full min-w-[450px] border-collapse text-xs text-left">
                    <thead>
                        <tr className="border-b border-[var(--border-light)] bg-[var(--bg-surface-hover)] text-[var(--text-muted)] font-bold uppercase tracking-wider select-none">
                            <th className="py-2.5 px-4">Product</th>
                            <th className="py-2.5 px-4">Sales</th>
                            <th className="py-2.5 px-4">Revenue</th>
                            <th className="py-2.5 px-4 text-right">Stock</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[var(--border-light)] font-medium text-[var(--text-main)]">
                        {topProducts.map((item) => (
                            <tr key={item.id} className="hover:bg-[var(--bg-surface-hover)]/30 transition-colors">
                                <td className="py-3 px-4 font-bold text-stone-900 dark:text-white">{item.name}</td>
                                <td className="py-3 px-4 text-[var(--text-muted)]">{item.sales} sold</td>
                                <td className="py-3 px-4 font-bold font-sans">₹{item.revenue.toLocaleString()}</td>
                                <td className="py-3 px-4 text-right font-sans">
                                    {item.stock === 0 ? (
                                        <span className="text-rose-600 dark:text-rose-400 font-bold text-[10px] tracking-wide uppercase">Out of Stock</span>
                                    ) : item.stock <= 5 ? (
                                        <span className="text-amber-600 dark:text-amber-400 font-bold text-[10px] tracking-wide uppercase">{item.stock} Low</span>
                                    ) : (
                                        <span className="text-[var(--text-muted)]">{item.stock} units</span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}