import React from 'react';
import { Check } from 'lucide-react';

export default function CheckoutStepper({ currentStep = 2 }) {
    const steps = [
        { id: 1, label: 'Cart' },
        { id: 2, label: 'Checkout' },
        { id: 3, label: 'Success' }
    ];

    return (
        <div className="w-full max-w-xl mx-auto py-4 px-2 select-none">
            <div className="flex items-center justify-between relative w-full">

                {/* Background Connecting Progress Rail Line */}
                <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-[var(--border-light)] -translate-y-1/2 z-0" />

                {/* Dynamic Filled Active Progress Accent Tracker */}
                <div
                    className="absolute top-1/2 left-0 h-[2px] bg-[var(--primary)] -translate-y-1/2 z-0 transition-all duration-500 ease-in-out"
                    style={{ width: `${currentStep === 1 ? '0%' : currentStep === 2 ? '50%' : '100%'}` }}
                />

                {steps.map((step) => {
                    const isCompleted = currentStep > step.id;
                    const isActive = currentStep === step.id;

                    return (
                        <div key={step.id} className="flex flex-col items-center relative z-10">
                            {/* Visual Rounded Node Circle */}
                            <div className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center font-bold text-xs border-2 transition-all duration-300
                                ${isCompleted
                                    ? 'bg-[var(--primary)] border-[var(--primary)] text-[var(--text-on-primary)]'
                                    : isActive
                                        ? 'bg-[var(--bg-surface)] border-[var(--primary)] text-[var(--primary)] shadow-sm scale-105'
                                        : 'bg-[var(--bg-surface)] border-[var(--border-light)] text-[var(--text-muted)]'
                                }`}
                            >
                                {isCompleted ? (
                                    <Check className="w-4 h-4 stroke-[3]" />
                                ) : (
                                    <span>{step.id}</span>
                                )}
                            </div>

                            {/* Text label underneath */}
                            <span className={`text-[11px] sm:text-xs font-bold tracking-wide uppercase mt-1.5 transition-colors
                                ${isActive ? 'text-[var(--primary)]' : 'text-[var(--text-muted)]'}`}
                            >
                                {step.label}
                            </span>
                        </div>
                    );
                })}

            </div>
        </div>
    );
}