import React, { useState } from 'react';
import { User, Phone, MapPin, Building, Globe, Hash, Save, X } from 'lucide-react';

export default function AddressForm({ initialData, onSave, onCancel, labels }) {
    const [formData, setFormData] = useState(initialData || {
        type: 'home', name: '', phone: '', addressLine: '', city: '', state: '', pincode: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="p-5 sm:p-6 bg-[var(--bg-surface)] border border-[var(--border-light)] rounded-2xl shadow-sm flex flex-col gap-4 text-left animate-in fade-in duration-200">
            <h3 className="text-xs font-bold uppercase font-mono tracking-wider text-[var(--text-muted)] pb-2 border-b border-[var(--border-light)]/60">
                {initialData ? labels.editFormTitle : labels.addFormTitle}
            </h3>

            {/* Type selector nodes radio list */}
            <div className="flex items-center gap-3">
                {['home', 'office', 'other'].map((t) => (
                    <button
                        key={t}
                        type="button"
                        onClick={() => setFormData({ ...formData, type: t })}
                        className={`h-8 px-4 rounded-xl text-[10px] font-mono font-bold uppercase border transition-all cursor-pointer focus:outline-none
                            ${formData.type === t
                                ? 'bg-[var(--primary)] text-[var(--text-on-primary)] border-[var(--primary)]'
                                : 'border-[var(--border-light)] text-[var(--text-muted)] hover:text-[var(--text-main)] bg-[var(--bg-main)]'}`}
                    >
                        {t}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold uppercase text-[var(--text-muted)] tracking-wide">{labels.nameLabel}</label>
                    <div className="relative h-10"><User className="w-4 h-4 absolute left-3.5 top-3 text-[var(--text-muted)]" />
                        <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full h-full pl-10 pr-4 rounded-xl border border-[var(--border-light)] bg-[var(--bg-main)] text-xs font-semibold focus:outline-none focus:border-[var(--primary)]" />
                    </div>
                </div>
                <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold uppercase text-[var(--text-muted)] tracking-wide">{labels.phoneLabel}</label>
                    <div className="relative h-10"><Phone className="w-4 h-4 absolute left-3.5 top-3 text-[var(--text-muted)]" />
                        <input type="text" required value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="w-full h-full pl-10 pr-4 rounded-xl border border-[var(--border-light)] bg-[var(--bg-main)] text-xs font-semibold focus:outline-none focus:border-[var(--primary)]" />
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold uppercase text-[var(--text-muted)] tracking-wide">{labels.addressLabel}</label>
                <div className="relative h-10"><MapPin className="w-4 h-4 absolute left-3.5 top-3 text-[var(--text-muted)]" />
                    <input type="text" required value={formData.addressLine} onChange={(e) => setFormData({ ...formData, addressLine: e.target.value })} className="w-full h-full pl-10 pr-4 rounded-xl border border-[var(--border-light)] bg-[var(--bg-main)] text-xs font-semibold focus:outline-none focus:border-[var(--primary)]" />
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold uppercase text-[var(--text-muted)] tracking-wide">{labels.cityLabel}</label>
                    <div className="relative h-10"><Building className="w-4 h-4 absolute left-3.5 top-3 text-[var(--text-muted)]" />
                        <input type="text" required value={formData.city} onChange={(e) => setFormData({ ...formData, city: e.target.value })} className="w-full h-full pl-10 pr-4 rounded-xl border border-[var(--border-light)] bg-[var(--bg-main)] text-xs font-semibold focus:outline-none focus:border-[var(--primary)]" />
                    </div>
                </div>
                <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold uppercase text-[var(--text-muted)] tracking-wide">{labels.stateLabel}</label>
                    <div className="relative h-10"><Globe className="w-4 h-4 absolute left-3.5 top-3 text-[var(--text-muted)]" />
                        <input type="text" required value={formData.state} onChange={(e) => setFormData({ ...formData, state: e.target.value })} className="w-full h-full pl-10 pr-4 rounded-xl border border-[var(--border-light)] bg-[var(--bg-main)] text-xs font-semibold focus:outline-none focus:border-[var(--primary)]" />
                    </div>
                </div>
                <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold uppercase text-[var(--text-muted)] tracking-wide">{labels.pincodeLabel}</label>
                    <div className="relative h-10"><Hash className="w-4 h-4 absolute left-3.5 top-3 text-[var(--text-muted)]" />
                        <input type="text" required value={formData.pincode} onChange={(e) => setFormData({ ...formData, pincode: e.target.value })} className="w-full h-full pl-10 pr-4 rounded-xl border border-[var(--border-light)] bg-[var(--bg-main)] text-xs font-mono font-bold focus:outline-none focus:border-[var(--primary)]" />
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-3 ml-auto mt-2">
                <button type="button" onClick={onCancel} className="h-10 px-4 text-stone-500 hover:text-stone-700 dark:text-stone-400 text-xs font-bold uppercase rounded-xl flex items-center gap-1.5 focus:outline-none cursor-pointer">
                    <X className="w-4 h-4" /><span>{labels.cancelBtnText}</span>
                </button>
                <button type="submit" className="h-10 px-5 bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-[var(--text-on-primary)] font-bold text-xs rounded-xl flex items-center justify-center gap-2 focus:outline-none cursor-pointer shadow-sm">
                    <Save className="w-4 h-4" /><span>{labels.saveBtnText}</span>
                </button>
            </div>
        </form>
    );
}