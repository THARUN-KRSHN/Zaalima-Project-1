import React from 'react';
import ProductCard from './ProductCard';

export default function SimilarProducts({ products = [] }) {
    const fallbackProducts = [
        {
            id: 101,
            title: "Anarkali Kurta",
            image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=500&auto=format&fit=crop&q=60",
            price: 898,
            tag: "Best Seller"
        },
        {
            id: 102,
            brand: "Fastrack",
            title: "Analog Watch",
            image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=500&auto=format&fit=crop&q=60",
            price: 2046,
            tag: "New Arrival"
        },
        {
            id: 103,
            brand: "Samsung",
            title: "Galaxy M06 5G",
            image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&auto=format&fit=crop&q=60",
            price: 12580,
            tag: "Trending"
        },
        {
            id: 104,
            brand: "Oumad",
            title: "Floral Print Kurta",
            image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=500&auto=format&fit=crop&q=60",
            price: 583,
            tag: "Top Rated"
        }
    ];

    const visibleProducts = products.length > 0 ? products : fallbackProducts;

    return (
        <div className="w-full border-t border-[var(--border-light)] pt-8 mt-6 transition-colors duration-300">
            {/* Header Content Section */}
            <div className="mb-5 text-left">
                <h2 className="text-xl sm:text-2xl font-bold text-[var(--text-main)] tracking-tight">
                    Similar Products
                </h2>
                <p className="text-xs text-[var(--text-muted)] mt-0.5">Explore corresponding items cataloged in this department slot</p>
            </div>

            {/* 🌟 FOOLPROOF TOUCH SWIPE FIX FOR TABLETS & PHONES:
                - Added 'max-lg:overflow-x-auto max-lg:overflow-y-hidden' to bypass parent clip contexts
                - Kept 'flex max-lg:flex-nowrap' so items form a single row track
                - Included webkit-overflow-scrolling indicators natively */}
            <div className="flex max-lg:flex-nowrap max-lg:overflow-x-auto max-lg:overflow-y-hidden lg:grid lg:grid-cols-4 gap-4 sm:gap-6 w-full overflow-x-auto lg:overflow-x-visible pb-4 lg:pb-0 scrollbar-none snap-x snap-mandatory px-0.5 [-webkit-overflow-scrolling:touch]">
                {visibleProducts.map((product) => (
                    <div
                        key={product.id}
                        className="shrink-0 w-[80%] sm:w-[46%] md:w-[42%] lg:w-full snap-start"
                    >
                        <ProductCard product={product} variant="overlay" />
                    </div>
                ))}
            </div>
        </div>
    );
}