import React from 'react';
import { Minus, Plus, Trash2 } from 'lucide-react';

export default function CartItem({ item, onUpdateQuantity, onRemove }) {
    const {
        id,
        title = "Premium Catalog Item",
        brand = "Zmarket Seller",
        price = 0,
        image,
        quantity = 1
    } = item;

    const fallbackImage = "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=300&auto=format&fit=crop&q=80";

    return (
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 mb-4 rounded-2xl border border-[var(--border-light)] bg-[var(--bg-surface)] gap-4 transition-all duration-300 w-full hover:shadow-sm">

            {/* LEFT HALF: Asset Canvas + Title Info Stack */}
            <div className="flex items-center gap-4 w-full sm:w-auto">
                <div className="w-20 h-24 rounded-xl overflow-hidden bg-[var(--bg-surface-hover)] border border-[var(--border-light)] shrink-0 shadow-sm">
                    <img
                        src={image || fallbackImage}
                        alt={title}
                        className="w-full h-full object-cover"
                    />
                </div>

                <div className="flex flex-col text-left">
                    <span className="text-[11px] font-bold text-[var(--primary)] uppercase tracking-wider">
                        {brand}
                    </span>
                    <h3 className="text-base font-bold text-[#1a191e] dark:text-[#f4f5f7] tracking-tight truncate max-w-[180px] sm:max-w-[240px]">
                        {title}
                    </h3>
                    <div className="text-base font-semibold text-[var(--text-main)] font-sans mt-1">
                        ₹{price?.toLocaleString()}
                    </div>
                </div>
            </div>

            {/* RIGHT HALF: Interaction Hub (Quantity Controls + Trash Call) */}
            <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-[var(--border-light)]">

                {/* Micro-Capsule Quantity Adjuster */}
                <div className="flex items-center bg-[var(--bg-surface-hover)] border border-[var(--border-light)] rounded-full p-0.5 shadow-sm">
                    <button
                        type="button"
                        onClick={() => onUpdateQuantity && onUpdateQuantity(id, Math.max(1, quantity - 1))}
                        className="w-7 h-7 rounded-full flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-surface)] transition-all active:scale-90 focus:outline-none"
                    >
                        <Minus className="w-3.5 h-3.5 stroke-[2.5]" />
                    </button>
                    <span className="w-8 text-center text-sm font-bold text-[var(--text-main)] font-sans">
                        {quantity}
                    </span>
                    <button
                        type="button"
                        onClick={() => onUpdateQuantity && onUpdateQuantity(id, quantity + 1)}
                        className="w-7 h-7 rounded-full flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-surface)] transition-all active:scale-90 focus:outline-none"
                    >
                        <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                    </button>
                </div>

                {/* Remove Action Trash Pin */}
                <button
                    type="button"
                    onClick={() => onRemove && onRemove(id)}
                    className="p-2 text-[var(--text-muted)] hover:text-rose-500 hover:bg-rose-500/5 rounded-full transition-colors focus:outline-none active:scale-95"
                    aria-label="Remove item from cart"
                >
                    <Trash2 className="w-4 h-4 stroke-[2]" />
                </button>

            </div>
        </div>
    );
}