import React from 'react';

export default function ProductInfo({ product = {} }) {
    const {
        title = "Premium Catalog Item",
        category = "General Marketplace",
        price = 0,
        description = "No detailed description parameters provided for this catalog product registry.",
        inStock = true
    } = product;

    return (
        <div className="flex flex-col gap-3 sm:gap-4 text-left w-full">
            {/* Department Tag Line */}
            <div>
                <span className="bg-[var(--primary-muted)] text-[var(--primary)] text-[10px] sm:text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-md">
                    {category}
                </span>
            </div>

            {/* 🌟 FORCE HIGH CONTRAST TYPOGRAPHY: Strict hex fallback overrides any variable bleed bugs */}
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1a191e] dark:text-[#f4f5f7] tracking-tight leading-snug transition-colors duration-200">
                {title}
            </h1>

            {/* Financial Retail Price Flag */}
            <div className="text-2xl sm:text-3xl font-semibold text-[var(--primary)] font-sans dark:text-[var(--text-main)] transition-colors">
                ₹{price?.toLocaleString()}
            </div>

            {/* Platform Description Copy block */}
            <p className="text-sm sm:text-base text-[var(--text-muted)] font-normal leading-relaxed max-w-xl transition-colors">
                {description}
            </p>

            {/* Real-time Inventory Status Pill Component */}
            <div className="flex items-center gap-2 mt-1">
                <div className={`w-2.5 h-2.5 rounded-full animate-pulse ${inStock ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                <span className={`text-xs sm:text-sm font-semibold tracking-wide uppercase
                    ${inStock ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}
                >
                    {inStock ? 'In Stock' : 'Out of Stock'}
                </span>
            </div>
        </div>
    );
}