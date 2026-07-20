import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Sparkles, ArrowRight, Store, ShoppingBag, Terminal,
    ArrowUpRight, ShieldCheck, Layers, Eye, Heart, BarChart3
} from 'lucide-react';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';
import { allProducts } from '../../data/products';
import { getProducts } from '../../services/productService';

export default function Home({ isDarkMode, onToggleTheme }) {
    const navigate = useNavigate();
    const [productsList, setProductsList] = useState(allProducts);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getProducts();
                if (data && data.success && data.products && data.products.length > 0) {
                    setProductsList(data.products);
                }
            } catch (error) {
                console.warn("Failed to fetch products for home page, utilizing local data source:", error.message);
            }
        };
        fetchProducts();
    }, []);

    const marqueeTexts = [
        "480+ VERIFIED MERCHANT NODES", "REAL-TIME PARCEL TRACKING ACTIVE",
        "SECURE SSL PAYMENT LAYER LINKED", "99.98% GATEWAY CORE UPTIME",
        "ISOLATED TENANT STORAGE PROVISIONED", "INTEGRATED RAZORPAY PIPELINES"
    ];

    return (
        <div className="w-full min-h-screen bg-[var(--bg-main)] text-[var(--text-main)] transition-colors duration-300 flex flex-col items-center overflow-x-hidden select-none font-sans antialiased text-left selection:bg-[var(--primary)] selection:text-[var(--text-on-primary)]">

            <Navbar isDarkMode={isDarkMode} onToggleTheme={onToggleTheme} />

            {/* ==========================================
                1. CINEMATIC SYSTEM HERO SECTION
                ========================================== */}
            <header className="w-full max-w-[1440px] px-6 sm:px-10 lg:px-16 pt-16 lg:pt-24 pb-12 text-center relative flex flex-col items-center justify-center">
                {/* Clean, ambient primary layer background mesh */}
                <div className="absolute top-[-5%] left-1/2 -translate-x-1/2 w-[70%] h-[380px] bg-[var(--primary)]/5 blur-[120px] rounded-full pointer-events-none" />

                <div className="flex flex-col items-center gap-6 max-w-4xl relative z-10 animate-in fade-in duration-700">
                    <span className="text-xs font-mono tracking-widest text-[var(--primary)] font-bold uppercase">
                        // architecture specification node v1.0.4
                    </span>

                    <h1 className="text-4xl sm:text-6xl lg:text-8xl font-black tracking-tight text-stone-950 dark:text-white leading-[0.92]">
                        Every component. <br />
                        <span className="underline decoration-[var(--primary)] decoration-wavy decoration-2 underline-offset-8">
                            Considered.
                        </span>
                    </h1>

                    <p className="text-xs sm:text-sm md:text-base text-[var(--text-muted)] max-w-2xl font-medium leading-relaxed mt-4">
                        Zmarket sequences containerized multi-tenancy loops securely beneath premium, high-conversion consumer interfaces. Scale distinct digital stores or deploy distributed listings seamlessly.
                    </p>

                    <div className="flex items-center gap-4 mt-6">
                        <button
                            onClick={() => navigate('?auth=register')}
                            className="h-12 px-8 bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-[var(--text-on-primary)] font-bold text-xs tracking-wider uppercase rounded-xl transition-all active:scale-[0.98] flex items-center justify-center gap-2 group cursor-pointer focus:outline-none shadow-md"
                        >
                            <span>Deploy Active Tenant</span>
                            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                        </button>
                    </div>
                </div>
            </header>

            {/* ==========================================
                2. RUNNING PIPELINE DATA TELEMETRY MARQUEE
                ========================================== */}
            <section className="w-full bg-stone-950 text-stone-400 py-3.5 border-t border-b border-stone-800 dark:border-stone-900 flex items-center overflow-hidden font-mono text-[10px] tracking-widest font-bold uppercase select-none">
                <div className="flex gap-20 shrink-0 whitespace-nowrap animate-marquee">
                    {[...marqueeTexts, ...marqueeTexts].map((text, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                            <span className="w-1.5 h-1.5 bg-[var(--primary)] rounded-full" />
                            <span className="text-stone-300">{text}</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* ==========================================
                3. RECENT ACTIVITY CONTAINER INTERCEPT (Ref: Screenshot 2026-06-25 153324.jpg)
                ========================================== */}
            <section className="w-full max-w-[1440px] px-6 sm:px-10 lg:px-16 py-12 flex flex-col gap-6">

                {/* Refined Minimalist Context Card using Platform Primary Accentuation */}
                <div className="w-full bg-[var(--bg-surface)] border border-[var(--border-light)] rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-[var(--shadow-sm)]">
                    <div className="flex flex-col gap-0.5">
                        <h3 className="text-xl sm:text-2xl font-black tracking-tight text-stone-950 dark:text-white">Tharun, still looking for these?</h3>
                        <p className="text-xs font-medium text-[var(--text-muted)] font-sans leading-relaxed">Assembled directly from your active session logs, store profiles, and pipeline traces.</p>
                    </div>
                    <button onClick={() => navigate('/products')} className="w-fit h-10 px-5 bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-[var(--text-on-primary)] text-xs font-bold uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 shrink-0 focus:outline-none cursor-pointer shadow-sm">
                        <span>Continue Search</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                </div>

                {/* Grid Deck */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
                    {productsList.slice(0, 4).map((product) => (
                        <div
                            key={product.id}
                            onClick={() => navigate(`/products/${product.id}`)}
                            className="bg-[var(--bg-surface)] border border-[var(--border-light)] rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 flex flex-col group cursor-pointer"
                        >
                            <div className="w-full aspect-square bg-stone-50 dark:bg-stone-900/40 flex items-center justify-center relative overflow-hidden group-hover:scale-[1.01] transition-transform duration-300">
                                {product.tag && (
                                    <span className="absolute top-4 left-4 px-2.5 py-0.5 bg-[var(--primary)] text-[var(--text-on-primary)] rounded-md text-[9px] font-mono tracking-wider uppercase font-bold shadow-sm z-10">{product.tag}</span>
                                )}
                                <img src={product.image} alt={product.title} className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300" />
                            </div>
                            <div className="p-5 flex flex-col justify-between flex-grow gap-2">
                                <div className="flex flex-col gap-0.5 text-left">
                                    <span className="text-[10px] font-bold text-[var(--text-muted)] tracking-wider font-mono uppercase">{product.brand}</span>
                                    <h4 className="text-sm font-extrabold text-stone-950 dark:text-white tracking-tight line-clamp-1 group-hover:text-[var(--primary)] transition-colors">{product.title}</h4>
                                </div>
                                <div className="flex items-center justify-between pt-2 border-t border-[var(--border-light)] mt-1">
                                    <span className="font-bold text-stone-900 dark:text-white font-mono text-sm">₹{product.price?.toLocaleString()}</span>
                                    <span className="text-[10px] font-bold text-[var(--text-muted)] font-mono">★ {product.rating || '4.5'}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ==========================================
                4. MINIMALIST TRIPLE METRIC STATEMENT BOARD (Ref: Screenshot 2026-06-25 153402.jpg)
                ========================================== */}
            <section className="w-full max-w-[1280px] px-6 py-16 flex flex-col lg:flex-row gap-12 lg:items-start justify-between">

                <div className="w-full lg:w-[35%] flex flex-col gap-3 lg:sticky lg:top-24">
                    <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-[var(--primary)]">// architectural value</span>
                    <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-[1.05] text-stone-950 dark:text-white">Three things nobody else does.</h2>
                    <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed font-medium">Most e-commerce systems require heavy, segregated cloud layer pipelines. Zmarket consolidates it right inside the core model stack.</p>
                </div>

                <div className="w-full lg:w-[58%] flex flex-col gap-5">

                    {/* Feature Card 1 */}
                    <div className="p-8 bg-[var(--bg-surface)] border border-[var(--border-light)] rounded-2xl flex flex-col sm:flex-row items-start gap-6 shadow-sm group transition-all">
                        <div className="w-11 h-11 rounded-xl bg-[var(--primary)] text-[var(--text-on-primary)] flex items-center justify-center shrink-0 shadow-sm"><Layers className="w-5 h-5" /></div>
                        <div className="flex flex-col gap-1">
                            <h4 className="text-base font-extrabold text-stone-950 dark:text-white group-hover:text-[var(--primary)] transition-colors">Isolated Multi-Tenant Bounding</h4>
                            <p className="text-xs text-[var(--text-muted)] leading-relaxed font-medium">We partition incoming merchant workspace vectors into logically separate database nodes, securing transactions entirely.</p>
                        </div>
                    </div>

                    {/* Feature Card 2 */}
                    <div className="p-8 bg-[var(--bg-surface)] border border-[var(--border-light)] rounded-2xl flex flex-col sm:flex-row items-start gap-6 shadow-sm group transition-all">
                        <div className="w-11 h-11 rounded-xl bg-[var(--primary)] text-[var(--text-on-primary)] flex items-center justify-center shrink-0 shadow-sm"><Terminal className="w-5 h-5" /></div>
                        <div className="flex flex-col gap-1">
                            <h4 className="text-base font-extrabold text-stone-950 dark:text-white group-hover:text-[var(--primary)] transition-colors">Instant Sync Index Engine</h4>
                            <p className="text-xs text-[var(--text-muted)] leading-relaxed font-medium">Stock modifications executed in back-office vendor grids propagate directly to client-facing catalogs in real-time.</p>
                        </div>
                    </div>

                    {/* Feature Card 3 */}
                    <div className="p-8 bg-[var(--bg-surface)] border border-[var(--border-light)] rounded-2xl flex flex-col sm:flex-row items-start gap-6 shadow-sm group transition-all">
                        <div className="w-11 h-11 rounded-xl bg-[var(--primary)] text-[var(--text-on-primary)] flex items-center justify-center shrink-0 shadow-sm"><ShieldCheck className="w-5 h-5" /></div>
                        <div className="flex flex-col gap-1">
                            <h4 className="text-base font-extrabold text-stone-950 dark:text-white group-hover:text-[var(--primary)] transition-colors">Unified Checkout Merging</h4>
                            <p className="text-xs text-[var(--text-muted)] leading-relaxed font-medium">Allow consumers to purchase goods across completely separate stores concurrently within a single payment dispatch record loop.</p>
                        </div>
                    </div>

                </div>
            </section>

            {/* ==========================================
                5. HIGH DENSITY DISTRIBUTED PRODUCTS DECK
                ========================================== */}
            <section className="w-full max-w-[1440px] px-6 sm:px-10 lg:px-16 py-12 flex flex-col gap-6 text-left">
                <div className="flex flex-col">
                    <span className="text-[10px] font-mono font-bold tracking-widest text-[var(--primary)] uppercase">// multi-vendor matrix feeds</span>
                    <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-stone-950 dark:text-white mt-0.5">Explore Global Catalog Directory</h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
                    {productsList.map((product) => (
                        <div
                            key={product.id}
                            onClick={() => navigate(`/products/${product.id}`)}
                            className="bg-[var(--bg-surface)] border border-[var(--border-light)] rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-150 flex flex-col group cursor-pointer"
                        >
                            <div className="w-full aspect-[4/3] bg-stone-50 dark:bg-stone-900/20 flex items-center justify-center group-hover:scale-[1.01] transition-transform duration-200 overflow-hidden">
                                <img src={product.image} alt={product.title} className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-200" />
                            </div>
                            <div className="p-4 flex flex-col gap-2 justify-between flex-grow">
                                <div className="flex flex-col gap-0.5 text-left">
                                    <div className="flex items-center justify-between w-full text-[9px] font-mono uppercase font-bold tracking-wide text-[var(--text-muted)]">
                                        <span>{product.brand}</span>
                                        <span className="text-[var(--primary)]">{product.category}</span>
                                    </div>
                                    <h4 className="text-xs sm:text-sm font-extrabold text-stone-950 dark:text-white tracking-tight line-clamp-1 mt-0.5 group-hover:text-[var(--primary)] transition-colors">{product.title}</h4>
                                </div>
                                <div className="flex items-center justify-between pt-2 border-t border-[var(--border-light)] mt-1 font-sans">
                                    <span className="font-bold text-stone-900 dark:text-white font-mono">₹{product.price?.toLocaleString()}</span>
                                    <span className="text-[10px] font-bold text-[var(--text-muted)] font-mono">★ {product.rating || '4.5'}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ==========================================
                6. TIMELINE VELOCITY BENCHMARK LOGS (Ref: Screenshot 2026-06-25 153419.jpg)
                ========================================== */}
            <section className="w-full max-w-[960px] px-6 py-20 text-center flex flex-col items-center gap-14">
                <div className="flex flex-col gap-1.5 max-w-md mx-auto">
                    <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-stone-950 dark:text-white">Set up in under a minute.</h2>
                    <p className="text-xs text-[var(--text-muted)] font-medium leading-relaxed">Three quick technical loops from initial configuration parameters to active deployment.</p>
                </div>

                <div className="flex flex-col md:flex-row items-stretch justify-between gap-10 w-full text-left font-sans">
                    <div className="flex-1 flex flex-col gap-3 p-2 border-l-2 border-[var(--primary)] pl-6">
                        <span className="text-xs font-mono font-bold text-[var(--text-muted)]">01</span>
                        <h4 className="text-base font-extrabold text-stone-950 dark:text-white tracking-tight">Deploy Tenant Space</h4>
                        <p className="text-xs text-[var(--text-muted)] leading-relaxed font-medium">Submit credentials to instantly launch your containerized business dashboard environment.</p>
                    </div>
                    <div className="flex-1 flex flex-col gap-3 p-2 border-l-2 border-[var(--primary)] pl-6">
                        <span className="text-xs font-mono font-bold text-[var(--text-muted)]">02</span>
                        <h4 className="text-base font-extrabold text-stone-950 dark:text-white tracking-tight">Sync Active Stocks</h4>
                        <p className="text-xs text-[var(--text-muted)] leading-relaxed font-medium">Inject your inventory criteria directly onto edge nodes for instantaneous marketplace visibility.</p>
                    </div>
                    <div className="flex-1 flex flex-col gap-3 p-2 border-l-2 border-[var(--primary)] pl-6">
                        <span className="text-xs font-mono font-bold text-[var(--text-muted)]">03</span>
                        <h4 className="text-base font-extrabold text-stone-950 dark:text-white tracking-tight">Settle Revenue Rails</h4>
                        <p className="text-xs text-[var(--text-muted)] leading-relaxed font-medium">Incoming multi-vendor orders execute transparently, routing calculating profits to your ledger assets.</p>
                    </div>
                </div>
            </section>

            <Footer />

        </div>
    );
}