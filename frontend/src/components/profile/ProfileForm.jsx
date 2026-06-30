import React, { useState } from 'react';
import { User, Mail, Phone, Lock, Save } from 'lucide-react';

export default function ProfileForm({ user, labels }) {
    const [personalInfo, setPersonalInfo] = useState({ fullName: user.fullName, email: user.email, phone: user.phone });
    const [passwordData, setPasswordData] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });

    const handleInfoSubmit = (e) => {
        e.preventDefault();
        console.log("Dispatched payload vector mutation for personal credentials info:", personalInfo);
    };

    const handlePasswordSubmit = (e) => {
        e.preventDefault();
        console.log("Dispatched state mutation configuration array for pass hashes:", passwordData);
        setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    };

    return (
        <div className="w-full flex flex-col gap-6">

            {/* Task 1: Personal Identification Fields Form */}
            <form onSubmit={handleInfoSubmit} className="p-5 sm:p-6 bg-[var(--bg-surface)] border border-[var(--border-light)] rounded-2xl shadow-sm flex flex-col gap-4 text-left">
                <h3 className="text-xs font-bold uppercase font-mono tracking-wider text-[var(--text-muted)] pb-2 border-b border-[var(--border-light)]/60">
                    {labels.personalSectionTitle}
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-bold uppercase text-[var(--text-muted)] tracking-wide">{labels.nameLabel}</label>
                        <div className="relative h-10"><User className="w-4 h-4 absolute left-3.5 top-3 text-[var(--text-muted)]" />
                            <input type="text" value={personalInfo.fullName} onChange={(e) => setPersonalInfo({ ...personalInfo, fullName: e.target.value })} className="w-full h-full pl-10 pr-4 rounded-xl border border-[var(--border-light)] bg-[var(--bg-main)] text-xs font-semibold focus:outline-none focus:border-[var(--primary)]" />
                        </div>
                    </div>
                    <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-bold uppercase text-[var(--text-muted)] tracking-wide">{labels.phoneLabel}</label>
                        <div className="relative h-10"><Phone className="w-4 h-4 absolute left-3.5 top-3 text-[var(--text-muted)]" />
                            <input type="text" value={personalInfo.phone} onChange={(e) => setPersonalInfo({ ...personalInfo, phone: e.target.value })} className="w-full h-full pl-10 pr-4 rounded-xl border border-[var(--border-light)] bg-[var(--bg-main)] text-xs font-semibold focus:outline-none focus:border-[var(--primary)]" />
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold uppercase text-[var(--text-muted)] tracking-wide">{labels.emailLabel}</label>
                    <div className="relative h-10"><Mail className="w-4 h-4 absolute left-3.5 top-3 text-[var(--text-muted)]" />
                        <input type="email" value={personalInfo.email} onChange={(e) => setPersonalInfo({ ...personalInfo, email: e.target.value })} className="w-full h-full pl-10 pr-4 rounded-xl border border-[var(--border-light)] bg-[var(--bg-main)] text-xs font-semibold focus:outline-none focus:border-[var(--primary)]" />
                    </div>
                </div>

                <button type="submit" className="h-10 px-5 bg-stone-950 text-white dark:bg-white dark:text-stone-950 font-bold text-xs rounded-xl flex items-center justify-center gap-2 mt-2 ml-auto cursor-pointer focus:outline-none transition-colors shadow-sm hover:opacity-90">
                    <Save className="w-4 h-4" />
                    <span>{labels.editBtnText}</span>
                </button>
            </form>

            {/* Task 2: Password Modification Module Form */}
            <form onSubmit={handlePasswordSubmit} className="p-5 sm:p-6 bg-[var(--bg-surface)] border border-[var(--border-light)] rounded-2xl shadow-sm flex flex-col gap-4 text-left">
                <h3 className="text-xs font-bold uppercase font-mono tracking-wider text-[var(--text-muted)] pb-2 border-b border-[var(--border-light)]/60">
                    {labels.passwordSectionTitle}
                </h3>

                <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold uppercase text-[var(--text-muted)] tracking-wide">{labels.currentPassLabel}</label>
                    <div className="relative h-10"><Lock className="w-4 h-4 absolute left-3.5 top-3 text-[var(--text-muted)]" />
                        <input type="password" value={passwordData.currentPassword} onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })} placeholder="••••••••" className="w-full h-full pl-10 pr-4 rounded-xl border border-[var(--border-light)] bg-[var(--bg-main)] text-xs font-mono focus:outline-none focus:border-[var(--primary)]" />
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-bold uppercase text-[var(--text-muted)] tracking-wide">{labels.newPassLabel}</label>
                        <div className="relative h-10"><Lock className="w-4 h-4 absolute left-3.5 top-3 text-[var(--text-muted)]" />
                            <input type="password" value={passwordData.newPassword} onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })} placeholder="••••••••" className="w-full h-full pl-10 pr-4 rounded-xl border border-[var(--border-light)] bg-[var(--bg-main)] text-xs font-mono focus:outline-none focus:border-[var(--primary)]" />
                        </div>
                    </div>
                    <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-bold uppercase text-[var(--text-muted)] tracking-wide">{labels.confirmPassLabel}</label>
                        <div className="relative h-10"><Lock className="w-4 h-4 absolute left-3.5 top-3 text-[var(--text-muted)]" />
                            <input type="password" value={passwordData.confirmPassword} onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })} placeholder="••••••••" className="w-full h-full pl-10 pr-4 rounded-xl border border-[var(--border-light)] bg-[var(--bg-main)] text-xs font-mono focus:outline-none focus:border-[var(--primary)]" />
                        </div>
                    </div>
                </div>

                <button type="submit" className="h-10 px-5 bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-[var(--text-on-primary)] font-bold text-xs rounded-xl flex items-center justify-center gap-2 mt-2 ml-auto cursor-pointer focus:outline-none transition-colors shadow-sm">
                    <span>{labels.updatePassBtnText}</span>
                </button>
            </form>

        </div>
    );
}