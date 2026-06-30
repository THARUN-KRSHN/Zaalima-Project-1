import React from 'react';
import { CheckCircle2, Clock, AlertCircle } from 'lucide-react';

export default function OrderStatusBadge({ status, statusLabel }) {
    // Isolated theme registry mapping status definitions directly to Zmarket parameters
    const getStatusStyles = (statusKey) => {
        switch (statusKey) {
            case 'delivered':
                return {
                    icon: <CheckCircle2 className="w-3.5 h-3.5" />,
                    classes: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/10'
                };
            case 'shipped':
                return {
                    icon: <Clock className="w-3.5 h-3.5" />,
                    classes: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/10'
                };
            default:
                return {
                    icon: <AlertCircle className="w-3.5 h-3.5" />,
                    classes: 'bg-[var(--primary)]/10 text-[var(--primary)] border-[var(--primary)]/10'
                };
        }
    };

    const targetStyles = getStatusStyles(status);

    return (
        <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full border text-[10px] font-bold uppercase tracking-wider transition-colors duration-200 ${targetStyles.classes}`}>
            {targetStyles.icon}
            <span>{statusLabel}</span>
        </div>
    );
}