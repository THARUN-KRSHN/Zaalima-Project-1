import React, { useState } from 'react';
import Navbar from './Navbar';
import SearchBar from './SearchBar';
import CategoryFilter from './CategoryFilter';
import ProductCard from './ProductCard';
import CarouselPagination from './CarouselPagination';
import Footer from './Footer';

export default function ProductListing() {
    // 1. Mobile Filter Drawer Toggle State
    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

    // 2. Active Filter States (Controlled state mapped to CategoryFilter instances)
    const [selectedStorage, setSelectedStorage] = useState([]);
    const [selectedDiscounts, setSelectedDiscounts] = useState([]);
    const [selectedBrands, setSelectedBrands] = useState([]);

    // 3. Carousel Pagination State
    const [currentPage, setCurrentPage] = useState(0); // 0-indexed page tracking
    const itemsPerPage = 4; // Display 4 items per page/viewframe

    // 4. Global Product Collection
    const allProducts = [
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
        {
            id: 5,
            brand: "Puma",
            title: "Smashic Unisex Leather Sneakers",
            image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=500&auto=format&fit=crop&q=60",
            rating: 4.2,
            reviewCount: 845,
            price: 2499,
            originalPrice: 4999,
            offerText: "Minimum 50% Off",
        },
        {
            id: 6,
            brand: "Sony",
            title: "WH-1000XM4 Wireless Over-Ear Active Noise Cancellation Headphones",
            image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60",
            rating: 4.7,
            reviewCount: 9412,
            price: 19990,
            originalPrice: 29990,
            offerText: "Bank Offer included",
        }
    ];

    // Mock data arrays fed directly into separate CategoryFilter blocks
    const storageOptions = [
        { id: 'st1', label: '256 GB' },
        { id: 'st2', label: '128 GB' },
        { id: 'st3', label: '64 GB' },
    ];

    const discountOptions = [
        { id: 'd1', label: '50% or more' },
        { id: 'd2', label: '40% or more' },
        { id: 'd3', label: '30% or more' },
    ];

    const brandOptions = [
        { id: 'b1', label: 'Samsung' },
        { id: 'b2', label: 'Fastrack' },
        { id: 'b3', label: 'The Style Story' },
    ];

    // 5. Pagination Calculation Metrics
    const totalPages = Math.ceil(allProducts.length / itemsPerPage);
    const startIndex = currentPage * itemsPerPage;
    const visibleProducts = allProducts.slice(startIndex, startIndex + itemsPerPage);

    // Helper macro component to host filters (prevents repeating template markup between desktop and mobile sidebar drawers)
    const RenderFilters = () => (
        <div className="flex flex-col bg-white">
            {/* Price Selector Block */}
            <div className="p-4 border-b border-[#f0f0f0]">
                <span className="text-[12px] font-semibold tracking-wider text-gray-400 block mb-3 uppercase">Price Range</span>
                <div className="flex items-center gap-2">
                    <select className="w-full h-8 px-2 border border-[#d7d7d7] rounded-sm bg-white text-gray-800 focus:outline-none text-[13px]">
                        <option>Min</option>
                        <option>₹10,000</option>
                    </select>
                    <span className="text-gray-400 text-xs">to</span>
                    <select className="w-full h-8 px-2 border border-[#d7d7d7] rounded-sm bg-white text-gray-800 focus:outline-none text-[13px]">
                        <option>₹30,000+</option>
                    </select>
                </div>
            </div>

            <CategoryFilter
                title="Internal Storage"
                options={storageOptions}
                selectedValues={selectedStorage}
                onChange={setSelectedStorage}
            />
            <CategoryFilter
                title="Discount"
                options={discountOptions}
                selectedValues={selectedDiscounts}
                onChange={setSelectedDiscounts}
                defaultOpen={true}
            />
            <CategoryFilter
                title="Brands"
                options={brandOptions}
                selectedValues={selectedBrands}
                onChange={setSelectedBrands}
            />
        </div>
    );

    return (
        <div className="min-h-screen bg-[#F1F3F6] flex flex-col justify-between selection:bg-blue-500 selection:text-white">

            {/* --- HEADER WRAPPER TRACK --- */}
            <header className="w-full bg-white flex flex-col gap-1 shadow-sm shrink-0">
                <Navbar />
                <div className="pb-4 max-w-7xl mx-auto w-full px-4">
                    <SearchBar />
                </div>
            </header>

            {/* --- MAIN PAGE CONTENT GRID ASSEMBLY --- */}
            <main className="w-full max-w-7xl mx-auto px-2 sm:px-4 py-4 md:py-6 flex gap-4 flex-grow items-start">

                {/* DESKTOP FILTER BAR COLUMN (Hidden on viewports below 1024px) */}
                <aside className="hidden lg:block w-[280px] bg-white border border-gray-200 rounded-sm shadow-sm shrink-0 sticky top-4">
                    <div className="p-4 border-b border-[#f0f0f0]">
                        <h2 className="text-[18px] font-medium tracking-tight text-[#212121]">Filters</h2>
                    </div>
                    <RenderFilters />
                </aside>

                {/* MAIN DISPLAY: PRODUCT COLLECTION BLOCK */}
                <section className="flex-grow w-full flex flex-col justify-between min-h-[60vh]">
                    <div className="bg-white p-4 border border-gray-200 rounded-sm shadow-sm">

                        {/* Context/Results Title Line */}
                        <div className="mb-4 pb-2 border-b border-gray-100 flex justify-between items-center">
                            <div>
                                <h3 className="text-base font-bold text-[#212121]">Similar Products</h3>
                                <p className="text-xs text-gray-400 mt-0.5 font-normal">Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, allProducts.length)} of {allProducts.length} items</p>
                            </div>

                            {/* Mobile Filter Action Button */}
                            <button
                                onClick={() => setIsMobileFilterOpen(true)}
                                className="lg:hidden px-4 py-1.5 border border-[#2874f0] text-[#2874f0] font-medium text-xs rounded hover:bg-blue-50 transition-colors"
                            >
                                Filters
                            </button>
                        </div>

                        {/* Core Product Shelf Grid (4 Columns Desktop / 2 Columns Tablet & Mobile) */}
                        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4">
                            {visibleProducts.map((product) => (
                                <ProductCard key={product.id} product={product} variant="ecommerce" />
                            ))}
                        </div>
                    </div>

                    {/* SYSTEM OVERLAY PAGINATION CONTROL TOOLBAR */}
                    <div className="w-full mt-6 mb-2">
                        <CarouselPagination
                            totalPages={totalPages}
                            currentPage={currentPage}
                            onPageChange={setCurrentPage}
                        />
                    </div>
                </section>
            </main>

            {/* --- MOBILE ACCORDION DRAWER OVERLAY --- */}
            {isMobileFilterOpen && (
                <div className="lg:hidden fixed inset-0 z-50 flex flex-col justify-end bg-black/60 animate-in fade-in duration-200">
                    <div className="w-full max-h-[80vh] bg-white rounded-t-2xl overflow-y-auto flex flex-col shadow-2xl animate-in slide-in-from-bottom duration-300">
                        <div className="sticky top-0 bg-white border-b border-[#f0f0f0] p-4 flex items-center justify-between z-10">
                            <h2 className="text-[16px] font-medium text-[#212121]">Filters</h2>
                            <button
                                onClick={() => setIsMobileFilterOpen(false)}
                                className="text-xs text-[#2874f0] font-bold tracking-wide px-3 py-1 bg-blue-50 rounded-full"
                            >
                                Done
                            </button>
                        </div>
                        <div className="pb-10">
                            <RenderFilters />
                        </div>
                    </div>
                </div>
            )}

            {/* --- FOOTER ATTACHMENT NODE --- */}
            <Footer />
        </div>
    );
}