import React from 'react';
import { Sparkles } from 'lucide-react';

export default function AuthLayout({ children }) {
    return (
        <div className="min-h-screen w-full bg-[var(--bg-main)] flex items-stretch text-left select-none overflow-x-hidden selection:bg-[var(--primary)] selection:text-[var(--text-on-primary)] animate-in fade-in duration-300">

            {/* 🎨 LEFT HALF: PLATFORM IDENTITY & ILLUSTRATION PANEL 
                - Locked entirely out of sight on narrow mobile viewports
                - Shifts seamlessly into a fluid 12-column layout grid weight share on desktop layout widths */}
            <div className="hidden lg:flex lg:w-[45%] xl:w-[40%] bg-stone-900 relative flex-col justify-between p-12 overflow-hidden shrink-0 border-r border-stone-800">

                {/* Visual Identity Ambient Mesh Glow Backdrop Backgrounds */}
                <div className="absolute top-[-20%] left-[-20%] w-[80%] h-[60%] bg-purple-600/20 blur-[120px] rounded-full pointer-events-none" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[70%] h-[50%] bg-blue-600/10 blur-[100px] rounded-full pointer-events-none" />

                {/* 1. Header Workspace Branding Node */}
                <div className="flex items-center gap-3 relative z-10">
                    <div className="w-9 h-9 rounded-full bg-[var(--primary)] flex items-center justify-center text-[var(--text-on-primary)] shadow-md">
                        <Sparkles className="w-4.5 h-4.5 fill-current" />
                    </div>
                    <span className="text-lg font-extrabold tracking-tight text-white">
                        Z<span className="italic font-normal font-serif text-[var(--primary)]">market</span>
                    </span>
                </div>

                {/* 2. Abstract Conceptual Graphic Showcase Element */}
                <div className="flex flex-col gap-4 relative z-10 my-auto max-w-sm">
                    <div className="w-fit px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold text-[var(--primary)] uppercase tracking-widest backdrop-blur-md">
                        Premium Operations Portal
                    </div>
                    <h1 className="text-3xl xl:text-4xl font-extrabold text-white tracking-tight leading-tight">
                        Empowering Next-Gen Digital Commerce.
                    </h1>
                    <p className="text-xs text-stone-400 leading-relaxed font-medium opacity-90">
                        Access real-time merchant metrics logs, optimize automated fulfillment loops, and monitor store dispatches fluidly through an integrated platform.
                    </p>
                </div>

                {/* 3. Subtle System Footer Versioning Index Tag */}
                <div className="text-[11px] font-bold text-stone-500 tracking-wider uppercase select-none relative z-10">
                    V1.0.4 Unified Architecture Node
                </div>

            </div>

            {/* 🔐 RIGHT HALF: INTERACTIVE FORM INPUT CANVAS TERMINAL 
                - Spans full width across mobile screens to maximize focus density
                - Center-aligns the injected form elements container smoothly */}
            <div className="flex-grow flex flex-col justify-between p-6 sm:p-10 md:p-14 min-w-0 bg-[var(--bg-main)]">

                {/* Mobile-Only Header Branding Wrapper (Kept hidden on large screens) */}
                <div className="lg:hidden flex items-center gap-2.5 w-full max-w-md mx-auto pt-2 pb-6 text-left">
                    <div className="w-8 h-8 rounded-full bg-[var(--primary)] flex items-center justify-center text-[var(--text-on-primary)] shadow-sm">
                        <Sparkles className="w-4 h-4 fill-current" />
                    </div>
                    <span className="text-[16px] font-extrabold tracking-tight text-stone-900 dark:text-white">
                        Z<span className="italic font-normal font-serif text-[var(--primary)]">market</span>
                    </span>
                </div>

                {/* Central Form Module Slot Component Wrapper Anchor */}
                <div className="my-auto w-full max-w-md mx-auto py-8">
                    {children}
                </div>

                {/* Unified System Support Footer Mark */}
                <div className="w-full max-w-md mx-auto text-center pt-6 border-t border-[var(--border-light)] lg:border-t-0">
                    <p className="text-[11px] font-semibold text-[var(--text-muted)] tracking-wide">
                        Secure SSL Layer Active Nodes. Need support? <a href="#help" className="text-[var(--primary)] hover:underline font-bold transition-all">Contact Hub</a>
                    </p>
                </div>

            </div>

        </div>
    );
}