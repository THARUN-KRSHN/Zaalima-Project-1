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
            className="w-full p-5 bg-[var(--bg-surface)] border border-[var(--border-light)] rounded-2xl shadow-[var(--shadow-sm)] hover:border-[var(--primary)]/50 transition-all duration-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer group relative overflow-hidden"
        >
            {/* Left Frame content block */}
            <div className="flex items-start gap-4 flex-grow min-w-0">
                <div className="w-11 h-11 rounded-xl bg-stone-50 dark:bg-stone-900/40 border border-[var(--border-light)] flex items-center justify-center text-[var(--text-muted)] shrink-0 group-hover:border-[var(--primary)] group-hover:bg-[var(--primary)]/5 transition-colors">
                    <ShoppingBag className="w-5 h-5 group-hover:text-[var(--primary)] transition-colors" />
                </div>

                <div className="flex flex-col gap-1 min-w-0 flex-grow">
                    <div className="flex items-center gap-1.5 flex-wrap text-xs text-stone-500 dark:text-stone-400">
                        <span className="font-mono font-medium tracking-wide bg-stone-100 dark:bg-stone-900 px-1.5 py-0.5 rounded text-[11px] text-stone-700 dark:text-stone-300">{order.id}</span>
                        <span className="text-stone-300 dark:text-stone-700">•</span>
                        <span className="font-medium">Placed on {order.date}</span>
                    </div>

                    {/* 🌟 UX IMPROVEMENT ROW: Clear separation of products */}
                    <div className="flex items-center gap-2 mt-1 flex-wrap md:flex-nowrap min-w-0">
                        <h4 className="text-sm sm:text-base font-semibold text-stone-900 dark:text-stone-100 truncate tracking-normal">
                            {firstItemName}
                        </h4>
                        {extraItemsCount > 0 && (
                            <span className="shrink-0 px-2 py-0.5 bg-stone-50 dark:bg-stone-900 border border-stone-200/60 dark:border-stone-800/60 text-[10px] font-medium text-stone-600 dark:text-stone-400 rounded-full">
                                +{extraItemsCount} {extraItemsCount === 1 ? 'item' : 'items'}
                            </span>
                        )}
                    </div>

                    <span className="text-xs text-stone-400 dark:text-stone-500 font-normal mt-0.5">
                        {labels?.currencyText || "Sold by"} {order.merchantCount} {order.merchantCount === 1 ? 'seller' : 'sellers'}
                    </span>
                </div>
            </div>

            {/* Right Status Actions Split Control Deck */}
            <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-3 border-t sm:border-t-0 border-[var(--border-light)]/60 pt-4 sm:pt-0 shrink-0">
                <OrderStatusBadge status={order.status} statusLabel={order.statusLabel} />

                <div className="flex items-center gap-2">
                    <span className="text-base font-semibold text-stone-950 dark:text-white">{order.totalAmount}</span>
                    <div className="flex items-center gap-0.5 text-xs font-medium text-[var(--primary)] pl-2 transition-all">
                        <span>{labels?.actionText || "View Details"}</span>
                        <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                    </div>
                </div>
            </div>
        </div>
    );
}