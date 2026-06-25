import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Sparkles, Store, ShoppingBag, ShieldCheck, Zap,
    ArrowRight, BarChart3, Layers, Users, Globe, Cpu, Terminal
} from 'lucide-react';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';

export default function Home({ isDarkMode, onToggleTheme }) {
    const navigate = useNavigate();

    return (
        <div className="w-full min-h-screen bg-[var(--bg-main)] text-[var(--text-main)] transition-colors duration-300 flex flex-col items-center overflow-x-hidden selection:bg-[var(--primary)] selection:text-[var(--text-on-primary)]">

            {/* Integrated Dynamic Navigation Header Global Control */}
            <Navbar isDarkMode={isDarkMode} onToggleTheme={onToggleTheme} />

            {/* ==========================================
                1. CINEMATIC HERO: THE ENTERPRISE OVERVIEW
                ========================================== */}
            <header className="w-full max-w-[1440px] px-6 sm:px-10 lg:px-16 pt-16 lg:pt-28 pb-16 text-center relative flex flex-col items-center justify-center">
                {/* Master Ambient Deep Space Radial Mesh Blurs */}
                <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[80%] h-[500px] bg-gradient-to-r from-purple-600/10 via-indigo-500/5 to-transparent blur-[140px] rounded-full pointer-events-none" />

                <div className="flex flex-col items-center gap-6 max-w-5xl relative z-10 animate-in fade-in slide-in-from-top-4 duration-700">
                    {/* Premium Architecture Pill Tag */}
                    <div className="w-fit px-3 py-1 bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-full text-[10px] font-extrabold text-[var(--primary)] uppercase tracking-widest flex items-center gap-2 shadow-sm">
                        <Terminal className="w-3.5 h-3.5" />
                        <span>Next-Generation Multi-Tenant Commerce Engine</span>
                    </div>

                    <h1 className="text-4xl sm:text-6xl lg:text-8xl font-extrabold tracking-tight text-stone-950 dark:text-white leading-[0.95] font-sans">
                        The Infrastructure for <br />
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-[var(--primary)] via-purple-600 to-indigo-500 dark:to-purple-400">
                            Distributed Digital Markets.
                        </span>
                    </h1>

                    <p className="text-xs sm:text-sm md:text-base text-[var(--text-muted)] max-w-3xl font-medium leading-relaxed mt-4">
                        Zmarket orchestrates high-performance marketplace spaces. Spin up fully isolated merchant micro-tenancies instantly, scale unified inventory logistics, and deliver high-conversion designer catalogs across one synchronized digital architecture.
                    </p>

                    {/* High-Conversion SaaS Onboarding Actions */}
                    <div className="flex flex-col sm:flex-row items-center gap-4 mt-6 w-full sm:w-auto">
                        <button
                            onClick={() => navigate('?auth=register')}
                            className="w-full sm:w-auto h-12 px-8 bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-[var(--text-on-primary)] font-bold text-xs tracking-wider uppercase rounded-full shadow-lg transition-all active:scale-[0.98] flex items-center justify-center gap-2 group cursor-pointer focus:outline-none"
                        >
                            <span>Deploy Your Storefront</span>
                            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                        </button>
                        <button
                            onClick={() => navigate('/products')}
                            className="w-full sm:w-auto h-12 px-8 bg-[var(--bg-surface)] hover:bg-[var(--bg-surface-hover)] text-[var(--text-main)] border border-[var(--border-light)] dark:border-stone-800 font-bold text-xs tracking-wider uppercase rounded-full shadow-sm transition-all active:scale-[0.98] flex items-center justify-center gap-2 focus:outline-none cursor-pointer"
                        >
                            <span>Browse live index</span>
                        </button>
                    </div>
                </div>
            </header>

            {/* ==========================================
                2. THE DUAL-PERSPECTIVE INTERACTIVE SPLIT MATRIX
                ========================================== */}
            <section className="w-full max-w-[1280px] px-6 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full">

                    {/* Left: The Merchant Portal Value Loop */}
                    <div className="p-8 sm:p-10 bg-stone-950 text-white rounded-[2rem] border border-stone-800/80 flex flex-col justify-between min-h-[400px] relative overflow-hidden group shadow-xl">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(139,92,246,0.12),transparent_50%)] pointer-events-none" />
                        <div className="flex flex-col gap-4">
                            <div className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 text-[var(--primary)] flex items-center justify-center shadow-inner">
                                <Store className="w-5 h-5" />
                            </div>
                            <div className="flex flex-col gap-2 mt-2">
                                <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight">Built for Operators</h3>
                                <p className="text-xs text-stone-400 font-medium leading-relaxed max-w-sm">
                                    Access specialized merchant control analytics panels, manipulate modular stock matrix feeds, verify incoming orders, and track automated revenue ledger splits inside an ultra-responsive vendor engine.
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={() => navigate('?auth=register_vendor')}
                            className="w-fit h-11 px-5 bg-white/5 border border-white/10 hover:bg-white text-white hover:text-stone-950 font-bold text-xs tracking-wide uppercase rounded-xl transition-all flex items-center gap-2 mt-8 group cursor-pointer focus:outline-none"
                        >
                            <span>Initialize Vendor Suite</span>
                            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                        </button>
                    </div>

                    {/* Right: The Customer Catalog Value Loop */}
                    <div className="p-8 sm:p-10 bg-white dark:bg-stone-900 text-stone-950 dark:text-white rounded-[2rem] border border-stone-200 dark:border-stone-800 flex flex-col justify-between min-h-[400px] relative overflow-hidden group shadow-md hover:shadow-xl transition-all">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.06),transparent_50%)] pointer-events-none" />
                        <div className="flex flex-col gap-4">
                            <div className="w-11 h-11 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 flex items-center justify-center border border-blue-100 dark:border-blue-900/40 shadow-sm">
                                <ShoppingBag className="w-5 h-5" />
                            </div>
                            <div className="flex flex-col gap-2 mt-2">
                                <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight">Built for Consumers</h3>
                                <p className="text-xs text-[var(--text-muted)] font-medium leading-relaxed max-w-sm">
                                    Explore high-fidelity digital department catalogs displaying distributed products from multiple global storefronts. Enjoy integrated single-cart multi-vendor checkouts, dynamic filters, and real-time transit telemetry.
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={() => navigate('/products')}
                            className="w-fit h-11 px-5 bg-stone-900 dark:bg-white hover:bg-[var(--primary)] hover:dark:bg-[var(--primary)] text-white dark:text-stone-950 hover:dark:text-white font-bold text-xs tracking-wide uppercase rounded-xl transition-all flex items-center gap-2 mt-8 group cursor-pointer focus:outline-none"
                        >
                            <span>Enter Public Catalog</span>
                            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                        </button>
                    </div>

                </div>
            </section>

            {/* ==========================================
                3. THE SAAS BENTO ARCHITECTURE MATRIX
                ========================================== */}
            <section className="w-full max-w-[1280px] px-6 py-16 flex flex-col gap-12 text-left">
                <div className="max-w-2xl flex flex-col gap-2">
                    <span className="text-[10px] font-bold text-[var(--primary)] tracking-widest uppercase font-mono">Core Platform Infrastructure Capabilities</span>
                    <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-stone-950 dark:text-white">Engineered for absolute operational scale.</h2>
                    <p className="text-xs sm:text-sm text-[var(--text-muted)] font-medium leading-relaxed">We eliminated the complex engineering barriers of multi-vendor ecosystems. Drop your inventories into a plug-and-play network layer.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
                    {/* Feature 1 */}
                    <div className="p-6 bg-[var(--bg-surface)] border border-[var(--border-light)] dark:border-stone-800/80 rounded-2xl flex flex-col gap-4 shadow-sm group">
                        <div className="w-9 h-9 rounded-xl bg-purple-500/10 text-[var(--primary)] flex items-center justify-center border border-purple-500/10"><Layers className="w-4.5 h-4.5" /></div>
                        <div>
                            <h4 className="text-sm font-extrabold text-stone-950 dark:text-white">Dynamic Multi-Tenancy</h4>
                            <p className="text-[11px] text-[var(--text-muted)] leading-relaxed font-medium mt-1">Every newly registered store is automatically provisioned a logically isolated tenant partition workspace container.</p>
                        </div>
                    </div>
                    {/* Feature 2 */}
                    <div className="p-6 bg-[var(--bg-surface)] border border-[var(--border-light)] dark:border-stone-800/80 rounded-2xl flex flex-col gap-4 shadow-sm group">
                        <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center border border-amber-500/10"><BarChart3 className="w-4.5 h-4.5" /></div>
                        <div>
                            <h4 className="text-sm font-extrabold text-stone-950 dark:text-white">Micro-Ledger Analytics</h4>
                            <p className="text-[11px] text-[var(--text-muted)] leading-relaxed font-medium mt-1">Track store performance profiles via real-time transaction reporting graphs and automated profit metrics.</p>
                        </div>
                    </div>
                    {/* Feature 3 */}
                    <div className="p-6 bg-[var(--bg-surface)] border border-[var(--border-light)] dark:border-stone-800/80 rounded-2xl flex flex-col gap-4 shadow-sm group">
                        <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center border border-emerald-500/10"><ShieldCheck className="w-4.5 h-4.5" /></div>
                        <div>
                            <h4 className="text-sm font-extrabold text-stone-950 dark:text-white">Escrow Payment Rails</h4>
                            <p className="text-[11px] text-[var(--text-muted)] leading-relaxed font-medium mt-1">Integrated with Razorpay pipelines for absolute payment processing security via automated payout distributions.</p>
                        </div>
                    </div>
                    {/* Feature 4 */}
                    <div className="p-6 bg-[var(--bg-surface)] border border-[var(--border-light)] dark:border-stone-800/80 rounded-2xl flex flex-col gap-4 shadow-sm group">
                        <div className="w-9 h-9 rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center border border-blue-500/10"><Zap className="w-4.5 h-4.5" /></div>
                        <div>
                            <h4 className="text-sm font-extrabold text-stone-950 dark:text-white">Instant Sync Index</h4>
                            <p className="text-[11px] text-[var(--text-muted)] leading-relaxed font-medium mt-1">Modifying merchant product inventories propagates across the public customer discovery network within milliseconds.</p>
                        </div>
                    </div>
                    {/* Feature 5 */}
                    <div className="p-6 bg-[var(--bg-surface)] border border-[var(--border-light)] dark:border-stone-800/80 rounded-2xl flex flex-col gap-4 shadow-sm group">
                        <div className="w-9 h-9 rounded-xl bg-rose-500/10 text-rose-600 flex items-center justify-center border border-rose-500/10"><Users className="w-4.5 h-4.5" /></div>
                        <div>
                            <h4 className="text-sm font-extrabold text-stone-950 dark:text-white">Unified Multi-Vendor Cart</h4>
                            <p className="text-[11px] text-[var(--text-muted)] leading-relaxed font-medium mt-1">Buyers purchase items from distinct independent stores simultaneously in one clean consolidated checkout process.</p>
                        </div>
                    </div>
                    {/* Feature 6 */}
                    <div className="p-6 bg-[var(--bg-surface)] border border-[var(--border-light)] dark:border-stone-800/80 rounded-2xl flex flex-col gap-4 shadow-sm group">
                        <div className="w-9 h-9 rounded-xl bg-stone-500/10 text-stone-600 dark:text-stone-400 flex items-center justify-center border border-stone-500/10"><Globe className="w-4.5 h-4.5" /></div>
                        <div>
                            <h4 className="text-sm font-extrabold text-stone-950 dark:text-white">Global Edge Node Delivery</h4>
                            <p className="text-[11px] text-[var(--text-muted)] leading-relaxed font-medium mt-1">Lightweight frontend assets render instantaneously across regional network grids with dynamic system speed caching hooks.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ==========================================
                4. SAAS STEP-BY-STEP OPERATION WORKFLOW
                ========================================== */}
            <section className="w-full bg-stone-950 text-white border-t border-b border-stone-900 py-24 px-6 flex justify-center selection:bg-amber-500 selection:text-black">
                <div className="w-full max-w-[1140px] flex flex-col gap-16">
                    <div className="text-center max-w-xl mx-auto flex flex-col gap-2">
                        <span className="text-[10px] font-bold text-amber-500 tracking-widest uppercase font-mono">Platform Integration Blueprint</span>
                        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">How Zmarket Powers Enterprise</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 w-full text-left relative">
                        <div className="flex flex-col gap-4">
                            <div className="text-4xl font-serif text-white/10 font-bold leading-none">01</div>
                            <h4 className="text-base font-extrabold tracking-tight text-white">Initialize Store Infrastructure</h4>
                            <p className="text-xs text-stone-400 leading-relaxed font-medium">Register under the vendor tier configuration. Enter your branding identity attributes to build an isolated operations framework node layout instantly.</p>
                        </div>
                        <div className="flex flex-col gap-4">
                            <div className="text-4xl font-serif text-white/10 font-bold leading-none">02</div>
                            <h4 className="text-base font-extrabold tracking-tight text-white">Deploy Inventory Pipelines</h4>
                            <p className="text-xs text-stone-400 leading-relaxed font-medium">Inject your store catalog products with explicit custom price models, description variables, and thumbnail images using our asset editor.</p>
                        </div>
                        <div className="flex flex-col gap-4">
                            <div className="text-4xl font-serif text-white/10 font-bold leading-none">03</div>
                            <h4 className="text-base font-extrabold tracking-tight text-white">Capture Autonomous Revenue</h4>
                            <p className="text-xs text-stone-400 leading-relaxed font-medium">As multi-vendor orders clear checkout settlement nodes via the client side catalog, profit matrices split down to your ledger bank networks seamlessly.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ==========================================
                5. PREMIUM CALL TO ACTION PANEL CONVERSION
                ========================================== */}
            <section className="w-full max-w-[1440px] px-6 sm:px-10 lg:px-16 py-24 text-left">
                <div className="w-full bg-gradient-to-br from-purple-900 to-indigo-950 border border-purple-800 rounded-[2.5rem] p-8 sm:p-14 lg:p-20 text-white flex flex-col lg:flex-row items-center justify-between gap-12 relative overflow-hidden shadow-2xl">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(245,158,11,0.08),transparent_50%)] pointer-events-none" />

                    <div className="flex flex-col gap-4 max-w-2xl">
                        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">Ready to orchestrate your business storefront?</h2>
                        <p className="text-xs sm:text-sm text-purple-200 font-medium leading-relaxed opacity-90">Join hundreds of merchants processing secure distributed commerce volume daily. Set up takes less than two minutes with no setup costs.</p>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto shrink-0 relative z-10">
                        <button
                            onClick={() => navigate('?auth=register')}
                            className="w-full sm:w-auto h-13 px-8 bg-white hover:bg-stone-100 text-stone-950 font-extrabold text-xs tracking-wider uppercase rounded-full shadow-md transition-all active:scale-[0.98] cursor-pointer focus:outline-none"
                        >
                            Deploy Live Tenant Now
                        </button>
                    </div>
                </div>
            </section>

            {/* Global Infrastructure Standard Footer Module */}
            <Footer />

        </div>
    );
}