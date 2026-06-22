import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';

export default function LoginForm() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        rememberMe: false
    });

    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleLoginSubmit = (e) => {
        e.preventDefault();

        const newErrors = {};
        if (!formData.email.trim()) newErrors.email = "Email address is required";
        if (!formData.password) newErrors.password = "Password field cannot be empty";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        console.log("Authentication credentials sent successfully:", formData);
        navigate('/vendor/dashboard');
    };

    return (
        <form onSubmit={handleLoginSubmit} className="flex flex-col gap-4.5 w-full">
            {/* Input Field: Email */}
            <div className="flex flex-col gap-1.5 w-full">
                <label className="text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)]">
                    Email Address
                </label>
                <div className="relative w-full h-11">
                    <div className="absolute inset-y-0 left-4 flex items-center justify-center text-[var(--text-muted)] pointer-events-none">
                        <Mail className="w-4 h-4 stroke-[2]" />
                    </div>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="name@zmarket.com"
                        className={`w-full h-full pl-11 pr-4 rounded-xl border bg-[var(--bg-surface)] text-xs font-medium text-[var(--text-main)] transition-all focus:outline-none focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)]
                            ${errors.email ? 'border-rose-500 focus:border-rose-500 focus:ring-rose-500' : 'border-[var(--border-light)]'}`}
                    />
                </div>
                {errors.email && <span className="text-[10px] font-bold text-rose-500 mt-0.5">{errors.email}</span>}
            </div>

            {/* Input Field: Password */}
            <div className="flex flex-col gap-1.5 w-full">
                <label className="text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)]">
                    Password
                </label>
                <div className="relative w-full h-11">
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
                        className="absolute inset-y-0 right-4 flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors focus:outline-none cursor-pointer"
                    >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                </div>
                {errors.password && <span className="text-[10px] font-bold text-rose-500 mt-0.5">{errors.password}</span>}
            </div>

            {/* Options Row */}
            <div className="flex items-center justify-between w-full text-xs font-semibold pt-1">
                <label className="flex items-center gap-2 cursor-pointer select-none text-[var(--text-main)]">
                    <input
                        type="checkbox"
                        name="rememberMe"
                        checked={formData.rememberMe}
                        onChange={handleInputChange}
                        className="w-4 h-4 rounded border-[var(--border-light)] accent-[var(--primary)] cursor-pointer focus:outline-none"
                    />
                    <span>Remember me</span>
                </label>
                <button
                    type="button"
                    onClick={() => navigate('/forgot-password')}
                    className="text-[var(--primary)] hover:underline transition-all bg-transparent border-none p-0 focus:outline-none cursor-pointer"
                >
                    Forgot Password?
                </button>
            </div>

            {/* Submit Handle */}
            <button
                type="submit"
                className="w-full h-11 bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-[var(--text-on-primary)] rounded-xl font-bold text-xs tracking-wide shadow-md transition-all active:scale-[0.99] flex items-center justify-center gap-2 mt-2 focus:outline-none cursor-pointer group"
            >
                <span>Sign In to Account</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </button>
        </form>
    );
}