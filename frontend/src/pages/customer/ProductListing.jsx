import React, { useState, useEffect } from 'react';

// --- COMMON COMPONENTS ---
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';
import CarouselPagination from '../../components/common/Pagination';
import Breadcrumbs from '../../components/common/Breadcrumbs';

// --- PRODUCT COMPONENTS ---
import SearchBar from '../../components/product/SearchBar';
import CategoryFilter from '../../components/product/CategoryFilter';
import ProductCard from '../../components/product/ProductCard';
import Loader from '../../components/common/Loader';

// --- CENTRALIZED MOCK DATA ---
import { allProducts } from '../../data/products';
import { getProducts } from '../../services/productService';

export default function ProductListing() {
    const [loading, setLoading] = useState(true);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
    const [activeCategory, setActiveCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [productsList, setProductsList] = useState([]);

    const [currentPage, setCurrentPage] = useState(0);

    const filteredProducts = productsList.filter((product) => {
        const matchesCategory = activeCategory === 'All' || product.category.toLowerCase() === activeCategory.toLowerCase();
        const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.brand.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    // If product count is greater than 20, paginate with 20 items per page; otherwise show all
    const usesPagination = filteredProducts.length > 20;
    const itemsPerPage = usesPagination ? 20 : Math.max(1, filteredProducts.length);

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

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const data = await getProducts();
                if (data && data.success && data.products && data.products.length > 0) {
                    setProductsList(data.products);
                } else {
                    setProductsList(allProducts);
                }
            } catch (error) {
                console.warn("Failed to fetch products from backend, falling back to mock catalog:", error.message);
                setProductsList(allProducts);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    return (
        <div className={`${isDarkMode ? 'dark' : ''} min-h-screen w-full bg-[var(--bg-main)] flex flex-col justify-between selection:bg-[var(--primary)] selection:text-[var(--text-on-primary)] transition-colors duration-300`}>

            <header className="w-full bg-[var(--bg-surface)] flex flex-col gap-1 shadow-sm shrink-0 border-b border-[var(--border-light)] transition-colors duration-300">
                <Navbar isDarkMode={isDarkMode} onToggleTheme={() => setIsDarkMode(!isDarkMode)} />
                <div className="pb-4 w-full px-4 sm:px-6 lg:px-16">
                    <SearchBar searchQuery={searchQuery} onSearchChange={handleSearchChange} />
                </div>
            </header>

            <main className="w-full max-w-full px-4 sm:px-6 lg:px-16 py-6 flex flex-col gap-4 flex-grow items-stretch justify-start">
                <Breadcrumbs />
                
                {loading ? (
                    <Loader variant="default" />
                ) : (
                    <div className="flex flex-col lg:flex-row gap-6 w-full items-start">
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
                                        {searchQuery ? `Search: "${searchQuery}"` : activeCategory === 'All' ? 'All Products' : `${activeCategory}`}
                                    </h3>
                                        <p className="text-[10px] sm:text-xs text-[var(--text-muted)] mt-0.5 font-normal">
                                            Showing {filteredProducts.length > 0 ? startIndex + 1 : 0}-{Math.min(startIndex + itemsPerPage, filteredProducts.length)} of {filteredProducts.length} items
                                        </p>
                                    </div>

                                    <button
                                        onClick={() => setIsMobileFilterOpen(true)}
                                        className="lg:hidden px-4 py-1.5 border border-[var(--primary)] text-[var(--primary)] font-medium text-xs rounded-full hover:bg-[var(--primary-muted)] focus:outline-none transition-all duration-150 shrink-0"
                                    >
                                        Departments
                                    </button>
                                </div>

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
                    </div>
                )}
            </main>

            {/* MOBILE ACCORDION RESPONSIVE DRAWER MODAL */}
            {isMobileFilterOpen && (
                <div className="lg:hidden fixed inset-0 z-50 flex flex-col justify-end bg-black/60 animate-in fade-in duration-200">
                    <div className="w-full bg-[var(--bg-surface)] rounded-t-[2rem] overflow-hidden flex flex-col shadow-2xl border-t border-[var(--border-light)] animate-in slide-in-from-bottom duration-300">
                        <div className="bg-[var(--bg-surface)] border-b border-[var(--border-light)] p-4 flex items-center justify-between z-10">
                            <h2 className="text-[15px] font-bold text-[var(--text-main)] uppercase tracking-wide">Departments</h2>
                            <button
                                onClick={() => setIsMobileFilterOpen(false)}
                                className="text-xs text-[var(--text-on-primary)] bg-[var(--primary)] font-bold tracking-wide px-4 py-2 rounded-full focus:outline-none shadow-sm active:scale-95 transition-transform"
                            >
                                Close
                            </button>
                        </div>
                        <div className="p-4 pb-10 max-h-[60vh] overflow-y-auto">
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