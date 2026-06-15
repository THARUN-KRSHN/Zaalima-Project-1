import React from 'react';
// 🌟 Import useNavigate
import { useNavigate } from 'react-router-dom';
import { CreditCard } from 'lucide-react';

export default function CartSummary({ subtotal = 0, tax = 0, shipping = 0, discount = 0 }) {
    const grandTotal = subtotal + tax + shipping - discount;
    const navigate = useNavigate(); // 🌟 Initialize router trigger

    return (
        <div className="p-5 sm:p-6 rounded-2xl border border-[var(--border-light)] bg-[var(--bg-surface)] shadow-sm text-left flex flex-col gap-4 transition-colors duration-300 w-full">
            <h3 className="text-base font-bold text-[var(--text-main)] border-b border-[var(--border-light)] pb-3 tracking-tight">
                Order Summary
            </h3>

            {/* Breakdown Price Ledger Matrix */}
            <div className="flex flex-col gap-3 border-b border-[var(--border-light)] pb-4 text-sm">
                <div className="flex justify-between items-center text-[var(--text-muted)]">
                    <span>Subtotal</span>
                    <span className="font-semibold text-[var(--text-main)] font-sans">₹{subtotal.toLocaleString()}</span>
                </div>
                {discount > 0 && (
                    <div className="flex justify-between items-center text-emerald-600 font-medium">
                        <span>Discount</span>
                        <span className="font-sans">-₹{discount.toLocaleString()}</span>
                    </div>
                )}
                <div className="flex justify-between items-center text-[var(--text-muted)]">
                    <span>Estimated Tax</span>
                    <span className="font-semibold text-[var(--text-main)] font-sans">₹{tax.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center text-[var(--text-muted)]">
                    <span>Shipping Charges</span>
                    <span className="font-semibold text-[var(--text-main)] font-sans">
                        {shipping === 0 ? "FREE" : `₹${shipping.toLocaleString()}`}
                    </span>
                </div>
            </div>

            <div className="flex justify-between items-center text-[var(--text-main)] py-1">
                <span className="text-base font-bold tracking-tight">Grand Total</span>
                <span className="text-xl sm:text-2xl font-extrabold text-[var(--primary)] font-sans">
                    ₹{grandTotal.toLocaleString()}
                </span>
            </div>

            {/* 🌟 FIXED: Links Cart Directly to Checkout Page */}
            <button
                type="button"
                onClick={() => navigate('/checkout')}
                className="w-full h-12 bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-[var(--text-on-primary)] rounded-full font-bold text-sm tracking-wide shadow-md hover:shadow-lg active:scale-[0.99] transition-all flex items-center justify-center gap-2 focus:outline-none mt-2"
            >
                <CreditCard className="w-4 h-4" />
                <span>Proceed To Checkout</span>
            </button>
        </div>
    );
}