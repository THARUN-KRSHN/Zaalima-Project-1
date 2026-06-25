import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Store, User, Mail, ShieldCheck, MapPin, ArrowLeft, ArrowRight } from 'lucide-react';

export default function VendorRegisterForm() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ storeName: '', ownerName: '', email: '', gstNumber: '', storeAddress: '', password: '', confirmPassword: '' });
    const [errors, setErrors] = useState({});

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: '' });
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const newErrors = {};
        if (!formData.storeName.trim()) newErrors.storeName = "Store catalog name required";
        if (!formData.email.trim()) newErrors.email = "Corporate email required";
        if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords do not match";

        if (Object.keys(newErrors).length > 0) { setErrors(newErrors); return; }
        console.log("Dispatched vendor account approval payload request:", formData);
        alert("Vendor setup registry logged! Status: Waiting for administrative approval loop verification.");
        navigate('?auth=login');
    };

    return (
        <form onSubmit={handleFormSubmit} className="flex flex-col gap-3 w-full text-left max-h-[420px] overflow-y-auto pr-1 animate-in fade-in duration-200">
            {/* Store Name */}
            <div className="flex flex-col gap-1 w-full">
                <label className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)]">Store Name</label>
                <div className="relative w-full h-10"><Store className="absolute left-4 top-3 w-4 h-4 text-[var(--text-muted)]" />
                    <input type="text" name="storeName" value={formData.storeName} onChange={handleInputChange} placeholder="Zaalima Boutiques" className="w-full h-full pl-11 pr-4 rounded-xl border border-[var(--border-light)] bg-[var(--bg-surface)] text-xs text-[var(--text-main)] focus:outline-none focus:border-[var(--primary)]" />
                </div>
                {errors.storeName && <span className="text-[10px] font-bold text-rose-500">{errors.storeName}</span>}
            </div>

            {/* Owner Name */}
            <div className="flex flex-col gap-1 w-full">
                <label className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)]">Owner Legal Name</label>
                <div className="relative w-full h-10"><User className="absolute left-4 top-3 w-4 h-4 text-[var(--text-muted)]" />
                    <input type="text" name="ownerName" value={formData.ownerName} onChange={handleInputChange} placeholder="Tharun Krishna" className="w-full h-full pl-11 pr-4 rounded-xl border border-[var(--border-light)] bg-[var(--bg-surface)] text-xs text-[var(--text-main)] focus:outline-none focus:border-[var(--primary)]" />
                </div>
            </div>

            {/* Email Address */}
            <div className="flex flex-col gap-1 w-full">
                <label className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)]">Corporate Email</label>
                <div className="relative w-full h-10"><Mail className="absolute left-4 top-3 w-4 h-4 text-[var(--text-muted)]" />
                    <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="vendor@zaalima.com" className="w-full h-full pl-11 pr-4 rounded-xl border border-[var(--border-light)] bg-[var(--bg-surface)] text-xs text-[var(--text-main)] focus:outline-none focus:border-[var(--primary)]" />
                </div>
                {errors.email && <span className="text-[10px] font-bold text-rose-500">{errors.email}</span>}
            </div>

            {/* GST Identifier Code */}
            <div className="flex flex-col gap-1 w-full">
                <label className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)]">GSTIN (Optional)</label>
                <div className="relative w-full h-10"><ShieldCheck className="absolute left-4 top-3 w-4 h-4 text-[var(--text-muted)]" />
                    <input type="text" name="gstNumber" value={formData.gstNumber} onChange={handleInputChange} placeholder="32AAAAA0000A1Z1" className="w-full h-full pl-11 pr-4 rounded-xl border border-[var(--border-light)] bg-[var(--bg-surface)] text-xs text-[var(--text-main)] focus:outline-none focus:border-[var(--primary)]" />
                </div>
            </div>

            {/* Address Input */}
            <div className="flex flex-col gap-1 w-full">
                <label className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)]">Physical Store Address</label>
                <div className="relative w-full h-10"><MapPin className="absolute left-4 top-3 w-4 h-4 text-[var(--text-muted)]" />
                    <input type="text" name="storeAddress" value={formData.storeAddress} onChange={handleInputChange} placeholder="Irinjalakuda, Thrissur, Kerala" className="w-full h-full pl-11 pr-4 rounded-xl border border-[var(--border-light)] bg-[var(--bg-surface)] text-xs text-[var(--text-main)] focus:outline-none focus:border-[var(--primary)]" />
                </div>
            </div>

            {/* Passwords */}
            <div className="flex flex-col gap-1 w-full">
                <label className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)]">Password</label>
                <input type="password" name="password" value={formData.password} onChange={handleInputChange} placeholder="••••••••" className="w-full h-10 px-4 rounded-xl border border-[var(--border-light)] bg-[var(--bg-surface)] text-xs text-[var(--text-main)] focus:outline-none focus:border-[var(--primary)]" />
            </div>

            <div className="flex flex-col gap-1 w-full">
                <label className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)]">Confirm Password</label>
                <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleInputChange} placeholder="••••••••" className="w-full h-10 px-4 rounded-xl border border-[var(--border-light)] bg-[var(--bg-surface)] text-xs text-[var(--text-main)] focus:outline-none focus:border-[var(--primary)]" />
                {errors.confirmPassword && <span className="text-[10px] font-bold text-rose-500">{errors.confirmPassword}</span>}
            </div>

            <button type="submit" className="w-full h-11 bg-amber-600 hover:bg-amber-700 text-white rounded-xl font-bold text-xs shadow-md mt-2 flex items-center justify-center gap-2 shrink-0">
                <span>Submit Vendor Application</span><ArrowRight className="w-4 h-4" />
            </button>

            <div className="w-full flex flex-col gap-2.5 items-center mt-3 pt-3 border-t border-[var(--border-light)]">
                <button type="button" onClick={() => navigate('?auth=register')} className="text-xs font-bold text-[var(--text-muted)] hover:text-[var(--primary)] flex items-center justify-center gap-2 focus:outline-none cursor-pointer"><ArrowLeft className="w-4 h-4" /><span>Back to Choice</span></button>
                <p className="text-xs text-[var(--text-muted)] font-semibold mt-1">
                    Already a user?{' '}
                    <button type="button" onClick={() => navigate('?auth=login')} className="text-[var(--primary)] font-bold hover:underline bg-transparent border-none p-0 focus:outline-none cursor-pointer">Login</button>
                </p>
            </div>
        </form>
    );
}