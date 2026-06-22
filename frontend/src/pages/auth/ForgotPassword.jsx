import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, ArrowLeft, CheckCircle2, ArrowRight } from 'lucide-react';
import AuthLayout from '../../layouts/AuthLayout';

export default function ForgotPassword() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [errors, setErrors] = useState('');

    // 🌟 SUCCESS STATE TOGGLE CONTROL
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleForgotPasswordSubmit = (e) => {
        e.preventDefault();

        if (!email.trim()) {
            setErrors("Email address is required to dispatch recovery tokens");
            return;
        }

        // Simulating API recovery link generation trigger
        console.log("Password recovery payload sent to destination:", email);
        setIsSubmitted(true);
    };

    return (
        <AuthLayout>
            <div className="w-full flex flex-col gap-2 text-left animate-in fade-in slide-in-from-bottom-3 duration-300">

                {/* 🌟 DYNAMIC RENDERING: SUCCESS STATE vs ENTRY FORM */}
                {isSubmitted ? (
                    <div className="flex flex-col gap-5 animate-in zoom-in-95 duration-200">
                        {/* Success Icon Badge */}
                        <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center border border-emerald-500/20 shadow-sm">
                            <CheckCircle2 className="w-6 h-6 stroke-[2]" />
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <h2 className="text-xl sm:text-2xl font-extrabold text-stone-900 dark:text-white tracking-tight">
                                Link Sent Successfully
                            </h2>
                            <p className="text-xs text-[var(--text-muted)] font-medium leading-relaxed">
                                We have dispatched an encrypted recovery ledger key token to <span className="font-bold text-stone-900 dark:text-white font-sans">{email}</span>. Click the link inside the message to initialize a new credential parameters pass.
                            </p>
                        </div>

                        {/* Action Redirections */}
                        <div className="flex flex-col gap-3 w-full pt-2">
                            <button
                                type="button"
                                onClick={() => navigate('/login')}
                                className="w-full h-11 bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-[var(--text-on-primary)] rounded-xl font-bold text-xs tracking-wide shadow-md transition-all active:scale-[0.99] flex items-center justify-center gap-2 focus:outline-none cursor-pointer"
                            >
                                <span>Return to Sign In</span>
                            </button>

                            <button
                                type="button"
                                onClick={() => { setIsSubmitted(false); setEmail(''); }}
                                className="text-xs text-[var(--text-muted)] font-bold hover:text-[var(--text-main)] transition-colors text-center py-2 focus:outline-none cursor-pointer"
                            >
                                Resend verification token
                            </button>
                        </div>
                    </div>
                ) : (
                    /* STANDARD OPERATION ENTRY FORM */
                    <>
                        <div className="flex flex-col gap-1.5">
                            <h2 className="text-xl sm:text-2xl font-extrabold text-stone-900 dark:text-white tracking-tight">
                                Recover Password
                            </h2>
                            <p className="text-xs text-[var(--text-muted)] font-medium leading-relaxed">
                                Enter your registered merchant account email to receive a secure parameters synchronization reset link.
                            </p>
                        </div>

                        <form onSubmit={handleForgotPasswordSubmit} className="flex flex-col gap-4.5 mt-6 w-full">

                            {/* Input Field: Email Address */}
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
                                        value={email}
                                        onChange={(e) => { setEmail(e.target.value); setErrors(''); }}
                                        placeholder="merchant@zmarket.com"
                                        className={`w-full h-full pl-11 pr-4 rounded-xl border bg-[var(--bg-surface)] text-xs font-medium text-[var(--text-main)] transition-all focus:outline-none focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)]
                                            ${errors ? 'border-rose-500 focus:border-rose-500 focus:ring-rose-500' : 'border-[var(--border-light)]'}`}
                                    />
                                </div>
                                {errors && <span className="text-[10px] font-bold text-rose-500 mt-0.5">{errors}</span>}
                            </div>

                            {/* Reset Button Action */}
                            <button
                                type="submit"
                                className="w-full h-11 bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-[var(--text-on-primary)] rounded-xl font-bold text-xs tracking-wide shadow-md transition-all active:scale-[0.99] flex items-center justify-center gap-2 mt-2 focus:outline-none cursor-pointer group"
                            >
                                <span>Send Recovery Link</span>
                                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                            </button>

                            {/* Navigation Footnote: Back to login gate hook */}
                            <div className="w-full text-center mt-3 border-t border-[var(--border-light)] pt-4">
                                {/* 🌟 FIX: Cleaned up the closing bracket format syntax right below */}
                                <button
                                    type="button"
                                    onClick={() => navigate('/login')}
                                    className="text-xs font-bold text-[var(--text-muted)] hover:text-[var(--primary)] flex items-center justify-center gap-2 mx-auto focus:outline-none cursor-pointer transition-colors"
                                >
                                    <ArrowLeft className="w-4 h-4" />
                                    <span>Back to Sign In</span>
                                </button>
                            </div>

                        </form>
                    </>
                )}

            </div>
        </AuthLayout >
    );
}