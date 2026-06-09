import React from 'react';
import { Star, ShoppingCart } from 'lucide-react';

export default function ProductCard({ product, variant = 'ecommerce' }) {
    const {
        title,
        brand,
        description,
        image,
        rating,
        reviewCount,
        price,
        originalPrice,
        offerText,
        tag,
    } = product;

    // --- STYLE VARIANT A: CAFÉ OVERLAY DESIGN ---
    if (variant === 'overlay') {
        return (
            <div className="relative aspect-[4/5] w-full rounded-[2.5rem] overflow-hidden group shadow-md select-none bg-stone-900">
                {/* Background Image with Ambient Gradient Overlay */}
                <img
                    src={image}
                    alt={title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/10" />

                {/* Top Floating Badge */}
                {tag && (
                    <span className="absolute top-5 left-5 bg-[#A62626] text-[#FAF8F5] text-[11px] font-bold tracking-wider uppercase px-3 py-1.5 rounded-full">
                        {tag}
                    </span>
                )}

                {/* Content Area (Bottom Aligned) */}
                <div className="absolute inset-x-0 bottom-0 p-6 flex flex-col gap-4 text-white">
                    <div>
                        <h3 className="text-3xl font-medium tracking-tight font-serif mb-1 drop-shadow-sm">
                            {title}
                        </h3>
                        {description && (
                            <p className="text-[13px] text-stone-300 font-normal leading-snug max-w-[85%]">
                                {description}
                            </p>
                        )}
                    </div>

                    {/* Price Layout */}
                    <div className="text-2xl font-medium text-[#C93B3B] font-sans flex items-center">
                        ₹{price}
                    </div>

                    {/* Semi-transparent Glassmorphism Button */}
                    <button className="w-full bg-white/15 backdrop-blur-md border border-white/20 text-white py-3.5 rounded-2xl font-medium text-sm tracking-wide hover:bg-white/25 active:scale-[0.99] transition-all duration-150">
                        Add to Cart
                    </button>
                </div>
            </div>
        );
    }

    // --- STYLE VARIANT B: CLASSIC E-COMMERCE GRID DESIGN ---
    return (
        <div className="bg-white rounded-md border border-gray-100 hover:shadow-[0_4px_12px_rgba(0,0,0,0.06)] transition-shadow duration-200 flex flex-col h-full group cursor-pointer select-none">
            {/* Product Image Box */}
            <div className="relative aspect-[4/5] w-full bg-[#f9f9f9] overflow-hidden rounded-t-md p-2 flex items-center justify-center">
                <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-contain mix-blend-multiply transition-transform duration-300 group-hover:scale-[1.02]"
                />

                {/* Rating Floating Tag */}
                {rating && (
                    <div className="absolute bottom-2 left-2 bg-white/90 backdrop-blur-sm border border-gray-200 px-1.5 py-0.5 rounded flex items-center gap-0.5 shadow-sm">
                        <span className="text-[11px] font-bold text-[#212121]">{rating}</span>
                        <Star className="w-3 h-3 text-green-600 fill-green-600" />
                        <span className="text-[10px] text-gray-400 font-normal border-l border-gray-300 pl-1 ml-0.5">
                            ({reviewCount?.toLocaleString()})
                        </span>
                    </div>
                )}
            </div>

            {/* Meta Content Area */}
            <div className="p-3 flex flex-col flex-grow gap-1 text-left">
                <div>
                    <h4 className="text-[13px] text-[#212121] font-semibold tracking-tight truncate">
                        {brand}
                    </h4>
                    <p className="text-[12px] text-gray-500 font-normal line-clamp-2 leading-normal mt-0.5">
                        {title}
                    </p>
                </div>

                {/* Price & Discounts Line */}
                <div className="mt-auto pt-2 flex flex-col gap-0.5">
                    <div className="flex items-baseline gap-1.5 flex-wrap">
                        <span className="text-[14px] font-semibold text-[#212121]">₹{price?.toLocaleString()}</span>
                        {originalPrice && (
                            <span className="text-[12px] text-gray-400 line-through font-normal">
                                ₹{originalPrice?.toLocaleString()}
                            </span>
                        )}
                    </div>

                    {offerText && (
                        <span className="text-[11px] text-[#2874f0] font-medium tracking-tight">
                            {offerText}
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
}