import React from 'react';
import { Check } from 'lucide-react';

export default function CheckoutStepper({ currentStep = 2 }) {
    const steps = [
        { id: 1, label: 'Cart' },
        { id: 2, label: 'Checkout' },
        { id: 3, label: 'Success' }
    ];

    return (
        <div className="w-full max-w-xl mx-auto py-5 px-4 select-none">

            {/* 🌟 STEPPER TRACKWAY CONTAINER */}
            <div className="flex items-center justify-between w-full">
                {steps.map((step, index) => {
                    const isCompleted = currentStep > step.id;
                    const isActive = currentStep === step.id;

                    return (
                        <React.Fragment key={step.id}>
                            {/* NODE ELEMENT */}
                            <div className="flex flex-col items-center relative">

                                {/* Refined Node Circle Indicator */}
                                <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm border transition-all duration-200 shrink-0 relative z-10
                                    ${isCompleted
                                        ? 'bg-blue-50 border-blue-500 text-blue-600 dark:bg-blue-950/40 dark:border-blue-400 dark:text-blue-400'
                                        : isActive
                                            ? 'bg-[var(--primary)] border-[var(--primary)] text-[var(--text-on-primary)] shadow-sm'
                                            : 'bg-[var(--bg-surface)] border-stone-200 dark:border-stone-800 text-stone-400 dark:text-stone-600'
                                    }`}
                                >
                                    {isCompleted ? (
                                        <Check className="w-4 h-4 stroke-[2.5]" />
                                    ) : (
                                        <span>{step.id}</span>
                                    )}
                                </div>

                                {/* Dynamic Text Label positioned cleanly below the circle */}
                                <span className={`text-[11px] uppercase mt-2.5 transition-colors duration-200 absolute top-9 whitespace-nowrap
                                    ${isActive
                                        ? 'text-stone-900 dark:text-white font-extrabold tracking-tight'
                                        : 'text-stone-400 dark:text-stone-500 font-medium tracking-normal'}`}
                                >
                                    {step.label}
                                </span>
                            </div>

                            {/* 🌟 PERFECTLY CENTERED CONNECTOR LINES
                                - Removed hacky negative margins entirely.
                                - The parent flex layout engine automatically locks this to the dead center of the circles. */}
                            {index < steps.length - 1 && (
                                <div
                                    className={`flex-grow h-[1.5px] mx-4 transition-colors duration-500 rounded-full self-center
                                        ${currentStep > step.id
                                            ? 'bg-[var(--primary)]'
                                            : 'bg-stone-200 dark:bg-stone-800'
                                        }`}
                                />
                            )}
                        </React.Fragment>
                    );
                })}
            </div>

            {/* Generous spacing buffer underneath to make room for the absolute labels */}
            <div className="h-5" />
        </div>
    );
}