import React from 'react';
import { Camera, ShieldCheck } from 'lucide-react';

export default function ProfileCard({ user, labels }) {
    return (
        <div className="w-full p-6 bg-[var(--bg-surface)] border border-[var(--border-light)] rounded-2xl shadow-sm flex flex-col items-center text-center gap-4 relative overflow-hidden">
            {/* Upper Decorative Backlight Node */}
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[var(--primary)] to-indigo-500" />

            {/* Avatar Pipeline Matrix */}
            <div className="relative group cursor-pointer">
                <div className="w-24 h-24 rounded-full bg-stone-100 dark:bg-stone-900 border border-[var(--border-light)] flex items-center justify-center text-3xl font-black text-[var(--primary)] shadow-inner transition-transform duration-300 group-hover:scale-[1.02]">
                    {user.avatarText}
                </div>
                <div className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-stone-950 text-white dark:bg-white dark:text-stone-950 flex items-center justify-center border border-[var(--border-light)] shadow-md hover:bg-[var(--primary)] dark:hover:bg-[var(--primary)] hover:text-white dark:hover:text-white transition-colors">
                    <Camera className="w-3.5 h-3.5" />
                </div>
            </div>

            <div className="flex flex-col gap-0.5 mt-1">
                <h2 className="text-base font-black text-stone-950 dark:text-white tracking-tight flex items-center justify-center gap-1.5">
                    <span>{user.fullName}</span>
                    <ShieldCheck className="w-4 h-4 text-[var(--primary)]" />
                </h2>
                <span className="text-[10px] font-mono uppercase font-bold text-[var(--text-muted)] tracking-widest">
                    {labels.roleBadgeText} : {user.role}
                </span>
            </div>
        </div>
    );
}