import React from 'react';
import { ShoppingBag, ArrowRight } from 'lucide-react';

export default function OrderSummary({ cartData = [], shipping = 50, tax = 0, onCheckoutSubmit }) {

    const itemsTotal = cartData.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const grandTotal = itemsTotal + tax + shipping;

    return (
        <div className="p-5 sm:p-6 rounded-2xl border border-[var(--border-light)] bg-[var(--bg-surface)] shadow-sm text-left flex flex-col gap-4 transition-colors duration-300 w-full sticky top-28">
            <h3 className="text-base font-bold text-[var(--text-main)] border-b border-[var(--border-light)] pb-3 tracking-tight">
                Order Review
            </h3>

            {/* Embedded Mini Basket Drawer Preview Feed */}
            <div className="flex flex-col max-h-[160px] overflow-y-auto divide-y divide-[var(--border-light)] pr-1 scrollbar-none">
                {cartData.map((item) => (
                    <div key={item.id} className="flex items-center justify-between gap-3 py-2.5 first:pt-0 last:pb-0 text-xs text-[var(--text-muted)]">
                        <span className="font-medium text-[var(--text-main)] truncate max-w-[160px]">
                            {item.title} <span className="text-[11px] text-[var(--text-muted)] font-normal">x{item.quantity}</span>
                        </span>
                        <span className="font-semibold text-[var(--text-main)] font-sans">₹{(item.price * item.quantity).toLocaleString()}</span>
                    </div>
                ))}
            </div>

            {/* Linear pricing financial metrics chart matrix */}
            <div className="flex flex-col gap-3 border-t border-b border-[var(--border-light)] py-4 text-sm">
                <div className="flex justify-between items-center text-[var(--text-muted)]">
                    <span>Items Total</span>
                    <span className="font-semibold text-[var(--text-main)] font-sans">₹{itemsTotal.toLocaleString()}</span>
                </div>

                <div className="flex justify-between items-center text-[var(--text-muted)]">
                    <span>Estimated Tax</span>
                    <span className="font-semibold text-[var(--text-main)] font-sans">₹{tax.toLocaleString()}</span>
                </div>

                <div className="flex justify-between items-center text-[var(--text-muted)]">
                    <span>Shipping Fee</span>
                    {shipping === 0 ? (
                        <span className="text-emerald-600 dark:text-emerald-400 font-bold tracking-wide uppercase text-xs">FREE</span>
                    ) : (
                        <span className="font-semibold text-[var(--text-main)] font-sans">₹{shipping.toLocaleString()}</span>
                    )}
                </div>
            </div>

            {/* Absolute total parameters display row */}
            <div className="flex justify-between items-center text-[var(--text-main)] py-0.5">
                <span className="text-base font-bold tracking-tight">Grand Total</span>
                <span className="text-xl sm:text-2xl font-extrabold text-[var(--primary)] dark:text-[var(--text-main)] font-sans tracking-wide">
                    ₹{grandTotal.toLocaleString()}
                </span>
            </div>

            {/* Execution action dispatch submission handles */}
            <button
                type="button"
                onClick={onCheckoutSubmit}
                className="w-full h-12 bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-[var(--text-on-primary)] rounded-full font-bold text-sm tracking-wide shadow-md hover:shadow-lg active:scale-[0.99] transition-all flex items-center justify-center gap-2 focus:outline-none mt-2"
            >
                <ShoppingBag className="w-4 h-4" />
                <span>Place Order Now</span>
                <ArrowRight className="w-4 h-4 ml-0.5" />
            </button>
        </div>
    );
}