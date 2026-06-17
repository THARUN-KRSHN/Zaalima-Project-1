import React from 'react';
// 🌟 Connected to live inventory ranking matrix
import { topProducts } from '../../data/analyticsData';

export default function TopProductsTable() {
    return (
        <div className="p-5 sm:p-6 rounded-2xl border border-[var(--border-light)] bg-[var(--bg-surface)] shadow-sm text-left flex flex-col gap-4 w-full overflow-hidden">
            <div>
                <h3 className="text-sm font-bold text-[var(--text-main)] tracking-tight">Top Performing Products</h3>
                <p className="text-[11px] text-[var(--text-muted)]">Ranked inventory matrix sorted by sales unit totals.</p>
            </div>

            <div className="w-full overflow-x-auto scrollbar-none rounded-xl border border-[var(--border-light)] bg-[var(--bg-main)]">
                <table className="w-full min-w-[500px] border-collapse text-xs text-left">
                    <thead>
                        <tr className="border-b border-[var(--border-light)] bg-[var(--bg-surface-hover)] text-[var(--text-muted)] font-bold uppercase tracking-wider select-none">
                            <th className="py-3 px-4">Product</th>
                            <th className="py-3 px-4">Sales</th>
                            <th className="py-3 px-4">Revenue</th>
                            <th className="py-3 px-4 text-right">Stock</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[var(--border-light)] font-medium text-[var(--text-main)]">
                        {topProducts.map((item) => (
                            <tr key={item.id} className="hover:bg-[var(--bg-surface-hover)]/40 transition-colors">
                                <td className="py-3.5 px-4 font-bold text-stone-900 dark:text-white">{item.name}</td>
                                <td className="py-3.5 px-4 font-sans">{item.sales} sold</td>
                                <td className="py-3.5 px-4 font-bold font-sans">₹{item.revenue.toLocaleString()}</td>
                                <td className="py-3.5 px-4 text-right font-sans">
                                    {item.stock === 0 ? (
                                        <span className="text-rose-500 font-bold bg-rose-500/10 px-2 py-0.5 rounded-md text-[10px]">OUT OF STOCK</span>
                                    ) : item.stock <= 5 ? (
                                        <span className="text-amber-500 font-bold bg-amber-500/10 px-2 py-0.5 rounded-md text-[10px]">{item.stock} LOW</span>
                                    ) : (
                                        <span className="text-[var(--text-muted)] font-semibold">{item.stock} units</span>
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