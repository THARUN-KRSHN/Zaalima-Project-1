import React, { useState } from 'react';
import { Ticket } from 'lucide-react';

export default function CouponSection({ onApplyCoupon }) {
    const [couponCode, setCouponCode] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!couponCode.trim()) return;
        if (onApplyCoupon) onApplyCoupon(couponCode);
    };

    return (
        /* 🌟 FIXED: Added overflow-hidden to gracefully contain child parameters */
        <div className="p-4 rounded-2xl border border-[var(--border-light)] bg-[var(--bg-surface)] shadow-sm transition-colors duration-300 w-full overflow-hidden text-left">
            <div className="flex items-center gap-2 mb-3 text-[var(--text-main)]">
                <Ticket className="w-4 h-4 text-[var(--primary)]" />
                <h4 className="text-sm font-bold tracking-tight">Have a promo code?</h4>
            </div>

            <form onSubmit={handleSubmit} className="flex gap-2 w-full items-center">
                <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="ENTER COUPON"
                    className="flex-grow min-w-0 h-10 px-4 rounded-xl border border-[var(--border-light)] bg-[var(--bg-main)] text-xs font-semibold uppercase tracking-wider text-[var(--text-main)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)]/20 transition-all"
                />

                {/* 🌟 FIXED: Added shrink-0 to prevent the action node from ever breaking boundaries */}
                <button
                    type="submit"
                    className="h-10 px-5 shrink-0 bg-[var(--bg-surface-hover)] hover:bg-[var(--primary)] text-[var(--text-main)] hover:text-[var(--text-on-primary)] rounded-xl font-bold text-xs tracking-wide border border-[var(--border-light)] hover:border-[var(--primary)] shadow-sm active:scale-[0.97] transition-all focus:outline-none"
                >
                    Apply
                </button>
            </form>
        </div>
    );
}