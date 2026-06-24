import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Phone, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';

export default function RegisterForm() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: ''
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [errors, setErrors] = useState({});

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const evaluatePasswordStrength = (pass) => {
        if (!pass) return { score: 0, label: 'Empty', color: 'bg-stone-100 dark:bg-stone-800' };
        let points = 0;
        if (pass.length >= 6) points++;
        if (/[A-Z]/.test(pass)) points++;
        if (/[0-9]/.test(pass)) points++;
        if (/[^A-Za-z0-9]/.test(pass)) points++;

        switch (points) {
            case 1: return { score: 25, label: 'Weak', color: 'bg-rose-500' };
            case 2: return { score: 50, label: 'Fair', color: 'bg-amber-500' };
            case 3: return { score: 75, label: 'Good', color: 'bg-blue-500' };
            case 4: return { score: 100, label: 'Strong', color: 'bg-emerald-500' };
            default: return { score: 0, label: 'Weak', color: 'bg-rose-500' };
        }
    };

    const strength = evaluatePasswordStrength(formData.password);

    const handleRegisterSubmit = (e) => {
        e.preventDefault();
        const newErrors = {};

        if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
        if (!formData.email.trim()) newErrors.email = "Email address is required";
        if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
        if (!formData.password) newErrors.password = "Password field cannot be empty";
        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        console.log("Store registration criteria submission verified:", formData);
        navigate('?auth=login');
    };

    return (
        <form onSubmit={handleRegisterSubmit} className="flex flex-col gap-4 w-full">
            {/* Field: Full Name */}
            <div className="flex flex-col gap-1 w-full">
                <label className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)]">Full Name</label>
                <div className="relative w-full h-10">
                    <div className="absolute inset-y-0 left-4 flex items-center justify-center text-[var(--text-muted)] pointer-events-none">
                        <User className="w-4 h-4 stroke-[2]" />
                    </div>
                    <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        placeholder="Tharun Krishna C U"
                        className={`w-full h-full pl-11 pr-4 rounded-xl border bg-[var(--bg-surface)] text-xs font-medium text-[var(--text-main)] transition-all focus:outline-none focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)]
                            ${errors.fullName ? 'border-rose-500 focus:border-rose-500' : 'border-[var(--border-light)]'}`}
                    />
                </div>
                {errors.fullName && <span className="text-[10px] font-bold text-rose-500 mt-0.5">{errors.fullName}</span>}
            </div>

            {/* Field: Email */}
            <div className="flex flex-col gap-1 w-full">
                <label className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)]">Email Address</label>
                <div className="relative w-full h-10">
                    <div className="absolute inset-y-0 left-4 flex items-center justify-center text-[var(--text-muted)] pointer-events-none">
                        <Mail className="w-4 h-4 stroke-[2]" />
                    </div>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="tharun@zmarket.com"
                        className={`w-full h-full pl-11 pr-4 rounded-xl border bg-[var(--bg-surface)] text-xs font-medium text-[var(--text-main)] transition-all focus:outline-none focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)]
                            ${errors.email ? 'border-rose-500 focus:border-rose-500' : 'border-[var(--border-light)]'}`}
                    />
                </div>
                {errors.email && <span className="text-[10px] font-bold text-rose-500 mt-0.5">{errors.email}</span>}
            </div>

            {/* Field: Phone */}
            <div className="flex flex-col gap-1 w-full">
                <label className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)]">Contact Phone</label>
                <div className="relative w-full h-10">
                    <div className="absolute inset-y-0 left-4 flex items-center justify-center text-[var(--text-muted)] pointer-events-none">
                        <Phone className="w-4 h-4 stroke-[2]" />
                    </div>
                    <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="9778585423"
                        className={`w-full h-full pl-11 pr-4 rounded-xl border bg-[var(--bg-surface)] text-xs font-medium text-[var(--text-main)] transition-all focus:outline-none focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)]
                            ${errors.phone ? 'border-rose-500 focus:border-rose-500' : 'border-[var(--border-light)]'}`}
                    />
                </div>
                {errors.phone && <span className="text-[10px] font-bold text-rose-500 mt-0.5">{errors.phone}</span>}
            </div>

            {/* Field: Password */}
            <div className="flex flex-col gap-1 w-full">
                <label className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)]">Password</label>
                <div className="relative w-full h-10">
                    <div className="absolute inset-y-0 left-4 flex items-center justify-center text-[var(--text-muted)] pointer-events-none">
                        <Lock className="w-4 h-4 stroke-[2]" />
                    </div>
                    <input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder="••••••••"
                        className={`w-full h-full pl-11 pr-12 rounded-xl border bg-[var(--bg-surface)] text-xs font-mono text-[var(--text-main)] transition-all focus:outline-none focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)]
                            ${errors.password ? 'border-rose-500 focus:border-rose-500 focus:ring-rose-500' : 'border-[var(--border-light)]'}`}
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-4 flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text-main)] focus:outline-none cursor-pointer"
                    >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                </div>
                {errors.password && <span className="text-[10px] font-bold text-rose-500 mt-0.5">{errors.password}</span>}

                {formData.password && (
                    <div className="w-full flex flex-col gap-1 mt-1">
                        <div className="w-full h-1 bg-stone-100 dark:bg-stone-800 rounded-full overflow-hidden">
                            <div className={`h-full rounded-full transition-all duration-300 ${strength.color}`} style={{ width: `${strength.score}%` }} />
                        </div>
                        <span className="text-[9px] font-bold tracking-wide uppercase text-stone-500 text-right">Security: {strength.label}</span>
                    </div>
                )}
            </div>

            {/* Field: Confirm Password */}
            <div className="flex flex-col gap-1 w-full">
                <label className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)]">Confirm Password</label>
                <div className="relative w-full h-10">
                    <div className="absolute inset-y-0 left-4 flex items-center justify-center text-[var(--text-muted)] pointer-events-none">
                        <Lock className="w-4 h-4 stroke-[2]" />
                    </div>
                    <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        placeholder="••••••••"
                        className={`w-full h-full pl-11 pr-12 rounded-xl border bg-[var(--bg-surface)] text-xs font-mono text-[var(--text-main)] transition-all focus:outline-none focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)]
                            ${errors.confirmPassword ? 'border-rose-500 focus:border-rose-500' : 'border-[var(--border-light)]'}`}
                    />
                    <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute inset-y-0 right-4 flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text-main)] focus:outline-none cursor-pointer"
                    >
                        {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                </div>
                {errors.confirmPassword && <span className="text-[10px] font-bold text-rose-500 mt-0.5">{errors.confirmPassword}</span>}
            </div>

            <button
                type="submit"
                className="w-full h-11 bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-[var(--text-on-primary)] rounded-xl font-bold text-xs tracking-wide shadow-md transition-all active:scale-[0.99] flex items-center justify-center gap-2 mt-2 focus:outline-none cursor-pointer group"
            >
                <span>Open Storefront Workspace</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </button>

            {/* 🌟 FIX: Updated Single Page query parameter link redirection target */}
            <div className="w-full text-center text-xs text-[var(--text-muted)] font-medium mt-2">
                Already have an account?{' '}
                <button
                    type="button"
                    onClick={() => navigate('?auth=login')}
                    className="text-[var(--primary)] font-bold hover:underline bg-transparent border-none p-0 focus:outline-none cursor-pointer"
                >
                    Sign In
                </button>
            </div>
        </form>
    );
}