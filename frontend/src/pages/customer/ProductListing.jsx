import React, { useState } from 'react';

// --- COMMON COMPONENTS ---
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';
import CarouselPagination from '../../components/common/Pagination';

// --- PRODUCT COMPONENTS ---
import SearchBar from '../../components/product/SearchBar';
import CategoryFilter from '../../components/product/CategoryFilter';
import ProductCard from '../../components/product/ProductCard';

export default function ProductListing() {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
    const [activeCategory, setActiveCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');

    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 4;

    const allProducts = [
        {
            id: 1,
            brand: "The Style Story",
            title: "Anarkali Kurta",
            category: "Fashion",
            description: "Women Viscose Rayon Anarkali Kurta, Palazzo & Premium Dupatta Set.",
            image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=500&auto=format&fit=crop&q=60",
            rating: 4.4,
            reviewCount: 1374,
            price: 898,
            tag: "Best Seller"
        },
        {
            id: 2,
            brand: "Fastrack",
            title: "Analog Watch",
            category: "Electronics",
            description: "Vyb Diva Premium Analog Wristwatch. Designed gracefully for modern women.",
            image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=500&auto=format&fit=crop&q=60",
            rating: 4.5,
            reviewCount: 314,
            price: 2046,
            tag: "New Arrival"
        },
        {
            id: 3,
            brand: "Samsung",
            title: "Galaxy M06 5G",
            category: "Electronics",
            description: "Blazing Black configuration featuring 128 GB & MediaTek Dimensity 6300 chipset.",
            image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&auto=format&fit=crop&q=60",
            rating: 4.1,
            reviewCount: 2355,
            price: 12580,
            tag: "Trending"
        },
        {
            id: 4,
            brand: "Oumad",
            title: "Floral Print Kurta",
            category: "Fashion",
            description: "Traditional refined handwoven Floral Print Kurta, crisp Palazzo & complete Dupatta Set.",
            image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=500&auto=format&fit=crop&q=60",
            rating: 4.1,
            reviewCount: 23025,
            price: 583,
            tag: "Top Rated"
        },
        {
            id: 5,
            brand: "Oxford",
            title: "Classic History Atlas",
            category: "Books",
            description: "Detailed cartography maps, historical breakdowns, and educational global timelines.",
            image: "https://images.unsplash.com/photo-1495640388908-05fa85288e61?w=500&auto=format&fit=crop&q=60",
            rating: 4.6,
            reviewCount: 182,
            price: 450,
            tag: "Education"
        },
        {
            id: 6,
            brand: "Penguin",
            title: "The Sci-Fi Odyssey",
            category: "Books",
            description: "A breathtaking epic space fictional novel following extra-galactic space travel frameworks.",
            image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=500&auto=format&fit=crop&q=60",
            rating: 4.8,
            reviewCount: 942,
            price: 299,
            tag: "Fiction"
        }
    ];

    const filteredProducts = allProducts.filter((product) => {
        const matchesCategory = activeCategory === 'All' || product.category.toLowerCase() === activeCategory.toLowerCase();
        const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.brand.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    const startIndex = currentPage * itemsPerPage;
    const visibleProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

    const handleCategoryChange = (newCategory) => {
        setActiveCategory(newCategory);
        setCurrentPage(0);
    };

    const handleSearchChange = (query) => {
        setSearchQuery(query);
        setCurrentPage(0);
    };

    return (
        <div className={`${isDarkMode ? 'dark' : ''} min-h-screen w-full bg-[var(--bg-main)] flex flex-col justify-between selection:bg-[var(--primary)] selection:text-[var(--text-on-primary)] transition-colors duration-300`}>

            <header className="w-full bg-[var(--bg-surface)] flex flex-col gap-1 shadow-sm shrink-0 border-b border-[var(--border-light)] transition-colors duration-300">
                <Navbar isDarkMode={isDarkMode} onToggleTheme={() => setIsDarkMode(!isDarkMode)} />
                <div className="pb-4 w-full px-4 sm:px-6 lg:px-16">
                    <SearchBar searchQuery={searchQuery} onSearchChange={handleSearchChange} />
                </div>
            </header>

            <main className="w-full max-w-full px-4 sm:px-6 lg:px-16 py-6 flex gap-6 flex-grow items-start">

                {/* DESKTOP SIDEBAR DEPARTMENTS RAIL */}
                <aside className="hidden lg:block w-[280px] shrink-0 sticky top-4">
                    <CategoryFilter activeCategory={activeCategory} onCategoryChange={handleCategoryChange} />
                </aside>

                {/* PRODUCT SHELF CONTAINER FEED */}
                <section className="flex-grow flex flex-col justify-between min-h-[65vh] w-full">
                    <div className="bg-[var(--bg-surface)] p-4 sm:p-6 border border-[var(--border-light)] rounded-xl shadow-sm w-full transition-colors duration-300">

                        <div className="mb-6 pb-3 border-b border-[var(--border-light)] flex justify-between items-center gap-2">
                            <div>
                                <h3 className="text-sm sm:text-lg font-bold text-[var(--text-main)] tracking-tight">
                                    {searchQuery ? `Search: "${searchQuery}"` : activeCategory === 'All' ? 'Similar Products' : `${activeCategory}`}
                                </h3>
                                <p className="text-[10px] sm:text-xs text-[var(--text-muted)] mt-0.5 font-normal">
                                    Showing {filteredProducts.length > 0 ? startIndex + 1 : 0}-{Math.min(startIndex + itemsPerPage, filteredProducts.length)} of {filteredProducts.length} items
                                </p>
                            </div>

                            {/* 🌟 FIXED: Interactive Mobile Trigger bound explicitly to open your sliding drawer */}
                            <button
                                onClick={() => setIsMobileFilterOpen(true)}
                                className="px-4 py-1.5 border border-[var(--primary)] text-[var(--primary)] font-medium text-xs rounded-full hover:bg-[var(--primary-muted)] focus:outline-none transition-all duration-150 shrink-0"
                            >
                                Departments
                            </button>
                        </div>

                        {/* 🌟 FIXED MOBILE CARD SHELF GRID (Set to 2 columns on mobile with optimized spacing) */}
                        {visibleProducts.length > 0 ? (
                            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
                                {visibleProducts.map((product) => (
                                    <ProductCard key={product.id} product={product} variant="overlay" />
                                ))}
                            </div>
                        ) : (
                            <div className="w-full py-20 flex flex-col items-center justify-center text-center">
                                <span className="text-xl mb-1">🔍</span>
                                <h4 className="text-sm font-bold text-[var(--text-main)]">No matches found</h4>
                            </div>
                        )}
                    </div>

                    {totalPages > 1 && (
                        <div className="w-full mt-4">
                            <CarouselPagination totalPages={totalPages} currentPage={currentPage} onPageChange={setCurrentPage} />
                        </div>
                    )}
                </section>
            </main>

            {/* --- 🌟 MOBILE ACCORDION RESPONSIVE DRAWER MODAL --- */}
            {isMobileFilterOpen && (
                <div className="lg:hidden fixed inset-0 z-50 flex flex-col justify-end bg-black/60 animate-in fade-in duration-200">
                    <div className="w-full bg-[var(--bg-surface)] rounded-t-[2rem] overflow-hidden flex flex-col shadow-2xl border-t border-[var(--border-light)] animate-in slide-in-from-bottom duration-300">
                        <div className="bg-[var(--bg-surface)] border-b border-[var(--border-light)] p-4 flex items-center justify-between z-10">
                            <h2 className="text-[15px] font-bold text-[var(--text-main)] uppercase tracking-wide"></h2>
                            <button
                                onClick={() => setIsMobileFilterOpen(false)}
                                className="text-xs text-[var(--text-on-primary)] bg-[var(--primary)] font-bold tracking-wide px-4 py-2 rounded-full focus:outline-none shadow-sm active:scale-95 transition-transform"
                            >
                                Close
                            </button>
                        </div>
                        <div className="p-4 pb-10 max-h-[60vh] overflow-y-auto">
                            {/* Category items embedded inside the modal click path */}
                            <CategoryFilter
                                activeCategory={activeCategory}
                                onCategoryChange={(cat) => { handleCategoryChange(cat); setIsMobileFilterOpen(false); }}
                            />
                        </div>
                    </div>
                </div>
            )}

            <Footer />
        </div>
    );
}