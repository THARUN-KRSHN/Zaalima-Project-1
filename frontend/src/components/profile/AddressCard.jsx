import React from 'react';
import { Home, Briefcase, MapPin, Trash2, Edit3 } from 'lucide-react';

export default function AddressCard({ address, isDefault, onSelectDefault, onEdit, onDelete, labels }) {
    const getIcon = (type) => {
        switch (type) {
            case 'office': return <Briefcase className="w-4 h-4" />;
            case 'home': return <Home className="w-4 h-4" />;
            default: return <MapPin className="w-4 h-4" />;
        }
    };

    return (
        <div className={`w-full p-5 bg-[var(--bg-surface)] border rounded-2xl shadow-sm transition-all relative flex flex-col gap-4 text-left
            ${isDefault ? 'border-[var(--primary)] ring-1 ring-[var(--primary)]/30' : 'border-[var(--border-light)]'}`}>

            <div className="flex items-start justify-between gap-4">
                {/* Task 5 Radio Handle */}
                <label className="flex items-center gap-3 cursor-pointer select-none min-w-0">
                    <input
                        type="radio"
                        checked={isDefault}
                        onChange={onSelectDefault}
                        className="w-4 h-4 text-[var(--primary)] accent-[var(--primary)] cursor-pointer focus:outline-none"
                    />
                    <div className="flex items-center gap-2 bg-[var(--bg-main)] border border-[var(--border-light)] px-2.5 py-1 rounded-lg">
                        {getIcon(address.type)}
                        <span className="text-[10px] font-mono font-bold uppercase text-[var(--text-main)] tracking-wider">
                            {address.type}
                        </span>
                    </div>
                </label>

                {/* Operations Actions row layout */}
                <div className="flex items-center gap-1 shrink-0">
                    <button onClick={onEdit} className="p-1.5 text-[var(--text-muted)] hover:text-[var(--primary)] transition-colors focus:outline-none cursor-pointer">
                        <Edit3 className="w-4 h-4" />
                    </button>
                    <button onClick={onDelete} className="p-1.5 text-[var(--text-muted)] hover:text-rose-500 transition-colors focus:outline-none cursor-pointer">
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Address Identity Attributes Details */}
            <div className="flex flex-col gap-1 min-w-0">
                <h4 className="text-sm font-extrabold text-stone-950 dark:text-white truncate">{address.name}</h4>
                <p className="text-[11px] font-medium text-[var(--text-muted)] font-mono">{address.phone}</p>
                <p className="text-xs text-[var(--text-main)] leading-relaxed font-medium mt-1 font-sans">
                    {address.addressLine}, {address.city}, {address.state} — <span className="font-mono font-bold">{address.pincode}</span>
                </p>
            </div>
        </div>
    );
}