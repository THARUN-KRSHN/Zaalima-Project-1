import React, { useState } from 'react'; // Fixed: Added useState import
import ProductCard from './ProductCard';
import CarouselPagination from './CarouselPagination';

// ==========================================
// 1. STANDARD & OVERLAY PRODUCT GRID
// ==========================================
export function ProductGrid() {
    const sampleProducts = [
        {
            id: 1,
            brand: "The Style Story",
            title: "Women Viscose Rayon Anarkali Kurta, Palazzo & Dupatta Set",
            image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=500&auto=format&fit=crop&q=60",
            rating: 4.4,
            reviewCount: 1374,
            price: 898,
            originalPrice: 3999,
            offerText: "₹853 with Bank offer + more",
        },
        {
            id: 2,
            brand: "Fastrack",
            title: "Vyb Diva Analog Watch - For Women",
            image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=500&auto=format&fit=crop&q=60",
            rating: 4.5,
            reviewCount: 314,
            price: 2046,
            originalPrice: 2925,
            offerText: "₹1,845 with Bank offer + more",
        },
        {
            id: 3,
            brand: "Samsung",
            title: "M06 5G (Blazing Black, 128 GB) | MediaTek Dimensity 6300",
            image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&auto=format&fit=crop&q=60",
            rating: 4.1,
            reviewCount: 2355,
            price: 12580,
            originalPrice: 14499,
            offerText: "₹11,951 with Bank offer",
        },
        {
            id: 4,
            brand: "Oumad",
            title: "Floral Print Kurta, Palazzo & Dupatta Set",
            image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=500&auto=format&fit=crop&q=60",
            rating: 4.1,
            reviewCount: 23025,
            price: 583,
            originalPrice: 2499,
            offerText: "₹533 with Bank offer + more",
        },
    ];

    const overlayProduct = {
        title: "Pour Over",
        description: "Single origin Ethiopian beans, perfectly extracted.",
        image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=500&auto=format&fit=crop&q=60",
        price: 650,
        tag: "New Arrival",
    };

    return (
        <div className="w-full max-w-7xl mx-auto px-4 py-8 font-sans">
            {/* SECTION 1: Standard E-Commerce Product Grid */}
            <div className="mb-12">
                <div className="mb-6 flex justify-between items-center border-b border-gray-100 pb-3">
                    <h2 className="text-xl font-bold text-[#212121]">Similar Products</h2>
                    <span className="text-sm text-[#2874f0] font-medium cursor-pointer hover:underline">View All</span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
                    {sampleProducts.map((product) => (
                        <ProductCard key={product.id} product={product} variant="ecommerce" />
                    ))}
                </div>
            </div>

            {/* SECTION 2: Cafe Custom Overlay Style */}
            <div className="border-t border-gray-200 pt-10">
                <h2 className="text-xl font-bold text-[#212121] mb-6 text-left">Overlay Card Showcase</h2>
                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <ProductCard product={overlayProduct} variant="overlay" />
                </div>
            </div>
        </div>
    );
}

// ==========================================
// 2. PAGINATED PRODUCT GRID (CAROUSEL INDICATORS)
// ==========================================
export default function PaginatedProductGrid() { // Set as default export
    const allProducts = [
        { id: 1, brand: "Brand A", title: "Product One", price: 999 },
        { id: 2, brand: "Brand B", title: "Product Two", price: 1499 },
        { id: 3, brand: "Brand C", title: "Product Three", price: 2499 },
        { id: 4, brand: "Brand D", title: "Product Four", price: 799 },
        { id: 5, brand: "Brand E", title: "Product Five", price: 1299 },
        { id: 6, brand: "Brand F", title: "Product Six", price: 899 },
        { id: 7, brand: "Brand G", title: "Product Seven", price: 1999 },
        { id: 8, brand: "Brand H", title: "Product Eight", price: 2199 },
    ];

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 2;
    const totalPages = Math.ceil(allProducts.length / itemsPerPage);

    const startIndex = currentPage * itemsPerPage;
    const visibleProducts = allProducts.slice(startIndex, startIndex + itemsPerPage);

    return (
        <div className="w-full bg-[#121212] min-h-screen p-6 text-white flex flex-col justify-between">
            {/* Product Deck Content Grid */}
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-7xl mx-auto w-full mb-8">
                {visibleProducts.map((product) => (
                    <ProductCard key={product.id} product={product} variant="ecommerce" />
                ))}
            </div>

            {/* Embedded Custom Indicator Toolbar */}
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