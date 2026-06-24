import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Phone, Lock, ArrowLeft, ArrowRight } from 'lucide-react';

export default function CustomerRegisterForm() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ fullName: '', email: '', phone: '', password: '', confirmPassword: '' });
    const [errors, setErrors] = useState({});

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: '' });
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const newErrors = {};
        if (!formData.fullName.trim()) newErrors.fullName = "Full name required";
        if (!formData.email.trim()) newErrors.email = "Email address required";
        if (!formData.password) newErrors.password = "Password required";
        if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords do not match";

        if (Object.keys(newErrors).length > 0) { setErrors(newErrors); return; }
        console.log("Dispatched customer registration request:", formData);
        navigate('?auth=login');
    };

    return (
        <form onSubmit={handleFormSubmit} className="flex flex-col gap-3.5 w-full text-left animate-in fade-in duration-200">
            {/* Input: Full Name */}
            <div className="flex flex-col gap-1 w-full">
                <label className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)]">Full Name</label>
                <div className="relative w-full h-10"><User className="absolute left-4 top-3 w-4 h-4 text-[var(--text-muted)]" />
                    <input type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} placeholder="Tharun Krishna C U" className="w-full h-full pl-11 pr-4 rounded-xl border border-[var(--border-light)] bg-[var(--bg-surface)] text-xs text-[var(--text-main)] focus:outline-none focus:border-[var(--primary)]" />
                </div>
                {errors.fullName && <span className="text-[10px] font-bold text-rose-500">{errors.fullName}</span>}
            </div>

            {/* Input: Email */}
            <div className="flex flex-col gap-1 w-full">
                <label className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)]">Email Address</label>
                <div className="relative w-full h-10"><Mail className="absolute left-4 top-3 w-4 h-4 text-[var(--text-muted)]" />
                    <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="name@domain.com" className="w-full h-full pl-11 pr-4 rounded-xl border border-[var(--border-light)] bg-[var(--bg-surface)] text-xs text-[var(--text-main)] focus:outline-none focus:border-[var(--primary)]" />
                </div>
                {errors.email && <span className="text-[10px] font-bold text-rose-500">{errors.email}</span>}
            </div>

            {/* Input: Password */}
            <div className="flex flex-col gap-1 w-full">
                <label className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)]">Password</label>
                <div className="relative w-full h-10"><Lock className="absolute left-4 top-3 w-4 h-4 text-[var(--text-muted)]" />
                    <input type="password" name="password" value={formData.password} onChange={handleInputChange} placeholder="••••••••" className="w-full h-full pl-11 pr-4 rounded-xl border border-[var(--border-light)] bg-[var(--bg-surface)] text-xs text-[var(--text-main)] focus:outline-none focus:border-[var(--primary)]" />
                </div>
                {errors.password && <span className="text-[10px] font-bold text-rose-500">{errors.password}</span>}
            </div>

            {/* Input: Confirm Password */}
            <div className="flex flex-col gap-1 w-full">
                <label className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)]">Confirm Password</label>
                <div className="relative w-full h-10"><Lock className="absolute left-4 top-3 w-4 h-4 text-[var(--text-muted)]" />
                    <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleInputChange} placeholder="••••••••" className="w-full h-full pl-11 pr-4 rounded-xl border border-[var(--border-light)] bg-[var(--bg-surface)] text-xs text-[var(--text-main)] focus:outline-none focus:border-[var(--primary)]" />
                </div>
                {errors.confirmPassword && <span className="text-[10px] font-bold text-rose-500">{errors.confirmPassword}</span>}
            </div>

            <button type="submit" className="w-full h-11 bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-[var(--text-on-primary)] rounded-xl font-bold text-xs shadow-md mt-2 flex items-center justify-center gap-2">
                <span>Create Buyer Account</span><ArrowRight className="w-4 h-4" />
            </button>

            <button type="button" onClick={() => navigate('?auth=register')} className="text-xs font-bold text-[var(--text-muted)] hover:text-[var(--primary)] flex items-center justify-center gap-2 mx-auto mt-2"><ArrowLeft className="w-4 h-4" /><span>Back to Choice</span></button>
        </form>
    );
}