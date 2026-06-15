import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, ShoppingBag, ClipboardList, Copy, CheckCircle2 } from 'lucide-react';

// --- PLATFORM INTERIOR SHARED LAYOUTS ---
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';

export default function OrderSuccess() {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [orderId, setOrderId] = useState('');
    const [copied, setCopied] = useState(false);
    const navigate = useNavigate();

    // Generate a clean, realistic tracking hash unique to Zmarket multi-vendor dispatches
    useEffect(() => {
        const timestamp = Date.now().toString().slice(-4);
        const randomHex = Math.floor(1000 + Math.random() * 9000);
        setOrderId(`ZMK-${timestamp}-${randomHex}`);
    }, []);

    // Interactive helper allowing users to clipboard copy their order footprint
    const handleCopyId = () => {
        if (!orderId) return;
        navigator.clipboard.writeText(orderId);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className={`${isDarkMode ? 'dark' : ''} min-h-screen w-full bg-[var(--bg-main)] flex flex-col justify-between transition-colors duration-300`}>

            {/* CORE NAVIGATION TRACK */}
            <header className="w-full bg-[var(--bg-surface)] flex flex-col gap-1 shadow-sm shrink-0 border-b border-[var(--border-light)] transition-colors duration-300">
                <Navbar isDarkMode={isDarkMode} onToggleTheme={() => setIsDarkMode(!isDarkMode)} />
            </header>

            {/* ARTISTIC CENTRAL SUCCESS CONTENT CANVAS */}
            <main className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-16 py-12 flex-grow flex items-center justify-center">

                <div className="w-full max-w-md p-6 sm:p-8 rounded-3xl border border-[var(--border-light)] bg-[var(--bg-surface)] shadow-lg text-center flex flex-col items-center gap-6 transition-all duration-300 animate-in fade-in zoom-in-95 duration-500">

                    {/* Animated Ripple Layer Success Indicator Node */}
                    <div className="relative w-20 h-20 bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-500 dark:text-emerald-400 rounded-full flex items-center justify-center shadow-inner">
                        <div className="absolute inset-0 rounded-full bg-emerald-500/5 animate-ping duration-1000" />
                        <Check className="w-10 h-10 stroke-[3] relative z-10 animate-in zoom-in-50 duration-300 delay-150" />
                    </div>

                    {/* Typographic Success Header Stack */}
                    <div className="flex flex-col gap-1.5">
                        <h2 className="text-xl sm:text-2xl font-extrabold text-[#1a191e] dark:text-[#f4f5f7] tracking-tight">
                            Order Placed Successfully!
                        </h2>
                        <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed max-w-xs mx-auto">
                            Thank you for shopping with Zmarket. Your vendor allocations are locked in and preparation streams have initiated.
                        </p>
                    </div>

                    {/* Interactive Order ID Metadata Container Box */}
                    <div className="w-full p-3.5 rounded-2xl border border-[var(--border-light)] bg-[var(--bg-main)] flex items-center justify-between gap-3 group transition-colors">
                        <div className="flex flex-col text-left gap-0.5">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)]">Order Identifier</span>
                            <span className="text-xs sm:text-sm font-mono font-bold text-[var(--text-main)] tracking-wide">
                                {orderId || 'GENERATING...'}
                            </span>
                        </div>

                        <button
                            type="button"
                            onClick={handleCopyId}
                            className={`p-2 rounded-xl border transition-all active:scale-95 focus:outline-none
                                ${copied
                                    ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500'
                                    : 'bg-[var(--bg-surface)] border-[var(--border-light)] text-[var(--text-muted)] hover:text-[var(--text-main)] hover:shadow-sm'
                                }`}
                            title="Copy Order ID to clipboard"
                        >
                            {copied ? <CheckCircle2 className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        </button>
                    </div>

                    {/* Double-Action Split Routing Trackway
                        Stacks vertically on tiny viewports, flexes perfectly as balanced columns on standard screens. */}
                    <div className="flex flex-col sm:flex-row gap-3 w-full pt-4 border-t border-[var(--border-light)] mt-2">

                        {/* Secondary Command Action: Access customer profile order list ledger */}
                        <button
                            type="button"
                            onClick={() => navigate('/orders')}
                            className="flex-grow h-11 px-5 bg-[var(--bg-surface-hover)] hover:bg-[var(--border-light)] text-[var(--text-main)] font-semibold text-xs tracking-wide uppercase rounded-xl border border-[var(--border-light)] active:scale-[0.98] transition-all flex items-center justify-center gap-2 focus:outline-none"
                        >
                            <ClipboardList className="w-4 h-4 text-[var(--text-muted)]" />
                            <span>View Orders</span>
                        </button>

                        {/* Primary Command Action: Jump back to browsing the main marketplace shelf grids */}
                        <button
                            type="button"
                            onClick={() => navigate('/products')}
                            className="flex-grow h-11 px-5 bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-[var(--text-on-primary)] font-bold text-xs tracking-wide uppercase rounded-xl shadow-md active:scale-[0.98] transition-all flex items-center justify-center gap-2 focus:outline-none"
                        >
                            <ShoppingBag className="w-4 h-4" />
                            <span>Continue Shopping</span>
                        </button>

                    </div>

                </div>

            </main>

            {/* BASE PLATFORM FOOTER */}
            <Footer />
        </div>
    );
}