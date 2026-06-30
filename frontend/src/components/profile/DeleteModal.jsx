import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

export default function DeleteModal({ isOpen, onConfirm, onCancel, labels }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 w-full h-full bg-stone-950/40 backdrop-blur-md z-[100] flex items-center justify-center p-4 animate-in fade-in duration-200">
            <div className="w-full max-w-sm bg-[var(--bg-surface)] border border-[var(--border-light)] rounded-2xl p-6 shadow-2xl relative flex flex-col gap-4 text-left animate-in zoom-in-95 duration-150">

                <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-500 flex items-center justify-center border border-rose-500/10 shrink-0">
                        <AlertTriangle className="w-5 h-5" />
                    </div>
                    <div className="flex flex-col gap-1 min-w-0">
                        <h3 className="text-base font-black text-stone-950 dark:text-white tracking-tight">{labels.modalHeader}</h3>
                        <p className="text-xs text-[var(--text-muted)] leading-relaxed font-medium">{labels.modalDesc}</p>
                    </div>
                </div>

                <div className="flex items-center gap-3 mt-2 ml-auto">
                    <button onClick={onCancel} className="h-9 px-4 text-[var(--text-muted)] hover:text-[var(--text-main)] text-xs font-bold uppercase focus:outline-none cursor-pointer">
                        {labels.modalCancelText}
                    </button>
                    <button onClick={onConfirm} className="h-9 px-4 bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs rounded-xl focus:outline-none cursor-pointer shadow-sm">
                        {labels.modalConfirmText}
                    </button>
                </div>
            </div>
        </div>
    );
}