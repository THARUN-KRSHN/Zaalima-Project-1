import React, { useState } from 'react';
import ProductCard from './ProductCard';
import CarouselPagination from '../common/Pagination'; // Adjusted route location

export function ProductGrid() {
    const sampleProducts = [
        {
            id: 1,
            brand: "The Style Story",
            title: "Women Viscose Rayon Anarkali Kurta Set",
            image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=500&auto=format&fit=crop&q=60",
            price: 898,
            tag: "Best Seller"
        },
        {
            id: 2,
            brand: "Fastrack",
            title: "Vyb Diva Analog Watch - For Women",
            image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=500&auto=format&fit=crop&q=60",
            price: 2046,
            tag: "New Arrival"
        },
        {
            id: 3,
            brand: "Samsung",
            title: "M06 5G (Blazing Black, 128 GB)",
            image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&auto=format&fit=crop&q=60",
            price: 12580,
            tag: "Trending"
        },
        {
            id: 4,
            brand: "Oumad",
            title: "Floral Print Kurta, Palazzo Set",
            image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=500&auto=format&fit=crop&q=60",
            price: 583,
            tag: "Top Rated"
        }
    ];

    return (
        <div className="w-full max-w-full px-6 lg:px-12 py-8 font-sans bg-[var(--bg-main)] transition-colors duration-300">
            <div className="mb-6 flex justify-between items-center border-b border-[var(--border-light)] pb-3">
                <h2 className="text-xl font-bold text-[var(--text-main)]">Similar Products</h2>
                <span className="text-sm text-[var(--primary)] font-medium cursor-pointer hover:underline">View All</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {sampleProducts.map((product) => (
                    <ProductCard key={product.id} product={product} variant="overlay" />
                ))}
            </div>
        </div>
    );
}

export default function PaginatedProductGrid() {
    const allProducts = [
        { id: 1, title: "Product One", price: 999, tag: "Best Seller" },
        { id: 2, title: "Product Two", price: 1499, tag: "New Arrival" },
        { id: 3, title: "Product Three", price: 2499, tag: "Trending" },
        { id: 4, title: "Product Four", price: 799, tag: "Top Rated" }
    ];

    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 4;
    const totalPages = Math.ceil(allProducts.length / itemsPerPage);

    const startIndex = currentPage * itemsPerPage;
    const visibleProducts = allProducts.slice(startIndex, startIndex + itemsPerPage);

    return (
        <div className="w-full bg-[var(--bg-main)] min-h-screen p-6 text-[var(--text-main)] flex flex-col justify-between transition-colors duration-300">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto w-full mb-8">
                {visibleProducts.map((product) => (
                    <ProductCard key={product.id} product={product} variant="overlay" />
                ))}
            </div>

            <div className="w-full mt-auto">
                <CarouselPagination
                    totalPages={totalPages}
                    currentPage={currentPage}
                    onPageChange={setCurrentPage}
                />
            </div>
        </div>
    );
}