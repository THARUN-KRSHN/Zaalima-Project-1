import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, ShoppingBag, ArrowLeft } from 'lucide-react';

// --- PLATFORM INTERIOR LAYOUTS ---
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';
import Loader from '../../components/common/Loader';
import Breadcrumbs from '../../components/common/Breadcrumbs';

// --- REUSABLE PRODUCT ATOMS ---
import ProductGallery from '../../components/product/ProductGallery';
import ProductInfo from '../../components/product/ProductInfo';
import QuantitySelector from '../../components/product/QuantitySelector';
import VendorInfo from '../../components/product/VendorInfo';
import SimilarProducts from '../../components/product/SimilarProducts';

export default function ProductDetails() {
    const [loading, setLoading] = useState(true);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [qty, setQty] = useState(1);
    const navigate = useNavigate();

    const mockProductData = {
        title: "Anarkali Kurta Set",
        category: "Fashion",
        price: 898,
        description: "An elegant handwoven Viscose Rayon Anarkali Kurta set. Includes matching Palazzo pants and a beautiful embellished dupatta. Made from premium, soft, and breathable fabric designed for comfort and everyday style.",
        inStock: true,
        images: [
            "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=600&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=600&auto=format&fit=crop&q=80"
        ],
        vendor: {
            storeName: "Zaalima Premium Hub",
            name: "Tharun Krishna",
            rating: 4.9
        }
    };

    const handleAddToCart = () => {
        navigate("/cart");
    };

    const handleBuyNow = () => {
        navigate("/cart");
    };

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 1000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className={`${isDarkMode ? 'dark' : ''} min-h-screen w-full bg-[var(--bg-main)] flex flex-col justify-between transition-colors duration-300`}>

            <header className="w-full bg-[var(--bg-surface)] flex flex-col gap-1 shadow-sm shrink-0 border-b border-[var(--border-light)] transition-colors duration-300">
                <Navbar isDarkMode={isDarkMode} onToggleTheme={() => setIsDarkMode(!isDarkMode)} />
            </header>

            <main className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-16 py-6 flex-grow flex flex-col gap-6 justify-center">
                {loading ? (
                    <Loader variant="default" />
                ) : (
                    <>
                        <Breadcrumbs />
                        
                        <div className="w-full flex justify-start">
                            <button
                                onClick={() => navigate("/products")}
                                className="text-xs font-semibold tracking-normal text-[var(--text-muted)] hover:text-[var(--primary)] flex items-center gap-1.5 transition-colors focus:outline-none"
                            >
                                <ArrowLeft className="w-4 h-4" />
                                <span>Back to Listings</span>
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-start h-auto w-full relative">
                            <div className="w-full md:col-span-6 lg:col-span-5 xl:col-span-5 md:sticky md:top-24 max-h-[85vh] overflow-visible z-10">
                                <ProductGallery images={mockProductData.images} />
                            </div>

                            <div className="w-full md:col-span-6 lg:col-span-7 xl:col-span-7 flex flex-col gap-6 border border-[var(--border-light)] bg-[var(--bg-surface)] rounded-2xl p-5 sm:p-8 shadow-sm transition-colors duration-300">
                                <ProductInfo product={mockProductData} />
                                <QuantitySelector quantity={qty} onQuantityChange={setQty} />

                                <div className="flex flex-col sm:flex-row gap-3 w-full pt-2 border-t border-[var(--border-light)]">
                                    <button
                                        onClick={handleAddToCart}
                                        className="flex-grow h-12 bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-[var(--text-on-primary)] rounded-full font-semibold text-sm tracking-wide shadow-md transition-all active:scale-[0.99] flex items-center justify-center gap-2 focus:outline-none"
                                    >
                                        <ShoppingCart className="w-4 h-4" />
                                        <span>Add To Cart</span>
                                    </button>

                                    <button
                                        onClick={handleBuyNow}
                                        className="flex-grow h-12 bg-[var(--bg-surface-hover)] hover:bg-[var(--border-light)] text-[var(--text-main)] rounded-full font-semibold text-sm tracking-wide border border-[var(--border-light)] transition-all active:scale-[0.99] flex items-center justify-center gap-2 focus:outline-none"
                                    >
                                        <ShoppingBag className="w-4 h-4" />
                                        <span>Buy It Now</span>
                                    </button>
                                </div>

                                <div className="text-xs sm:text-sm text-[var(--text-muted)] font-normal border-t border-[var(--border-light)] pt-4 flex flex-col gap-3">
                                    <p className="font-semibold text-[var(--text-main)] tracking-wider text-xs">Product Highlights</p>
                                    <ul className="list-disc pl-4 space-y-1.5 leading-relaxed text-xs sm:text-sm">
                                        <li>Premium handloomed fabric that is soft and breathable.</li>
                                        <li>Pre-shrunk for a perfect long-lasting fit.</li>
                                        <li>Ethically sourced directly from local weavers.</li>
                                        <li>Comfortable inner lining, perfect for all-day wear.</li>
                                    </ul>
                                </div>

                                <div className="mt-2 pt-4 border-t border-[var(--border-light)]">
                                    <VendorInfo vendor={mockProductData.vendor} />
                                </div>
                            </div>
                        </div>

                        <div className="w-full">
                            <SimilarProducts />
                        </div>
                    </>
                )}
            </main>

            <Footer />
        </div>
    );
}