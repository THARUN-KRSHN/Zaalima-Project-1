import React from 'react';
import { ClipboardX } from 'lucide-react';

export default function EmptyOrders() {
    return (
        <div className="w-full py-16 sm:py-24 px-4 text-center flex flex-col items-center justify-center gap-4 max-w-xl mx-auto animate-in fade-in zoom-in-95 duration-200">
            <div className="w-12 h-12 rounded-xl bg-stone-50 dark:bg-stone-800 text-[var(--text-muted)] flex items-center justify-center border border-[var(--border-light)] shadow-sm">
                <ClipboardX className="w-6 h-6 stroke-[1.5]" />
            </div>

            <div className="flex flex-col gap-1 max-w-xs">
                <h4 className="text-sm font-bold text-stone-900 dark:text-white tracking-tight">
                    No Transaction Ledger Logs
                </h4>
                <p className="text-xs text-[var(--text-muted)] leading-relaxed font-normal">
                    We couldn't find any recent purchases bound to your merchant identifier node across logistics hubs.
                </p>
            </div>
        </div>
    );
}