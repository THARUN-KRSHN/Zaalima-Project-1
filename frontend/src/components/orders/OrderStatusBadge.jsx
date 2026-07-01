import React from 'react';

export default function OrderStatusBadge({ status, statusLabel }) {
    const getStatusStyles = (statusKey) => {
        switch (statusKey) {
            case 'delivered':
                return {
                    classes: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400 border-emerald-200/50 dark:border-emerald-500/20'
                };
            case 'shipped':
                return {
                    classes: 'bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400 border-amber-200/50 dark:border-amber-500/20'
                };
            default:
                return {
                    classes: 'bg-violet-50 text-violet-700 dark:bg-violet-500/10 dark:text-violet-400 border-violet-200/50 dark:border-violet-500/20'
                };
        }
    };

    const targetStyles = getStatusStyles(status);

    return (
        <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-medium transition-colors duration-200 ${targetStyles.classes}`}>
            <span className="w-1.5 h-1.5 rounded-full bg-current shrink-0" />
            <span>{statusLabel}</span>
        </div>
    );
}