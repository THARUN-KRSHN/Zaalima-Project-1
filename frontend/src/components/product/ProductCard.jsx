import React from 'react';
import { Star } from 'lucide-react';

export default function ProductCard({ product, variant = 'ecommerce' }) {
    const {
        title,
        brand,
        image,
        rating,
        reviewCount,
        price,
        originalPrice,
        offerText,
        tag,
    } = product;

    // --- STYLE VARIANT A: ZMARKET SIGNATURE CARD ---
    if (variant === 'overlay') {
        return (
            <div className="relative aspect-[4/5] w-full rounded-[1.25rem] sm:rounded-[2rem] overflow-hidden group shadow-[0_4px_12px_rgba(0,0,0,0.05)] select-none bg-[#1C1816]">

                {/* Immersive Visual Asset Canvas */}
                <img
                    src={image}
                    alt={title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-102"
                />

                {/* Vignette Layer to anchor text contrast across backgrounds */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent z-0" />

                {/* Absolute Corner Isolated Tag Node */}
                {tag && (
                    <div className="absolute top-2.5 left-2.5 sm:top-4 sm:left-4 z-20">
                        <span className="bg-[var(--primary)] text-[var(--text-on-primary)] text-[8px] sm:text-[10px] font-bold tracking-wider uppercase px-2.5 py-0.5 sm:py-1 rounded-md shadow-md block">
                            {tag}
                        </span>
                    </div>
                )}

                {/* Dynamic Content Panel Metadata Box */}
                <div className="absolute inset-x-0 bottom-0 p-3 sm:p-5 flex flex-col justify-end min-h-[40%] z-10 text-left">

                    {/* Clamped Product Title Heading */}
                    <h3 className="text-xs sm:text-base md:text-xl font-medium tracking-tight font-serif text-[#FCFAF7] line-clamp-1 sm:line-clamp-2 leading-tight drop-shadow-sm mb-0.5 sm:mb-1">
                        {title}
                    </h3>

                    {/* Highly Visible Financial Price Line */}
                    <div className="text-sm sm:text-xl font-semibold text-[#ffffff] font-sans tracking-wide mb-1.5 sm:mb-3">
                        ₹{price?.toLocaleString()}
                    </div>

                    {/* Action Link Control Hub Wrapper */}
                    <div className="w-full pt-1 sm:pt-2 border-t border-white/5 flex justify-end">
                        <button className="text-[9px] sm:text-xs font-medium text-stone-300 hover:text-white transition-colors flex items-center gap-0.5 sm:gap-1 group/btn bg-white/5 backdrop-blur-sm px-2.5 py-1 rounded-full border border-white/10 hover:bg-white/10">
                            <span>Details</span>
                            <span className="transition-transform duration-200 group-hover/btn:translate-x-0.5">→</span>
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // --- STYLE VARIANT B: COMPACT BACKUP STACK ---
    return (
        <div className="bg-[var(--bg-surface)] rounded-md border border-[var(--border-light)] hover:shadow-[var(--shadow-md)] transition-all duration-200 flex flex-col h-full group cursor-pointer select-none">
            <div className="relative aspect-[4/5] w-full bg-[var(--bg-surface-hover)] overflow-hidden rounded-t-md p-2 flex items-center justify-center">
                <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal transition-transform duration-300 group-hover:scale-[1.02]"
                />
            </div>

            <div className="p-3 flex flex-col flex-grow gap-1 text-left">
                <h4 className="text-[13px] text-[var(--text-main)] font-semibold tracking-tight truncate">
                    {brand}
                </h4>
                <p className="text-[12px] text-[var(--text-muted)] font-normal line-clamp-2 leading-normal mt-0.5">
                    {title}
                </p>
                <div className="mt-auto pt-2 flex items-baseline gap-1.5 flex-wrap">
                    <span className="text-[14px] font-semibold text-[var(--text-main)]">₹{price?.toLocaleString()}</span>
                </div>
            </div>
        </div>
    );
}