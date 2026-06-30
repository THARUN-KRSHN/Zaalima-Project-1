import React from 'react';
import { ShoppingBag, ChevronRight } from 'lucide-react';
import OrderStatusBadge from './OrderStatusBadge';

export default function OrderCard({ order, onClick, labels }) {
    // Safely extract the items array summary metrics
    const itemsList = order.productItems || [];
    const firstItemName = itemsList[0]?.name || "";
    const extraItemsCount = itemsList.length - 1;

    return (
        <div
            onClick={onClick}
            className="w-full p-5 sm:p-6 bg-[var(--bg-surface)] border border-[var(--border-light)] rounded-2xl shadow-[var(--shadow-sm)] hover:shadow-md transition-all duration-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer group relative overflow-hidden"
        >
            {/* Left Frame content block */}
            <div className="flex items-start gap-4 flex-grow min-w-0">
                <div className="w-11 h-11 rounded-xl bg-stone-50 dark:bg-stone-900/40 border border-[var(--border-light)] flex items-center justify-center text-[var(--text-muted)] shrink-0 group-hover:border-[var(--primary)] transition-colors">
                    <ShoppingBag className="w-5 h-5 group-hover:text-[var(--primary)] transition-colors" />
                </div>

                <div className="flex flex-col gap-1 min-w-0 flex-grow">
                    <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-mono font-bold text-stone-950 dark:text-white tracking-tight">{order.id}</span>
                        <span className="text-[10px] text-[var(--text-muted)] font-bold font-mono">/ {order.date}</span>
                    </div>

                    {/* 🌟 UX IMPROVEMENT ROW: Clear separation of products */}
                    <div className="flex items-center gap-2 mt-0.5 flex-wrap md:flex-nowrap min-w-0">
                        <h4 className="text-xs sm:text-sm font-extrabold text-stone-800 dark:text-stone-200 truncate tracking-tight">
                            {firstItemName}
                        </h4>
                        {extraItemsCount > 0 && (
                            <span className="shrink-0 px-2 py-0.5 bg-stone-100 dark:bg-stone-800/80 border border-[var(--border-light)] text-[10px] font-mono font-bold text-[var(--primary)] rounded-md shadow-inner">
                                +{extraItemsCount} {extraItemsCount === 1 ? 'item' : 'items'}
                            </span>
                        )}
                    </div>

                    <span className="text-[10px] text-[var(--text-muted)] font-semibold tracking-wide uppercase font-mono mt-0.5">
                        {labels?.currencyText || "Sellers:"} {order.merchantCount} {labels?.merchantSplitText || "Tenant Split"}
                    </span>
                </div>
            </div>

            {/* Right Status Actions Split Control Deck */}
            <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2.5 border-t sm:border-t-0 border-[var(--border-light)]/60 pt-4 sm:pt-0 shrink-0">
                <OrderStatusBadge status={order.status} statusLabel={order.statusLabel} />

                <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-sm font-black text-stone-950 dark:text-white font-mono">{order.totalAmount}</span>
                    <div className="flex items-center gap-0.5 text-[11px] font-bold text-[var(--primary)] hover:underline opacity-0 group-hover:opacity-100 transition-all pl-2">
                        <span>{labels?.actionText || "Details"}</span>
                        <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                    </div>
                </div>
            </div>
        </div>
    );
}