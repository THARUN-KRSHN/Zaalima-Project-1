import React from 'react';
import { Store, MessageSquare, Star } from 'lucide-react';

export default function VendorInfo({ vendor = {} }) {
    const {
        storeName = "Independent Merchant Hub",
        name = "Platform Vendor",
        rating = 4.5
    } = vendor;

    return (
        <div className="p-4 sm:p-5 rounded-2xl border border-[var(--border-light)] bg-[var(--bg-surface)] hover:bg-[var(--bg-surface-hover)] shadow-sm text-left flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 transition-all duration-300 w-full">
            <div className="flex items-start gap-3.5">
                {/* Store Icon Badge Component */}
                <div className="w-10 h-10 rounded-xl bg-[var(--primary-muted)] text-[var(--primary)] flex items-center justify-center shrink-0 shadow-sm">
                    <Store className="w-5 h-5" />
                </div>

                {/* Store Metadata Layout */}
                <div className="flex flex-col gap-0.5">
                    <h3 className="font-bold text-sm sm:text-base text-[var(--text-main)] tracking-tight">
                        {storeName}
                    </h3>
                    <p className="text-xs text-[var(--text-muted)]">
                        Merchant Partner: <span className="font-medium text-[var(--text-main)]">{name}</span>
                    </p>

                    {/* Floating Star Vector Alignment */}
                    <div className="flex items-center gap-1 mt-1 text-amber-500 text-xs font-bold">
                        <Star className="w-3.5 h-3.5 fill-current" />
                        <span>{rating} Vendor Rating</span>
                    </div>
                </div>
            </div>

            {/* Modular Action Link Trigger */}
            <button className="flex items-center justify-center gap-2 px-4 py-2 border border-[var(--border-light)] hover:border-[var(--primary)] text-[var(--text-main)] hover:text-[var(--primary)] text-xs font-medium rounded-full transition-all focus:outline-none bg-[var(--bg-surface)] shadow-sm hover:shadow active:scale-[0.98]">
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Contact Vendor</span>
            </button>
        </div>
    );
}