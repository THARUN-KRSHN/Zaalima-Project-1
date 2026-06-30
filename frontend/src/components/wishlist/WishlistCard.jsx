import React from 'react';
import { ShoppingCart, Trash2 } from 'lucide-react';

export default function WishlistCard({ item, onRemove, onMoveToCart, labels }) {
    return (
        <div className="bg-[var(--bg-surface)] border border-[var(--border-light)] rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col group relative">

            {/* Graphic Container */}
            <div className="w-full aspect-[4/3] bg-stone-50 dark:bg-stone-900/20 flex items-center justify-center text-5xl relative select-none">
                <span className={`absolute top-4 left-4 px-2 py-0.5 rounded-md text-[9px] font-mono font-bold uppercase tracking-wider border
                    ${item.inStock
                        ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/10'
                        : 'bg-stone-500/10 text-stone-500 border-stone-500/10'}`}>
                    {item.inStock ? labels.inStockText : labels.outOfStockText}
                </span>
                {item.graphic}
            </div>

            {/* Meta Data Box */}
            <div className="p-4 flex flex-col gap-3 flex-grow justify-between text-left">
                <div className="flex flex-col gap-0.5 min-w-0">
                    <span className="text-[10px] font-mono uppercase font-bold text-[var(--text-muted)] tracking-wider">
                        {item.storeName}
                    </span>
                    <h4 className="text-sm font-extrabold text-stone-950 dark:text-white tracking-tight line-clamp-1 group-hover:text-[var(--primary)] transition-colors">
                        {item.name}
                    </h4>
                    <span className="text-sm font-black text-stone-950 dark:text-white font-mono mt-1">
                        {item.price}
                    </span>
                </div>

                {/* Grid Conversion Action Toolbar Buttons */}
                <div className="grid grid-cols-5 gap-2 pt-2 border-t border-[var(--border-light)]/40">
                    <button
                        onClick={onMoveToCart}
                        disabled={!item.inStock}
                        className="col-span-4 h-9 bg-[var(--primary)] hover:bg-[var(--primary-hover)] disabled:bg-stone-200 disabled:dark:bg-stone-800 disabled:text-stone-400 text-[var(--text-on-primary)] rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 focus:outline-none transition-colors cursor-pointer disabled:cursor-not-allowed shadow-sm"
                    >
                        <ShoppingCart className="w-3.5 h-3.5" />
                        <span>{labels.moveToCartBtnText}</span>
                    </button>
                    <button
                        onClick={onRemove}
                        className="col-span-1 h-9 bg-transparent border border-rose-500/20 text-rose-500 hover:bg-rose-500/5 rounded-xl flex items-center justify-center focus:outline-none cursor-pointer transition-colors"
                        aria-label={labels.removeBtnText}
                    >
                        <Trash2 className="w-3.5 h-3.5" />
                    </button>
                </div>
            </div>
        </div>
    );
}