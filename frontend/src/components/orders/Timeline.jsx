import React from 'react';
import { Truck } from 'lucide-react';

export default function Timeline({ logs, sectionHeaderLabel = "Telemetry Route Registry Timeline" }) {
    return (
        <div className="w-full bg-[var(--bg-surface)] border border-[var(--border-light)] rounded-2xl p-5 sm:p-6 flex flex-col gap-5 shadow-sm">
            <h3 className="text-xs font-bold uppercase font-mono tracking-wider text-[var(--text-muted)] flex items-center gap-2 border-b border-[var(--border-light)]/40 pb-3">
                <Truck className="w-4 h-4 text-[var(--primary)]" />
                <span>{sectionHeaderLabel}</span>
            </h3>

            <div className="w-full flex flex-col gap-6 border-l border-[var(--border-light)] ml-2.5 pl-6 relative pt-1.5 pb-2">
                {logs && logs.map((log) => (
                    <div key={log.id} className="relative flex flex-col gap-1 text-xs text-left">
                        {/* Dot indicator core placement layout node */}
                        <div className="absolute left-[-32.5px] top-0.5 w-3 h-3 rounded-full bg-[var(--primary)] ring-4 ring-[var(--bg-surface)] shadow-sm" />
                        <span className="font-mono font-bold text-[var(--text-muted)] text-[10px]">{log.timestamp}</span>
                        <p className="font-medium text-[var(--text-main)] leading-relaxed">{log.desc}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}