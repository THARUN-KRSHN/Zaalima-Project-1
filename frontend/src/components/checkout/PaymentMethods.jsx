import React from 'react';
import { ShieldCheck, CreditCard, Banknote, Landmark } from 'lucide-react';

export default function PaymentMethods({ selectedMethod, onMethodChange }) {

    const options = [
        { id: 'razorpay', label: 'Razorpay / UPI', desc: 'Pay instantly via UPI links, Netbanking, or Wallets.', icon: Landmark },
        { id: 'card', label: 'Credit / Debit Card', desc: 'Secure processing using Visa, Mastercard, or RuPay.', icon: CreditCard },
        { id: 'cod', label: 'Cash On Delivery', desc: 'Hand cash over directly at your doorstep during delivery.', icon: Banknote }
    ];

    return (
        <div className="p-5 sm:p-6 rounded-2xl border border-[var(--border-light)] bg-[var(--bg-surface)] shadow-sm text-left flex flex-col gap-4 transition-colors duration-300 w-full select-none">
            <div className="flex items-center justify-between border-b border-[var(--border-light)] pb-2.5">
                <h3 className="text-base font-bold text-[#1a191e] dark:text-[#f4f5f7] tracking-tight">
                    Select Payment Method
                </h3>
                <div className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 text-[11px] font-bold uppercase tracking-wider">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Secure Gateway</span>
                </div>
            </div>

            <div className="flex flex-col gap-3 w-full">
                {options.map((option) => {
                    const isSelected = selectedMethod === option.id;
                    const Icon = option.icon;

                    return (
                        <label
                            key={option.id}
                            onClick={() => onMethodChange && onMethodChange(option.id)}
                            className={`p-4 rounded-xl border-2 flex items-start gap-3.5 cursor-pointer transition-all duration-200
                                ${isSelected
                                    ? 'border-[var(--primary)] bg-[var(--primary-muted)]/10 shadow-sm'
                                    : 'border-[var(--border-light)] bg-[var(--bg-main)] hover:bg-[var(--bg-surface-hover)]'
                                }`}
                        >
                            {/* Styled Custom Circular Radio Input Indicator */}
                            <div className={`w-5 h-5 rounded-full border-2 shrink-0 flex items-center justify-center mt-0.5 transition-all
                                ${isSelected ? 'border-[var(--primary)]' : 'border-[var(--text-muted)]'}`}
                            >
                                {isSelected && (
                                    <div className="w-2.5 h-2.5 rounded-full bg-[var(--primary)] animate-in zoom-in-50 duration-150" />
                                )}
                            </div>

                            {/* Option Vector Identity Label Icons */}
                            <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border transition-colors
                                ${isSelected ? 'bg-[var(--bg-surface)] border-[var(--primary)] text-[var(--primary)]' : 'bg-[var(--bg-surface)] border-[var(--border-light)] text-[var(--text-muted)]'}`}
                            >
                                <Icon className="w-5 h-5 stroke-[1.75]" />
                            </div>

                            {/* Descriptive Copy Stack */}
                            <div className="flex flex-col gap-0.5 text-left">
                                <span className={`text-sm font-bold tracking-tight ${isSelected ? 'text-[var(--primary)]' : 'text-[var(--text-main)]'}`}>
                                    {option.label}
                                </span>
                                <span className="text-xs text-[var(--text-muted)] leading-normal">
                                    {option.desc}
                                </span>
                            </div>
                        </label>
                    );
                })}
            </div>
        </div>
    );
}