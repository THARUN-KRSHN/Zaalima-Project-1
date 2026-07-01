import React from 'react';
import { Truck } from 'lucide-react';

export default function Timeline({ logs, sectionHeaderLabel = "Tracking History" }) {
    return (
        <div className="w-full bg-[var(--bg-surface)] border border-[var(--border-light)] rounded-2xl p-5 sm:p-6 flex flex-col gap-5 shadow-sm">
            <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-100 flex items-center gap-2 border-b border-[var(--border-light)]/40 pb-3">
                <Truck className="w-4 h-4 text-[var(--primary)]" />
                <span>{sectionHeaderLabel}</span>
            </h3>

            <div className="w-full flex flex-col gap-5 border-l border-[var(--border-light)] ml-2 pl-5 relative pt-1 pb-1">
                {logs && logs.map((log) => (
                    <div key={log.id} className="relative flex flex-col gap-0.5 text-sm text-left">
                        {/* Dot indicator core placement layout node */}
                        <div className="absolute left-[-26px] top-1.5 w-2 h-2 rounded-full bg-[var(--primary)] ring-4 ring-[var(--bg-surface)]" />
                        <span className="text-xs font-medium text-stone-400 dark:text-stone-500">{log.timestamp}</span>
                        <p className="text-stone-600 dark:text-stone-300 font-normal leading-relaxed">{log.desc}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}