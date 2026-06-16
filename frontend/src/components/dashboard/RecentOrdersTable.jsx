import React from 'react';

export default function RecentOrdersTable() {

    // Preset array data ledger hydrating the data blocks
    const orders = [
        { id: 'ZMK-8941-11', customer: 'Aleena Manoj', amount: 898, status: 'Shipped', date: 'June 15, 2026' },
        { id: 'ZMK-2046-23', customer: 'Melit Joffy', amount: 4092, status: 'Processing', date: 'June 14, 2026' },
        { id: 'ZMK-1258-05', customer: 'Chrismon Sunny', amount: 12580, status: 'Delivered', date: 'June 12, 2026' },
        { id: 'ZMK-0583-92', customer: 'Edwin Shaju', amount: 583, status: 'Cancelled', date: 'June 10, 2026' }
    ];

    // Helper method checking string allocations to dynamically balance color status badges
    const getStatusStyle = (status) => {
        switch (status.toLowerCase()) {
            case 'delivered': return 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400';
            case 'processing': return 'bg-blue-500/10 text-blue-600 dark:text-blue-400';
            case 'shipped': return 'bg-purple-500/10 text-purple-600 dark:text-purple-400';
            default: return 'bg-stone-500/10 text-stone-500 dark:text-stone-400';
        }
    };

    return (
        <div className="p-5 sm:p-6 rounded-2xl border border-[var(--border-light)] bg-[var(--bg-surface)] shadow-sm text-left flex flex-col gap-4 transition-colors duration-300 w-full overflow-hidden">
            <div>
                <h3 className="text-sm font-bold text-[var(--text-main)] tracking-tight">Recent Dispatches</h3>
                <p className="text-[11px] text-[var(--text-muted)]">Real-time ledger updates across multi-vendor logistics nodes.</p>
            </div>

            {/* 🌟 SCROLL TRACK CONSTRAINTS LAYER: 
                Forces responsive desktop table scrollbars, preventing layout blowouts on phones */}
            <div className="w-full overflow-x-auto scrollbar-none rounded-xl border border-[var(--border-light)] bg-[var(--bg-main)]">
                <table className="w-full min-w-[600px] border-collapse text-left text-xs">
                    <thead>
                        <tr className="border-b border-[var(--border-light)] bg-[var(--bg-surface-hover)] text-[var(--text-muted)] font-bold uppercase tracking-wider">
                            <th className="py-3 px-4">Order ID</th>
                            <th className="py-3 px-4">Customer</th>
                            <th className="py-3 px-4">Amount</th>
                            <th className="py-3 px-4">Status</th>
                            <th className="py-3 px-4 text-right">Date</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[var(--border-light)] font-medium text-[var(--text-main)]">
                        {orders.map((order) => (
                            <tr key={order.id} className="hover:bg-[var(--bg-surface-hover)]/40 transition-colors">
                                <td className="py-3.5 px-4 font-mono font-bold text-[var(--primary)]">{order.id}</td>
                                <td className="py-3.5 px-4 font-semibold">{order.customer}</td>
                                <td className="py-3.5 px-4 font-bold font-sans">₹{order.amount.toLocaleString()}</td>
                                <td className="py-3.5 px-4">
                                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wide inline-block ${getStatusStyle(order.status)}`}>
                                        {order.status}
                                    </span>
                                </td>
                                <td className="py-3.5 px-4 text-right text-[var(--text-muted)] font-sans">{order.date}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}