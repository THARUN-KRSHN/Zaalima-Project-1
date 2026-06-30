import React from 'react';
import { Heart, ArrowRight } from 'lucide-react';

export default function EmptyWishlist({ onContinue, labels }) {
    return (
        <div className="w-full py-16 text-center border border-dashed border-[var(--border-light)] rounded-2xl bg-[var(--bg-surface)]/20 flex flex-col items-center justify-center gap-4 animate-in fade-in duration-200">
            <div className="w-12 h-12 rounded-2xl bg-stone-100 dark:bg-stone-900 border border-[var(--border-light)] flex items-center justify-center text-[var(--text-muted)] shadow-inner">
                <Heart className="w-5 h-5" />
            </div>
            <div className="flex flex-col gap-1 max-w-sm mx-auto">
                <h3 className="text-sm font-black text-stone-950 dark:text-white tracking-tight">{labels.emptyHeader}</h3>
                <p className="text-xs text-[var(--text-muted)] font-medium leading-relaxed">{labels.emptyDesc}</p>
            </div>
            <button
                onClick={onContinue}
                className="h-9 px-5 bg-stone-950 dark:bg-white text-white dark:text-stone-950 text-xs font-bold uppercase rounded-xl flex items-center gap-1.5 focus:outline-none cursor-pointer transition-colors mt-2 shadow-sm"
            >
                <span>{labels.continueShoppingText}</span>
                <ArrowRight className="w-3.5 h-3.5" />
            </button>
        </div>
    );
}