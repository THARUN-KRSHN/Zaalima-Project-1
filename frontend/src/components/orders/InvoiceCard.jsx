import React from 'react';
import { CreditCard } from 'lucide-react';

export default function InvoiceCard({ financials, paymentMethod, labels }) {
    return (
        <div className="w-full bg-[var(--bg-surface)] border border-[var(--border-light)] rounded-2xl p-5 sm:p-6 flex flex-col gap-4 shadow-sm text-left">
            <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-100 flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-[var(--primary)]" />
                <span>{labels.financialsHeader}</span>
            </h3>

            <div className="flex flex-col gap-2.5 text-xs text-stone-500 dark:text-stone-400">
                <div className="flex justify-between items-center">
                    <span>Subtotal</span>
                    <span className="font-mono font-medium text-stone-800 dark:text-stone-200">{financials.subtotal}</span>
                </div>
                <div className="flex justify-between items-center">
                    <span>Taxes & Fees</span>
                    <span className="font-mono font-medium text-stone-800 dark:text-stone-200">{financials.gatewayTax}</span>
                </div>
                <div className="flex justify-between items-center">
                    <span>Delivery Fee</span>
                    <span className="font-mono font-medium text-stone-800 dark:text-stone-200">{financials.shipmentFee}</span>
                </div>
            </div>

            <div className="flex justify-between items-center text-sm font-semibold text-stone-900 dark:text-stone-100 pt-3 border-t border-[var(--border-light)]/60">
                <span>{labels.absoluteTotalText}</span>
                <span className="font-mono text-base font-semibold text-[var(--primary)]">{financials.absoluteTotal}</span>
            </div>

            <div className="text-xs text-stone-500 dark:text-stone-400 mt-2 text-center bg-stone-50 dark:bg-stone-900/50 py-2 rounded-xl border border-stone-200/50 dark:border-stone-800/50 font-normal">
                {labels.verificationText}: <span className="font-medium text-stone-800 dark:text-stone-200">{paymentMethod}</span>
            </div>
        </div>
    );
}