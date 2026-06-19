import React from 'react';
import { PackagePlus } from 'lucide-react';

export default function EmptyProducts({ onAddProductSubmit }) {
    return (
        <div className="w-full py-16 sm:py-24 px-4 rounded-2xl border border-dashed border-[var(--border-light)] bg-[var(--bg-surface)] text-center flex flex-col items-center justify-center gap-4 max-w-xl mx-auto animate-in fade-in zoom-in-95 duration-200">
            <div className="w-12 h-12 rounded-xl bg-stone-50 dark:bg-stone-800 text-[var(--text-muted)] flex items-center justify-center border border-[var(--border-light)] shadow-sm">
                <PackagePlus className="w-6 h-6 stroke-[1.5]" />
            </div>

            <div className="flex flex-col gap-1 max-w-xs">
                <h4 className="text-sm font-bold text-stone-900 dark:text-white tracking-tight">
                    No Products Published Yet
                </h4>
                <p className="text-xs text-[var(--text-muted)] leading-relaxed font-normal">
                    Your storefront catalog is currently empty. Add your first item variations to start receiving marketplace traffic.
                </p>
            </div>

            <button
                type="button"
                onClick={onAddProductSubmit}
                className="mt-2 bg-[var(--primary)] text-[var(--text-on-primary)] px-5 h-10 rounded-xl text-xs font-bold tracking-wide shadow-sm hover:bg-[var(--primary-hover)] transition-all active:scale-[0.98] focus:outline-none cursor-pointer"
            >
                Add First Product
            </button>
        </div>
    );
}