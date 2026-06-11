import React from 'react';
import ProductCard from './ProductCard';

export default function SimilarProducts({ products = [] }) {
    // Complete dummy array data sync structured exactly to replicate your list cards
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
        <div className="w-full border-t border-[var(--border-light)] pt-10 mt-10 transition-colors duration-300">
            {/* Header section */}
            <div className="mb-6 text-left">
                <h2 className="text-xl sm:text-2xl font-bold text-[var(--text-main)] tracking-tight">
                    Similar Products
                </h2>
                <p className="text-xs text-[var(--text-muted)] mt-0.5">Explore corresponding items cataloged in this department slot</p>
            </div>

            {/* Mobile 2-card multi-viewport collection grid shelf tracker */}
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6 w-full">
                {visibleProducts.map((product) => (
                    <ProductCard key={product.id} product={product} variant="overlay" />
                ))}
            </div>
        </div>
    );
}