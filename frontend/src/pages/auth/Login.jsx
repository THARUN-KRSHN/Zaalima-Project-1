import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { authSuccess } from '../../redux/slices/authSlice';
import AuthLayout from '../../layouts/AuthLayout';

export default function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Controlled Form Inputs State
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        rememberMe: false
    });

    // Toggle password character masking visibility
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});

    // Field state modifications handler
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

    // Form confirmation verification submit handler
    const handleLoginSubmit = (e) => {
        e.preventDefault();

        // Basic production safety input validation check
        const newErrors = {};
        if (!formData.email.trim()) newErrors.email = "Email address is required";
        if (!formData.password) newErrors.password = "Password field cannot be empty";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        console.log("Authentication credentials sent successfully:", formData);
        
        let role = 'customer';
        let redirectPath = '/products';
        
        const emailLower = formData.email.toLowerCase();
        if (emailLower.includes('admin')) {
            role = 'admin';
            redirectPath = '/admin/dashboard';
        } else if (emailLower.includes('vendor') || emailLower.includes('merchant')) {
            role = 'vendor';
            redirectPath = '/vendor/dashboard';
        } else {
            role = 'customer';
            redirectPath = '/products';
        }

        const loggedInUser = {
            email: formData.email,
            role: role,
            name: role.charAt(0).toUpperCase() + role.slice(1)
        };

        dispatch(authSuccess({
            user: loggedInUser,
            token: 'mock-session-token-' + Date.now()
        }));

        navigate(redirectPath);
    };

    return (
        <AuthLayout>
            <div className="w-full flex flex-col gap-2 text-left animate-in fade-in slide-in-from-bottom-3 duration-300">

                {/* Section Header */}
                <div className="flex flex-col gap-1.5">
                    <h2 className="text-xl sm:text-2xl font-extrabold text-stone-900 dark:text-white tracking-tight">
                        Welcome Back
                    </h2>
                    <p className="text-xs text-[var(--text-muted)] font-medium leading-relaxed">
                        Enter your credentials to manage your store inventory nodes and fulfillment trends.
                    </p>
                </div>

                {/* Form Module Canvas */}
                <form onSubmit={handleLoginSubmit} className="flex flex-col gap-4.5 mt-6 w-full">

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
                            {/* Toggle Password Visibility Trigger */}
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

                    {/* Options Row: Remember Me & Forgot Password Link */}
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
                            onClick={() => navigate('?auth=forgot')}
                            className="text-[var(--primary)] font-bold hover:underline bg-transparent border-none p-0 focus:outline-none cursor-pointer"
                        >
                            Forgot Password?
                        </button>
                    </div>

                    {/* Operational Action Button */}
                    <button
                        type="submit"
                        className="w-full h-11 bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-[var(--text-on-primary)] rounded-xl font-bold text-xs tracking-wide shadow-md transition-all active:scale-[0.99] flex items-center justify-center gap-2 mt-2 focus:outline-none cursor-pointer group"
                    >
                        <span>Sign In to Account</span>
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                    </button>

                    {/* Register Redirection Pathway Footnote */}
                    <div className="w-full text-center text-xs text-[var(--text-muted)] font-medium mt-3">
                        Don't have an account?{' '}
                        <button
                            type="button"
                            onClick={() => navigate('?auth=register')}
                            className="text-[var(--primary)] font-bold hover:underline bg-transparent border-none p-0 focus:outline-none cursor-pointer"
                        >
                            Register User
                        </button>
                    </div>

                    {/* Quick Demo Credentials Panel */}
                    <div className="mt-6 pt-5 border-t border-[var(--border-light)] w-full">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)] text-center mb-3">
                            Click to Auto-fill Demo Credentials
                        </p>
                        <div className="grid grid-cols-3 gap-2">
                            <button
                                type="button"
                                onClick={() => setFormData({ email: 'customer@zaalima.com', password: 'password123', rememberMe: false })}
                                className="p-2.5 bg-purple-500/5 hover:bg-purple-500/10 border border-purple-500/10 hover:border-purple-500/20 rounded-xl text-center transition-all focus:outline-none cursor-pointer"
                            >
                                <span className="block text-[10px] font-extrabold text-purple-600 dark:text-purple-400">Customer</span>
                                <span className="block text-[8px] text-[var(--text-muted)] font-mono truncate mt-0.5">customer@zaalima.com</span>
                            </button>
                            <button
                                type="button"
                                onClick={() => setFormData({ email: 'vendor@zaalima.com', password: 'password123', rememberMe: false })}
                                className="p-2.5 bg-amber-500/5 hover:bg-amber-500/10 border border-amber-500/10 hover:border-amber-500/20 rounded-xl text-center transition-all focus:outline-none cursor-pointer"
                            >
                                <span className="block text-[10px] font-extrabold text-amber-600 dark:text-amber-400">Vendor</span>
                                <span className="block text-[8px] text-[var(--text-muted)] font-mono truncate mt-0.5">vendor@zaalima.com</span>
                            </button>
                            <button
                                type="button"
                                onClick={() => setFormData({ email: 'admin@zaalima.com', password: 'password123', rememberMe: false })}
                                className="p-2.5 bg-blue-500/5 hover:bg-blue-500/10 border border-blue-500/10 hover:border-blue-500/20 rounded-xl text-center transition-all focus:outline-none cursor-pointer"
                            >
                                <span className="block text-[10px] font-extrabold text-blue-600 dark:text-blue-400">Admin</span>
                                <span className="block text-[8px] text-[var(--text-muted)] font-mono truncate mt-0.5">admin@zaalima.com</span>
                            </button>
                        </div>
                    </div>

                </form>

            </div>
        </AuthLayout>
    );
}