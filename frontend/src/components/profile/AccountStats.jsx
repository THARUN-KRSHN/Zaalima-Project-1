import React from 'react';

export default function AccountStats({ stats, labels }) {
    return (
        <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-4">
            {stats.map((stat, idx) => (
                <div
                    key={idx}
                    className="p-5 bg-[var(--bg-surface)] border border-[var(--border-light)] rounded-2xl flex flex-col gap-1 shadow-sm transition-all hover:shadow-md"
                >
                    <span className="text-2xl font-black text-stone-950 dark:text-white font-mono tracking-tight">
                        {stat.value}
                    </span>
                    <span className="text-[10px] font-mono uppercase font-bold text-[var(--text-muted)] tracking-wider">
                        {stat.label}
                    </span>
                </div>
            ))}
        </div>
    );
}