import React, { useState } from 'react';
import { ShoppingCart, ShoppingBag, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// --- PLATFORM INTERIOR LAYOUTS ---
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';

// --- REUSABLE PRODUCT ATOMS ---
import ProductGallery from '../../components/product/ProductGallery';
import ProductInfo from '../../components/product/ProductInfo';
import QuantitySelector from '../../components/product/QuantitySelector';
import VendorInfo from '../../components/product/VendorInfo';
import SimilarProducts from '../../components/product/SimilarProducts';

export default function ProductDetails() {
    const navigate = useNavigate();
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [qty, setQty] = useState(1);

    const mockProductData = {
        title: "Anarkali Kurta Set",
        category: "Fashion",
        price: 898,
        description: "Experience premium refinement with this traditional handwoven Viscose Rayon Anarkali Kurta. Complete luxury package includes custom matching comfort-stitched Palazzo pants alongside an embellished premium matching dupatta block set designed for modern elegance. The premium look fabric offers optimal stretch tracking parameters while remaining structurally breathable over long wear framing cycles.",
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

    return (
        <div className={`${isDarkMode ? 'dark' : ''} min-h-screen w-full bg-[var(--bg-main)] flex flex-col justify-between transition-colors duration-300`}>

            {/* MAIN HEADER NAVIGATION TRACK */}
            <header className="w-full bg-[var(--bg-surface)] flex flex-col gap-1 shadow-sm shrink-0 border-b border-[var(--border-light)] transition-colors duration-300">
                <Navbar isDarkMode={isDarkMode} onToggleTheme={() => setIsDarkMode(!isDarkMode)} />
            </header>

            {/* CENTRAL WORKSPACE STAGE */}
            <main className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-16 py-6 flex-grow flex flex-col gap-6">

                {/* Back Link Row */}
                <div className="w-full flex justify-start">
                    <button onClick={() => navigate('/products')} className="text-xs font-semibold tracking-wide uppercase text-[var(--text-muted)] hover:text-[var(--primary)] flex items-center gap-1.5 transition-colors focus:outline-none">
                        <ArrowLeft className="w-4 h-4" />
                        <span>Back to Listings</span>
                    </button>
                </div>

                {/* 🌟 FIXED SCROLL MATRIX STAGE: items-start + h-auto prevents rows from inflating each other's height */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-start h-auto w-full relative">

                    {/* 🌟 ISOLATED FIXED LEFT COLUMN STICKY TRACKER */}
                    <div className="w-full md:col-span-6 lg:col-span-5 xl:col-span-5 md:sticky md:top-24 max-h-[85vh] overflow-visible z-10">
                        <ProductGallery images={mockProductData.images} />
                    </div>

                    {/* RIGHT HALF SCROLLING TRACK: Flows upward smoothly */}
                    <div className="w-full md:col-span-6 lg:col-span-7 xl:col-span-7 flex flex-col gap-6 border border-[var(--border-light)] bg-[var(--bg-surface)] rounded-2xl p-5 sm:p-8 shadow-sm transition-colors duration-300">

                        {/* 1. Core Metadata Title & Pricing */}
                        <ProductInfo product={mockProductData} />

                        {/* 2. Quantity Capsule Adjustment Controller */}
                        <QuantitySelector quantity={qty} onQuantityChange={setQty} />

                        {/* 3. Primary Purchase Action Triggers */}
                        <div className="flex flex-col sm:flex-row gap-3 w-full pt-2 border-t border-[var(--border-light)]">
                            <button className="flex-grow h-12 bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-[var(--text-on-primary)] rounded-full font-semibold text-sm tracking-wide shadow-md transition-all active:scale-[0.99] flex items-center justify-center gap-2 focus:outline-none">
                                <ShoppingCart className="w-4 h-4" />
                                <span>Add To Cart</span>
                            </button>

                            <button className="flex-grow h-12 bg-[var(--bg-surface-hover)] hover:bg-[var(--border-light)] text-[var(--text-main)] rounded-full font-semibold text-sm tracking-wide border border-[var(--border-light)] transition-all active:scale-[0.99] flex items-center justify-center gap-2 focus:outline-none">
                                <ShoppingBag className="w-4 h-4" />
                                <span>Buy It Now</span>
                            </button>
                        </div>

                        {/* Product Highlights Section */}


                        {/* 4. Vendor Metadata Card Block */}
                        <div className="mt-2 pt-4 border-t border-[var(--border-light)]">
                            <VendorInfo vendor={mockProductData.vendor} />
                        </div>
                    </div>

                </div>

                {/* Similar Recommendations Grid shelf */}
                <SimilarProducts />
            </main>

            <Footer />
        </div>
    );
}