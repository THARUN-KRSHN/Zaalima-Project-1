import React from 'react';
import { Plus, Minus } from 'lucide-react';

export default function QuantitySelector({ quantity = 1, onQuantityChange }) {
    return (
        <div className="flex flex-col gap-2 text-left select-none">
            <span className="text-[11px] font-bold tracking-wider uppercase text-[var(--text-muted)]">
                Select Quantity
            </span>

            <div className="flex items-center bg-[var(--bg-surface-hover)] border border-[var(--border-light)] rounded-full w-fit p-1 shadow-sm transition-colors">
                {/* Decrement Control Trigger */}
                <button
                    type="button"
                    onClick={() => onQuantityChange && onQuantityChange(Math.max(1, quantity - 1))}
                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-surface)] focus:outline-none transition-all active:scale-90"
                    aria-label="Reduce quantity"
                >
                    <Minus className="w-4 h-4 stroke-[2]" />
                </button>

                {/* Quantitative Metric display frame */}
                <span className="w-10 text-center text-sm sm:text-base font-bold text-[var(--text-main)] font-sans">
                    {quantity}
                </span>

                {/* Increment Control Trigger */}
                <button
                    type="button"
                    onClick={() => onQuantityChange && onQuantityChange(quantity + 1)}
                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-surface)] focus:outline-none transition-all active:scale-90"
                    aria-label="Increase quantity"
                >
                    <Plus className="w-4 h-4 stroke-[2]" />
                </button>
            </div>
        </div>
    );
}