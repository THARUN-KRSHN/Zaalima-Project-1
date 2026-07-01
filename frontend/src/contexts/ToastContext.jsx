import React, { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';

const ToastContext = createContext();

export function useToast() {
    return useContext(ToastContext);
}

export function ToastProvider({ children }) {
    const [toasts, setToasts] = useState([]);

    const showToast = useCallback((message, type = 'success', duration = 3500) => {
        const id = Date.now() + Math.random();
        setToasts(prev => [...prev, { id, message, type }]);
        setTimeout(() => {
            setToasts(prev => prev.filter(t => t.id !== id));
        }, duration);
    }, []);

    const dismiss = useCallback((id) => {
        setToasts(prev => prev.filter(t => t.id !== id));
    }, []);

    const iconMap = {
        success: <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />,
        error: <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />,
        info: <Info className="w-4 h-4 text-blue-500 shrink-0" />,
    };

    const bgMap = {
        success: 'border-emerald-500/20',
        error: 'border-rose-500/20',
        info: 'border-blue-500/20',
    };

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}

            {/* Toast container — fixed bottom-right */}
            <div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-2.5 pointer-events-none max-w-sm">
                {toasts.map((toast) => (
                    <div
                        key={toast.id}
                        className={`pointer-events-auto bg-[var(--bg-surface)] border ${bgMap[toast.type] || bgMap.info} rounded-xl px-4 py-3 shadow-lg flex items-start gap-3 animate-in fade-in slide-in-from-bottom-3 duration-200`}
                    >
                        {iconMap[toast.type] || iconMap.info}
                        <span className="text-sm font-medium text-stone-800 dark:text-stone-200 leading-snug flex-grow">{toast.message}</span>
                        <button
                            onClick={() => dismiss(toast.id)}
                            className="text-stone-400 hover:text-stone-600 dark:hover:text-stone-300 transition-colors cursor-pointer focus:outline-none shrink-0"
                        >
                            <X className="w-3.5 h-3.5" />
                        </button>
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    );
}
