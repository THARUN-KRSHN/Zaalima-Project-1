import React from 'react';
import { recentOrders } from '../../data/dashboardData';
// 🌟 Import the Empty Orders component
import EmptyOrders from '../empty/EmptyOrders';

export default function RecentOrdersTable({ data = [] }) {
    // If testing an empty state, pass an empty array: data={[]}
    const activeOrdersList = data.length > 0 ? data : recentOrders;

    const getStatusStyle = (status) => {
        switch (status?.toLowerCase()) {
            case 'delivered':
                return 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20';
            case 'processing':
                return 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20';
            case 'pending':
                return 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20';
            case 'shipped':
                return 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20';
            case 'cancelled':
                return 'bg-stone-500/10 text-stone-500 dark:text-stone-400 border border-stone-500/20';
            default:
                return 'bg-stone-500/10 text-stone-500 dark:text-stone-400 border border-stone-500/10';
        }
    };

    return (
        <div className="p-4 sm:p-6 rounded-2xl border border-[var(--border-light)] bg-[var(--bg-surface)] shadow-sm text-left flex flex-col gap-4 transition-colors duration-300 w-full overflow-hidden">
            <div>
                <h3 className="text-sm font-bold text-[var(--text-main)] tracking-tight">Recent Dispatches</h3>
                <p className="text-[11px] text-[var(--text-muted)]">Real-time ledger updates across multi-vendor logistics nodes.</p>
            </div>

            {/* 🌟 EMPTY STATE CONDITION CHECK */}
            {activeOrdersList.length === 0 ? (
                <EmptyOrders />
            ) : (
                <div className="w-full overflow-x-auto sm:overflow-x-visible rounded-xl border border-[var(--border-light)] bg-[var(--bg-main)] scrollbar-thin scrollbar-thumb-stone-200 dark:scrollbar-thumb-stone-800">
                    <table className="w-full min-w-[500px] sm:min-w-0 border-collapse text-left text-xs table-fixed">
                        <colgroup>
                            <col className="w-[20%] sm:w-[18%]" />
                            <col className="w-[30%] sm:w-[32%]" />
                            <col className="w-[16%] sm:w-[16%]" />
                            <col className="w-[16%] sm:w-[16%]" />
                            <col className="w-[18%] sm:w-[18%]" />
                        </colgroup>
                        <thead>
                            <tr className="border-b border-[var(--border-light)] bg-[var(--bg-surface-hover)] text-[var(--text-muted)] font-bold uppercase tracking-wider select-none">
                                <th className="py-3 px-2 sm:px-4">Order ID</th>
                                <th className="py-3 px-2 sm:px-4">Customer</th>
                                <th className="py-3 px-2 sm:px-4">Amount</th>
                                <th className="py-3 px-2 sm:px-4">Status</th>
                                <th className="py-3 px-4 text-right">Date</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[var(--border-light)] font-medium text-[var(--text-main)]">
                            {activeOrdersList.map((order) => (
                                <tr key={order.id} className="hover:bg-[var(--bg-surface-hover)]/40 transition-colors">
                                    <td className="py-3.5 px-2 sm:px-4 font-mono font-bold text-[var(--primary)] truncate">{order.id}</td>
                                    <td className="py-3.5 px-2 sm:px-4 font-semibold truncate">{order.customer}</td>
                                    <td className="py-3.5 px-2 sm:px-4 font-bold font-sans truncate">₹{order.amount.toLocaleString()}</td>
                                    <td className="py-3.5 px-2 sm:px-4">
                                        <span className={`px-2 sm:px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wide inline-block ${getStatusStyle(order.status)}`}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="py-3.5 px-2 sm:px-4 text-right text-[var(--text-muted)] font-sans text-[11px] sm:text-xs whitespace-nowrap truncate">{order.date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}