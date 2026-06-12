import React from 'react';
import { ShoppingBag, ArrowLeft } from 'lucide-react';

export default function EmptyCart({ onContinueShopping }) {
    return (
        <div className="w-full py-16 px-4 flex flex-col items-center justify-center text-center select-none animate-in fade-in duration-300">

            {/* Minimal Ambient Vector Placeholder Composition */}
            <div className="relative w-28 h-28 sm:w-36 sm:h-36 bg-[var(--primary-muted)] rounded-full flex items-center justify-center mb-6 shadow-inner text-[var(--primary)] ">
                <ShoppingBag className="w-12 h-12 sm:w-16 sm:h-16 stroke-[1.25]" />

            </div>

            {/* Typographic Context */}
            <h2 className="text-xl sm:text-2xl font-bold text-[#1a191e] dark:text-[#f4f5f7] tracking-tight">
                Your cart is empty
            </h2>
            <p className="text-xs sm:text-sm text-[var(--text-muted)] font-normal mt-2 max-w-xs sm:max-w-sm leading-relaxed">
                Looks like you haven't added anything to your cart yet. Explore our custom departments to select your next favorite look.
            </p>

            {/* Back-routing Navigation Vector Trigger */}
            <button
                type="button"
                onClick={onContinueShopping}
                className="mt-8 h-11 px-6 bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-[var(--text-on-primary)] font-semibold text-sm tracking-wide rounded-full shadow-md hover:shadow-lg active:scale-[0.98] transition-all flex items-center gap-2 focus:outline-none"
            >
                <ArrowLeft className="w-4 h-4" />
                <span>Continue Shopping</span>
            </button>

        </div>
    );
}