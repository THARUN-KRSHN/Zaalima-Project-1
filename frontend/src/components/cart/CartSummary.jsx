import React from 'react';
import { CreditCard } from 'lucide-react';

export default function CartSummary({ subtotal = 0, tax = 0, shipping = 0, discount = 0 }) {
    const grandTotal = subtotal + tax + shipping - discount;

    return (
        <div className="p-5 sm:p-6 rounded-2xl border border-[var(--border-light)] bg-[var(--bg-surface)] shadow-sm text-left flex flex-col gap-4 transition-colors duration-300 w-full">
            <h3 className="text-base font-bold text-[var(--text-main)] border-b border-[var(--border-light)] pb-3 tracking-tight">
                Order Summary
            </h3>

            {/* Line Pricing Item Breakdown Table */}
            <div className="flex flex-col gap-3 border-b border-[var(--border-light)] pb-4 text-sm">
                <div className="flex justify-between items-center text-[var(--text-muted)]">
                    <span>Subtotal</span>
                    <span className="font-semibold text-[var(--text-main)] font-sans">₹{subtotal.toLocaleString()}</span>
                </div>

                {discount > 0 && (
                    <div className="flex justify-between items-center text-emerald-600 dark:text-emerald-400 font-medium">
                        <span>Coupon Discount</span>
                        <span className="font-sans">-₹{discount.toLocaleString()}</span>
                    </div>
                )}

                <div className="flex justify-between items-center text-[var(--text-muted)]">
                    <span>Estimated Tax</span>
                    <span className="font-semibold text-[var(--text-main)] font-sans">₹{tax.toLocaleString()}</span>
                </div>

                <div className="flex justify-between items-center text-[var(--text-muted)]">
                    <span>Shipping Charges</span>
                    {shipping === 0 ? (
                        <span className="text-emerald-600 dark:text-emerald-400 font-bold tracking-wide uppercase text-xs">FREE</span>
                    ) : (
                        <span className="font-semibold text-[var(--text-main)] font-sans">₹{shipping.toLocaleString()}</span>
                    )}
                </div>
            </div>

            {/* Master Grand Total Parameter Block */}
            <div className="flex justify-between items-center text-[var(--text-main)] py-1">
                <span className="text-base font-bold tracking-tight">Grand Total</span>
                <span className="text-xl sm:text-2xl font-extrabold text-[var(--primary)] dark:text-[var(--text-main)] font-sans tracking-wide">
                    ₹{grandTotal.toLocaleString()}
                </span>
            </div>

            {/* Checkout Call To Action Hub */}
            <button
                type="button"
                className="w-full h-12 bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-[var(--text-on-primary)] rounded-full font-bold text-sm tracking-wide shadow-md hover:shadow-lg active:scale-[0.99] transition-all flex items-center justify-center gap-2 focus:outline-none mt-2"
            >
                <CreditCard className="w-4 h-4" />
                <span>Proceed To Checkout</span>
            </button>
        </div>
    );
}