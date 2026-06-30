import React from 'react';
import { CreditCard } from 'lucide-react';

export default function InvoiceCard({ financials, paymentMethod, labels }) {
    return (
        <div className="w-full bg-[var(--bg-surface)] border border-[var(--border-light)] rounded-2xl p-5 sm:p-6 flex flex-col gap-3 shadow-sm text-left">
            <h3 className="text-xs font-bold uppercase font-mono tracking-wider text-[var(--text-muted)] flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-[var(--primary)]" />
                <span>{labels.financialsHeader}</span>
            </h3>

            <div className="flex flex-col gap-2 border-b border-[var(--border-light)]/60 pb-3 text-xs font-medium text-[var(--text-muted)] font-mono mt-1">
                <div className="flex justify-between"><span>Subtotal Feed</span><span className="text-[var(--text-main)]">{financials.subtotal}</span></div>
                <div className="flex justify-between"><span>Gateway Handling Split</span><span className="text-[var(--text-main)]">{financials.gatewayTax}</span></div>
                <div className="flex justify-between"><span>Fulfillment Transit Fee</span><span className="text-[var(--text-main)]">{financials.shipmentFee}</span></div>
            </div>

            <div className="flex justify-between items-center text-sm font-black text-stone-950 dark:text-white pt-1">
                <span>{labels.absoluteTotalText}</span>
                <span className="font-mono text-base text-[var(--primary)]">{financials.absoluteTotal}</span>
            </div>

            <span className="text-[9px] text-[var(--text-muted)] uppercase tracking-wide font-mono mt-3 text-center block border border-dashed border-[var(--border-light)] py-2 rounded-xl bg-[var(--bg-main)]/50">
                {labels.verificationText} : <span className="font-sans font-bold text-stone-950 dark:text-white">{paymentMethod}</span>
            </span>
        </div>
    );
}