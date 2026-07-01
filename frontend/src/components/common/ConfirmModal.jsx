import React from 'react';
import { AlertTriangle } from 'lucide-react';

export default function ConfirmModal({ isOpen, title, message, confirmText = 'Confirm', cancelText = 'Cancel', onConfirm, onCancel, variant = 'danger' }) {
    if (!isOpen) return null;

    const confirmStyles = {
        danger: 'bg-rose-500 hover:bg-rose-600 text-white',
        primary: 'bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-[var(--text-on-primary)]',
    };

    return (
        <div className="fixed inset-0 z-[9998] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onCancel} />

            {/* Modal */}
            <div className="relative bg-[var(--bg-surface)] border border-[var(--border-light)] rounded-2xl shadow-xl max-w-sm w-full p-6 flex flex-col gap-4 animate-in fade-in zoom-in-95 duration-150 text-left">
                <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-rose-500/10 flex items-center justify-center shrink-0">
                        <AlertTriangle className="w-5 h-5 text-rose-500" />
                    </div>
                    <div className="flex flex-col gap-1">
                        <h3 className="text-sm font-bold text-stone-900 dark:text-white">{title || 'Are you sure?'}</h3>
                        <p className="text-xs text-[var(--text-muted)] leading-relaxed">{message || 'This action cannot be undone.'}</p>
                    </div>
                </div>

                <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-[var(--border-light)]">
                    <button
                        onClick={onCancel}
                        className="h-9 px-4 border border-[var(--border-light)] text-[var(--text-main)] rounded-xl text-xs font-semibold hover:bg-[var(--bg-surface-hover)] transition-colors cursor-pointer focus:outline-none"
                    >
                        {cancelText}
                    </button>
                    <button
                        onClick={onConfirm}
                        className={`h-9 px-4 rounded-xl text-xs font-semibold transition-colors cursor-pointer focus:outline-none shadow-sm ${confirmStyles[variant] || confirmStyles.danger}`}
                    >
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
}
