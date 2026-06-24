import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, X, ArrowLeft } from 'lucide-react';

export default function AuthLayout({ children }) {
    const navigate = useNavigate();
    const cardRef = useRef(null);

    const handleBackdropClick = (e) => {
        if (cardRef.current && !cardRef.current.contains(e.target)) {
            navigate('/');
        }
    };

    return (
        <div
            onClick={handleBackdropClick}
            className="fixed inset-0 w-full h-full bg-stone-950/30 dark:bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto selection:bg-[var(--primary)] selection:text-[var(--text-on-primary)] animate-in fade-in duration-300"
        >
            {/* Ambient Decorative Backlight Radial Glow Nodes */}
            <div className="absolute top-[15%] left-[20%] w-[35%] h-[25%] bg-purple-600/10 dark:bg-purple-600/5 blur-[120px] rounded-full pointer-events-none" />

            {/* 🌟 THE THEME-RESPONSIVE CENTRAL CARD CONTAINER 
                - Updated width from max-w-md to max-w-md md:max-w-2xl to expand cleanly on tablet profiles.
                - Scales seamlessly up to lg:max-w-4xl for the desktop split view. */}
            <div
                ref={cardRef}
                className="w-full max-w-md md:max-w-2xl lg:max-w-4xl lg:min-h-[560px] bg-[var(--bg-surface)] border border-[var(--border-light)] lg:dark:border-stone-800 rounded-3xl lg:rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col lg:flex-row items-stretch transition-all duration-300 my-auto shrink-0 animate-in zoom-in-95 duration-200"
            >

                {/* FLOATING CLOSE HANDLE TRIGGER BUTTON */}


                {/* 🎨 LEFT COLUMN PANEL BRANDING LAYOUT (Desktop locked dark node theme backdrop) */}
                <div className="hidden lg:flex lg:w-[48%] relative flex-col justify-between p-10 overflow-hidden shrink-0 bg-gradient-to-br from-stone-900 via-stone-950 to-neutral-900 border-r border-stone-200/10">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(139,92,246,0.12),transparent_60%)] pointer-events-none" />

                    <div className="flex items-center gap-2.5 relative z-10">
                        <div className="w-8 h-8 rounded-full bg-[var(--primary)] flex items-center justify-center text-[var(--text-on-primary)] shadow-md">
                            <Sparkles className="w-4 h-4 fill-current" />
                        </div>
                        <span className="text-md font-extrabold tracking-tight text-white">
                            Z<span className="italic font-normal font-serif text-[var(--primary)]">market</span>
                        </span>
                    </div>

                    <div className="flex flex-col gap-3.5 relative z-10 max-w-xs mt-auto mb-auto">
                        <div className="w-fit px-2.5 py-0.5 bg-white/5 border border-white/10 rounded-full text-[9px] font-bold text-[var(--primary)] uppercase tracking-widest backdrop-blur-md">
                            Merchant Portal
                        </div>
                        <h1 className="text-2xl xl:text-3xl font-extrabold text-white tracking-tight leading-tight">
                            Run your online storefront fluidly.
                        </h1>
                        <p className="text-[11px] text-stone-400 leading-relaxed font-medium opacity-80">
                            Monitor micro-ledger transaction updates, fine-tune logistics parameters, and trace client conversion behaviors.
                        </p>
                    </div>

                    <div className="text-[10px] font-bold text-stone-600 tracking-wider uppercase select-none relative z-10">
                        V1.0.4 Premium Deck
                    </div>
                </div>

                {/* 🔐 RIGHT COLUMN PANEL: DYNAMIC INTERACTIVE INPUT FORM WORKSPACE 
                    - Max-width updated inside to map gracefully with the wider tablet envelope container. */}
                <div className="flex-grow flex flex-col justify-between p-6 sm:p-8 lg:p-10 bg-[var(--bg-surface)] text-[var(--text-main)] transition-colors duration-200">

                    {/* Mobile/Tablet Inline Header Tracker Bar */}
                    <div className="lg:hidden flex items-center justify-between w-full max-w-md md:max-w-xl mx-auto pb-4 border-b border-[var(--border-light)] mb-4">
                        <div onClick={() => navigate('/')} className="flex items-center gap-2 cursor-pointer">
                            <div className="w-7 h-7 rounded-full bg-[var(--primary)] flex items-center justify-center text-[var(--text-on-primary)] shadow-sm">
                                <Sparkles className="w-3.5 h-3.5 fill-current" />
                            </div>
                            <span className="text-[15px] font-extrabold tracking-tight text-[var(--text-main)]">
                                Z<span className="italic font-normal font-serif text-[var(--primary)]">market</span>
                            </span>
                        </div>

                        <button
                            onClick={() => navigate('/')}
                            className="text-xs font-bold text-[var(--text-muted)] hover:text-[var(--primary)] flex items-center gap-1 focus:outline-none cursor-pointer"
                        >
                            <ArrowLeft className="w-3.5 h-3.5" />
                            <span>Exit</span>
                        </button>
                    </div>

                    {/* Main Modular Insertion Node Slot Container */}
                    <div className="my-auto w-full max-w-md md:max-w-xl mx-auto py-2 lg:py-4">
                        {children}
                    </div>

                    {/* Footer Attribution Legal Index Tag */}
                    <div className="w-full max-w-md md:max-w-xl mx-auto text-center pt-4 border-t border-[var(--border-light)] lg:border-t-0 opacity-70 mt-4">
                        <p className="text-[10px] sm:text-[11px] font-semibold text-[var(--text-muted)] tracking-wide">
                            Secure SSL Layer Active Nodes. <a href="#help" className="text-[var(--primary)] hover:underline font-bold transition-all">Support Center</a>
                        </p>
                    </div>

                </div>

            </div>
        </div>
    );
}